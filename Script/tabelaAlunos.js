document.addEventListener('DOMContentLoaded', function(){
    const tabelaAlunos = document.querySelector("#tabelaAlunos tbody");

    // Recupera a lista de alunos do localStorage
    let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    // Função para adicionar um aluno à tabela
    function adicionarAlunoTabela(aluno, index) {
        let linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.email}</td>
            <td>${aluno.materia}</td>
            <td>${aluno.professor}</td>
            <td><button data-id="${aluno.id}" data-index="${index}" class="btn-excluir">Excluir</button></td>
        `;
        tabelaAlunos.appendChild(linha);
    }

    // Função para atualizar a tabela após a exclusão
    function atualizarTabela() {
        tabelaAlunos.innerHTML = ""; // Limpa a tabela
        alunos = JSON.parse(localStorage.getItem("alunos")) || []; // Recupera a lista atualizada
        alunos.forEach(adicionarAlunoTabela); // Adiciona os alunos à tabela
    }

    function deletarAluno(alunosId) {
        fetch(`http://localhost:8080/alunos/${alunosId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar aluno.');
            }
            return response.text(); // Modificado para tratar a resposta como texto
        })
        .then(data => {
            console.log('Aluno deletado com sucesso:', data);
            // Atualizar a interface do usuário ou tomar outras ações conforme necessário
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }

    // Função para excluir um aluno
    function excluirAluno(index) {
        alunos.splice(index, 1); // Remove o aluno do array
        localStorage.setItem("alunos", JSON.stringify(alunos)); // Atualiza o localStorage
        atualizarTabela(); // Atualiza a tabela
    }

    // Adiciona todos os alunos à tabela
    alunos.forEach(adicionarAlunoTabela);

    // Event listener para os botões de exclusão
    tabelaAlunos.addEventListener('click', function(event){
        if(event.target.classList.contains('btn-excluir')) {
            const id = event.target.getAttribute('data-id');
            const index = event.target.getAttribute('data-index');
            excluirAluno(index);
            deletarAluno(id);
        }
    });
});
