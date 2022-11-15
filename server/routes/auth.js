import Jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.json({ auth: false, message: "We need a token, please give it to us next time" });
    } else {
        Jwt.verify(token, process.env.USER_JWT_SECRET , (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "you are failed to authenticate" });
            } else {
                next();
            }
        });
    }
};
