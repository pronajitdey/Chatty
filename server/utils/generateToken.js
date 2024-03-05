import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (username, email, res) => {
  const token = jwt.sign({username, email}, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
}

export default generateTokenAndSetCookie;