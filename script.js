var currentPlayer = 1;
var giocate = 1;
var dado = document.getElementById("dado");
var numero;
var giocatore1 = document.getElementById("giocatore1");
var giocatore2 = document.getElementById("giocatore2");
var endgame = true;
var winner = document.getElementById("winner");
winner.style.display = "none";

function controllacasellevuote(player){
    
    let caselle=0;
    
    const divs1 = document.querySelectorAll('.g'+player);  // seleziona tutti i div con una classe
    divs1.forEach(div => {
        if (div.innerHTML.trim() !== "") {
            caselle++;
        } 
    });
    
    return caselle==9;
}

function contapunti(){
    
    let punti1 = 0;
    let punti2 = 0;
    
    let righe = ['r1', 'r2', 'r3'];  // Righe da controllare
    let gruppi = ['g1', 'g2'];  // Gruppi (giocatori)

    giocate = 1;
    
    righe.forEach(riga => {
        gruppi.forEach(gruppo => {
            let divs = document.querySelectorAll(`.${riga}.${gruppo}.quadrato`);
            let numeri = Array.from(divs).map(div => div.textContent);  // Ottieni i numeri nei div

            numeri = numeri.filter(numero => numero !== '');  // Rimuovi stringhe vuote

            if (numeri.length > 0) {
                let contaNumeri = {};  // Oggetto per contare le occorrenze dei numeri
                numeri.forEach(numero => {
                    contaNumeri[numero] = (contaNumeri[numero] || 0) + 1;
                });

                
                console.log(gruppo);
                
                // Trova i numeri che sono duplicati o triplicati
                let doppioni = [];
                let tris = [];
                
                for (let numero in contaNumeri) {
                    if (contaNumeri[numero] === 2) {
                        doppioni.push(numero);
                    } else if (contaNumeri[numero] === 3) {
                        tris.push(numero);
                    }
                }

                // Stampa i risultati
                if (doppioni.length > 0) {
                    if(gruppo==="g1"){
                        punti1 += doppioni.join(', ')*2;
                    }
                    if(gruppo==="g2"){
                        punti2 += doppioni.join(', ')*2;
                    }
                }

                if (tris.length > 0) {
                    if(gruppo==="g1"){
                        punti1 += tris.join(', ')*3;
                    }
                    if(gruppo==="g2"){
                        punti2 += tris.join(', ')*3;
                    }
                }

                if (doppioni.length === 0 && tris.length === 0) {
                    if(gruppo==="g1"){
                        punti1++;
                    }
                    if(gruppo==="g2"){
                        punti2++;
                    }
                }
                
            } else {
                console.log(`Nessun numero assegnato nella ${riga} per il gruppo ${gruppo}`);
                endgame = true;
            }
        });
    });
    
    console.log(punti1);
    console.log(punti2);
                
    if (punti1 > punti2) {
        winner.textContent = "giocatore1";
        winner.style.display = "block"; // Corretto
    } else {
        winner.textContent = "giocatore2";
        winner.style.display = "block"; // Corretto
    }
    
}

function finegioco(){
    
    let caselle1 = 0;
    let caselle2 = 0;
    
    const divs1 = document.querySelectorAll('.g1');  // seleziona tutti i div con una classe
    divs1.forEach(div => {
        if (div.innerHTML.trim() !== "") {
            caselle1++;
        } 
    });
    const divs2 = document.querySelectorAll('.g2');  // seleziona tutti i div con una classe
    divs2.forEach(div => {
        if (div.innerHTML.trim() !== "") {
            caselle2++;
        } 
    });
        
    if(caselle1==9&&caselle2==9){
        console.log("contapunti");
        giocate=0;
        endgame = false;
        contapunti();
    }
}


function generaNumero() {
    numero = Math.floor(Math.random() * 6) + 1; // Genera un numero da 1 a 6
    dado.textContent = numero;
    return numero;
}

function aggiorna(){
    
    if (currentPlayer==1){
        giocatore1.style.borderColor = "green";
        giocatore2.style.borderColor = "black";
    }else{
        giocatore1.style.borderColor = "black";
        giocatore2.style.borderColor = "green";
    }
    controllacasellevuote(currentPlayer);
    
}

function assegnaNumero(elemento) {
    if(endgame){
    if (elemento.classList.contains('g1') && currentPlayer==1 && elemento.textContent == ""){
        
        elemento.textContent = numero;
        currentPlayer = 2;
        const classi = elemento.classList;
        classi.forEach(classe => { 
            
            if (classe!="quadrato" && classe!="g1"){
                riga = classe.replace('r', '');
            }
        });
        
        let classes = '.r'+riga+'.g2.quadrato';
        
        document.querySelectorAll(classes).forEach(div => {
                // Ottieni il testo del div
                const testo = div.textContent; // o div.innerText
                console.log(testo); // Mostra il testo nella console

                // Esempio di controllo: se il testo contiene "2"
                if (testo.includes(numero)) {
                    div.textContent = "";
                }
            });
        
        finegioco()
        generaNumero();
        aggiorna();
    
    }else if (elemento.classList.contains('g2') && currentPlayer==2 && elemento.textContent == ""){
        elemento.textContent = numero; // Imposta il numero all'interno del quadrato cliccato
        currentPlayer = 1;
        const classi = elemento.classList;
        classi.forEach(classe => { 
            
            if (classe!="quadrato" && classe!="g2"){
                riga = classe.replace('r', '');
            }
        });
        
        let classes = '.r'+riga+'.g1.quadrato';
        
        document.querySelectorAll(classes).forEach(div => {
                // Ottieni il testo del div
                const testo = div.textContent; // o div.innerText
                console.log(testo); // Mostra il testo nella console

                // Esempio di controllo: se il testo contiene "2"
                if (testo.includes(numero)) {
                    div.textContent = "";
                }
            });
        
        finegioco()
        generaNumero();
        aggiorna();
        
    }
    }
}


generaNumero();
aggiorna()
