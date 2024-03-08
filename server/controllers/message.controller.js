import { PrismaClient } from "@prisma/client"
import { getReceiverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"

const prisma = new PrismaClient();

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { senderId } = req;
  const { receiverId } = req.params;

  try {
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantsId: {hasEvery: [senderId, receiverId]}
      }
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantsId: [senderId, receiverId]
        }
      });
    }

    const previousMessages = conversation.messagesId;

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        senderId: senderId,
        receiverId: receiverId
      }
    });

    if (newMessage) {
      const data = await prisma.conversation.update({
        where: {
          conversationId: conversation.conversationId,
        },
        data: {
          messagesId: [...previousMessages, newMessage.messageId]
        },
        include: {
          messages: true
        }
      });

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      return res.status(200).json({
        message: "Message sent",
        messages: data.messages
      })
    }
    
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
}

export const getMessages = async (req, res) => {
  const { userToChatWith } = req.params;
  const { senderId } = req;

  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        participantsId: { hasEvery: [senderId, userToChatWith]}
      },
      select: { messages: true },
    });

    if (!conversation) {
      return res.status(403).json({
        messages: [],
      })
    }

    return res.status(200).json({
      messages: conversation,
    })
    
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
}