const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const { token } = req.body;
    if (!token) { 
        return res.status(400).json({error : "Please First Login"})
    }
    try {
        const payload = await JWT.verify(token, process.env.JWT_SECRET_KEY_ADMIN);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Some Thing Is Wrong!' });
    }
}