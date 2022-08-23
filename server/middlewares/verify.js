import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Something went wrong, Please login again!" });
            }
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json({ message: "You are not authenticated!" })
    }
}

export const verifyAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "You are not allowed to do that!" });
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "You are not allowed to do that!" });
        }
    })
}