var listaFilmes = [
  "https://upload.wikimedia.org/wikipedia/pt/thumb/1/1b/Schoolrockposter.jpg/210px-Schoolrockposter.jpg",
  "https://1.bp.blogspot.com/-ImZPRqLsluE/WFK156_6pNI/AAAAAAAAYBY/0lEhNRF5wfQdLfr6hpT57_Jt2eBrE9H5wCLcB/s1600/arrival-kartoun-desert.jpg",
  "https://www.europanet.com.br/superposter/images/vejapordentro/45724/45724.jpg",
  "https://br.web.img3.acsta.net/pictures/17/11/17/23/57/4731159.jpg",
  "https://br.web.img2.acsta.net/medias/nmedia/18/91/08/82/20128877.JPG",
  "https://upload.wikimedia.org/wikipedia/pt/d/d1/The_Dark_Knight.jpg",
  "https://upload.wikimedia.org/wikipedia/pt/b/bf/O_auto_da_compadecida.jpg",
  "https://br.web.img3.acsta.net/pictures/15/07/21/20/26/495789.jpg",
  "https://br.web.img2.acsta.net/medias/nmedia/18/90/53/94/20101506.jpg"
];

var listaNomes = [
  "Escola do Rock",
  "A Chegada",
  "Home Aranha no Aranhaverso",
  "Jogos Mortais",
  "Matrix",
  "Batman-O Cavaleiro das Trevas",
  "O Auto da Compadecida",
  "INvasores",
  "O Sexto Sentido"
];

var listaTrailers = [
  "https://www.youtube.com/watch?v=TExoc0MG4I4",
  "https://www.youtube.com/watch?v=rNciXGzYZms",
  "https://www.youtube.com/watch?v=LZBlXkDvhh4",
  "https://www.youtube.com/watch?v=t3PzUo4P21c",
  "https://www.youtube.com/watch?v=Wg7V2_OBXwQ",
  "https://youtu.be/_8Hjj7Ka7VE",
  "https://youtu.be/ewaz-WuKdo8",
  "https://youtu.be/ZmRTPmHUFr4",
  "https://youtu.be/3-ZP95NF_Wk"
];

function exibirFilmes() {
  var container = document.getElementById("listaFilmes");
  container.innerHTML = ""; // Limpa o conteúdo

  for (var i = 0; i < listaFilmes.length; i++) {
    var divFilme = document.createElement("div");
    divFilme.classList.add("filme"); // Adiciona a classe "filme" ao div

    var link = document.createElement("a");
    link.href = listaTrailers[i]; // A URL do link é o trailer do filme
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
      listaFilmes.push(novoFilme);
      listaNomes.push(nomeFilme);
      listaTrailers.push(trailerFilme);
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

exibirFilmes();
