const prisma = require("../config/prisma");

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email
    }
  });
};
const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id }
  });
};

const createUser = async ({
  name,
  email,
  passwordHash
}) => {
  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash
    }
  });
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById
};