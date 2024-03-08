import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  const { senderId } = req;

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: senderId
        }
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstname: true,
        lastname: true,
        profilePic: true
      }
    })

    if (!users) {
      return res.status(403).json({
        message: "No users found"
      })
    }

    return res.status(200).json({
      message: users
    })

  } catch (err) {
    res.status(500).json({
      error: "Internal Eerver Error"
    })
  }
}