const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function seed() {
    console.log("Connecting to DB to seed...");
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI not defined");
    }
    await mongoose.connect(process.env.MONGO_URI);

    const User = require('./models/User');
    const Book = require('./models/Book');

    try {
        // Create a unique test user
        const uniqueSuffix = Date.now();
        const email = `test_user_${uniqueSuffix}@example.com`;
        
        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = await User.create({
            name: 'Test User',
            email: email,
            password: hashedPassword,
            role: 'user'
        });
        console.log(`Created test user: ${email}`);

        // Create a book
        const book = await Book.create({
            title: `Test Book ${uniqueSuffix}`,
            author: 'Test Author',
            price: 100,
            isAvailable: true,
            issued: false
        });
        console.log(`Created test book: ${book.title}`);
        
        console.log(JSON.stringify({
            userEmail: email,
            userId: user._id,
            bookId: book._id,
            bookTitle: book.title
        }));

    } catch (err) {
        console.error("Seeding failed:", err);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
