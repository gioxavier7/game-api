'use strict'

async function pesquisarGames(jogo){
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/games?category=' + jogo)}`
    const response = await fetch(url)
    
    const data = await response.json()
    return JSON.parse(data.contents)
}

async function criarJogo(jogo){
    const galeria = document.getElementById('galeria')
    const novoJogo = document.createElement('div')
    novoJogo.classList.add('card')
    
    const imagem = document.createElement('img')
    imagem.src = jogo.thumbnail
    imagem.alt = jogo.title

    const titulo = document.createElement('h3')
    titulo.textContent = jogo.title

    const descricao = document.createElement('p')
    descricao.textContent = jogo.short_description

    novoJogo.appendChild(imagem)
    novoJogo.appendChild(titulo)
    novoJogo.appendChild(descricao)
    galeria.appendChild(novoJogo)
}

async function preencherGames(){
    const jogo = document.getElementById('jogo').value
    const games = await pesquisarGames(jogo)
    const galeria = document.getElementById('galeria')
   
    galeria.replaceChildren('');

    if (games.length === 0){
        const mensagem = document.createElement('p')
        mensagem.textContent = 'Nenhum jogo encontrado.'
        galeria.appendChild(mensagem)
        return
    }

    games.forEach(criarJogo)
}

document.getElementById('pesquisar').addEventListener('click', preencherGames)