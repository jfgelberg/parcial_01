import express from "express"
import cafesRoute from "./routes/cafes.routes.js"
import apiRoute from "./api/routes/cafes.routes.js"

const app = express()

app.use( express.static("public") )
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )

app.use("/api",apiRoute)
app.use(cafesRoute)


app.listen(3333, () => console.log("Servidor funcionando en el puerto 3333"))