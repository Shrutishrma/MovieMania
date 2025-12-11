require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: { rejectUnauthorized: false }
});

db.connect((err) => {
    if (err) {
        console.error('❌ Connection Failed:', err);
        return;
    }
    console.log('✅ Connected to Database');

    const sql = `INSERT INTO movies (title, genre, description, poster_url, rating) VALUES 
    ('Inception', 'Sci-Fi', 'A thief who steals corporate secrets through dream-sharing technology.', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 8.8),
    ('The Dark Knight', 'Action', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 9.0),
    ('Interstellar', 'Sci-Fi', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.', 'https://image.tmdb.org/t/p/w500/gEU2QniL6C8z1dY4kdWNkhjQW6C.jpg', 8.6),
    ('Parasite', 'Thriller', 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 8.5),
    ('Avengers: Endgame', 'Action', 'After the devastating events of Infinity War, the universe is in ruins.', 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', 8.4)`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('⚠️ Error inserting data (Data might already exist):', err.message);
        } else {
            console.log('✅ 5 Movies Inserted Successfully!');
        }
        db.end();
    });
});