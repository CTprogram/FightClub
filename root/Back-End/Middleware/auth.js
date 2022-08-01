module.exports = (req, res, next) => {
  if ( req.session && req.session.username || req.user){
    next();
  } else {
    return res.status(401).json({ message: "access denied", status: 401 });
  }
};