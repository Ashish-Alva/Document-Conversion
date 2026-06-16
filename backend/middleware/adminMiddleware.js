const admin = (req, res, next) => {
  console.log(`Checking admin access for user: ${req.user?.email}, role: ${req.user?.role}`);
  if (req.user && req.user.role === "admin") {
    console.log("Admin access granted");
    next();
  } else {
    console.warn("Admin access denied");
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

module.exports = admin;
