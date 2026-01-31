// ESTE ES EL "CLIENTE" DE SOCKETS
const socket = io(); // esta función "io" nos la da socket.io automáticamente cuando incluimos su script en el cliente

// socket.on("unico-usuario", (mensaje) => {
//   console.log(mensaje);
// });

// socket.on("todos-menos-yo", (mensaje) => {
//   console.log(mensaje);
// });

// socket.on("todos", (mensaje) => {
//   console.log(mensaje);
// });

// // enviamos un mensaje al servidor
// socket.emit("respuesta", "Hola desde el cliente");

let username;
while (!username) {
  username = prompt("Ingrese su nombre de usuario:");
}

socket.emit("login", username);

socket.on("new-user", (username) => {
  alert(`${username} se ha conectado`);
});

const box = document.querySelector("#box");

socket.on("all-msgs", (messages) => {
  if (!messages.length) {
    box.innerHTML = "<p>No hay mensajes</p>";
  } else {
    const newMessagesHTML = messages.reduce((acc, msg) => {
      return (
        acc + `<p><strong>${msg.username}</strong>: ${msg.message}</br></p>`
      );
    }, "");
    box.innerHTML = newMessagesHTML;
  }
});

const inputMsg = document.querySelector("#input-msg");

inputMsg.addEventListener("keypress", (e) => {
  const message = inputMsg.value.trim();
  if (e.key === "Enter" && message) {
    e.preventDefault();
    const objectMessage = { username, message };
    socket.emit("new-message", objectMessage);
    inputMsg.value = "";
  }
});
