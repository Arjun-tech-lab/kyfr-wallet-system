const ApiResponse =
require("../utils/ApiResponse");

const asyncHandler =
require("../utils/asyncHandler");

const transactionService =
require("../services/transaction.service");

const transfer = asyncHandler(
  async (req, res) => {

    await transactionService.transfer(
      req.user.id,
      req.body.receiverEmail,
      req.body.amount
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Transfer successful"
      )
    );
  }
);
const getTransactions =
  asyncHandler(
    async (req, res) => {

      const transactions =
        await transactionService
          .getTransactions(
            req.user.id
          );

      return res.status(200).json(
        new ApiResponse(
          200,
          "Transactions fetched successfully",
          transactions
        )
      );

    }
  );

module.exports = {
  transfer,
  getTransactions
};