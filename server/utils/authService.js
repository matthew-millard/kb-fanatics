import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  try {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.log("JWT Secret:", process.env.JWT_SECRET);

    throw new Error("Error generating token.");
  }
};
