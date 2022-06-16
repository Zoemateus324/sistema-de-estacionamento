interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date | string;
   
}





(function(){
    const $ =(query: string): HTMLInputElement | null => document.querySelector(query);
    
    function patio(){
    function ler(): Veiculo[]{
        return localStorage.patio ? JSON.parse(localStorage.patio): [];
    }


            
 function calcTempo(mil: number){
    const min = Math.floor(mil / 600000);
    const sec = Math.floor(mil % 60000) /1000;
    return '${min m e ${sec}s';
 }
    function salvar(veiculos: Veiculo[]){
        localStorage.setItem("patio", JSON.stringify(veiculos));
    }




    const adicionar = ( Veiculo: Veiculo & {cupom?: string}, salva?:boolean) =>{ 
        const row = document.createElement("tr");
    
        row.innerHTML= `
        <td>${Veiculo.nome }</td>
        <td>${Veiculo.placa }</td>
        <td>${Veiculo.entrada }</td>
        <td>
        <button class=""delete" data-placa="${Veiculo.placa}">X</button>
        </td>

`;
row.querySelector(".delete")?.addEventListener("click", () =>{
    remover(this.dataset.placa)    
})

$("#patio")?.appendChild(row);
   
if (salvar) salvar([...ler(), Veiculo]);
    
    }

    function remover(placa: string){
const {entrada, nome} = ler().find(veiculo => veiculo.placa)

        const tempo = calcTempo (new Date().getTime() - new Date (entrada).getTime());
        if (confirm("O veiculo ${nome} permaneceu por: ${tempo}. Deseja encerrar?")){
    }
    return;

        salvar(ler().filter(veiculo => veiculo.placa !== placa))
    render();
    }
    
    function render(){
        $("#patio")!.innerHTML ="";
    const patio = ler();
        if (patio.length){
            patio.forEach((Veiculo) =>  adicionar(Veiculo));                
            };
        }



    return{ler, adicionar, remover, salvar, render};
}


    patio().render();
    $("#cadastrar")?.addEventListener("click", () => {
    const nome = $("#nome")?.value;
    const placa = $("#placa")?.value;


    if(!nome || !placa){
        alert("Os campos nomes e placa são obrigatórios");
        return;
    
    }



    patio().adicionar({nome, placa, entrada: new Date ().toISOString()}, true);
});
})();