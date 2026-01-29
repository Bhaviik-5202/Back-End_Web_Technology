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
        // 1. Create User if not exists
        let user = await User.findOne({ email: 'test@example.com' });
        if (!user) {
            const hashedPassword = await bcrypt.hash('password123', 10);
            user = await User.create({
                name: 'Test User',
                email: 'test@example.com',
                password: hashedPassword,
                role: 'user'
            });
            console.log("Created test user: test@example.com");
        } else {
            console.log("Test user already exists.");
        }

        // 2. Create Book if not exists
        let book = await Book.findOne({ title: 'Test Book' });
        if (!book) {
            book = await Book.create({
                title: 'Test Book',
                author: 'Test Author',
                price: 100,
                isAvailable: true,
                issued: false
            });
            console.log("Created test book: Test Book");
        } else {
            // Ensure it's not issued
            if (book.issued) {
                book.issued = false;
                book.issuedTo = null;
                await book.save();
                console.log("Reset test book to not issued.");
            } else {
                console.log("Test book already exists and is available.");
            }
        }
        
        // Also clear any previous issues for this user/book combo to ensure clean state
        await User.updateMany(
            { 'issuedBooks.bookId': book._id },
            { $pull: { issuedBooks: { bookId: book._id } } }
        );
         console.log("Cleaned up any existing issues for this book.");

    } catch (err) {
        console.error("Seeding failed:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Seeding complete.");
    }
}

seed();
