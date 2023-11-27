var listaFilmes = [];

var listaNomes = [];

var listaTrailers = [];

function carregarDadosDaApi() {
  // URL do endpoint da API
  const apiUrl = "https://rufinoflixserver-render.onrender.com/filmes";

  const baseImageUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";
  const headers = new Headers({
    accept: "application/json"
  });
  //Faz a requisição no endpoint
  return fetch(apiUrl, {
    method: "GET",
    headers: headers
  })
    .then((response) => {
      // Verifica se a requisição foi bem-sucedida (código de status 2xx)
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      // Converte a resposta para JSON
      return response.json();
    })
    .then((data) => {
      // Manipula os dados da resposta da API
      console.log("Resposta da API:", data);
      listaFilmes = data.map(
        (result) => baseImageUrl + result.poster_path
      );
      listaNomes = data.map((result) => result.title);
      listaTrailers = data.map((result) => result.urlTrailer);

    })
    .catch((error) => {
      // Manipula erros durante a requisição
      console.error("Erro na requisição:", error);
    });
}

function exibirFilmes() {
  var container = document.getElementById("listaFilmes");
  container.innerHTML = ""; // Limpa o conteúdo

  for (var i = 0; i < listaFilmes.length; i++) {
    var divFilme = document.createElement("div");
    divFilme.classList.add("filme"); // Adiciona a classe "filme" ao div

    var link = document.createElement("a");
    if(listaTrailers[i]){      
      link.href = listaTrailers[i]; // A URL do link é o trailer do filme                
      link.title = "Clique para abrir o trailer."
    } else {      
      link.title = "Este filme ainda não tem trailer dublado ou legendado."
    }
    link.target = "_blank"; // Abre o link em uma nova aba

    var img = document.createElement("img");
    img.src = listaFilmes[i];
    img.classList.add("filme"); // Adiciona a classe "filme" à tag img

    var nome = document.createElement("p");
    nome.textContent = listaNomes[i];
    nome.classList.add("nomeFilmePoster");

    var btnRemover = document.createElement("button");
    btnRemover.classList.add("btnRemover");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener(
      "click",
      criarRemoverFilmeHandler(i, listaNomes[i])
    );

    link.appendChild(img); // Adiciona a imagem ao link, não ao divFilme
    divFilme.appendChild(nome);
    divFilme.appendChild(link); // Adiciona o link ao divFilme
    divFilme.appendChild(btnRemover);
    container.appendChild(divFilme);
  }
}

function adicionarFilme() {
  var novoFilme = document.getElementById("novoFilme").value;
  var nomeFilme = document.getElementById("nomeFilme").value;
  var trailerFilme = document.getElementById("trailerFilme").value;

  // Expressão regular para verificar se a URL começa com "https://" e se termina com ".jpg" ou ".png"
  var regex = /^https:\/\/.*\.(jpg|png)$/i;

  if (novoFilme !== "" && nomeFilme !== "" && trailerFilme !== "") {
    if (regex.test(novoFilme)) {
      listaFilmes.unshift(novoFilme);
      listaNomes.unshift(nomeFilme);
      listaTrailers.unshift(trailerFilme);
      exibirFilmes();
      document.getElementById("novoFilme").value = ""; // Limpar o campo de entrada
      document.getElementById("nomeFilme").value = ""; // Limpar o campo de entrada
      document.getElementById("trailerFilme").value = ""; // Limpar o campo de entrada
    } else {
      alert("URL do Poster inválida. Formatos aceitos: .jpg e .png");
    }
  } else {
    alert("Por favor, insira o nome e as URL do Poster e do Trailer.");
  }
}

function criarRemoverFilmeHandler(index, nomeFilme) {
  return function () {
    // Exibe a janela de confirmação
    var confirma = confirm(
      'Tem certeza que deseja excluir o filme "' + nomeFilme + '" ?'
    );

    if (confirma) {
      listaFilmes.splice(index, 1);
      listaNomes.splice(index, 1);
      listaTrailers.splice(index, 1);
      alert('Filme "' + nomeFilme + '" excluído com sucesso!');
      exibirFilmes();
    } else {
      alert("Exclusão cancelada.");
    }
  };
}

// Função para exibir/ocultar a barra de carregamento
function exibirBarraDeCarregamento(exibir) {
    const loadingDiv = document.getElementById("loading");
    if (exibir) {
        loadingDiv.style.display = "flex"; // Exibe a barra de carregamento
    } else {
        loadingDiv.style.display = "none"; // Oculta a barra de carregamento
    }
}

exibirBarraDeCarregamento(true); // Exibe a barra de carregamento
carregarDadosDaApi().then(() => {
    exibirBarraDeCarregamento(false); // Esconde a barra de carregamento e mostra os filmes
    exibirFilmes();
});

