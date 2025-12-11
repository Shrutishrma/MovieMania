require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// --- CHANGE: Use createPool instead of createConnection ---
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false }
});

// Test the connection when server starts
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database Connection Failed:', err.message);
    } else {
        console.log('✅ Connected to Clever Cloud (via Pool)');
        
        // Create Table Check
        const sql = `CREATE TABLE IF NOT EXISTS movies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            genre VARCHAR(100),
            description TEXT,
            poster_url VARCHAR(255),
            rating DECIMAL(3, 1)
        )`;
        
        connection.query(sql, (err) => {
            connection.release(); // Always release connection back to pool
            if (err) console.error('⚠️ Table creation failed:', err);
            else console.log('✅ Movies table ready');
        });
    }
});

app.get('/', (req, res) => res.send('Backend Running'));

// --- API ENDPOINTS (Updated for Pool) ---

app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
});

app.post('/movies', (req, res) => {
    const { title, genre, description, poster_url, rating } = req.body;
    const sql = 'INSERT INTO movies (title, genre, description, poster_url, rating) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [title, genre, description, poster_url, rating], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Added", id: result.insertId });
    });
});

app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const { title, genre, description, poster_url, rating } = req.body;
    const sql = 'UPDATE movies SET title=?, genre=?, description=?, poster_url=?, rating=? WHERE id=?';
    db.query(sql, [title, genre, description, poster_url, rating, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Updated' });
    });
});

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM movies WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Deleted' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));