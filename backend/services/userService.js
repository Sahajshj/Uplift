const { readUsers, writeUsers } = require('../models/userModel');
const bcrypt = require('bcrypt');
const secret = '8@fB4$z&2!G`^mXlP6S$5n+K9R#WvTq1';
const jwt = require('jsonwebtoken');

// Create a new user
const createUser = async (userData) => {
    const users = readUsers();
    
    // Check if the username already exists
    const existingUser = users.find(user => user.username === userData.username);
    if (existingUser) {
        throw new Error('User already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10); 
    const newUser = {
        id: users.length + 1,
        ...userData,
        password: hashedPassword // Store hashed password
    };

    // Add the new user to the list
    users.push(newUser);
    writeUsers(users); // Save updated users
    return newUser;
};

const loginUser = async (username, password) => {
    const users = readUsers();

    // Find the user by username
    const user = users.find(u => u.username === username);
    if (!user) {
        throw new Error('Login failed. Invalid credentials.');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Login failed. Invalid credentials.');
    }

    // Generate and return a JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
    return { message: 'Login successful.', token };
};

// Get all users
const getAllUsers = (page = 1, limit = 10) => {
    const users = readUsers();
    return users.slice((page - 1) * limit, page * limit);
};

// Get a specific user by ID
const getUserById = (id) => {
    const users = readUsers();
    return users.find(user => user.id === id);
};

// Update a user
const updateUser = (id, updateData) => {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        const user = users[userIndex];
        if (updateData.password) {
            updateData.password = bcrypt.hashSync(updateData.password, 10); // Hash new password if provided
        }
        users[userIndex] = { ...user, ...updateData };
        writeUsers(users);
        return users[userIndex];
    }
    return null;
};


// Delete a user
const deleteUser = (id) => {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        const removedUser = users.splice(userIndex, 1)[0];
        writeUsers(users);
        return removedUser;
    }
    return null;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser, 
    loginUser
};
