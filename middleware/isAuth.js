var jwt = require('jsonwebtoken');
const secretKey = "#$%EW$rkjdfhsgwe"

const isAdmin = (req, res, next) => {
    // const array = req.rawHeaders
    const token = req.headers.cookie
    const toeknForDecode = req.headers.cookie.split('=')[1]

    if (!token.split('=')[1]) {
        return res.status(400).send({
            status: false,
            message: "Token is Expire"
        })
    }
    jwt.verify(toeknForDecode, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is invalid.' });
        }
        req.userType = decoded.type;
        next();
    });
};

module.exports = { isAdmin }