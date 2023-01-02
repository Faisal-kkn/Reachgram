import Jwt from 'jsonwebtoken'

export const verifyUserJWT = (req, res, next) => {
    // const token = req.headers["x-access-token"];
    const token = req.headers.accesstoken
    
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

export const verifyAdminJWT = (req, res, next) => {
    // const token = req.headers["x-access-token"];
    const token = req.headers.accesstoken
    console.log(token);
    console.log('token');

    if (!token) {
        res.json({ auth: false, message: "We need a token, please give it to us next time" });
    } else {
        Jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "you are failed to authenticate" });
            } else {
                next();
            }
        });
    }
};

// export const verifyJWT = (req, res, next) => {
//     const token = req.headers["x-access-token"];
//     // const token = req.headers.accesstoken

//     if (!token) {
//         res.json({ auth: false, message: "We need a token, please give it to us next time" });
//     } else {
//         Jwt.verify(token, process.env.USER_JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 console.log(err);
//                 res.json({ auth: false, message: "you are failed to authenticate" });
//             } else {
//                 next();
//             }
//         });
//     }
// };


// export const AdminverifyJWT = (req, res, next) => {
//     const token = req.headers["x-access-token"];
//     if (!token) {
//         res.json({ auth: false, message: "We need a token, please give it to us next time" });
//     } else {
//         Jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err, decoded) => {
//             if (err) {
//                 console.log(err);
//                 res.json({ auth: false, message: "you are failed to authenticate" });
//             } else {
//                 next();
//             }
//         });
//     }
// };