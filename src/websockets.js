export default (io) => {
  // ESTE ES EL "SERVIDOR" DE SOCKETS
  // Ahora sí usamos socket.io. Primero tenemos que inicializarlo
  // "on" lo más probable es que haga alusión a que es un evento, esperando para activarse
  // connection será nuestro evento principal
  const messages = [];
  io.on("connection", (socket) => {
    // cada usuario tiene un ID único de conexión, lo podemos ver en la consola del navegador
    console.log("Usuario conectado con ID: " + socket.id);

    // // metodos
    // socket.emit("unico-usuario", "esto se te envia solo a ti"); // para emitir mensajes al socket que está conectado (cliente)
    // socket.broadcast.emit(
    //   "todos-menos-yo",
    //   "esto se envio a todos excepto al socket main",
    // ); // para emitir mensajes a todos los clientes menos al que envía el mensaje
    // io.emit("todos", "este mensaje se muestra para todos"); // para emitir mensajes a todos los clientes conectados

    // // escuchamos el evento "mensaje" que nos envía el cliente
    // socket.on("respuesta", (data) => {
    //   console.log(data);
    // });

    socket.on("login", (username) => {
      socket.broadcast.emit("new-user", username);
    });

    socket.emit("all-msgs", messages);

    socket.on("new-message", (msg) => {
      messages.unshift(msg); // para que quede al inicio
      io.emit("all-msgs", messages); // enviamos a todos los clientes el array actualizado
    });
  });
};
