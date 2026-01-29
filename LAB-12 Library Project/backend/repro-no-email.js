const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const http = require('http');
const { spawn } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const TEST_PORT = 5003;

// Utility to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getTestData() {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGO_URI);
    
    const User = require('./models/User');
    const Book = require('./models/Book');

    // Find any user
    let user = await User.findOne({ role: 'user' });
    if (!user) user = await User.findOne();
    
    // Find an available book
    let book = await Book.findOne({ issued: false });
    
    if (!user || !book) {
        console.error("User or Book not found.");
        await mongoose.disconnect();
        return null;
    }

    // Generate token WITHOUT email
    const token = jwt.sign(
        { id: user._id, role: user.role }, // NO EMAIL HERE
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    console.log(`Test User: ${user.email}`);
    console.log(`Test Book: ${book.title}`);

    await mongoose.disconnect();
    return { user, book, token };
}

function startServer() {
    console.log(`Starting server on port ${TEST_PORT}...`);
    const serverProcess = spawn('node', ['index.js'], {
        cwd: __dirname,
        env: { ...process.env, PORT: TEST_PORT }
    });
    serverProcess.stderr.pipe(process.stderr);
    return serverProcess;
}

function makeRequest(method, path, token, body = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: TEST_PORT,
            path: `/library${path}`,
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
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function runTest() {
    let serverProcess;
    try {
        const testData = await getTestData();
        if (!testData) return;

        serverProcess = startServer();
        await sleep(3000);

        console.log("\n--- Testing Issue Book (No Email in Token) ---");
        const issueRes = await makeRequest('POST', `/user/issue/${testData.book._id}`, testData.token);
        console.log("Issue Result:", JSON.stringify(issueRes.body));

        if (issueRes.statusCode === 200) {
            console.log("✅ Issue Book passed (Resilient to missing email)");
        } else {
            console.log("❌ Issue Book failed");
        }
        
        // Return it to clean up
        if (issueRes.statusCode === 200) {
             console.log("\n--- Testing Return Book (No Email in Token) ---");
             const returnRes = await makeRequest('POST', `/user/return/${testData.book._id}`, testData.token);
             console.log("Return Result:", JSON.stringify(returnRes.body));
             if (returnRes.statusCode === 200) {
                 console.log("✅ Return Book passed");
             } else {
                 console.log("❌ Return Book failed");
             }
        }

    } catch (err) {
        console.error("Test failed:", err);
    } finally {
        if (serverProcess) serverProcess.kill();
    }
}

runTest();
