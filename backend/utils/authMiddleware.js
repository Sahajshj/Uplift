const jwt = require('jsonwebtoken');
const secret = '8@fB4$z&2!G^mXlP6S$5n+K9R#WvTq1'; // Consistent secret key

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

module.exports = authMiddleware;
