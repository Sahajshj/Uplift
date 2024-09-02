const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { readUsers, writeUsers, readArticles, writeArticles, readDoctors } = require('./datastore');

const app = express();
const port = 3000;

app.use(express.json());

const secret = '8@fB4$z&2!G`^mXlP6S$5n+K9R#WvTq1'; // Consistent secret key

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        console.error('No token provided');
        return res.status(401).json({ message: "No token provided." });
    }

    const decoded = jwt.decode(token, { complete: true });
    if (decoded) {
        console.log('Token expiry:', new Date(decoded.payload.exp * 1000));
    } else {
        console.error('Token decoding failed');
    }

    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: "Invalid token." });
        }
        req.user = decoded;
        next();
    });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

app.get('/protected', authMiddleware, (req, res) => {
    res.send('Protected content');
});

app.get('/users', authMiddleware, isAdmin, (req, res) => {
    const users = readUsers();
    res.status(200).json(users);
});

app.get('/users/:id', authMiddleware, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (req.user.id !== user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied." });
    }

    res.status(200).json(user);
});

app.put('/users/:id', authMiddleware, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (req.user.id !== user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied." });
    }

    const { username, password, role } = req.body;
    if (username) user.username = username;
    if (password) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: "Internal error." });
            user.password = hash;
            if (role && req.user.role === 'admin') user.role = role;

            writeUsers(users);
            res.status(200).json(user);
        });
    } else if (role && req.user.role === 'admin') {
        user.role = role;
        writeUsers(users);
        res.status(200).json(user);
    } else {
        writeUsers(users);
        res.status(200).json(user);
    }
});

app.delete('/users/:id', authMiddleware, (req, res) => {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found." });
    }

    if (req.user.id !== users[userIndex].id && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied." });
    }

    users.splice(userIndex, 1);
    writeUsers(users);
    res.status(200).json({ message: "User account deleted successfully." });
});

app.post('/signup', (req, res) => {
    const users = readUsers();
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: "Internal error." });

        const newUser = { id: users.length + 1, username, password: hash, role };
        users.push(newUser);
        writeUsers(users);

        const token = jwt.sign({ id: newUser.id, role: newUser.role }, secret, { expiresIn: '1h' });
        res.status(201).json({ token });
    });
});

app.post('/login', (req, res) => {
    const users = readUsers();
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: "Login failed. Invalid credentials." });
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.status(500).json({ error: "Internal error." });
        if (!result) return res.status(401).json({ message: "Login failed. Invalid credentials." });

        const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful.", token });
    });
});

app.post('/articles', (req, res) => {
    const articles = readArticles();
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newArticle = { id: articles.length + 1, title, content, author };
    articles.push(newArticle);
    writeArticles(articles);

    res.status(201).json(newArticle);
});

app.get('/articles', (req, res) => {
    const articles = readArticles();
    res.json(articles);
});

app.get('/doctors', (req, res) => {
    const doctors = readDoctors();
    res.json(doctors);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
