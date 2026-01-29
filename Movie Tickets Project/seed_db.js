const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seed() {
    console.log('🌱 Seeding database...');

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        console.log('✅ Connected to database.');

        const sql = fs.readFileSync(path.join(__dirname, 'database_setup.sql'), 'utf8');
        
        await connection.query(sql);
        console.log('✅ Database schema applied successfully.');

        await connection.end();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
