import io from "socket.io-client";

const socket = io.connect("http://localhost:8080/mynamespace", {
  extraHeaders: {
    prefix_token: "Bearer",
  },
});

console.log(socket);

socket.on("disconnect", () => {
  console.log("disconnect", socket); // undefined
});

export { socket };
