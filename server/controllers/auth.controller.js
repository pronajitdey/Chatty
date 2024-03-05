import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { userSchema, loginSchema } from "../schema/index.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

const prisma = new PrismaClient();

// Singup controller
export const signup = async (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (result.success !== true) {
    return res.status(403).json({
      message: "Invalid form details"
    });
  }

  const isExistingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    }
  });

  if (isExistingUser !== null) {
    return res.status(403).json({
      message: "User already exists"
    });
  }

  const profileAvatar = 
    req.body.gender === "male"
      ? `https://avatar.iran.liara.run/public/boy?username=${req.body.firstname}`
      : `https://avatar.iran.liara.run/public/girl?username=${req.body.firstname}`;
  
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  generateTokenAndSetCookie(req.body.username, req.body.email, res);

  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        profilePic: profileAvatar,
      }
    });

    return res.status(200).json({
      message: `User successfully created with username ${user.username}`,
      credentials: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profile: user.profilePic
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error"
    })
  }
}

// Login controller
export const login = async (req, res) => {
  const { success } = loginSchema.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      message: "Invalid form details"
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      }
    })

    if (user === null) {
      return res.status(403).json({
        message: "User does not exist"
      });
    }

    const isCorrectPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrectPassword) {
      return res.status(403).json({
        message: "Incorrect Password"
      });
    }

    generateTokenAndSetCookie(req.body.username, req.body.email, res);

    return res.status(200).json({
      message: "Successfully logged in",
      credentials: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profile: user.profilePic
      }
    });

  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}