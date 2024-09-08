const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const {createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser}=require('./services/userService');
const {createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle, reviewArticle} = require('./services/articleService');
const { getAllDoctors, getDoctorById, updateDoctor, deleteDoctor, applyForDoctor} = require('./services/doctorService'); // add create and add doctor!!!

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());

const secret = '8@fB4$z&2!G`^mXlP6S$5n+K9R#WvTq1'; // Consistent secret key

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        console.error('No token provided');
        return res.status(401).json({ message: "No token provided." });
    }

    console.log('Token received:', token); // Log the token received

    jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err.message); // Log the error message
            return res.status(403).json({ message: "Invalid token." });
        }

        console.log('Decoded user:', decoded); // Log decoded user information

        if (!decoded || !decoded.id || !decoded.role) {
            console.error('Decoded token is missing expected properties');
            return res.status(403).json({ message: "Invalid token structure." });
        }

        req.user = decoded; // Set the decoded user in the request object
        next();
    });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (!req.user) {
        console.error('req.user is undefined');
        return res.status(403).json({ message: "User not authenticated." });
    }

    console.log(`Authenticated user role: ${req.user.role}`); // Log the user's role

    if (req.user.role !== 'admin') {
        console.error(`Access denied. User role is ${req.user.role}`);
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next();
};

app.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;

    // Validate that all fields are present
    if (!username || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Create the user using the service
        const newUser = await createUser({ username, password, role });

        // Generate a JWT token for the user
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, secret, { expiresIn: '1h' });

        // Respond with the token
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate that username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        // Call the loginUser service to authenticate and get the token
        const result = await loginUser(username, password);

        // Return success message and token
        res.status(200).json(result);
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(401).json({ message: error.message });
    }
});

app.get('/users', authMiddleware, isAdmin, (req, res)=>{
    const users = getAllUsers();
    return res.json(users);
})

app.get('/users/:id', authMiddleware, isAdmin, (req, res)=>{
    const id = parseInt(req.params.id);
    const user = getUserById(id);
    return res.json(user);
});

app.put('/users/:id', authMiddleware, isAdmin, (req, res) => {
    const id = parseInt(req.params.id);
    const { username, password, role } = req.body;
    const userdata = {username, password, role};
    const updatedUser = updateUser(id, userdata);
    return res.json(updatedUser);
});

app.delete('/users/:id', authMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const user = deleteUser(id);
    if(user)
    {
       return res.status(200).json({ message: "User deleted Successfully." });
    }
    else{
        return res.status(404).json({ message: "User not found." });

    }
});

app.post('/articles', (req, res)=>{
    const {title, content, author}=req.body;
    if(!title || !content || !author)
    {
        return res.status(400).json({error: "All fields are required"});
    }
    const articleData = {title, content, author};
    const article = createArticle(articleData);
    res.json(article);
})

app.get('/articles', (req, res)=>{
    const articles= getAllArticles();
    res.json(articles);
})

app.get('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the ID from the request parameters
    const article = getArticleById(id); // Pass the ID to the service function
    if (article) {
        res.json(article); // Send the found article as JSON response
    } else {
        res.status(404).json({ message: "Article not found." }); // Handle the case where the article is not found
    }
});

app.put('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the ID from the request parameters
    const {title, content, author}=req.body;
    const updateData = {title, content, author}; // Extract the update data from the request body

    const updatedArticle = updateArticle(id, updateData); // Call the service function

    if (updatedArticle) {
        res.json(updatedArticle); // Send the updated article as JSON response
    } else {
        res.status(404).json({ message: "Article not found." }); // Handle the case where the article is not found
    }
});

app.delete('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id); // Get the ID from the request parameters

    const result = deleteArticle(id); // Call the service function

    if (result) {
        res.status(200).json({ message: "Article deleted successfully." }); // Send success message
    } else {
        res.status(404).json({ message: "Article not found." }); // Handle the case where the article is not found
    }
});
// route for the review article!!
app.post('/articles/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id); // Get the article ID from the request parameters
    const { rating } = req.body; // Get the rating from the request body

    // Validate rating
    if (rating === undefined || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    // Create the review object
    const review = {
        rating,
        date: new Date().toISOString() // Add a date to the review
    };

    // Call the reviewArticle service function
    const updatedArticle = reviewArticle(id, review);

    if (updatedArticle) {
        res.status(200).json(updatedArticle); // Send the updated article as JSON response
    } else {
        res.status(404).json({ message: "Article not found." }); // Handle the case where the article is not found
    }
});

app.get('/doctors', (req, res) => {
    const doctors = getAllDoctors();
    res.json(doctors);
});

app.post('/doctors', authMiddleware, isAdmin, (req, res)=>{
    const {name, specialization, contact} = req.body;
    if(!name || !specialization || !contact)
    {
        return res.status(400).json({error: "All fields are required"});
    }
    const doctorData = {name, specialization, contact};
    const newDoctor = applyForDoctor(doctorData);
    return res.json(newDoctor);
});

app.get('/doctors/:id', authMiddleware, isAdmin, (req, res)=>{
    const doctorId = parseInt(req.params.id);
    const doctor = getDoctorById(doctorId);
    res.json(doctor);
})

app.put('/doctors/:id', authMiddleware, isAdmin, (req, res) => {
    const doctorId = parseInt(req.params.id);
    const { name, specialization, contact } = req.body;
    const doctorData = {name, specialization, contact};
    const updatedDoctor= updateDoctor(doctorId, doctorData);
    if(updatedDoctor){
        res.json(updatedDoctor);
    }
    else{
        res.status(404).json({message: "Doctor not found"});
    }
});

app.delete('/doctors/:id', authMiddleware, isAdmin, (req, res) => {
    const doctorId = parseInt(req.params.id);
    const deletedDoctor = deleteDoctor(doctorId);
    if(deletedDoctor){
        res.json(deletedDoctor)
    }
    else{
        res.status(404).json({message: "Doctor not found"});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
