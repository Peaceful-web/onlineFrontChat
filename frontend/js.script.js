// login elements
const login = document.querySelector(".login") // importando a section login
const loginForm = login.querySelector(".login__form") // importando o formulário login__form direto da const login
const loginInput = login.querySelector(".login__input") // importando o botão input direto da const login
// chat elements 
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"] // array de cores

const user = { id: "", name: "", color: "" } // dicionário contendo as propriedades do usuário

let websocket

const createMessageSelfElement = (content) => {
    const div = document.createElement("div") // criando uma div no HTML direto do javascript

    div.classList.add("message__self") // adcionando uma class 

    div.innerHTML = content
    return div
}

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div") // criando uma div no HTML direto do javascript
    const span = document.createElement("span")

    div.classList.add("message__other")

    div.classList.add("message__self") // adcionando uma class 

    span.classList.add("message__sender")

    span.style.color = senderColor

    div.appendChild(span) // coloca o span como filho da div que está nesta função

    span.innerHTML = sender
    div.innerHTML += content
    return div
}



const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length) // Math.floor(arredonda um valor float pra baixo) Math.random vai gerar um valor aleatório de 0 a 1 e multiplicar pelo length do array colors(lenght é o número de itens contidos em um array)
    return colors[randomIndex] // a função vai retornar o item do colors correspondente ao valor do randomIndex
}

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"

    })
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data)

    const message =
        userId == user.id
            ? createMessageSelfElement(content)
            : createMessageOtherElement(content, userName, userColor)

    chatMessages.appendChild(message) // atribuindo um elemento filho à section chatMessages

    scrollScreen()
}


const handleLogin = (event) => {
    event.preventDefault() // quando envia o formulário não recarrega mais a página(preventDefault)
    user.name = loginInput.value // user.name vai receber o valor em string do loginInput
    user.id = crypto.randomUUID() // vai gerar um id aleatório e armazenar no user.id
    user.color = getRandomColor() // user.color vai receber uma cor aleatória por meio do getRandomColor()

    login.style.display = "none" // vai acessar o css do display adicionar o valor none na propriedade display
    chat.style.display = "flex" // vai acessar o css da section chat e adcionar o valor "flex" à propriedade display

    websocket = new WebSocket("wss://onlinechatfront.onrender.com")
    websocket.onmessage = processMessage

}

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }



    websocket.send(JSON.stringify(message))

    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin) // vamos passar ao formulário loginForm um evento do tipo "submit"(enviar) por meio do addEventListener, junto da função handleSubmit()

chatForm.addEventListener("submit", sendMessage)