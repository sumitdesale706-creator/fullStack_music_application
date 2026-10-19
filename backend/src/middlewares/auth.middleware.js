const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);

       if (decoded.role !== "artist") {
           return res.status(403).json({ message: "You dont have access to create the music" });
        }

       req.user = decoded;
       next();

    } catch(err){
       console.log(err);
       return res.status(403).json({ message : "Unauthorized"});
    }
}

async function authUser(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message : "Unautohrized"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({ message : "Unautohrized"});
    }
}

module.exports = { authArtist, authUser};
