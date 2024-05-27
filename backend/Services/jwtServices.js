const jwt = require('jsonwebtoken');

// Secret key for JWT
const secretKey = 'devDomain';

// Function to generate JWT token
function generateToken(user) {
    return jwt.sign({ user }, secretKey, { expiresIn: '1h' });
}

// Function to verify JWT token
const verifyToken = (req, res, next) => {
    console.log("Welcome");
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ error: 'Missing or invalid Authorization header' });
        }
        let token = authHeader.split(' ')[1]; // Extracting token after 'Bearer' prefix
        token = token.replace(/"/g, '');
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey); // Replace 'your_secret_key' with your actual secret key
        console.log(decoded);

        // Attach the user ID and email to the request object for further processing
        req.user = decoded.user;
        console.log("User details:", req.user);
        
        // Continue to the next middleware
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
function decodeToken(token) {
    return jwt.decode(token);
}

     
    
    
module.exports = { generateToken, verifyToken, decodeToken };
