import jwt from "jsonwebtoken";
// generate a jwt token
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // 7 days
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, // prevent xss attacks
    sameSite: "strict", // csrf attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
