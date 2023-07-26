const wordPlace = document.getElementById("word");
const popupContainer = document.getElementById("popup-container");
const playBtn = document.getElementById("play-button");
const figureParts = document.querySelectorAll(".figure-part");
let missesCounter = 0;
/* 
1. na klik tastature proveri da li je to slovo kliknuto +
2. ako nije kliknuto ranije i ako to slovo postoji u reci prikazati 
na ekranu. Naravno potrebno je proci kroz svako slovo te nase random
reci odnosno niza i ako je nase slovo jednako tom elemntu niza
potrebno je izbaciti iz niza to slovo i ujedno prikazati na ekranu 

sada pitanje je da li da izbacim to slovo iz niza ili da ga ostavim tu
onda bih morao da proveravam da li je array sa nasom random recju prazan
ili da napravim novi niz koji ce sadrzati nasu rec. Da morao bih da 
obrisem iz niza jer ce se ta slova u nizu svaki put proveravati pri
svakom izvrsavanju funkcije keyHandler()

imam problem kod for eacha i splice metoda zato sto kada postoje dva
ili vise slova u reci splice ce ih izbaciti iz reci 
*/
const wordDB = ["programming", "basketball", "football", "tennis"];
const guesses = [];

let ourWord = [];
let randomWordArray;
let randomWordArrayCopy;

playBtn.addEventListener("click", function () {
    window.location = "";
});

// prikazi popup na pobedu ili gubitak
const showPopup = (finalMessage, word) => {
    popupContainer.style.display = "flex";
    document.getElementById("final-message").innerHTML = finalMessage;
    document.getElementById("final-message-reveal-word").innerHTML = word;
};

const keyHandler = (event) => {
    // sakriti notifikaciju da je slovo vec korisceno
    document.getElementById("notification-container").classList.remove("show");
    const key = event.key;
    //proveriti da li je vec pokusano to slovo
    if (guesses.indexOf(key) === -1) {
        // proveriti da li je to slovo u reci
        if (randomWordArray.indexOf(key) !== -1) {
            // prolazimo kroz svaki element niza tj. nase random reci
            randomWordArray.forEach((element, index) => {
                if (key === element) {
                    let letters = wordPlace.querySelectorAll(".letter");
                    // dodaje dato slovo na user interface
                    for (let i = 0; i < randomWordArrayCopy.length; i++) {
                        if (randomWordArrayCopy[i] === key) {
                            letters[i].innerHTML = key;
                            ourWord[i] = key;
                        }
                    }
                    console.log(
                        `Izbacujemo slovo ${randomWordArray[index]} sa indeksom ${index}`
                    );
                    // randomWordArray.splice(index, 1);
                    // ako smo pogodili svako slovo u reci
                    if (randomWordArray.join("") === ourWord.join("")) {
                        showPopup(
                            "You have won!",
                            randomWordArrayCopy.join("")
                        );
                    }
                }
            });

            // dodajemo to slovo u pokusane
            guesses.push(key);
        } else {
            // slovo nije u reci
            figureParts[missesCounter].style.display = "block";
            missesCounter++;
            if(missesCounter === 6){
                showPopup("You have lost", randomWordArray.join(""));
            }
            // dodajemo to slovo u pokusane
            guesses.push(key);
        }
    } else {
        // prikazati notifikaciju da je slovo vec korisceno
        document.getElementById("notification-container").classList.add("show");
    }
};

const makeLetterPlaces = () => {
    for (let element of randomWordArray) {
        const span = document.createElement("span");
        span.className = "letter";
        wordPlace.appendChild(span);
    }
};

const gameStart = () => {
    const randomWord = wordDB[Math.round(Math.random() * (wordDB.length - 1))];
    // pretvaramo random rec u array
    randomWordArray = randomWord.split("");
    randomWordArrayCopy = [...randomWordArray];
    console.log(randomWordArray);
    makeLetterPlaces();

    window.addEventListener("keydown", keyHandler);
};

gameStart();
