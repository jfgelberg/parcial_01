import express from "express"
import cafesRoute from "./routes/cafes.routes.js"
const app = express()

app.use( express.static("public") )
app.use( express.urlencoded({ extended: true }) )
app.use(cafesRoute)


app.listen(3333, () => console.log("Servidor funcionando en el puerto 3333"))