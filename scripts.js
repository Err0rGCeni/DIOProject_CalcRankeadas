const RANKS = {
    ferro: {
        name: "Ferro",
        color: "#999",
        gradient: "linear-gradient(to bottom, #000, #333, #666, #999, #bbb)"
    },
    bronze: {
        name: "Bronze",
        color: "#d4894b",
        gradient: "linear-gradient(to bottom, #000, #4a2c0e, #8f5a2c, #d4894b, #f9c08d)"
    },
    prata: {
        name: "Prata",
        color: "#e6e6e6",
        gradient: "linear-gradient(to bottom, #000, #4c4c4c, #999, #e6e6e6, #f2f2f2)"
    },
    ouro: {
        name: "Ouro",
        color: "#ffcc00",
        gradient: "linear-gradient(to bottom, #000, #4d3000, #996600, #ffcc00, #ffff66)"
    },
    diamante: {
        name: "Diamante",
        color: "#00ffff",
        gradient: "linear-gradient(to bottom, #000, #00aaaa ,#00ffff, #aaffff)"
    },
    lendario: {
        name: "Lendario",
        color: "#33c090",
        gradient: "linear-gradient(to bottom, #000, #008080, #33c090, #e0ffe0)"
    },
    imortal: {
        name: "Imortal",
        color: "#ee82ee",
        gradient: "linear-gradient(to bottom, #000, #800080, #ee82ee, #ffffff)"
    }
}

const hero = {
    wins: 0,
    loses: 0,
    balance: 0,
    rank: "Ferro"
}

const inputWins = document.getElementById('wins');
const inputLoses = document.getElementById('loses');
const winratioBar = document.getElementById('wins-bar');
const background = document.getElementById('bg')
const spanBalance = document.getElementById('span-balance')
const spanRank = document.getElementById('span-rank')

inputWins.addEventListener('input', function (event) {
    if (this.value < 0) {
        this.value = 0;
    }
    updateWL(event, 'wins');
});

inputLoses.addEventListener('input', function (event) {
    if (this.value < 0) {
        this.value = 0;
    }
    updateWL(event, 'loses');
});

function updateWinratioBar() {
    winratioBar.parentElement.classList.add("on")
    const sum = hero.wins + hero.loses
    if (sum !== 0) {
        const percentage = (hero.wins / sum) * 100
        winratioBar.style.width = `${percentage}%`
    }
}

function updateSpans(rankColor) {
    console.log(spanBalance)
    spanBalance.textContent = String(hero.wins - hero.loses)
    spanRank.textContent = hero.rank
    spanRank.style.color = rankColor;
    
    if (hero.wins > hero.loses) {
        spanBalance.style.color = "#43A047";
    } else if (hero.wins === hero.loses) {
        spanBalance.style.color = "#f0f0f0";
    } else {
        spanBalance.style.color = "#E53935";
    }
    
}

function updateGradient() {
    const balance = hero.wins - hero.loses
    let rankGradient = RANKS.ferro.gradient;

    if (balance < 10) {
        rankGradient = RANKS.ferro.gradient;
        hero.rank = RANKS.ferro.name;
    } else if (balance < 20) {
        rankGradient = RANKS.bronze.gradient;
        hero.rank = RANKS.bronze.name;
    } else if (balance < 50) {
        rankGradient = RANKS.prata.gradient;
        hero.rank = RANKS.prata.name;
    } else if (balance < 80) {
        rankGradient = RANKS.ouro.gradient;
        hero.rank = RANKS.ouro.name;
    } else if (balance < 90) {
        rankGradient = RANKS.diamante.gradient;
        hero.rank = RANKS.diamante.name;
    } else if (balance <= 100) {
        rankGradient = RANKS.lendario.gradient;
        hero.rank = RANKS.lendario.name;
    } else {
        rankGradient = RANKS.imortal.gradient;
        hero.rank = RANKS.imortal.name;
    }

    background.style.background = rankGradient;
    return RANKS[hero.rank.toLowerCase()].color;
}

function updateWL(event, attr) {
    hero[attr] = Number(event.target.value);
    updateWinratioBar();
    const newRank = updateGradient();
    updateSpans(newRank);
}
