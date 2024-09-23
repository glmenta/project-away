// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

//     if (!token) {
//         return res.status(401).send({ error: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
//         req.user = decoded; // Attach decoded user info (including userId) to the request object
//         next(); // Pass control to the next handler
//     } catch (error) {
//         return res.status(400).send({ error: 'Invalid token.' });
//     }
// };

// export default authMiddleware;
