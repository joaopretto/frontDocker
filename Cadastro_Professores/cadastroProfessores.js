document.addEventListener('DOMContentLoaded', function(){
    const opcaoProfessor = document.querySelector("form");
    const meuProfessor = document.querySelector("#professores");
    const meuCpf = document.querySelector("#cpf");

    if(!opcaoProfessor || !meuProfessor || !meuCpf){
        console.error("Um ou mais elementos do formulário não foram encontrados.");
        return;
    }

    function armazenarMateria(professor){
        let professores = JSON.parse(localStorage.getItem("professores")) || [];

        professores.push(professor);

        localStorage.setItem("professores", JSON.stringify(professores));
    }

    function cadastrarProfessores(){
        return fetch("http://localhost:8080/professores", {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nome: meuProfessor.value,
                cpf: meuCpf.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.id) {
                const professor = {
                    id: data.id,
                    nome: meuProfessor.value,
                    cpf: meuCpf.value
                };
                armazenarMateria(professor);
                window.location.href = "../index.html";
            } else {
                console.error("ID da matéria não foi retornado.");
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar matéria:", error);
        });
    }

    opcaoProfessor.addEventListener('submit', function(event){
        event.preventDefault();
        cadastrarProfessores();
    });
});
