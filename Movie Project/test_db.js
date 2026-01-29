const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql@52021043',
    database: 'movie_rating_db'
});

connection.connect((err) => {
    if (err) {
        console.error('❌ MySQL connection error:', err.message);
    } else {
        console.log('✅ MySQL connected successfully!');
        connection.end();
    }
});