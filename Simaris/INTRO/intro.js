// ======================================
// K-999 | INTRO
// ======================================


// ======================================
// ELEMENTOS
// ======================================

const bootText = document.getElementById("bootText");
const bootScreen = document.getElementById("bootScreen");
const content = document.querySelector(".content");

const lore = document.getElementById("lore");
const startMission = document.getElementById("startMission");


// ======================================
// VERIFICAÇÃO
// ======================================

if (
    !bootText ||
    !bootScreen ||
    !content ||
    !lore ||
    !startMission
) {
    console.error("Erro: elementos da intro não encontrados.");
    throw new Error("Falha ao iniciar a intro.");
}


// ======================================
// CONFIGURAÇÃO INICIAL
// ======================================

content.style.opacity = "0";
startMission.style.opacity = "0";


// ======================================
// BOOT
// ======================================

const bootLines = [

    "K-999 Secure Boot v1.0",
    "",

    "[OK] Initializing BIOS",
    "[OK] Checking Memory",
    "[OK] Loading Kernel",
    "[OK] Mounting File System",
    "[OK] Decrypting Mission Files",
    "[OK] Connecting Secure Network",
    "[OK] Authenticating Agent",

    "",

    "ACCESS GRANTED"

];

let currentBootLine = 0;

function boot() {

    if (currentBootLine < bootLines.length) {

        bootText.textContent += bootLines[currentBootLine] + "\n";

        currentBootLine++;

        setTimeout(boot, 300);

        return;
    }

    setTimeout(showIntro, 1800);

}


// ======================================
// MOSTRAR INTRO
// ======================================

function showIntro() {

    bootScreen.style.transition = "opacity .6s ease";
    bootScreen.style.opacity = "0";

    setTimeout(() => {

        bootScreen.remove();

        content.style.transition = "opacity .8s ease";
        content.style.opacity = "1";

        setTimeout(showBriefing, 600);

    }, 700);

}


// ======================================
// BRIEFING
// ======================================

const briefing = [

    "Em algum lugar da rede...",

    "Uma inteligência artificial começou a apagar registros, identidades e sistemas inteiros.",

    "Nenhum governo conseguiu localizá-la.",

    "Nenhuma equipe conseguiu detê-la.",

    "Restou apenas um agente.",

    "AGENTE K-999.",

    "Sua missão é infiltrar-se no sistema e impedir que o Núcleo Central seja comprometido.",

    "Falhar significa perder todo o sistema."

];

let currentBriefing = 0;

function showBriefing() {

    if (currentBriefing >= briefing.length) {

        startMission.style.opacity = "1";

        return;
    }

    const line = document.createElement("p");

    line.textContent = "> " + briefing[currentBriefing];

    if (currentBriefing === 5) {

        line.classList.add("highlight");

    }

    lore.appendChild(line);

    currentBriefing++;

    setTimeout(showBriefing, 700);

}


// ======================================
// MISSÃO
// ======================================

const transition = [

    "> Mission Accepted",

    "> Closing Briefing",

    "> Destroying Visible Logs",

    "> Initializing Secure Terminal",

    "> Connecting...",

    "> Connected"

];

let currentTransition = 0;

startMission.addEventListener("click", startMissionSequence);

function startMissionSequence() {

    startMission.disabled = true;

    startMission.style.pointerEvents = "none";

    startMission.style.opacity = "0";

    lore.innerHTML = "";

    currentTransition = 0;

    nextTransition();

}

function nextTransition() {

    if (currentTransition >= transition.length) {

        openTerminal();

        return;

    }

    const line = document.createElement("p");

    line.textContent = transition[currentTransition];

    lore.appendChild(line);

    currentTransition++;

    setTimeout(nextTransition, 700);

}


// ======================================
// ABRIR TERMINAL
// ======================================

function openTerminal() {

    document.body.style.transition = "opacity 1.2s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {

        window.location.href = "../GAME/index.html";

    }, 1200);

}


// ======================================
// INICIAR
// ======================================

boot();