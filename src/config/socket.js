let io;

const users = {};

const initSocket = (socketIo) => {

  io = socketIo;

  io.on("connection", (socket) => {

    console.log(
      "User connected:",
      socket.id
    );

    socket.on(
      "register",
      (userId) => {

        users[userId] = socket.id;

        console.log(
          `User ${userId} registered`
        );

      }
    );

    socket.on(
      "disconnect",
      () => {

        Object.keys(users)
          .forEach((userId) => {

            if (
              users[userId]
              === socket.id
            ) {
              delete users[userId];
            }

          });

      }
    );

  });

};

const sendTransactionNotification =
(
  userId,
  payload
) => {

  const socketId =
    users[userId];

  if (
    socketId &&
    io
  ) {
    io.to(socketId)
      .emit(
        "transaction",
        payload
      );
  }

};

module.exports = {
  initSocket,
  sendTransactionNotification
};