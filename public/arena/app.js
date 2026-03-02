import { questions, powerUps } from './content.js';

class GameEngine {
    constructor() {
        this.teams = [
            { name: "Team A", score: 0 },
            { name: "Team B", score: 0 }
        ];
        this.currentTeamIndex = 0;
        this.gameStarted = false;
        this.cards = [];
        this.totalCards = 12; // 12 cards for a 4x3 or 3x4 grid

        this.init();
    }

    init() {
        this.shuffleContent();
        this.renderGrid();
        this.updateTeamUI();
        this.setupEventListeners();
    }

    shuffleContent() {
        // Create a mix of questions and power-ups
        const content = [];

        // Fill half with questions
        for (let i = 0; i < 8; i++) {
            content.push({ type: 'question', data: questions[i % questions.length] });
        }

        // Fill rest with power-ups
        for (let i = 0; i < 4; i++) {
            content.push({ type: 'powerup', data: powerUps[i % powerUps.length] });
        }

        // Shuffle the combined content
        this.cards = content.sort(() => Math.random() - 0.5);
    }

    renderGrid() {
        const grid = document.getElementById('card-grid');
        grid.innerHTML = '';

        this.cards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.innerHTML = `<span>${index + 1}</span>`;
            cardEl.onclick = () => this.handleCardClick(index);
            grid.appendChild(cardEl);
        });
    }

    handleCardClick(index) {
        const card = this.cards[index];
        const cardEl = document.querySelectorAll('.card')[index];

        if (cardEl.classList.contains('revealed')) return;

        cardEl.classList.add('revealed');

        if (card.type === 'question') {
            this.showQuestion(card.data);
        } else {
            this.showPowerUp(card.data);
        }
    }

    showQuestion(q) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = `
            <div class="category-tag">${q.category}</div>
            <div class="quiz-question">${q.question}</div>
            <div class="options-grid">
                ${q.options.map((opt, i) => `
                    <button class="option-btn" onclick="game.checkAnswer(${i}, ${q.answer}, '${q.explanation.replace(/'/g, "\\'")}')">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;

        modal.classList.add('active');
    }

    checkAnswer(selected, correct, explanation) {
        const isCorrect = selected === correct;
        const currentTeam = this.teams[this.currentTeamIndex];

        if (isCorrect) {
            currentTeam.score += 15; // Fixed point value for questions
            this.showFeedback(true, explanation);
        } else {
            this.showFeedback(false, explanation);
        }

        this.updateTeamUI();
    }

    showPowerUp(p) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        const currentTeam = this.teams[this.currentTeamIndex];

        // Apply effect
        let message = `You found a <strong>${p.name}</strong>! ${p.icon}`;

        switch (p.effect) {
            case 'multiply':
                currentTeam.score *= p.value;
                break;
            case 'add':
                currentTeam.score += p.value;
                break;
            case 'set':
                currentTeam.score = p.value;
                break;
            case 'steal':
                const otherTeam = this.teams[1 - this.currentTeamIndex];
                const stealAmount = Math.min(otherTeam.score, p.value);
                otherTeam.score -= stealAmount;
                currentTeam.score += stealAmount;
                message = `You stole ${stealAmount} points from the other team! 🥷`;
                break;
        }

        modalBody.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 1rem;">${p.icon}</div>
            <div class="quiz-question">${message}</div>
            <button class="primary-btn" onclick="game.nextTurn()">Continue</button>
        `;

        modal.classList.add('active');
        this.updateTeamUI();
    }

    showFeedback(isCorrect, explanation) {
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div style="font-size: 5rem; margin-bottom: 1rem;">${isCorrect ? '✅' : '❌'}</div>
            <div class="quiz-question">${isCorrect ? 'Correct!' : 'Oops, not quite!'}</div>
            <p style="margin-bottom: 2rem; color: var(--text-muted); font-size: 1.1rem;">${explanation}</p>
            <button class="primary-btn" onclick="game.nextTurn()">Next Player</button>
        `;
    }

    nextTurn() {
        document.getElementById('modal').classList.remove('active');
        this.currentTeamIndex = 1 - this.currentTeamIndex;
        this.updateTeamUI();
    }

    updateTeamUI() {
        this.teams.forEach((team, i) => {
            const teamEl = document.getElementById(`team-${i + 1}`);
            teamEl.querySelector('.team-score').textContent = team.score;
            if (i === this.currentTeamIndex) {
                teamEl.classList.add('active');
            } else {
                teamEl.classList.remove('active');
            }
        });
    }

    setupEventListeners() {
        // Expose game instance globally for inline onclick handlers (simpler for this demo)
        window.game = this;
    }
}

// Start the game
new GameEngine();
