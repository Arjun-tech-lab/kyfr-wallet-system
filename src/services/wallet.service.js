const walletRepository =
require("../repositories/wallet.repository");

const ApiError =
require("../utils/ApiError");

const addMoney = async (
  userId,
  amount
) => {

  const wallet =
    await walletRepository.getWalletByUserId(
      userId
    );

  if (!wallet) {
    throw new ApiError(
      404,
      "Wallet not found"
    );
  }

  return walletRepository.addMoney(
    userId,
    amount
  );
};
const getBalance = async (userId) => {

  const wallet =
    await walletRepository.getWalletByUserId(
      userId
    );

  if (!wallet) {
    throw new ApiError(
      404,
      "Wallet not found"
    );
  }

  return wallet;
};
module.exports = {
  addMoney,
  getBalance
};