var inputParola = ""
var totErrori = 5
var arrayLettere = []
var punteggio = 0
var elementoPunti = document.getElementById("idPunteggio")
var arrayVocali = ["a", "e", "i", "o", "u", "à", "è", "é", "ì", "ò", "ù"]

var musicaAttiva;
var sottofondo = new Audio("./sottofondoTrovaLaParola.mp3");
sottofondo.volume = 0.2;
sottofondo.loop = true;

var error= new Audio("./error.mp3");
error.volume= 0.1;

var drinVocale= new Audio("./drinDrin.mp3")
drinVocale.volume= 0.5;

  document.addEventListener("DOMContentLoaded", startGame, { once: true });

function startGame(){

    Swal.fire({
            title: "Nuova partita",
            text: "Pronto ad iniziare?", 
            icon: "welcome",  
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
              musicaOnOff();
            }
        })
  
}


function musicaOnOff() {

    if (musicaAttiva) {
        sottofondo.pause();
        document.getElementById("toggleMusic").querySelector("img").src="volume0.png"
        musicaAttiva = false;
    } else {
        sottofondo.play();
        document.getElementById("toggleMusic").querySelector("img").src="volume10.png"
        musicaAttiva = true;
        
    }
}


const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "it-IT"; // italiano
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = function (event) {
    const parolaDetta = event.results[0][0].transcript.toLowerCase();
    soluzione(parolaDetta);
};

recognition.onerror = function (event) {
    console.error("Errore:", event.error);
};

function startMicrofono() {
    recognition.start();
}

function parla(testo) {

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(testo);
    const voices = synth.getVoices();

    const voceItaliana = voices[0]  // 0-1-11 voci italiane

    utterance.voice = voceItaliana;
    utterance.pitch = 0; // tono (0 - 2)
    utterance.rate = 1.5;  // velocità (0.1 - 10)
    utterance.volume = 1;  // volume (0 - 1)

    synth.speak(utterance);
}


function inserisciParola(fraseRandom) {
    inputParola = document.getElementById("idInputParola").value.toUpperCase().trim()
    if (fraseRandom) inputParola = fraseRandom
    if (inputParola != "" && inputParola != " ") {
        let divParolaIniziale = document.getElementById("idParolaIniziale")
        let divInserisciParola = document.getElementById("idDivContatore")
        divInserisciParola.classList.remove("nascondere")
        divParolaIniziale.classList.add("nascondere")

        costruisciParola(inputParola)
        document.getElementById("idH3").classList.remove("nascondere")
        document.getElementById("idInputSoluzione").classList.remove("nascondere")
        document.getElementById("idMic").classList.remove("nascondere")
        document.querySelector(".footerIniziale").classList.replace("footerIniziale", "footer")
    } else {
        Swal.fire({
            title: "Info!",
            text: "Inserisci una frase o una parola per iniziare il gioco",
            confirmButtonText: "OK"
        });
    }
}

function costruisciParola(parola) {
    let lunghezzaParola = parola.length
    const divParolaCreata = document.getElementById("idParolaCreata")

    for (let i = 0; i < lunghezzaParola; i++) {
        let carattere = parola[i].toUpperCase()
        let input = document.createElement("input")

        input.setAttribute("readonly", true)

        if (i == 0 || i == lunghezzaParola - 1) {
            input.value = carattere
        }

        if (carattere === "'") {
            input.classList.add("inputApostrofo")
            input.value = carattere
        }

        if (carattere === " ") {
            input.classList.add("inputSpazio")
        } else {
            input.classList.add("inputLettera")

            if (lunghezzaParola > 30) {
                input.style = "width: 8vh";
            } else {
                input.style = "width: 10vh";
            }
        }
        divParolaCreata.appendChild(input)
    }

    if (lunghezzaParola > 30) {
        divParolaCreata.style = "font-size:8vh";
    } else {
        divParolaCreata.style = "font-size: 10vh";
    }
}

function conteggioCaratteriDigitati() {
    var parola = document.getElementById("idInputParola").value
    parola = parola.replace(/[^a-zA-Zèéòùàì'\s]/g, '')
    if (parola.length > 50) {
        parola = parola.slice(0, 50)

        document.getElementById("alertLimite").classList.add("alertLimite")
    } else {
        document.getElementById("idInputParola").style = "color:black;"
        document.getElementById("alertLimite").classList.replace("alertLimite", "nascondere")
    }
    document.getElementById("idInputParola").value = parola
}

function letteraSingola() {
    var lettera = document.getElementById("idInputLettera").value
    lettera = lettera.replace(/[^a-zA-Zèéòùàì\s]/g, '')
    if (lettera.length > 1) {
        lettera = lettera.slice(0, 1)
    }
    document.getElementById("idInputLettera").value = lettera
}

function tentativoSoluzione() {
    var provaSoluzione = document.getElementById("idInputSoluzione").value
    provaSoluzione = provaSoluzione.replace(/[^a-zA-Zèéòùàì'\s]/g, '')
    document.getElementById("idInputSoluzione").value = provaSoluzione
}

function inserisciLettera() {
    let lunghezzaParola = inputParola.length
    var noErrorDoppio= false;
    let letteraInserita = document.getElementById("idInputLettera").value
    var noLettere = 0;

    const inputParolaCreata = document.getElementById("idParolaCreata").querySelectorAll("input")

    if (letteraInserita === "" || letteraInserita === " ") return;

    if (arrayVocali.includes(letteraInserita.toLowerCase())) {
        if (punteggio >= 5) {
            document.getElementById("idPunteggio").textContent = "Punteggio: " + (punteggio -= 5)
            if (arrayLettere.includes(letteraInserita)) {
                totErrori--
                error.play()
                document.getElementById("idContatoreErrori").innerText = "Tentativi rimasti: " + totErrori;
                return Swal.fire({
                    title: "Info!",
                    text: "Vocale già inserita",
                    confirmButtonText: "OK"

                });
            }
        } else {
            drinVocale.play()
            document.getElementById("idInputLettera").value = "";
            parla("Non hai punti sufficienti per comprare una vocale.")
            return Swal.fire({
                icon: "Warning",
                title: "Attenzione!",
                text: "Non hai punti sufficienti per comprare una vocale.",
                confirmButtonText: "OK"
            });

        }

    }

    if (arrayLettere.includes(letteraInserita)) {
        totErrori--
        noErrorDoppio= true;
        error.play()
        document.getElementById("idContatoreErrori").innerText = "Tentativi rimasti: " + totErrori;
        Swal.fire({
            title: "Info!",
            text: "Lettera già inserita",
            confirmButtonText: "OK"
        });
    } else {
        arrayLettere.push(letteraInserita)
    }

    for (let i = 0; i < lunghezzaParola; i++) {
        var vocaleNonAccentata = letteraInserita.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        var vocaleFraseNonAccentata = inputParola[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        if (vocaleFraseNonAccentata.toUpperCase() == vocaleNonAccentata.toUpperCase()) {
            inputParolaCreata[i].value = inputParola[i].toUpperCase()
            if (i != 0 && i != lunghezzaParola - 1) {
                punteggio++
                elementoPunti.textContent = "Punteggio: " + punteggio
            } else {
                noLettere++
            }

        } else {
            noLettere++
        }
    }
    if (noLettere === lunghezzaParola && !noErrorDoppio) {
        totErrori--
        error.play()
        document.getElementById("idContatoreErrori").innerText = "Tentativi rimasti: " + totErrori;
    }
    if (totErrori <= 0) {
        parla("Peccato, hai perso. La soluzione era: " + inputParola)
        Swal.fire({
            title: "Peccato, hai perso!",
            text: "La soluzione era: " + inputParola + ".",
            icon: "error",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })

    }
    document.getElementById("idInputLettera").value = "";

    setTimeout(() => {
        soluzioneLettere()
    }, 300);
}

function soluzione(soluzioneVocale) {

    var tentativoSoluzione = document.getElementById("idInputSoluzione").value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replaceAll(" ", "")

    if (soluzioneVocale) {
        var tentativoSoluzione = soluzioneVocale.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replaceAll(" ", "")
    }
    var parola = inputParola.replaceAll(" ", "")
    var parolaSenzaAccenti = parola.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
    if (tentativoSoluzione === parolaSenzaAccenti) {
        parla("Complimenti hai trovato la soluzione")
        Swal.fire({
            title: "Hai vinto!",
            text: "Complimenti hai trovato la soluzione.",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    } else {
        parla("Peccato, hai perso. La soluzione era: " + inputParola)
        Swal.fire({
            title: "Peccato, hai perso!",
            text: "La soluzione era: " + inputParola + ".",
            icon: "error",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    }
}

function soluzioneLettere() {
    const divParolaCreata = document.getElementById("idParolaCreata")
    var arrayInput = divParolaCreata.querySelectorAll("input")
    var counter = 0
    for (let i = 0; i < arrayInput.length; i++) {
        if (arrayInput[i].value !== "") {
            counter++
        }
    }
    if (counter == inputParola.replaceAll(" ", "").length) {
        parla("Complimenti hai trovato la soluzione")
        Swal.fire({
            title: "Hai vinto!",
            text: "Complimenti hai trovato la soluzione.",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    }
}

function btnInfoPunteggio() {
    parla("Vinci un punto per ogni consonante presente sul cartellone. Al raggiungimento di 5 punti puoi comprare una vocale")
    Swal.fire({
        title: "Info!",
        text: "Vinci un punto per ogni consonante presente sul cartellone. Al raggiungimento di 5 punti puoi comprare una vocale.",
        confirmButtonText: "OK"
    });
}


const frasi = [
"Chi va piano va sano e va lontano",
"Il mattino ha l'oro in bocca",
"Ride bene chi ride ultimo",
"Non è tutto oro quello che luccica",
"A caval donato non si guarda in bocca",
"Tra il dire e il fare c'è di mezzo il mare",
"Fidarsi è bene ma non fidarsi è meglio",
"Chi dorme non piglia pesci",
"Tanto va la gatta al lardo che ci lascia lo zampino",
"L'erba del vicino è sempre più verde",
"Lontano dagli occhi lontano dal cuore",
"Non c'è rosa senza spine",
"Ogni medaglia ha il suo rovescio",
"Chi trova un amico trova un tesoro",
"Il diavolo fa le pentole ma non i coperchi",
"Meglio soli che male accompagnati",
"Ogni terra ha le sue usanze",
"Chi semina vento raccoglie tempesta",
"Chi ben comincia è a metà dell'opera",
"Acqua passata non macina più",
"La spada ferisce solo chi la impugna",
"L'abito non fa il monaco",
"Tutto è bene quel che finisce bene",
"Il silenzio è oro",
"Non tutto ciò che è vecchio è da buttare",
"La pigrizia è la madre di tutti i vizi",
"Chi di spada ferisce di spada perisce",
"Non c'è fumo senza fuoco",
"Chi pianta vigne raccoglie vino",
"Solo il mare in tempesta fa buoni marinai",
"Chi non risica non rosica",
"La gatta frettolosa fa i gattini ciechi",
"Ogni cosa a suo tempo",
"Il tempo è galantuomo",
"Aiutati che Dio ti aiuta",
"Acqua in bocca",
"Il mare calmo permette pesca buona",
"Chi ben semina ben raccoglie",
"Chi va veloce arriva prima",
"Non sempre il fine giustifica i mezzi",
"Non si può avere la botte piena e la moglie ubriaca",
"Ogni terra ha il suo raccolto",
"Chi tardi arriva male alloggia",
"Il lavoro nobilita l'uomo",
"Che la forza sia con te",
"Io sono tuo padre",
"La pazienza è la virtù dei forti",
"Tutto è possibile se ci credi",
"Hasta la vista baby",
"Prova a prendermi",
"Il miglio verde",
"Houston abbiamo un problema",
"Non può piovere per sempre",
"La leggenda del pianista sull'oceano",
"La vita è come una scatola di cioccolatini",
"Ti farò un'offerta che non potrai rifiutare",
"Il re è nudo",
"Il nome della rosa",
"Il buono il brutto e il cattivo",
"Mi sento fortissimo",
"Il dado è tratto",
"Voglio essere il migliore",
"Chi è senza peccato scagli la prima pietra",
"Vivi e lascia vivere",
"Io non ho paura",
"Un eroe per caso",
"Il signore degli anelli",
"Harry Potter",
"James Bond",
"Il silenzio degli innocenti",
"Gli incredibili",
"I guardiani della galassia",
"The Dark Knight",
"Il grande Gatsby",
"La vita è bella",
"Il codice da Vinci",
"Schindler's list",
"Frozen",
"Il re leone",
"Toy Story",
"Matrix",
"Avengers",
"Il gladiatore",
"Tutti insieme appassionatamente",
"A Beautiful Mind",
"Gli X Man",
"Inception",
"Interstellar",
"Titanic",
"Paranormal activity",
"The Avengers",
"Chi vuol essere milionario",
"Spider Man",
"Iron Man",
"Captain America",
"Thor",
"Volare oh oh cantare oh oh oh",
"Nel blu dipinto di blu",
"Madame Bovary",
"Ti lascio una canzone",
"Io che non vivo più di un'ora senza te",
"L'ombra delle sirene",
"Sarà perché ti amo",
"Diamante lei e luce lui",
"Una storia importante",
"Ti sento vivere",
"L'isola che non c'è",
"Il ritratto di Dorian Gray",
"Se sei felice e tu lo sai batti le mani",
"Alice rincorre il bianconiglio",
"Non demordere prima o poi ci riuscirai",
"Gigi D'Alessio canta non dirgli mai",
"Andiamo a comandare",
"Che confusione sarà perché ti amo",
"Senza una donna",
"Bella senz'anima",
"Tu chiamale se vuoi emozioni",
"Sei un mito per me",
"Tu vivi nell'aria",
"Anima mia nella stanza tua",
"Un'emozione per sempre",
"Vita spericolata",
"Vivo per lei",
"Come un pittore",
"Laura non c'è",
"Maremma maiala",
"Balocchi e profumi",
"Stella stellina la notte si avvicina",
"Il mio canto libero",
"Io che amo solo te",
"Gli anni d'oro del grande Real",
"Ti amo ma non troppo",
"In bocca al lupo",
"Non c'è due senza tre né regina senza re",
"Chi tace acconsente e sembra scemo",
"L'acqua fa male e il vino fa bene",
"Vado a rifarmi il trucco",
"Chi mangia fa briciole",
"Dare buca è apprezzabile solo a golf",
"Avere le mani in pasta",
"Piange il telefono",
"Mettere il carro davanti ai buoi",
"Essere alle strette e non potersi allargare",
"Non fare di tutta l'erba un fascio",
"Farsi un nome e pure un cognome",
"Avere la testa tra le nuvole",
"Cogliere la palla al balzo",
"Stare con le mani in mano",
"Tenere il piede in due scarpe",
"A buon intenditor poche parole",
"Andare a ruota libera",
"Dare un colpo al cerchio e uno alle staffe",
"Non svegliare il can che dorme",
"Essere un libro aperto",
"Lasciare a bocca aperta",
"Tante rane dalla bocca larga",
"Mettere la testa a posto",
"Non avere peli sulla lingua",
"Il cielo è un manto di stelle",
"Essere sul filo del rasoio",
"Non vedere l'ora e neppure l'orologio",
"Farsi i fatti propri e campare cent'anni",
"Girare il dito nella piaga",
"Fare un buco nell'acqua",
"Mettere le mani avanti",
"Parlare a vanvera",
"Fare il doppio gioco",
"A tutto gas però apri le finestre",
"Avere la testa sulle spalle",
"Fare i conti senza l'oste",
"Arrivare al punto",
"Non avere voce in capitolo",
"Essere un fiume in piena",
"Dare una mano piuttosto che un piede",
"In Italia si ama mangiare la pasta",
"Non si vive di solo pane",
"Il ragno porta guadagno",
"Saremo io e te accussì sarà pe semp si",
"New York Las Vegas e Los Angeles",
"Il silenzio parla più delle parole",
"Ombre che danzano tra le luci",
"Il vento porta segreti nascosti",
"La luce filtra tra le nuvole",
"Il tempo scorre tra le dita",
"Ricordi nascosti nel cuore",
"Strada senza uscita apparente",
"Parole non dette pesano molto",
"Sogno perduto nell'orizzonte",
"La marea porta storie dimenticate",
"Passi che cambiano il mondo",
"Giorni scivolano come sabbia",
"La notte custodisce segreti",
"Il cuore cammina tra le rocce",
"Ombre che svelano verità nascoste",
"Il tempo ricama sogni invisibili",
"Il vento suona una melodia dimenticata",
"Stelle cadenti portano desideri",
"Giorno piegato dal pensiero",
"Cuore su vetri del passato",
"Silenzio più parlante delle parole",
"Ombre dell'alba accarezzano sogni",
"Luce s'infrange sul mare inquieto",
"Sogni cadono come foglie invisibili",
"Il vento coglie segreti tra le montagne",
"Parole taciute pesano sul cuore",
"Silenzio tra due sguardi non serve altro",
"La notte si stende sulla città",
"Il mare ricorda ogni passo sulla spiaggia",
"Ricordi scivolano come acqua fredda",
"Ogni ombra ha una storia",
"Vento porta profumi lontani",
"Montagne custodiscono silenzi",
"Cielo piange stelle sul confine",
"Sogni perduti danzano nella memoria",
"Il tempo è un labirinto inesplorato",
"Ogni voglia racconta un segreto",
"Ombre del passato avvolgono il presente",
"Stelle cadenti e desideri non realizzati",
"Luglio col bene che ti voglio vedrai non finirà",
"Tu che sei nata dove c'è sempre il sole",
"A novembre la città si spense in un istante",
"Tu la regina del celebrità",
"Se una regola c'è non la chiedere a me",
"Buongiorno bell'anima caffè",
"Supercalifragilistichespiralidoso"
];

// Funzione per ottenere una frase random
function fraseCasuale() {
    const index = Math.floor(Math.random() * frasi.length);
    const frase = frasi.splice(index, 1)[0];
    if (frasi.length === 0) {
        parla("Hai esaurito tutte le frasi.")
        Swal.fire({
            title: "Info!",
            text: "Hai esaurito tutte le frasi.",
            confirmButtonText: "OK"
        });
        return null; // oppure puoi resettare con: frasi = [...frasiOriginale];
    }

    inserisciParola(frase);
}
