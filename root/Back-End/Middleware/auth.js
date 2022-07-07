module.exports = (req, res, next) => {
  if (!req.session.username)
    return res.status(401).json({ message: "access denied", status: 401 });
  next();
};
