// Oppgave 1: Endre bakgrunnsfargen til teksten
function changeBackgroundColor() {
    // Endrer bakgrunnsfargen til rød
    document.body.style.backgroundColor = "red";
}

// Oppgave 2: Legge til tekst og endre størrelse på et p-element
function modifyParagraph() {
    let paragraph = document.getElementById("endretekst"); // Henter p-elementet med id 'endretekst'
    let endretekst = "Dette er en tekst som skal endres";   // Opprinnelig tekst 
    let nytekst = "Dette er en ny tekst";                   // Ny tekst som skal settes
    paragraph.textContent = nytekst;                        // Endrer teksten i p-elementet
    paragraph.style.fontSize = "30px";                     // Endrer skriftstørrelsen til 30px
}

// Oppgave 3: Lage en to-do liste
function addToDo() {
    let selectedWord = document.querySelector("#wordList").value; // Henter valgt ord fra wordList
    const li = document.createElement("li");                      // Oppretter et nytt li element
    li.textContent = selectedWord;                                // Setter innholdet i li til valgt ord
    document.getElementById("todoList").appendChild(li);         // Legger til li i todo-listen
}

// Oppgave 4: Lage en kalender med eventer
function addEvent(day) {
    let eventText = prompt("Legg til en hendelse:");              // Spør brukeren om å legge til en hendelse
    if (eventText) {
        let dayElement = document.getElementById(day);            // Henter elementet for dagen
        let eventDiv = document.createElement('div');             // Oppretter et <div>-element for hendelsen
        eventDiv.classList.add('event');                          // Legger til klassen 'event'
        eventDiv.textContent = eventText;                         // Setter tekstinnholdet til hendelsen
        dayElement.appendChild(eventDiv);                         // Legger hendelsen til dags-elementet
    }
}

// Venter på at dokumentet skal lastes helt inn
document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.getElementById("themeToggle"); // Henter knappen for temaveksling
    let isDarkMode = false;                                      // Starter i lyst tema

    // Endrer fargen på all tekst på siden
    function changeAllTextColor(color) {
        let allTextElements = document.querySelectorAll('*');    // Henter alle elementer på siden
        allTextElements.forEach(element => {
            element.style.color = color;                        // Endrer tekstfargen
        });
    }

    // Bytter mellom lyst og mørkt tema
    themeButton.addEventListener("click", () => {
        if (isDarkMode) {
            changeAllTextColor("black");                        // Setter tekstfargen til svart
            document.body.style.backgroundColor = "white";      // Setter bakgrunnsfargen til hvit
        } else {
            changeAllTextColor("white");                        // Setter tekstfargen til hvit
            document.body.style.backgroundColor = "black";      // Setter bakgrunnsfargen til svart
        }
        isDarkMode = !isDarkMode;                                 // Veksler mellom temaene
    });
});

const textarea = document.getElementById('textarea');           // Henter tekstområdet
const textsizeButton = document.getElementById('textsize');     // Henter knappen for tekststørrelse
const fontchangeButton = document.getElementById('fontchange'); // Henter knappen for skrifttype

const bilder = document.querySelectorAll('.images img');        // Henter alle bilder i 'images'-klassen

// Endrer bildestørrelse når musen går over
bilder.forEach(bilde => {
    bilde.addEventListener('mouseenter', () => {
        bilde.style.width = "30rem";                            // Øker bredden på bildet
    });

    bilde.addEventListener('mouseleave', () => {
        bilde.style.width = "";                                // Tilbakestiller bredden
    });
});

// Setter standardstørrelse og formatering for bildene
bilder.forEach(bilde => {
    bilde.style.width = '30rem';                                 // Setter bredde
    bilde.style.height = '20rem';                                // Setter høyde
    bilde.style.objectFit = 'cover';                             // Beskjærer bildet for å passe
});

// Endrer tekststørrelse i tekstområdet
textsizeButton.addEventListener('click', () => {
    const currentSize = window.getComputedStyle(textarea).fontSize;
    textarea.style.fontSize = currentSize === '16px' ? '24px' : '16px'; // Bytter mellom 16px og 24px
});

// Endrer skrifttype i tekstområdet
fontchangeButton.addEventListener('click', () => {
    const currentFont = window.getComputedStyle(textarea).fontFamily;
    textarea.style.fontFamily = currentFont.includes('Arial') ? 'Courier New, monospace' : 'Arial, sans-serif';
});

let draggedElement = null;                                      // Holder styr på elementet som dras

// Starter draoperasjon
function dragStart(event) {
    draggedElement = event.target;                              // Lagrer elementet som dras
    event.dataTransfer.effectAllowed = "move";                 // Angir at elementet kan flyttes
}

// Tillater at elementer slippes på dette området
function allowDrop(event) {
    event.preventDefault();
}

// Slipper elementet på det nye stedet
function drop(event) {
    event.preventDefault();
    if (draggedElement) {
        const container = document.getElementById('container'); // Henter container-elementet
        const containerRect = container.getBoundingClientRect();
        const offsetX = event.clientX - containerRect.left;
        const offsetY = event.clientY - containerRect.top;

        draggedElement.style.position = 'absolute';             // Gjør elementet flyttbart
        draggedElement.style.left = `${offsetX - (draggedElement.offsetWidth / 2)}px`;
        draggedElement.style.top = `${offsetY - (draggedElement.offsetHeight / 2)}px`;

        draggedElement = null;                                  // Tilbakestiller draelementet
    }
}

const boxes = document.querySelectorAll('.box');                // Henter alle box-elementer
boxes.forEach(box => {
    box.addEventListener('dragstart', dragStart);               // Legger til dra-funksjonalitet
});

const container = document.getElementById('container');        // Henter containeren
container.addEventListener('dragover', allowDrop);             // Tillater slippefunksjonalitet
container.addEventListener('drop', drop);                      // Legger til slippefunksjonalitet