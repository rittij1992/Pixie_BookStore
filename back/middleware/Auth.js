const jwt = require('jsonwebtoken');

exports.auth = (req, res, next)=>{
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).json({message: 'Token not found'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({message: error.message});
    }
};


exports.adminOnly = (req, res, next)=>{
    const role = req.userRole;
    try {
    if(role != "admin") {
        return res.status(401).json({
            message: "permission not granted"
        })
    }
    next();
   } catch (error) {
    res.status(401).json({message: error.message});
   }
   
}

