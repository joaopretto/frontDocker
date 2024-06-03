document.addEventListener('DOMContentLoaded', function(){
    const opcaoMaterias = document.querySelector("#materias")

    // Recupera a lista de alunos do localStorage
    let materias = JSON.parse(localStorage.getItem("materias")) || [];

    // Função para adicionar um aluno à tabela
    function adicionarMateriaOpcao(materia) {
        let opcao = document.createElement("option");
        opcao.value = materia.materia;
        opcao.textContent = materia.materia;
        opcaoMaterias.appendChild(opcao);
    }

    // Adiciona todos os alunos à tabela
    materias.forEach(adicionarMateriaOpcao);
});