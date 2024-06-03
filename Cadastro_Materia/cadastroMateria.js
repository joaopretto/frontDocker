document.addEventListener('DOMContentLoaded', function(){
    const opcaoMaterias = document.querySelector("form");
    const minhaMateria = document.querySelector("#materias");

    if(!opcaoMaterias || !minhaMateria){
        console.error("Um ou mais elementos do formulário não foram encontrados.");
        return;
    }

    function armazenarMateria(materia){
        let materias = JSON.parse(localStorage.getItem("materias")) || [];

        materias.push(materia);

        localStorage.setItem("materias", JSON.stringify(materias));
    }

    function cadastrarMateria(){
        return fetch("http://localhost:8080/materias", {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                materia: minhaMateria.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.id) {
                const materia = {
                    id: data.id,
                    materia: minhaMateria.value
                };
                armazenarMateria(materia);
                window.location.href = "../index.html";
            } else {
                console.error("ID da matéria não foi retornado.");
            }
        })
        .catch(error => {
            console.error("Erro ao cadastrar matéria:", error);
        });
    }

    opcaoMaterias.addEventListener('submit', function(event){
        event.preventDefault();
        cadastrarMateria();
    });
});
