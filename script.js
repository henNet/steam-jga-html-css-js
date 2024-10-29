var allgames = document.querySelector(".allgames");
var insertBtn = document.querySelector("#insertBtn");
var modal = document.querySelector("dialog");

async function pegar() {
  var resposta = await fetch("http://localhost:8080/all");
  var dados = await resposta.json();

  allgames.innerHTML = "";

  for (game of dados) {
    var gameHtml = document.createElement("div");
    gameHtml.classList.add("game");
    gameHtml.id = game.id;
    gameHtml.innerHTML = `
            <img src="${game.cover}" width=150>
            <p>${game.name}
          `;

    var excluirLink = document.createElement("span");
    excluirLink.style.textAlign = "right";
    excluirLink.innerHTML = "Excluir";
    excluirLink.addEventListener("click", excluir);

    gameHtml.appendChild(excluirLink);

    allgames.appendChild(gameHtml);
  }
}

function openModal() {
  modal.style.display = "flex";
  modal.showModal();
}

async function sendDataToServer() {
  var id = Math.floor(Math.random() * 100);
  var name = document.querySelector("#gameName").value;
  var cover = document.querySelector("#gameCover").value;

  if (name == "" || cover == "") {
    alert("Campos vazios");
    return;
  }

  modal.style.display = "none";
  modal.close();

  var resposta = await fetch(
    `http://localhost:8080/insert?id=${id}&name=${name}&cover=${cover}`
  );
  var dados = await resposta.json();

  document.querySelector("#gameName").value = "";
  document.querySelector("#gameCover").value = "";

  pegar();
}

function cancelBtn() {
  modal.style.display = "none";
  modal.close();
}

async function excluir(event) {
  var id = event.target.parentElement.id;

  var resposta = await fetch(`http://localhost:8080/delete?id=${id}`);
  var dados = await resposta.json();

  console.log(dados);

  pegar();
}

pegar();
