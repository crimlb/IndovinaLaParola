# 🔤 Indovina La Parola

Un gioco web ispirato alla **Ruota della Fortuna**, interamente realizzato in **HTML, CSS e JavaScript vanilla**.
Il giocatore deve indovinare una parola o frase nascosta indovinando le lettere una alla volta, oppure tentare la soluzione completa direttamente — anche con la voce.

---
## Screen

<img width="1915" height="865" alt="infoIndovinaLaParola" src="https://github.com/user-attachments/assets/6a5da928-d7a6-46fe-99e1-516fece557cb" />
<img width="1912" height="860" alt="indovinaLaParola1" src="https://github.com/user-attachments/assets/71cf4b61-e29e-4e76-910d-3f0960d52db9" />
<img width="1918" height="867" alt="indovinaLaParola2" src="https://github.com/user-attachments/assets/1e835144-4420-4311-b851-01bd8bd07fc8" />
<img width="1918" height="863" alt="indovinaLaParola3" src="https://github.com/user-attachments/assets/8629b299-eb99-443e-b9c8-a15183aafd87" />
<img width="1915" height="858" alt="indovinaLaParola4" src="https://github.com/user-attachments/assets/5ae7f409-75ae-4c29-8053-d53f9332f230" />
---

## 🎮 Come si gioca

1. **Inserisci una parola o frase** da far indovinare, oppure premi **"Frase Casuale"** per utilizzarne una dalla lista integrata.
2. Il tabellone mostra i segnaposto delle lettere; la prima e l'ultima lettera sono rivelate automaticamente.
3. **Indovina le consonanti** lettera per lettera: ogni consonante presente nella parola vale **1 punto**.
4. Quando hai almeno **5 punti**, puoi **comprare una vocale** (costa 5 punti).
5. Puoi tentare la **soluzione completa** in qualsiasi momento, digitandola nell'apposito campo o usando il **microfono** 🎙️.
6. Hai a disposizione **5 tentativi errati** prima di perdere.

---

## ✨ Funzionalità

| Funzionalità | Descrizione |
|---|---|
| 🎲 Frase casuale | Oltre 150 frasi precaricate: proverbi, film, canzoni e modi di dire italiani |
| 🏆 Sistema a punteggio | Consonanti corrette = punti; i punti si usano per comprare le vocali |
| 🎙️ Riconoscimento vocale | Tenta la soluzione parlando, grazie alla Web Speech API |
| 🔊 Text-to-Speech | Il gioco parla con te: annuncia vittorie, sconfitte e messaggi di sistema |
| 🎵 Musica di sottofondo | Colonna sonora con controllo volume on/off |
| ⚠️ Validazione input | Accetta solo lettere (incluse lettere accentate italiane); limite di 50 caratteri |
| 🔔 Alert animati | Notifiche con [SweetAlert2](https://sweetalert2.github.io/) |

---

## 🛠️ Tecnologie utilizzate

- **HTML5** — struttura e form
- **CSS3** — layout, gradienti, componenti visivi
- **JavaScript (ES6+)** — logica di gioco, DOM manipulation, Web APIs
- **Web Speech API** — riconoscimento vocale (`SpeechRecognition`) e sintesi vocale (`SpeechSynthesis`)
- **SweetAlert2** — dialoghi e notifiche
- **Audio API** — musica di sottofondo, suoni di errore e conferma

---

## 📁 Struttura del progetto

```
IndovinaLaParola/
├── indovinaLaParola.html     # Struttura della pagina
├── indovinaLaParola.css      # Stili e layout
├── indovinaLaParola.js       # Logica di gioco completa
├── microfono.svg             # Icona microfono
├── volume0.png               # Icona volume spento
├── volume10.png              # Icona volume attivo
├── sottofondoTrovaLaParola.mp3  # Musica di sottofondo
├── drinDrin.mp3              # Suono acquisto vocale
└── error.mp3                 # Suono errore
```

---

## 🚀 Come avviarlo

Non è richiesta alcuna installazione. Il progetto è **100% client-side**.

1. Clona la repository:
   ```bash
   git clone https://github.com/crimlb/IndovinaLaParola.git
   ```
2. Apri `indovinaLaParola.html` in un browser moderno (Chrome o Edge consigliati per il pieno supporto alla Web Speech API).

> ⚠️ Il riconoscimento vocale richiede una connessione HTTPS o localhost. Su `file://` potrebbe non funzionare in tutti i browser.

---

## 🌐 Compatibilità

| Browser | Gioco base | Voce (input/output) |
|---|---|---|
| Chrome / Edge | ✅ | ✅ |
| Firefox | ✅ | ⚠️ Parziale |
| Safari | ✅ | ⚠️ Parziale |

---

## 📝 Note tecniche

- Le vocali vengono normalizzate (rimozione accenti) per il confronto, così `è`, `é` e `e` sono equivalenti durante il gioco.
- La lista frasi casuali viene consumata senza ripetizioni fino all'esaurimento completo.
- Il testo-in-voce usa la prima voce italiana disponibile nel browser tramite `SpeechSynthesis`.
