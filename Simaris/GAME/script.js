// ===========================
// ELEMENTOS
// ===========================

const agentId = document.getElementById("agentId");
const encryptionKey = document.getElementById("encryptionKey");

const attempts = document.getElementById("attempts");

const missionStatus = document.getElementById("missionStatus");

const missionNumber = document.getElementById("missionNumber");

const commanderText = document.getElementById("commanderText");

const message = document.getElementById("message");

const guess = document.getElementById("guess");

const typedText = document.getElementById("typedText");

const btnGuess = document.getElementById("btnGuess");

const restart = document.getElementById("restart");

const terminalInput = document.querySelector(".terminal-input");


// ===========================
// VARIÁVEIS
// ===========================

let secretAgentId;
let encryptionKeyValue;
let authenticationCode;

let remainingAttempts = 10;

let gameOver = false;


// ===========================
// TERMINAL
// ===========================

function updateTerminal() {

    // aceita somente números
    guess.value = guess.value.replace(/\D/g, "");

    // atualiza o texto visível
    typedText.textContent = guess.value;

}

// clicar em qualquer lugar do terminal
terminalInput.addEventListener("click", () => {

    guess.focus();

});

// sempre atualizar o terminal
guess.addEventListener("input", updateTerminal);


// ===========================
// INICIAR MISSÃO
// ===========================

function startMission() {

    secretAgentId = Math.floor(Math.random() * 100) + 1;

    encryptionKeyValue = Math.floor(Math.random() * 100) + 1;

    authenticationCode = secretAgentId + encryptionKeyValue;

    remainingAttempts = 10;

    gameOver = false;

    agentId.textContent = secretAgentId;

    encryptionKey.textContent = encryptionKeyValue;

    attempts.textContent = remainingAttempts;

    missionStatus.textContent = "ATIVA";

    missionNumber.textContent = "#01";

    message.textContent = "Missão iniciada...";

    commanderText.textContent =
        "Transmissão interceptada. Some o ID do agente com a chave de criptografia para gerar o código de autenticação.";

    guess.value = "";

    typedText.textContent = "";

    guess.focus();

}


// ===========================
// VERIFICAR RESPOSTA
// ===========================

function checkAnswer() {

    if (gameOver) return;

    const playerAnswer = Number(guess.value);

    if (guess.value === "") {

        message.textContent = "Digite um código válido.";

        guess.focus();

        return;

    }

    if (playerAnswer === authenticationCode) {

        gameOver = true;

        missionStatus.textContent = "CONCLUÍDA";

        message.textContent = "Código aceito.";

        commanderText.textContent =
            "Excelente trabalho, Hck-07. Canal seguro estabelecido.";

        guess.value = "";

        typedText.textContent = "";

        return;

    }

    remainingAttempts--;

    attempts.textContent = remainingAttempts;

    if (remainingAttempts > 0) {

        message.textContent =
            `Código incorreto. Tentativas restantes: ${remainingAttempts}.`;

        commanderText.textContent =
            "Resposta incorreta. Analise novamente os dados interceptados.";

        guess.value = "";

        typedText.textContent = "";

        guess.focus();

    } else {

        gameOver = true;

        missionStatus.textContent = "FALHA";

        message.textContent =
            `Missão encerrada. O código correto era ${authenticationCode}.`;

        commanderText.textContent =
            "Operação comprometida. A transmissão foi perdida.";

    }

}


// ===========================
// EVENTOS
// ===========================

btnGuess.addEventListener("click", checkAnswer);

restart.addEventListener("click", startMission);

guess.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        checkAnswer();

    }

});


// ===========================
// INICIAR JOGO
// ===========================

startMission();