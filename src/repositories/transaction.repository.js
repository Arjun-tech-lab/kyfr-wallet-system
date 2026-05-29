const prisma = require("../config/prisma");

const createTransaction = async (
  tx,
  data
) => {
  return tx.transaction.create({
    data
  });
};

const getTransactionsByUserId = async (
  userId
) => {
  return prisma.transaction.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      receiver: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

module.exports = {
  createTransaction,
  getTransactionsByUserId
};