require('dotenv').config();
const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}/api`;

// Test Data
const testUser = {
    username: `testuser_${Date.now()}`,
    password: 'password123'
};

const testMovie = {
    movie_name: 'Inception',
    movie_image: 'https://example.com/inception.jpg'
};

const testRating = {
    stars: 5,
    comment: 'Masterpiece!'
};

async function runTests() {
    console.log(`\nTARGET SERVER: ${BASE_URL}`);
    console.log('Ensure your server IS running (npm start or npm run dev) before running this test.\n');
    console.log('Starting API Verification...\n');

    let token = '';
    let userId = null;
    let movieId = null;

    // 1. Register User
    try {
        console.log('1. Testing Registration...');
        const res = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const data = await res.json();
        
        if (res.ok && !data.error) {
            console.log('✅ Registration Successful:', data);
            userId = data.data.user_id;
        } else {
            console.error('❌ Registration Failed:', data);
            return;
        }
    } catch (error) {
        console.error('❌ Registration Error:', error.message);
        return;
    }

    // 2. Login User
    try {
        console.log('\n2. Testing Login...');
        const res = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const data = await res.json();

        if (res.ok && !data.error) {
            console.log('✅ Login Successful');
            token = data.data.token;
            console.log('🔑 Token received');
        } else {
            console.error('❌ Login Failed:', data);
            return;
        }
    } catch (error) {
        console.error('❌ Login Error:', error.message);
        return;
    }

    // 3. Create Movie (Need to be logged in usually? Checking auth middleware usage for movies...)
    // routes/moviesRoute.js: router.post("/", authMiddleware, ...)
    try {
        console.log('\n3. Creating Test Movie...');
        const res = await fetch(`${BASE_URL}/movies`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(testMovie)
        });
        const data = await res.json();

        if (res.ok && !data.error) {
            console.log('✅ Movie Creation Successful:', data);
            movieId = data.data.movie_id;
        } else {
            // Check if it failed because it requires admin or something? 
            // Looking at code: just authMiddleware.
            console.error('❌ Movie Creation Failed:', data);
            // Try to fetch existing movies if creation fails?
            // But let's assume we can create one.
        }
    } catch (error) {
        console.error('❌ Movie Creation Error:', error.message);
    }

    if (!movieId) {
        // If creation failed, try to get existing movies to pick one
        try {
            console.log('   Trying to fetch existing movies...');
            const res = await fetch(`${BASE_URL}/movies`);
            const data = await res.json();
            if (res.ok && !data.error && data.data.length > 0) {
                 movieId = data.data[0].movie_id;
                 console.log('   Found existing movie ID:', movieId);
            }
        } catch (e) {
            console.error('   Could not fetch movies.');
        }
    }

    if (!movieId) {
        console.error('❌ No movie ID available for rating test. Skipping rating.');
    } else {
        // 4. Rate Movie
        try {
            console.log('\n4. Testing Add Rating...');
            const ratingPayload = {
                movie_id: movieId,
                ...testRating
            };
            
            const res = await fetch(`${BASE_URL}/ratings`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(ratingPayload)
            });
            const data = await res.json();

            if (res.ok && !data.error) {
                console.log('✅ Add Rating Successful:', data);
            } else {
                console.error('❌ Add Rating Failed:', data);
            }
        } catch (error) {
            console.error('❌ Add Rating Error:', error.message);
        }
    }
    
    // 5. Get Movies (Public)
    try {
        console.log('\n5. Testing Get Movies...');
        const res = await fetch(`${BASE_URL}/movies`);
        const data = await res.json();

        if (res.ok && !data.error) {
            console.log('✅ Get Movies Successful. Count:', data.data.length);
        } else {
            console.error('❌ Get Movies Failed:', data);
        }
    } catch (error) {
        console.error('❌ Get Movies Error:', error.message);
    }

    console.log('\nVerification Complete.');
}

runTests();
