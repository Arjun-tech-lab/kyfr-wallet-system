const prisma = require("../config/prisma");

const createWallet = async (
  userId
) => {
  return prisma.wallet.create({
    data: {
      userId,
      balance: 0
    }
  });
};

const getWalletByUserId = async (
  userId
) => {
  return prisma.wallet.findUnique({
    where: {
      userId
    }
  });
};

const addMoney = async (
  userId,
  amount
) => {
  return prisma.wallet.update({
    where: {
      userId
    },
    data: {
      balance: {
        increment: amount
      }
    }
  });
};
const updateBalance = async (
  tx,
  userId,
  operation,
  amount
) => {

  return tx.wallet.update({
    where: {
      userId
    },
    data: {
      balance: {
        [operation]: amount
      }
    }
  });

};


module.exports = {
  createWallet,
  getWalletByUserId,
  addMoney,
  updateBalance
};