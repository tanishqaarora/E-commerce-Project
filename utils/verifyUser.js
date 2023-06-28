// Middleware for authorizing the admin user

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};
  
// Middleware for authorizing the seller user
const authorizeSeller = (req, res, next) => {
    if (req.user.role !== 'seller') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

// Middleware for authorizing the customer user
const authorizeUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = {
    authorizeAdmin,
    authorizeSeller,
    authorizeUser
}