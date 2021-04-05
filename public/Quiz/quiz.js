//-------------Const&vars

let randomQ;
let iQ;

const $startBtn = document.getElementById("startBtn");
const $nextBtn = document.getElementById("nextBtn");


const $QContainer = document.getElementById("QContainer")
let $question = document.getElementById("question");
let $answer = document.getElementById("answOpt");

// let count = 0;





//----------------Functs

function init(){

    $startBtn.classList.add("hide");
    $QContainer.classList.remove("hide", false);
    
    randomQ = questions.sort(() => Math.random() - .5)
    iQ = 0;

        getQ()
    // una hora para darte cuenta de que has declarado "set()" y no "get()"...
}




function getQ(){
    clearQ();
    setQ(randomQ[iQ]);

}

function setQ(currentQ){
    $question.innerText = currentQ.q
    // Al div "question" le imprime la clave "q" del objeto "questions". Podrías hacer appendChild, pero cero tiempo.
    currentQ.a.forEach(answer => {
        const $button = document.createElement("button")
        $button.innerText = answer.text;
        $button.classList.toggle("answBtn")
            if(answer.correct){
                // count++
                $button.dataset.correct = answer.correct
            }
        $button.addEventListener("click", nextQ);
        $answer.appendChild($button);
        // Esto mete las preguntas dentro del formulario, pero persisten las preguntas de serie.
    });
}

function clearQ (){
    $nextBtn.classList.add("hide");
    while ($answer.firstChild){
        $answer.removeChild($answer.firstChild)

    }

}


function nextQ(el){
    const selectedBtn = el.target;
    const correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from($answer.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        //array.form convierte en array para poder hacer forEach
    })
    if(randomQ.length > iQ +1){
    $nextBtn.classList.remove("hide")
    } else { 
        $startBtn.innerText = "Restart"
        $startBtn.classList.remove("hide")

    }
}

function setStatusClass (el, correct){
    clearStatusClass(el)    
    // Primero limpia los botones, si no hay clase agregada no pasaría nada pero si sí esta función lo dejaría en blanco para añadirle la clase en el siguiente "if"
    if(correct){
        el.classList.add("correct")
    } else {
        el.classList.add("wrong")

    }
}

function clearStatusClass(el){
    el.classList.add("correct")
    el.classList.add("wrong")

}










//-------------Events

$startBtn.addEventListener("click", init);
$nextBtn.addEventListener("click", () => {
    iQ++;
    getQ();

})








//------------Preguntas

let questions = [
    {
    q: "Pregunta rándom#1",
    a: [{text:"1", correct: true}, {text: "2", correct: false}, {text: "3", correct: false}, {text: "4", correct: false}]},
{
    q: "Pregunta rándom#2",
    a: [{text:"1", correct: false}, {text: "2", correct: true}, {text: "3", correct: false}, {text: "4", correct: false}]

    }
]











// document.addEventListener("DOMContentLoaded", e => {
    // si la idea del botón no vale la pena usamos esta joyita.





































