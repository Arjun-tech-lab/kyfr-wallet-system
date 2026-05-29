const ApiResponse =
require("../utils/ApiResponse");

const walletService =
require("../services/wallet.service");

const asyncHandler =
require("../utils/asyncHandler");

const addMoney = asyncHandler(
  async (req, res) => {

    const result =
      await walletService.addMoney(
        req.user.id,
        req.body.amount
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Money added successfully",
        {
          balance:
            result.balance
        }
      )
    );
  }
);
const getBalance = asyncHandler(
  async (req, res) => {

    const wallet =
      await walletService.getBalance(
        req.user.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Balance fetched successfully",
        {
          balance: wallet.balance
        }
      )
    );
  }
);

module.exports = {
  addMoney,
  getBalance
};