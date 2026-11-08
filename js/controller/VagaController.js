class VagaController {
  constructor() {
    this.vagas = JSON.parse(localStorage.getItem("vagas")) || [];
  }

  salvar(vaga) {
    this.vagas.push(vaga);

    localStorage.setItem("vagas", JSON.stringify(this.vagas));
  }

  listar() {
    return this.vagas;
  }

  remover(placa) {
    this.vagas = this.vagas.filter((vaga) => vaga.placa !== placa);

    localStorage.setItem("vagas", JSON.stringify(this.vagas));
  }
}
