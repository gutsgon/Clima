// variáveis
const apiKey = "9c98f33f361566150f3e35fe91fbaae2" 
const bandeiraURL1 = "https://flagsapi.com/"
const bandeiraURL2 = "/flat/64.png"

const cidadeInput = document.querySelector("#cidade-input")
const buscarBotao = document.querySelector("#buscar")

const cidadeElement = document.querySelector("#cidade")
const temperaturaElement = document.querySelector("#temperatura span")
const descricaoElement = document.querySelector("#descricao")
const chuvaIconeElement = document.querySelector("#chuva-icon")
const paisElement = document.querySelector("#país")
const umidadeElement = document.querySelector("#umidade span")
const ventoElement = document.querySelector("#vento span")

const chuvaContainer = document.querySelector("#chuva-data")

// funções
const getDadosChuva = async(cidade) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`
    
    const resposta = await fetch(apiWeatherURL)
    const dado = await resposta.json()

    return dado
}

const dadosChuva = async(cidade) => {
    const dado = await getDadosChuva(cidade);

    cidadeElement.innerText = dado.name
    temperaturaElement.innerText = parseInt(dado.main.temp)
    descricaoElement.innerText = dado.weather[0].description
    chuvaIconeElement.setAttribute("src", `http://openweathermap.org/img/wn/${dado.weather[0].icon}.png`)
    paisElement.setAttribute("src", bandeiraURL1 + dado.sys.country + bandeiraURL2)
    umidadeElement.innerText = `${dado.main.humidity}%`
    ventoElement.innerText = `${dado.wind.speed}km/h`

    chuvaContainer.classList.remove("hide")
}


// eventos
buscarBotao.addEventListener("click", (e) => {
    e.preventDefault();

    const cidade = cidadeInput.value;
    dadosChuva(cidade)
})

cidadeInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const cidade = e.target.value;

        dadosChuva(cidade)
    }
})