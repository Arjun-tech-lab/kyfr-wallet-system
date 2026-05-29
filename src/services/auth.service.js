const bcrypt = require("bcrypt");

const ApiError = require("../utils/ApiError");

const userRepository = require("../repositories/user.repository");
const walletRepository = require("../repositories/wallet.repository");
const { generateToken } =
  require("../utils/jwt");

const register = async ({
  name,
  email,
  password
}) => {

  const existingUser =
    await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(
      409,
      "Email already exists"
    );
  }

  const passwordHash =
    await bcrypt.hash(password, 10);

  const user =
    await userRepository.createUser({
      name,
      email,
      passwordHash
    });

  await walletRepository.createWallet(
    user.id
  );

  return user;
};

module.exports = {
  register
};

const login = async ({
  email,
  password,
}) => {

  const user =
    await userRepository.findUserByEmail(
      email
    );

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isValid =
    await bcrypt.compare(
      password,
      user.passwordHash
    );

  if (!isValid) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const token =
    generateToken({
      id: user.id,
      email: user.email,
    });

  return { token };
};
module.exports = {
  register,
  login,
};