
function criarLinha(nome) {
  
  let linha = $('<tr>')
  linha.addClass('linha-tabela')
  let tdTipo = $('<td>')
  let tdNome = $('<td>')
  let tdEpisodio = $('<td>')
  let tdLancamento = $('<td>')
  let tdUrl = $('<td>')
  let tdDescricao = $('<td>')
  let tdRanking = $("<td>")
  let tdNota = $('<td>')
  let imagem = $('<img>')
  imagem.addClass('imagem-tabela')
  let link = $('<a>')
  link.addClass('li')
  
  $(tdTipo).html(nome.type)
  $(tdNome).html(nome.title)
  $(tdEpisodio).html(nome.episodes)
  $(tdLancamento).html(nome.year)
  $(imagem).attr('src', nome.images.jpg.image_url)
  $(link).html('Descrição do Anime')
  $(tdRanking).html(nome.rank)
  $(tdNota).html(nome.score)


  $(linha).append(tdNome)
  $(linha).append(tdTipo)
  $(linha).append(link)
  $(linha).append(tdRanking)
  $(linha).append(tdNota)
  $(linha).append(tdEpisodio)
  $(linha).append(tdLancamento)
  $(linha).append(imagem)

  return linha

}

function esconderBotoes() {
  $('#btn1').hide()
  $('#btn2').hide()
}

function mostrarBotoes() {
  $('#btn1').show()
  $('#btn2').show()
}

function mostrarDescricao(nome){
  $('.li').click(() => {
    window.open(nome.url)
  
  })
}

function consomeApi(parametro, input) {
  $('.linha-tabela').remove()
  let url = 'https://api.jikan.moe/v4/anime'+ parametro + input
  return url

}

let count = 1

$(document).ready(() => {
    $('#btn1').click(() => {
      count++
      let input = $('#nomeInput').val()
      $('#span').html(count)
      var url = consomeApi('?q='+input+'&limit=10'+'&page='+count , '');
      fetch(url)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
    
          data.data.forEach(function (nome, indice) {
            let linha = criarLinha(nome)
            let tabela = document.getElementById('tabela')
            $(tabela).append(linha)
            mostrarDescricao(nome)
          
          })
        })
    })

    $('#btn2').click(() => {
      count--
      let input = $('#nomeInput').val()
      count == 0 ? count = 1 : count = count --
       $('#span').html(count)
       var url = consomeApi('?q='+input+'&limit=10'+'&page='+count , '');
      fetch(url)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
    
          data.data.forEach(function (nome, indice) {
            let linha = criarLinha(nome)
            let tabela = document.getElementById('tabela')
            $(tabela).append(linha)
            mostrarDescricao(nome)
            })
          })
     })
})

    $(document).ready(() => {
    esconderBotoes()
    $("#btnBusca").click(() => {
      count = 1
      let url
      $('#span').html(count)
      let input = $('#nomeInput').val() 
      let selectType = $('#select').val() 
      let selectLimit = $('#selectLimit').val() 

      if (selectType != 'Selecione o tipo do anime' && selectLimit != 'Ordenar'  ) {
        alert('Selecione apenas um valor para fazer o filtro')
        return null
      }

      if(selectType != 'Selecione o tipo do anime'){
          url = consomeApi('?q=', input+'&type='+selectType)
        esconderBotoes()
      
      }else if(selectLimit != 'Ordenar') {
        url = consomeApi('?q=',input+'&order_by='+selectLimit)
        esconderBotoes()
      }
      else {
          url = consomeApi('?q=', input+'&limit=10')
        mostrarBotoes()
      }

      fetch(url)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {

          data.data.forEach(function (nome, indice) {
            let linha = criarLinha(nome)
            let tabela = document.getElementById('tabela')
            $(tabela).append(linha)
            mostrarDescricao(nome)
          })
        })
      })
    })
