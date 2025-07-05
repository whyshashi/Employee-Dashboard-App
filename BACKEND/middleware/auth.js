const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from 'Authorization' header
  console.log(req.header('Authorization'));
  const authHeader = req.header('Authorization');

  const token = authHeader ;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach full decoded payload
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
