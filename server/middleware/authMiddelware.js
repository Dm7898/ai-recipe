import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(404).json("No token found! your not authorized");
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json("Invalid token");
  }
};

export const authroizedRoles = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied ,Your not authorized for this page" });
    }
    next();
  };
};
