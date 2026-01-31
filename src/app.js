import express from "express";
import hbs from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/view.router.js";
import websockets from "./websockets.js";

const PORT = 8080;
const app = express();

// guardamos el app.listen (servidor) en una variable para anclarlo en socket.io más adelante
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
const io = new Server(httpServer);

// Configuración del motor de plantillas Handlebars
app.engine("handlebars", hbs.engine());
app.set("views", import.meta.dirname + "/views");
app.set("view engine", "handlebars"); // ya instalamos motor de plantillas, aquí decimos que lo utilice

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(import.meta.dirname + "/public"));

app.use("/", viewsRouter);

websockets(io);
