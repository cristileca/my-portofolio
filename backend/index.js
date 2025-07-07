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
    read INTEGER DEFAULT 0,
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

//update read status of a submission
app.patch('/submissions/:id', (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  if (typeof read !== 'boolean') {
    return res.status(400).json({ error: "'read' must be boolean" });
  }

  db.run(
    `UPDATE submissions SET read = ? WHERE id = ?`,
    [read ? 1 : 0, id],
    function (err) {
      if (err) {
        console.error('❌ Database error:', err.message);
        return res.status(500).json({ error: 'Failed to update submission.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Submission not found.' });
      }
      res.json({ success: true });
    }
  );
});

// delete a submission
app.delete('/submissions/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Delete request for id:`, id);
  
  db.run(
    `DELETE FROM submissions WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        console.error('❌ Database error:', err.message);
        return res.status(500).json({ error: 'Failed to delete submission.' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Submission not found.' });
      }
      res.json({ success: true });
    }
  );
});


// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
