const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const climaBox = document.querySelector('.clima-box')
const climaDetalhe = document.querySelector('.clima-detalhe')
const erro404 = document.querySelector('.nao-encontrado')

search.addEventListener('click', () => {
    const APIKey = '02e2411cc08ad873d5933ddbf38d8d54'
    const cidade = document.querySelector('.search-box input').value;

    if (cidade === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '400px';
            climaBox.style.display = 'none';
            climaDetalhe.style.display = 'none';
            erro404.style.display = 'block';
            erro404.classList.add('entrar');
            return;
        }

        erro404.style.display = 'none';
        erro404.classList.remove('entrar');

        const image = document.querySelector('.clima-box img');
        const temperatura = document.querySelector('.clima-box .temperatura');
        const descricao = document.querySelector(".clima-box .descricao")
        const umidade = document.querySelector('.clima-detalhe .umidade span')
        const vento = document.querySelector('.clima-detalhe .vento span')

        resposta = json.weather[0].main
        console.log(resposta);

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/sol.png'
                descricao.innerHTML = `<span>Céu limpo</span>`;
                break;

            case 'Rain':
                image.src = 'images/chuva.png'
                descricao.innerHTML = `<span>Chuva</span>`;
                break;

            case 'Snow':
                image.src = 'images/neve.png'
                descricao.innerHTML = `<span>Neve</span>`;
                break;

            case 'Clouds':
                image.src = 'images/nuvem.png'
                descricao.innerHTML = `<span>Nuvens</span>`;
                break;

            case 'Haze':
                image.src = 'images/neblina.png';
                descricao.innerHTML = `<span>Neblina</span>`;
                break;

            default:
                image.src = '';
                break;
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        umidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        climaBox.style.display = '';
        climaDetalhe.style.display = '';
        climaBox.classList.add('entrar');
        climaDetalhe.classList.add('entrar');
        container.style.height = '590px';

    })
})