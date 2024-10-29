const { WebSocketServer } = require("ws") //importando o WebSocketServer
const dotenv = require("dotenv") // importando o dotenv

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on("connection", (ws) => { 
    ws.on("error", console.error)

    

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()))

    })
    console.log("client connected")
})