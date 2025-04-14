import Cart from "../db/models/cart.js";
import User from "../db/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tryCatch from "../utils/tryCatch.js";

const userController = {};

userController.register = tryCatch(async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    role,
    email,
    password: hashedPassword,
  });
  const newCart = await Cart.create({ userId: newUser.id }); // Create a cart for the new user
  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role /* other user info */,
    },
    token,
  });
});

userController.login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role /* other user info */,
    },
    token,
  });
});

userController.getUserProfile = tryCatch(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ["password"] }, // Don't send the password
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

userController.updateUserProfile = tryCatch(async (req, res) => {
  const { email, firstName, lastName, role } = req.body;
  const [updatedRows] = await User.update(
    { email, firstName, lastName, role },
    {
      where: { id: req.user.id },
    }
  );
  if (updatedRows > 0) {
    const updatedUser = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export default userController;
