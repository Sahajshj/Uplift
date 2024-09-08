import React, { useState } from 'react';
import { signup } from '../services/api';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userData = { username, password, role }; // Create the user data object
            const response = await signup(userData); // Send the data via POST request
            setSuccess('Signup successful!');
            console.log('Signup response:', response); // Log the response for debugging
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response && error.response.data) {
                setError(`Signup failed: ${error.response.data.message || 'Please try again.'}`);
            } else {
                setError('Signup failed. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="user">User</option>
                </select>
            </div>
            <button type="submit">Create Account</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default SignupForm;
