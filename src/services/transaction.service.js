const prisma =
require("../config/prisma");

const ApiError =
require("../utils/ApiError");

const userRepository =
require("../repositories/user.repository");

const walletRepository =
require("../repositories/wallet.repository");

const transactionRepository =
require("../repositories/transaction.repository");

const {
  sendTransactionNotification
} =
require("../config/socket");

const transfer = async (
  senderId,
  receiverEmail,
  amount
) => {

  const receiver =
    await userRepository.findUserByEmail(
      receiverEmail
    );

  if (!receiver) {
    throw new ApiError(
      404,
      "Receiver not found"
    );
  }

  if (receiver.id === senderId) {
    throw new ApiError(
      400,
      "Cannot transfer to yourself"
    );
  }

  return prisma.$transaction(
    async (tx) => {

      // Atomic balance deduction
      // Prevents double spending during
      // concurrent transactions
      const updatedRows =
        await tx.$executeRaw`

          UPDATE "Wallet"

          SET balance =
            balance - ${amount}

          WHERE
            "userId" = ${senderId}
            AND balance >= ${amount}

        `;

      if (updatedRows === 0) {

        throw new ApiError(
          400,
          "Insufficient funds"
        );

      }

      // Credit receiver wallet
      await walletRepository.updateBalance(
        tx,
        receiver.id,
        "increment",
        amount
      );

      // Create transaction record
      const transaction =
        await transactionRepository
          .createTransaction(
            tx,
            {
              senderId,
              receiverId:
                receiver.id,
              amount,
              status:
                "SUCCESS"
            }
          );

      // Real-time notification
      sendTransactionNotification(
        receiver.id,
        {
          type:
            "TRANSACTION",

          amount,

          status:
            "SUCCESS"
        }
      );

      return transaction;

    }
  );

};

const getTransactions = async (
  userId
) => {

  return transactionRepository
    .getTransactionsByUserId(
      userId
    );

};

module.exports = {
  transfer,
  getTransactions
};