const prisma = require("../config/prisma");

const getInsights = async (userId) => {

  const totalSent =
    await prisma.transaction.aggregate({
      where: {
        senderId: userId,
        status: "SUCCESS"
      },
      _sum: {
        amount: true
      }
    });

  const totalReceived =
    await prisma.transaction.aggregate({
      where: {
        receiverId: userId,
        status: "SUCCESS"
      },
      _sum: {
        amount: true
      }
    });

  const transactionCount =
    await prisma.transaction.count({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }
    });

  return {
    totalSent:
      totalSent._sum.amount || 0,

    totalReceived:
      totalReceived._sum.amount || 0,

    transactionCount
  };
};

module.exports = {
  getInsights
};