const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// enable CORS so you can call this from your portfolio site
app.use(cors());

// parse JSON and url-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize SQLite database (creates file if it doesn't exist)
const db = new sqlite3.Database('./portfolio.db', (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// create table if it doesn’t exist
db.run(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// receive form submissions
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db.run(
    `INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)`,
    [name, email, message],
    function (err) {
      if (err) {
        console.error('❌ Database error:', err.message);
        return res.status(500).json({ error: 'Failed to save submission.' });
      }
      console.log(`✅ New submission saved with ID: ${this.lastID}`);
      res.status(201).json({ success: true, id: this.lastID });
    }
  );
});

// get all submissions (e.g., for admin view)
app.get('/submissions', (req, res) => {
  db.all(`SELECT * FROM submissions ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      console.error('❌ Database error:', err.message);
      return res.status(500).json({ error: 'Failed to fetch submissions.' });
    }
    res.json(rows);
  });
});

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});