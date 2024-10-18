var currentPlayer = 1;
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
    
    return caselle===9;

}

function contapunti(){
    
    let punti1 = 0;
    let punti2 = 0;
    
    let righe = ['r1', 'r2', 'r3'];  // Righe da controllare
    let gruppi = ['g1', 'g2'];  // Gruppi (giocatori)
    
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
                
                for (let numero in contaNumeri) {
                    if (contaNumeri[numero] === 3) {
                        if(gruppo==="g1"){
                            punti1 += parseInt(numero)*9; // Aggiungi sommasingoli ai punti con doppioni
                        }
                        if(gruppo==="g2"){
                            punti2 += parseInt(numero)*9; // Aggiungi sommasingoli ai punti con doppioni
                        }
                    }else if (contaNumeri[numero] === 2) {
                        if(gruppo==="g1"){
                            punti1 += parseInt(numero)*4; // Aggiungi sommasingoli ai punti con doppioni
                        }
                        if(gruppo==="g2"){
                            punti2 += parseInt(numero)*4; // Aggiungi sommasingoli ai punti con doppioni
                        }
                    }else{
                        if(gruppo==="g1"){
                            punti1 += parseInt(numero);
                        }
                        if(gruppo==="g2"){
                            punti2 += parseInt(numero);
                        }
                    }
                    
                    }
                
            } else {
                endgame = true;
            }
        });
    });
    
    
    if (punti1 > punti2) {
        giocatore1.style.borderColor = "yellow";
        giocatore2.style.borderColor = "black";
        winner.textContent = "giocatore1";
        winner.style.display = "block"; // Corretto
    } else {
        giocatore1.style.borderColor = "black";
        giocatore2.style.borderColor = "yellow";
        winner.textContent = "giocatore2";
        winner.style.display = "block"; // Corretto
    }           
    
}

function aggiorna(){

    numero = Math.floor(Math.random() * 6) + 1; // Genera un numero da 1 a 6
    dado.textContent = numero;
    
    // Aggiorna il bordo del giocatore corrente

    if (currentPlayer==1){
        giocatore1.style.borderColor = "green";
        giocatore2.style.borderColor = "black";
    }else{
        giocatore1.style.borderColor = "black";
        giocatore2.style.borderColor = "green";
    }

    // controlla se una delle due tabelle è piena
    if(controllacasellevuote(currentPlayer)){
        endgame = false;
        contapunti();
    }
    
    // Controlla se entrambe le tabelle sono piene
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
        endgame = false;
        contapunti();
    }
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

                // Esempio di controllo: se il testo contiene "2"
                if (testo.includes(numero)) {
                    div.textContent = "";
                }
            });
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

                // Esempio di controllo: se il testo contiene "2"
                if (testo.includes(numero)) {
                    div.textContent = "";
                }
            }); 
        aggiorna();
    }

    }
}

aggiorna();
                    
                    
