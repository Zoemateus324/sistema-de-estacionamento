(function () {
    var _a, _b;
    const $ = (query) => document.querySelector(query);
    function patio() {
      function ler() {
          return localStorage.patio ? JSON.parse(localStorage.patio) : [];
      }
      
      function calcTempo(mil) {
          const min = Math.floor(mil / 60000);
          const sec = Math.floor((mil % 60000) / 1000);
          return `${min}m e ${sec}s`;
      }
      
      function salvar(veiculos) {
          localStorage.setItem("patio", JSON.stringify(veiculos));
      }
      
      const adicionar = (Veiculo, salva) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${Veiculo.nome}</td>
              <td>${Veiculo.placa}</td>
              <td>${Veiculo.entrada}</td>
              <td>
                  <button class="delete" data-placa="${Veiculo.placa}">X</button>
              </td>
          `;
          row.querySelector(".delete").addEventListener("click", () => {
              remover(Veiculo.placa);
          });
          $("#patio").appendChild(row);
          if (salva) {
              const veiculosSalvos = ler();
              if (!veiculosSalvos.some(veiculo => veiculo.placa === Veiculo.placa)) {
                  salvar([...veiculosSalvos, Veiculo]);
              }
          }
      };
      
      function remover(placa) {
          const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
          const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
          if (confirm(`O veículo ${nome} permaneceu por: ${tempo}. Deseja encerrar?`)) {
              salvar(ler().filter((veiculo) => veiculo.placa !== placa));
              render();
          }
          return;
      }
      
      function render() {
          $("#patio").innerHTML = "";
          const patio = ler();
          if (patio.length) {
              patio.forEach((Veiculo) => adicionar(Veiculo));
          }
      }
      
      return { ler, adicionar, remover, salvar, render };
  }
  
  patio().render();
  
  $("#cadastrar").addEventListener("click", () => {
      const nome = $("#nome").value;
      const placa = $("#placa").value;
      if (!nome || !placa) {
          alert("Os campos nome e placa são obrigatórios");
          return;
      }
      patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
  });
})();
  