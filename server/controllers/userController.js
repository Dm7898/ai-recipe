import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const jwt_key = process.env.JWT_SECRET_KEY || "secret_key_sdfjds";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ error: "Username,Email,Password are required!" });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).json("User Already Exists");
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res.json({
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password)
    return res.status(401).json("Email,Password are required!");

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not exists please register");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json("Password is not vaild");

    const token = jwt.sign({ id: user._id, role: user.role }, jwt_key, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Login Successfully",
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("Cookies received:", req.cookies);
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token found" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET_KEY
    );

    const newAccessToken = jwt.sign({ id: decoded.id }, jwt_key, {
      expiresIn: "15m",
    });

    res.json({ token: newAccessToken });
    // Re-fetch the user to include the role
    // User.findById(decoded.id).then((user) => {
    //   if (!user) return res.status(404).json({ message: "User not found" });

    //   const newAccessToken = jwt.sign(
    //     { id: user._id, role: user.role },
    //     process.env.JWT_SECRET_KEY,
    //     { expiresIn: "15m" }
    //   );

    //   res.json({ token: newAccessToken });
    // });
  } catch (err) {
    res.status(401).json({ message: "Invalid token, please log in again" });
  }
};
