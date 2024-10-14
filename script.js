var currentPlayer = 1;
var dado = document.getElementById("dado");
var numero;
var giocatore1 = document.getElementById("giocatore1");
var giocatore2 = document.getElementById("giocatore2");

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
    
}

function assegnaNumero(elemento) {
    
    
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
    
        generaNumero();
        aggiorna();
    }
}

generaNumero();
aggiorna()
