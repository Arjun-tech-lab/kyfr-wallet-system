const http =
require("http");

const { Server } =
require("socket.io");

const app =
require("./app");

const {
  initSocket
} =
require("./config/socket");

const PORT =
process.env.PORT || 3000;

const server =
http.createServer(app);

const io =
new Server(server, {
  cors: {
    origin: "*"
  }
});

initSocket(io);

server.listen(
  PORT,
  () => {
    console.log(
      `Server running at http://localhost:${PORT}`
    );

    console.log(
      `Swagger Docs: http://localhost:${PORT}/api-docs`
    );
  }
);