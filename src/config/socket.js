let io;

const users = {};

const initSocket = (socketIo) => {

  io = socketIo;

  io.on(
    "connection",
    (socket) => {

      console.log(
        "User connected:",
        socket.id
      );

      socket.on(
        "register",
        (userId) => {

          users[userId] =
            socket.id;

          console.log(
            `User ${userId} registered with socket ${socket.id}`
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

                console.log(
                  `User ${userId} disconnected`
                );

              }

            });

          console.log(
            "Socket disconnected:",
            socket.id
          );

        }
      );

    }
  );

};

const sendTransactionNotification =
(
  userId,
  payload
) => {

  const socketId =
    users[userId];

  console.log(
    "Attempting notification",
    {
      userId,
      socketId,
      payload
    }
  );

  if (
    socketId &&
    io
  ) {

    io.to(socketId)
      .emit(
        "transaction",
        payload
      );

    console.log(
      `Notification sent to user ${userId}`
    );

  } else {

    console.log(
      `User ${userId} is not connected`
    );

  }

};

module.exports = {
  initSocket,
  sendTransactionNotification
};