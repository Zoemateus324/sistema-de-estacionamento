(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function calcTempo(mil) {
            const min = Math.floor(mil / 600000);
            const sec = Math.floor(mil % 60000) / 1000;
            return '${min m e ${sec}s';
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        const adicionar = (Veiculo, salva) => {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${Veiculo.nome}</td>
        <td>${Veiculo.placa}</td>
        <td>${Veiculo.entrada}</td>
        <td>
        <button class=""delete" data-placa="${Veiculo.placa}">X</button>
        </td>

`;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salvar)
                salvar([...ler(), Veiculo]);
        };
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (confirm("O veiculo ${nome} permaneceu por: ${tempo}. Deseja encerrar?")) {
            }
            return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((Veiculo) => adicionar(Veiculo));
            }
            ;
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert("Os campos nomes e placa são obrigatórios");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
    });
})();
