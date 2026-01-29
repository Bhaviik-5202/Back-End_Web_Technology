const mongoose = require('mongoose');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const TEST_PORT = 5002;

// Utility to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getTestData() {
    console.log("Connecting to DB...");
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI not defined");
    }
    await mongoose.connect(process.env.MONGO_URI);
    
    const User = require('./models/User');
    const Book = require('./models/Book');

    // Find a test user (create one if needed, but for now just find one)
    // We want a regular user, not admin
    let user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
        console.log("Test user not found, looking for any user...");
        user = await User.findOne({ role: 'user' });
    }
    
    // Find an available book
    let book = await Book.findOne({ issued: false });
    
    if (!user || !book) {
        console.error("User or Book not found for testing.");
        await mongoose.disconnect();
        return null;
    }

    // Get a valid token for this user
    // We can simulate a login or just sign a token if we have the secret
    // For this test, let's actually perform a login request against the running server to get a real token
    
    const userData = {
        email: user.email,
        _id: user._id, 
        password: "we need password to login" 
        // If we don't have the password, we can't login via API.
        // Alternative: generate token manually using the same secret
    };

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    console.log(`Test User: ${user.email} (${user._id})`);
    console.log(`Test Book: ${book.title} (${book._id})`);

    await mongoose.disconnect();
    return { user, book, token };
}

function startServer() {
    console.log(`Starting server on port ${TEST_PORT}...`);
    const serverProcess = spawn('node', ['index.js'], {
        cwd: __dirname,
        env: { ...process.env, PORT: TEST_PORT }
    });

    // serverProcess.stdout.pipe(process.stdout);
    serverProcess.stderr.pipe(process.stderr);

    return serverProcess;
}

function makeRequest(method, path, token, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: TEST_PORT,
            path: `/library${path}`, // Assuming /library prefix based on verify-fix.js, but need to check index.js
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const result = {
                    statusCode: res.statusCode,
                    body: JSON.parse(data || '{}')
                };
                resolve(result);
            });
        });

        req.on('error', reject);

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTest() {
    let serverProcess;
    try {
        const testData = await getTestData();
        if (!testData) return;

        serverProcess = startServer();
        // Give server time to start
        await sleep(3000);

        // 1. Try to Issue Book
        console.log("\n--- Testing Issue Book ---");
        // Check index.js for prefix. Usually it is /library or /api
        // Based on userApi.js frontend: api uses baseURL... let's check index.js content first?
        // Wait, verify-fix.js used /library/otp/send-otp. So prefix is likely /library
        
        const issueRes = await makeRequest('POST', `/user/issue/${testData.book._id}`, testData.token);
        console.log("Issue Result:", issueRes);

        if (issueRes.statusCode === 200) {
            console.log("✅ Issue Book passed");
        } else {
            console.log("❌ Issue Book failed");
        }

        // 2. Try to Return Book
        console.log("\n--- Testing Return Book ---");
        const returnRes = await makeRequest('POST', `/user/return/${testData.book._id}`, testData.token);
        console.log("Return Result:", returnRes);

        if (returnRes.statusCode === 200) {
            console.log("✅ Return Book passed");
        } else {
            console.log("❌ Return Book failed");
        }

    } catch (err) {
        console.error("Test failed:", err);
    } finally {
        if (serverProcess) {
            serverProcess.kill();
        }
    }
}

runTest();
