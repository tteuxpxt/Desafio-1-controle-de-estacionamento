const controller = new VagaController();
const formulario = document.getElementById("cadastroForm");
const listaVagas = document.getElementById("listaVagas");

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const vaga = new Vaga(
      document.getElementById("placa").value.trim().toUpperCase(),
      document.getElementById("proprietario").value.trim(),
      document.getElementById("apartamento").value,
      document.getElementById("bloco").value.trim(),
      document.getElementById("modelo").value.trim(),
      document.getElementById("cor").value.trim(),
      document.getElementById("vaga").value,
    );

    controller.salvar(vaga);
    console.log(vaga);
    alert("Cadastro realizado com sucesso!");
    formulario.reset();
  });
}

function adicionarCelula(linha, valor) {
  const celula = document.createElement("td");
  celula.textContent = valor;
  linha.appendChild(celula);
}

function renderizarLista() {
  if (!listaVagas) {
    return;
  }

  listaVagas.replaceChildren();
  const vagas = controller.listar();

  if (vagas.length === 0) {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");
    celula.colSpan = 7;
    celula.className = "lista-vazia";
    celula.textContent = "Nenhuma reserva cadastrada.";
    linha.appendChild(celula);
    listaVagas.appendChild(linha);
    return;
  }

  vagas.forEach(function (vaga) {
    const linha = document.createElement("tr");
    adicionarCelula(linha, vaga.numeroVaga);
    adicionarCelula(linha, vaga.placa);
    adicionarCelula(linha, vaga.proprietario);
    adicionarCelula(linha, `${vaga.apartamento} - ${vaga.bloco}`);
    adicionarCelula(linha, vaga.modelo);
    adicionarCelula(linha, vaga.cor);

    const acao = document.createElement("td");
    const botaoRemover = document.createElement("button");
    botaoRemover.type = "button";
    botaoRemover.className = "botao-remover";
    botaoRemover.dataset.placa = vaga.placa;
    botaoRemover.textContent = "Remover";
    acao.appendChild(botaoRemover);
    linha.appendChild(acao);
    listaVagas.appendChild(linha);
  });
}

if (listaVagas) {
  listaVagas.addEventListener("click", function (event) {
    const botaoRemover = event.target.closest(".botao-remover");

    if (!botaoRemover) {
      return;
    }

    controller.remover(botaoRemover.dataset.placa);
    renderizarLista();
  });

  renderizarLista();
}
