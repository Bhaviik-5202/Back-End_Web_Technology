const cron = require('node-cron');
const User = require('./models/User');
const Book = require('./models/Book');
const transporter = require('./config/mailer');

const startCronJob = () => {
    // Run every day at midnight (00:00)
    // For testing purposes, you can change this to '* * * * *' (every minute)
    cron.schedule('0 0 * * *', async () => {


        try {
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const sixDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);

            // --- WARNING LOGIC: Notify users 1 day before overdue ---
            // Find users with books issued between 6 and 7 days ago
            const usersToWarn = await User.find({
                "issuedBooks": {
                    $elemMatch: {
                        issuedAt: { $lt: sixDaysAgo, $gt: sevenDaysAgo }
                    }
                }
            });

            for (const user of usersToWarn) {
                const booksToWarn = user.issuedBooks.filter(
                    book => new Date(book.issuedAt) < sixDaysAgo && new Date(book.issuedAt) > sevenDaysAgo
                );

                if (booksToWarn.length > 0) {
                    const bookIds = booksToWarn.map(b => b.bookId);
                    const booksInfo = await Book.find({ _id: { $in: bookIds } });
                    const bookTitles = booksInfo.map(b => b.title).join(', ');

                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: user.email,
                        subject: "Library Reminder: Books Due Tomorrow",
                        text: `Hello,\n\nThe following books are due to be returned tomorrow (7 days limit):\n\n${bookTitles}\n\nPlease return or re-issue them to avoid auto-return.`
                    };

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) console.error(`Failed to send warning email to ${user.email}:`, err);
                        else console.log(`Warning notification sent to ${user.email}`);
                    });
                }
            }

            // Find users who have at least one book issued before 7 days ago
            const users = await User.find({
                "issuedBooks.issuedAt": { $lt: sevenDaysAgo }
            });

            if (users.length === 0) {

                return;
            }

            let returnedCount = 0;

            for (const user of users) {
                // Filter out the books that need to be returned
                const booksToReturn = user.issuedBooks.filter(
                    book => new Date(book.issuedAt) < sevenDaysAgo
                );

                if (booksToReturn.length > 0) {
                    const bookIds = booksToReturn.map(b => b.bookId);

                    // Fetch book details to get titles for the email
                    const booksInfo = await Book.find({ _id: { $in: bookIds } });
                    const bookTitles = booksInfo.map(b => b.title).join(', ');

                    // 1. Update Books collection: set issued=false, issuedTo=null
                    await Book.updateMany(
                        { _id: { $in: bookIds } },
                        { $set: { issued: false, issuedTo: null } }
                    );

                    // 2. Remove these books from User's issuedBooks array
                    // We keep only the books that are NOT in the booksToReturn list
                    // Or simply filter against the specific IDs or date
                    user.issuedBooks = user.issuedBooks.filter(
                        book => new Date(book.issuedAt) >= sevenDaysAgo
                    );

                    await user.save();
                    returnedCount += booksToReturn.length;

                    // 3. Send Email Notification
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: user.email,
                        subject: "Library Alert: Overdue Books Returned",
                        text: `Hello,\n\nThe following books were overdue (issued more than 7 days ago) and have been automatically returned by the system:\n\n${bookTitles}\n\nPlease visit the library if you wish to issue them again.`
                    };

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) console.error(`Failed to send email to ${user.email}:`, err);
                        else console.log(`Overdue notification sent to ${user.email}`);
                    });
                }
            }



        } catch (error) {
            console.error('Error in Auto-Return Cron Job:', error);
        }
    });
};

module.exports = startCronJob;
