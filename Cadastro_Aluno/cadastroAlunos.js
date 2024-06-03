document.addEventListener('DOMContentLoaded', function(){
    const listaAlunos = document.querySelector("form");
    const meuNome = document.querySelector("#nome");
    const meuEmail = document.querySelector("#email");
    const meuCpf = document.querySelector("#cpf");
    const minhaMateria = document.querySelector("#materias");
    const meuProfessor = document.querySelector("#professores");

    if(!listaAlunos || !meuNome || !meuEmail || !meuCpf || !minhaMateria || !meuProfessor){
        console.error("Um ou mais elementos do formulário não foram encontrados.");
        return;
    }

    function armazenar(aluno){
        let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
        alunos.push(aluno);
        localStorage.setItem("alunos", JSON.stringify(alunos));
    }

    function cadastrar(){
        return fetch("http://localhost:8080/alunos", {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nome: meuNome.value,
                email: meuEmail.value,
                cpf: meuCpf.value,
                materia: minhaMateria.value,
                professor: meuProfessor.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                const aluno = {
                    id: data.id,
                    nome: meuNome.value,
                    email: meuEmail.value,
                    cpf: meuCpf.value,
                    materia: minhaMateria.value,
                    professor: meuProfessor.value
                };
                armazenar(aluno);
                limpar();
                window.location.href = "../index.html";
            } else {
                console.error("ID do aluno não foi retornado.");
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar aluno:", error);
        });
    }

    function limpar(){
        meuNome.value = "";
        meuEmail.value = "";
        meuCpf.value = "";
        minhaMateria.value = "";
        meuProfessor.value = "";
    }

    listaAlunos.addEventListener('submit', function(event){
        event.preventDefault();
        cadastrar();
    });
});
