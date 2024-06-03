document.addEventListener('DOMContentLoaded', function(){
    const opcaoProfessores = document.querySelector("#professores")

    // Recupera a lista de alunos do localStorage
    let professores = JSON.parse(localStorage.getItem("professores")) || [];

    // Função para adicionar um aluno à tabela
    function adicionarProfessorOpcao(professor) {
        let opcao = document.createElement("option");
        opcao.value = professor.nome;
        opcao.textContent = professor.nome;
        opcaoProfessores.appendChild(opcao);
    }

    // Adiciona todos os alunos à tabela
    professores.forEach(adicionarProfessorOpcao);
});