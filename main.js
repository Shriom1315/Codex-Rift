/* =====================================================
   CODEX HUNT — Main Application
   ===================================================== */

import { gameData } from './data.js';
import { Router } from './router.js';
import { createHeroShader } from './hero-shader.js';
import { dbAdmin } from './firebase.js';

// --- App State ---
const state = {
  currentTeam: null,
  round1: { currentRiddle: 0, solved: [], answers: {} },
  round2: { currentLocation: 0, solved: [], codes: {} },
  round3: { currentClue: 0, solved: [], codes: {} },
  superpowers: { round1: false, round2: false },
  timer: null,
  timerValue: 0,
  adminLoggedIn: false,
};

// --- Initialize ---
window.addEventListener('DOMContentLoaded', () => {
  createHeroShader('page-shader-canvas');

  const router = new Router({
    '/': () => renderHome(),
    '/about': () => renderAbout(),
    '/rules': () => renderRules(),
    '/login': () => renderLogin(),
    '/round1': () => renderRound1(),
    '/round2': () => renderRound2(),
    '/round3': () => renderRound3(),
    '/leaderboard': () => renderLeaderboard(),
    '/victory': () => renderVictory(),
    '/admin': () => renderAdmin(),
  });

  window.router = router;
  window.state = state;
  window.gameData = gameData;

  router.init();
});

// --- Navigation ---
function renderNav(activePage = '') {
  return `
    <nav class="ancient-nav">
      <a class="nav-brand" onclick="router.navigate('/')">
        <img src="/images/chakra-wheel.png" alt="Codex Hunt Chakra" />
        <span class="nav-brand-text">Codex Rift</span>
      </a>
      <div class="nav-links">
        <a class="nav-link ${activePage === 'home' ? 'active' : ''}" onclick="router.navigate('/')">
          <span class="nav-icon">⟡</span>
          <span class="nav-text">Home</span>
        </a>
        <a class="nav-link ${activePage === 'about' ? 'active' : ''}" onclick="router.navigate('/about')">
          <span class="nav-icon">✧</span>
          <span class="nav-text">Quest</span>
        </a>
        <a class="nav-link ${activePage === 'login' ? 'active' : ''}" onclick="router.navigate('/login')">
          <span class="nav-icon">✦</span>
          <span class="nav-text">Sabha</span>
        </a>
        <a class="nav-link ${activePage === 'rules' ? 'active' : ''}" onclick="router.navigate('/rules')">
          <span class="nav-icon">◈</span>
          <span class="nav-text">Rules</span>
        </a>
        <a class="nav-link ${activePage === 'leaderboard' ? 'active' : ''}" onclick="router.navigate('/leaderboard')">
          <span class="nav-icon">☸</span>
          <span class="nav-text">Warriors</span>
        </a>
      </div>
    </nav>
    <div class="sanskrit-ticker">
      <div class="ticker-content">
        ${gameData.tickerShlokas.map(s => `<span>${s}</span>`).join('')}
        ${gameData.tickerShlokas.map(s => `<span>${s}</span>`).join('')}
      </div>
    </div>
  `;
}

// --- Footer ---
function renderFooter() {
  return `
    <footer class="ancient-footer">
      <p class="footer-sanskrit">॥ यत्र धर्मस्तत्र जयः ॥</p>
      <p class="footer-text">Codex Rift • The Mahabharata Treasure Hunt • ${new Date().getFullYear()}</p>
    </footer>
  `;
}

// --- Divider ---
function renderDivider(symbol = '☸') {
  return `
    <div class="divider">
      <div class="divider-line"></div>
      <span class="divider-symbol">${symbol}</span>
      <div class="divider-line"></div>
    </div>
  `;
}

// =====================================================
// HOME PAGE
// =====================================================
function renderHome() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav('home')}
    <div class="page">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Codex Rift</h1>
          <p class="hero-sanskrit">धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः</p>
          <p class="hero-translation">"In the field of Dharma, in the field of Kuru, assembled and desiring to fight..."</p>
          <p class="hero-subtitle">The Mahabharata Digital Treasure Hunt</p>
          <button class="btn btn-primary" onclick="router.navigate('/login')">
            ⟡ Enter The Sabha ⟡
          </button>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

// =====================================================
// ABOUT PAGE (THE QUEST)
// =====================================================
function renderAbout() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav('about')}
    <div class="page">
      <section class="section">
        <p class="section-sanskrit">गीता सुगीता कर्तव्या किमन्यैः शास्त्रविस्तरैः</p>
        <h2 class="section-title">The Sacred Quest</h2>
        <p class="section-subtitle">Follow the path of the Pandavas through three divine trials. Decode ancient shlokas, solve mystical riddles, and prove yourself worthy of the Codex.</p>

        <!-- Rounds -->
        <div class="rounds-grid">
          <!-- Round 1 -->
          <div class="round-card">
            <div class="round-header">
              <div class="round-number">Round I</div>
              <h3 class="round-name">The Signal</h3>
              <p class="round-sanskrit">संकेतः</p>
            </div>
            <div class="round-body">
              <p class="round-description">
                Like Dronacharya's test of the wooden bird, only the focused shall see the answer. 
                Solve the aptitude riddles guided by sacred shlokas. The first to decode the laptop's mystery earns a divine superpower.
              </p>
              <ul class="round-features">
                <li>5 riddles guided by Bhagavad Gita shlokas</li>
                <li>Each answer unlocks a letter of the secret code</li>
                <li>Decode the laptop screen to win the superpower</li>
                <li>Remaining teams qualify by riddles solved</li>
              </ul>
              <div class="round-superpower">
                <div class="superpower-label">⟡ Superpower ⟡</div>
                <div class="superpower-name">Chakra of Sudarshana</div>
              </div>
            </div>
          </div>

          <!-- Round 2 -->
          <div class="round-card">
            <div class="round-header">
              <div class="round-number">Round II</div>
              <h3 class="round-name">The Hunt</h3>
              <p class="round-sanskrit">अन्वेषणम्</p>
            </div>
            <div class="round-body">
              <p class="round-description">
                Like the Pandavas' exile in the forest, navigate through the terrain. Follow the riddles on your Sabha portal — each leads to a sacred location where divine codes await.
              </p>
              <ul class="round-features">
                <li>3 location-based riddles on one floor</li>
                <li>Each location holds a sacred code</li>
                <li>Find all 3 codes to qualify for the final round</li>
                <li>First team to finish earns the superpower</li>
              </ul>
              <div class="round-superpower">
                <div class="superpower-label">⟡ Superpower ⟡</div>
                <div class="superpower-name">Gandiva's Arrow</div>
              </div>
            </div>
          </div>

          <!-- Round 3 -->
          <div class="round-card">
            <div class="round-header">
              <div class="round-number">Round III</div>
              <h3 class="round-name">The Codex</h3>
              <p class="round-sanskrit">कोडेक्सः</p>
            </div>
            <div class="round-body">
              <p class="round-description">
                The final battle of Kurukshetra! Like Arjuna on his chariot with Krishna, traverse the entire campus. 
                Follow the shlokas, solve the riddles, and be the first to unlock the ancient Codex.
              </p>
              <ul class="round-features">
                <li>5 campus-wide clues with Sanskrit shlokas</li>
                <li>Each clue leads to the next sacred location</li>
                <li>Solve all clues to reach the final Codex</li>
                <li>The team who unlocks the Codex wins the hunt</li>
              </ul>
              <div class="round-superpower">
                <div class="superpower-label">⟡ Victory Prize ⟡</div>
                <div class="superpower-name">The Ancient Codex</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

// =====================================================
// RULES PAGE (LAWS OF THE SABHA)
// =====================================================
function renderRules() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav('rules')}
    <div class="page">
      <section class="section">
        <p class="section-sanskrit">नियमाः सर्वेषां समानाः</p>
        <h2 class="section-title">Laws of the Sabha</h2>
        <p class="section-subtitle">As Krishna laid down Dharma for the Pandavas, so shall these rules govern your quest.</p>

        <div class="rounds-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
          <div class="ancient-card">
            <h3 style="font-family: var(--font-display); color: var(--gold); margin-bottom: var(--space-md); font-size: 1.2rem;">☸ Team Rules</h3>
            <ul class="round-features">
              <li>Teams of 3-4 warriors each</li>
              <li>One login per team — guard it wisely</li>
              <li>No sharing answers between teams</li>
              <li>Stay within the campus boundaries</li>
            </ul>
          </div>
          <div class="ancient-card">
            <h3 style="font-family: var(--font-display); color: var(--gold); margin-bottom: var(--space-md); font-size: 1.2rem;">⟡ Superpowers</h3>
            <ul class="round-features">
              <li>Earned by winning each round</li>
              <li>Can be used in the next round only</li>
              <li>Sudarshana Chakra — skip one riddle</li>
              <li>Gandiva's Arrow — get a direct hint</li>
            </ul>
          </div>
          <div class="ancient-card">
            <h3 style="font-family: var(--font-display); color: var(--gold); margin-bottom: var(--space-md); font-size: 1.2rem;">◈ Fair Play</h3>
            <ul class="round-features">
              <li>No mobile phones during Round 1</li>
              <li>No external help or internet searches</li>
              <li>Respect the ancient codes — no cheating</li>
              <li>Organizer's decision is final</li>
            </ul>
          </div>
        </div>
      </section>

      ${renderFooter()}
    </div>
  `;
}

// =====================================================
// LOGIN PAGE
// =====================================================
function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav('login')}
    <div class="page login-page">
      <div class="login-container">
        <div class="login-card">
          <img src="/images/chakra-wheel.png" alt="Chakra" class="login-chakra" />
          <h2 class="login-title">Enter the Sabha</h2>
          <p class="login-sanskrit">सभा प्रवेशः</p>

          <form id="login-form" onsubmit="handleLogin(event)">
            <div class="form-group">
              <label class="form-label" for="team-name">Team Name</label>
              <input class="form-input" type="text" id="team-name" placeholder="Enter your team name..." required />
            </div>
            <div class="form-group">
              <label class="form-label" for="team-code">Secret Code</label>
              <input class="form-input" type="password" id="team-code" placeholder="Enter the sacred code..." required />
            </div>
            <button class="btn btn-primary login-btn" type="submit">
              ⟡ Enter the Sabha ⟡
            </button>
          </form>

          <p class="login-ornament">॥ श्री कृष्णाय नमः ॥</p>
        </div>
      </div>
    </div>
  `;
}

window.handleLogin = async function (e) {
  e.preventDefault();
  const teamName = document.getElementById('team-name').value.trim();
  const teamCode = document.getElementById('team-code').value.trim();

  const btn = document.querySelector('.login-btn');
  const orgText = btn.innerHTML;
  btn.innerText = 'Consulting Codex...';

  // Attempt Firebase login
  const team = await dbAdmin.loginTeam(teamName, teamCode);

  if (team) {
    if (team.status === 'disqualified') {
      alert("Your team has been disqualified from the Sabha.");
      btn.innerHTML = orgText;
      return;
    }

    const game = await dbAdmin.getGameStatus();

    if (game && game.isActive) {
      state.currentTeam = team;
      const round = game.currentRound || 1;

      if (round === 1) router.navigate('/round1');
      else if (round === 2) router.navigate('/round2');
      else if (round === 3) router.navigate('/round3');
      else router.navigate('/victory');
    } else {
      alert("The sacred game is offline or has not commenced.");
      btn.innerHTML = orgText;
    }
  } else {
    const input = document.getElementById('team-code');
    input.classList.add('wrong');
    input.value = '';
    input.placeholder = 'Invalid credentials...';
    btn.innerHTML = orgText;

    setTimeout(() => {
      input.classList.remove('wrong');
      input.placeholder = 'Enter the sacred code...';
    }, 1500);
  }
};

// =====================================================
// ROUND 1: THE SIGNAL
// =====================================================
function renderRound1() {
  const riddles = gameData.round1Riddles;
  const current = state.round1.currentRiddle;
  const riddle = riddles[current];

  if (!riddle) {
    // All riddles solved — show completion
    renderRound1Complete();
    return;
  }

  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page signal-page">
      <div class="signal-container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">प्रथम चक्र — संकेतः</p>
          <h2 class="section-title">Round I: The Signal</h2>
          <span class="status-badge status-active">● Active</span>
        </div>

        ${renderDivider('⟡')}

        <!-- Timer -->
        <div class="timer-label">Time Elapsed</div>
        <div class="timer-display" id="round1-timer">00:00</div>

        <!-- Progress -->
        <div class="riddle-progress">
          ${riddles.map((_, i) => `
            ${i > 0 ? `<div class="progress-connector ${i <= current ? 'active' : ''}"></div>` : ''}
            <div class="progress-stone ${i < current ? 'completed' : ''} ${i === current ? 'active' : ''}">
              <span class="unrotate">${i < current ? '' : i + 1}</span>
            </div>
          `).join('')}
        </div>

        <!-- Riddle Card -->
        <div class="riddle-card" key="${current}">
          <div class="riddle-number-badge"><span class="unrotate">${current + 1}</span></div>

          <div class="shloka-block">
            <p class="shloka-text">${riddle.shloka}</p>
            <p class="shloka-translation">${riddle.translation}</p>
          </div>

          ${renderDivider('☸')}

          <p class="riddle-text">${riddle.riddle}</p>

          <div class="answer-form">
            <input
              type="text"
              class="answer-input"
              id="riddle-answer"
              placeholder="ENTER ANSWER"
              autocomplete="off"
              autofocus
            />
            <button class="btn btn-primary submit-btn" onclick="checkRound1Answer()">
              Submit
            </button>
          </div>
        </div>
      </div>
      ${renderKrishnaBot(riddle.hint)}
    </div>
  `;

  startTimer('round1-timer', riddle.hint);

  // Enter key listener
  document.getElementById('riddle-answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkRound1Answer();
  });
}

window.checkRound1Answer = function () {
  const input = document.getElementById('riddle-answer');
  const answer = input.value.trim().toUpperCase();
  const riddle = gameData.round1Riddles[state.round1.currentRiddle];

  if (answer === riddle.answer.toUpperCase()) {
    input.classList.add('correct');
    state.round1.solved.push(state.round1.currentRiddle);
    state.round1.answers[state.round1.currentRiddle] = answer;
    state.round1.currentRiddle++;

    setTimeout(() => {
      renderRound1();
    }, 800);
  } else {
    input.classList.add('wrong');
    input.value = '';
    setTimeout(() => input.classList.remove('wrong'), 500);
  }
};

function renderRound1Complete() {
  const allAnswers = gameData.round1Riddles.map(r => r.answer);
  const secretCode = allAnswers.map(a => a[0]).join('');

  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page signal-page">
      <div class="signal-container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">प्रथम चक्र — सम्पूर्णम्</p>
          <h2 class="section-title">Round I Complete!</h2>
          <span class="status-badge status-completed">✓ Complete</span>
        </div>

        ${renderDivider('⟡')}

        <div class="riddle-card" style="text-align: center;">
          <h3 style="font-family: var(--font-display); color: var(--gold); font-size: 1.5rem; margin-bottom: var(--space-lg);">
            The Secret Code Revealed
          </h3>

          <p style="font-family: var(--font-ui); font-size: 0.7rem; letter-spacing: 3px; color: var(--text-muted); text-transform: uppercase; margin-bottom: var(--space-md);">
            Enter the code on the laptop to claim your superpower
          </p>

          <div class="code-input-group">
            ${secretCode.split('').map(ch => `
              <div class="code-char" style="display:flex;align-items:center;justify-content:center;pointer-events:none;">${ch}</div>
            `).join('')}
          </div>

          <div class="round-superpower mt-2">
            <div class="superpower-label">⟡ You have earned ⟡</div>
            <div class="superpower-name">Chakra of Sudarshana</div>
          </div>

          <button class="btn btn-primary mt-3" onclick="router.navigate('/round2')">
            Proceed to Round II →
          </button>
        </div>

        <p class="text-center mt-2" style="font-family: var(--font-sanskrit); color: var(--gold); opacity: 0.6;">
          ॥ कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ॥
        </p>
      </div>
    </div>
  `;
}

// =====================================================
// ROUND 2: THE MINI TREASURE HUNT
// =====================================================
function renderRound2() {
  const locations = gameData.round2Locations;
  const current = state.round2.currentLocation;
  const location = locations[current];

  if (!location) {
    renderRound2Complete();
    return;
  }

  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page hunt-page">
      <div class="hunt-container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">द्वितीय चक्र — अन्वेषणम्</p>
          <h2 class="section-title">Round II: The Hunt</h2>
          <span class="status-badge status-active">● Active</span>
        </div>

        ${renderDivider('☸')}

        <!-- Timer -->
        <div class="timer-label">Time Elapsed</div>
        <div class="timer-display" id="round2-timer">00:00</div>

        <!-- Location Tracker -->
        <div class="location-tracker">
          ${locations.map((loc, i) => `
            ${i > 0 ? `<div class="location-path ${i <= current ? 'active' : ''}"></div>` : ''}
            <div class="location-node">
              <div class="location-icon ${i < current ? 'completed' : ''} ${i === current ? 'active' : ''}">
                <span class="unrotate">${i < current ? '✓' : loc.icon}</span>
              </div>
              <span class="location-label">${loc.shortName}</span>
            </div>
          `).join('')}
        </div>

        <!-- Riddle Card -->
        <div class="riddle-card" key="${current}">
          <div class="riddle-number-badge"><span class="unrotate">${current + 1}</span></div>

          <div class="shloka-block">
            <p class="shloka-text">${location.shloka}</p>
            <p class="shloka-translation">${location.translation}</p>
          </div>

          ${renderDivider('◈')}

          <p class="riddle-text">${location.riddle}</p>

          <div class="code-entry">
            <p class="code-label">Enter the Sacred Code Found at the Location</p>
            <div style="max-width: 400px; margin: 0 auto;">
              <div class="answer-form">
                <input
                  type="text"
                  class="answer-input"
                  id="location-code"
                  placeholder="ENTER CODE"
                  autocomplete="off"
                  autofocus
                />
                <button class="btn btn-primary submit-btn" onclick="checkRound2Code()">
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${renderKrishnaBot(location.hint)}
    </div>
  `;

  startTimer('round2-timer', location.hint);

  document.getElementById('location-code').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkRound2Code();
  });
}

window.checkRound2Code = function () {
  const input = document.getElementById('location-code');
  const code = input.value.trim().toUpperCase();
  const location = gameData.round2Locations[state.round2.currentLocation];

  if (code === location.code.toUpperCase()) {
    input.classList.add('correct');
    state.round2.solved.push(state.round2.currentLocation);
    state.round2.codes[state.round2.currentLocation] = code;
    state.round2.currentLocation++;

    setTimeout(() => renderRound2(), 800);
  } else {
    input.classList.add('wrong');
    input.value = '';
    setTimeout(() => input.classList.remove('wrong'), 500);
  }
};

function renderRound2Complete() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page hunt-page">
      <div class="hunt-container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">द्वितीय चक्र — सम्पूर्णम्</p>
          <h2 class="section-title">Round II Complete!</h2>
          <span class="status-badge status-completed">✓ Qualified</span>
        </div>

        ${renderDivider('⟡')}

        <div class="riddle-card" style="text-align: center;">
          <img src="/images/chakra-wheel.png" style="width: 80px; height: 80px; animation: slowSpin 10s linear infinite; margin-bottom: var(--space-xl); filter: drop-shadow(0 0 20px var(--glow-gold));" />

          <h3 style="font-family: var(--font-display); color: var(--gold); font-size: 1.5rem; margin-bottom: var(--space-md);">
            You Have Qualified!
          </h3>

          <p style="color: var(--text-secondary); font-style: italic; margin-bottom: var(--space-xl);">
            Like the Pandavas emerging from Vanvaas, you have proven your worth. The final battle of Kurukshetra awaits.
          </p>

          <div class="round-superpower mb-3">
            <div class="superpower-label">⟡ Reward ⟡</div>
            <div class="superpower-name">Gandiva's Arrow</div>
          </div>

          <button class="btn btn-sindoor" onclick="router.navigate('/round3')">
            ⚔ Enter Kurukshetra — Round III ⚔
          </button>
        </div>
      </div>
    </div>
  `;
}

// =====================================================
// ROUND 3: THE CODEX
// =====================================================
function renderRound3() {
  const clues = gameData.round3Clues;
  const current = state.round3.currentClue;
  const clue = clues[current];

  if (!clue) {
    router.navigate('/victory');
    return;
  }

  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page codex-page">
      <div class="codex-container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">अन्तिम चक्र — कोडेक्सः</p>
          <h2 class="section-title">Round III: The Codex</h2>
          <span class="status-badge status-active" style="border-color: rgba(201,76,76,0.3); color: var(--sindoor); background: rgba(201,76,76,0.1);">
            ⚔ Final Round
          </span>
        </div>

        ${renderDivider('⚔')}

        <!-- Timer -->
        <div class="timer-label">Time Elapsed</div>
        <div class="timer-display" id="round3-timer">00:00</div>

        <!-- Campus Map -->
        <div class="campus-map">
          <div class="map-title">Quest Progress — Campus Map</div>
          <div class="map-path">
            ${clues.map((c, i) => `
              ${i > 0 ? `<span class="map-arrow ${i <= current ? 'active' : ''}">→</span>` : ''}
              <div class="map-node">
                <div class="map-dot ${i < current ? 'completed' : ''} ${i === current ? 'active' : ''} ${i > current ? 'locked' : ''}">
                  <span class="unrotate">${i < current ? '✓' : i + 1}</span>
                </div>
                <span class="map-dot-label">${c.locationName}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Clue Card -->
        <div class="riddle-card" key="${current}">
          <div class="riddle-number-badge" style="border-color: var(--sindoor); color: var(--sindoor);">
            <span class="unrotate">${current + 1}</span>
          </div>

          <div class="shloka-block" style="border-color: var(--sindoor-dark);">
            <p class="shloka-text">${clue.shloka}</p>
            <p class="shloka-translation">${clue.translation}</p>
          </div>

          ${renderDivider('⚔')}

          <p class="riddle-text">${clue.riddle}</p>

          <div class="code-entry" style="border-color: rgba(201,76,76,0.3);">
            <p class="code-label">Enter the Code from ${clue.locationName}</p>
            <div style="max-width: 400px; margin: 0 auto;">
              <div class="answer-form">
                <input
                  type="text"
                  class="answer-input"
                  id="codex-code"
                  placeholder="ENTER CODE"
                  autocomplete="off"
                  autofocus
                  style="border-color: rgba(201,76,76,0.3);"
                />
                <button class="btn btn-sindoor submit-btn" onclick="checkRound3Code()">
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ${renderKrishnaBot(clue.hint)}
    </div>
  `;

  startTimer('round3-timer', clue.hint);

  document.getElementById('codex-code').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkRound3Code();
  });
}

window.checkRound3Code = function () {
  const input = document.getElementById('codex-code');
  const code = input.value.trim().toUpperCase();
  const clue = gameData.round3Clues[state.round3.currentClue];

  if (code === clue.code.toUpperCase()) {
    input.classList.add('correct');
    state.round3.solved.push(state.round3.currentClue);
    state.round3.codes[state.round3.currentClue] = code;
    state.round3.currentClue++;

    setTimeout(() => renderRound3(), 800);
  } else {
    input.classList.add('wrong');
    input.value = '';
    setTimeout(() => input.classList.remove('wrong'), 500);
  }
};

// =====================================================
// VICTORY PAGE
// =====================================================
function renderVictory() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page victory-page">
      <div class="victory-content">
        <img src="/images/chakra-wheel.png" alt="Victory" class="victory-chakra" />
        <h1 class="victory-title">Victory!</h1>
        <p class="victory-sanskrit">॥ यत्र धर्मस्तत्र जयः ॥</p>
        <p class="victory-subtitle">Where there is Dharma, there is Victory. You have unlocked the Ancient Codex and proven yourself worthy, O Warrior!</p>

        ${renderDivider('☸')}

        <div class="ancient-card" style="max-width: 500px; margin: var(--space-xl) auto; text-align: center;">
          <h3 style="font-family: var(--font-display); color: var(--gold); font-size: 1.3rem; margin-bottom: var(--space-md);">The Codex Is Yours</h3>
          <p style="color: var(--text-secondary); font-style: italic; margin-bottom: var(--space-lg);">
            As Arjuna received the divine Pashupatastra from Lord Shiva, you have earned the ancient knowledge. 
            Present this screen to the organizers to claim your prize.
          </p>
          <div style="font-family: var(--font-ui); font-size: 2rem; letter-spacing: 8px; color: var(--gold); text-shadow: 0 0 30px var(--glow-gold);">
            CODEX✦UNLOCKED
          </div>
        </div>

        <button class="btn btn-outline mt-3" onclick="router.navigate('/leaderboard')">
          View Hall of Warriors
        </button>
      </div>
    </div>
  `;
}

// =====================================================
// LEADERBOARD
// =====================================================
function renderLeaderboard() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav('leaderboard')}
    <div class="page leaderboard-page">
      <div class="leaderboard-container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">॥ वीर गृहम् ॥</p>
          <h2 class="section-title">Hall of Warriors</h2>
          <p class="section-subtitle">The bravest warriors of the Sabha, ranked by their valor and wisdom.</p>
        </div>

        ${renderDivider('⟐')}

        <table class="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Round</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="leaderboard-tbody">
            <tr><td colspan="5" style="text-align:center;">Consulting the Codex...</td></tr>
          </tbody>
        </table>
      </div>

      ${renderFooter()}
    </div>
  `;

  if (window.leaderboardUnsubscribe) window.leaderboardUnsubscribe();
  window.leaderboardUnsubscribe = dbAdmin.listenToTeams((teams) => {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    teams.sort((a, b) => (b.score || 0) - (a.score || 0));

    tbody.innerHTML = teams.map((team, i) => `
      <tr>
        <td>
          <span class="rank-badge rank-${i < 3 ? i + 1 : 'other'}">
            ${i + 1}
          </span>
        </td>
        <td>
          <div class="team-name-cell">
            <span style="font-weight: 600; color: var(--text-primary);">${team.name}</span>
            ${team.superpower ? `<span class="superpower-badge">${team.superpower}</span>` : ''}
          </div>
        </td>
        <td style="font-family: var(--font-ui); font-size: 0.75rem; letter-spacing: 1px;">
          Round ${team.currentRound || 1}
        </td>
        <td style="color: var(--gold); font-weight: 600;">
          ${team.score || 0}
        </td>
        <td>
          <span class="status-badge ${team.status === 'disqualified' ? 'status-locked' : 'status-active'}">
            ${team.status === 'disqualified' ? '✗ DQ' : '● Active'}
          </span>
        </td>
      </tr>
    `).join('');
  });
}

// =====================================================
// KRISHNA AI BOT
// =====================================================
function renderKrishnaBot(hintText) {
  if (!hintText) return '';
  return `
    <div class="krishna-bot">
      <div class="krishna-chat-panel" id="krishna-panel">
        <div class="krishna-chat-header">
          <div class="krishna-chat-title">
            <span>🦚</span> Shree Krishna
          </div>
          <button class="krishna-close-btn" onclick="document.getElementById('krishna-panel').classList.remove('open')">×</button>
        </div>
        <div class="krishna-chat-body">
          <div class="krishna-message">
            <span class="krishna-name">Krishna</span>
            <div class="krishna-bubble">
              "Fear not, O Warrior. Focus thy mind. Your path is currently blocked, but the truth is within. Wait, and I shall guide thee when the time is right."
            </div>
          </div>
          <div id="krishna-hint-box">
             <div class="krishna-hint-locked">
               Divine hint manifests after 5 minutes of contemplation...
             </div>
          </div>
        </div>
      </div>
      <div class="krishna-avatar" onclick="document.getElementById('krishna-panel').classList.toggle('open'); document.getElementById('krishna-notif').classList.remove('active');">
        <img src="/images/krishna-avatar.png" alt="Krishna AI" />
        <div class="krishna-notification" id="krishna-notif"></div>
      </div>
    </div>
  `;
}

// =====================================================
// TIMER
// =====================================================
function startTimer(elementId, hintText = null) {
  if (state.timer) clearInterval(state.timer);
  state.timerValue = 0;
  state.krishnaHintAvailable = false;

  state.timer = setInterval(() => {
    state.timerValue++;
    const mins = String(Math.floor(state.timerValue / 60)).padStart(2, '0');
    const secs = String(state.timerValue % 60).padStart(2, '0');
    const el = document.getElementById(elementId);
    if (el) el.textContent = `${mins}:${secs}`;
    else clearInterval(state.timer);

    // Show Krishna Hint after 5 mins (300 sec)
    if (state.timerValue >= 300 && hintText && !state.krishnaHintAvailable) {
      state.krishnaHintAvailable = true;
      const notif = document.getElementById('krishna-notif');
      const hintEl = document.getElementById('krishna-hint-box');
      if (notif) notif.classList.add('active');
      if (hintEl) {
        hintEl.innerHTML = `
             <div class="krishna-message">
               <span class="krishna-name">Krishna</span>
               <div class="krishna-bubble" style="border-left-color: var(--success-light)">
                 "Behold, O Arjuna! The path clears for thee: <br/><br/><strong style="color:var(--gold-light)">${hintText}</strong>"
               </div>
             </div>
           `;
      }
    }
  }, 1000);
}

// =====================================================
// ADMIN (Serverless)
// =====================================================
let unsubscribeTeams = null;
let unsubscribeGame = null;
let unsubscribeRiddles = null;

window.adminAddRiddle = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    round: parseInt(form.round.value),
    shloka: form.shloka.value,
    translation: form.translation.value,
    riddle: form.riddle.value,
    answer: form.answer.value,
  };
  await dbAdmin.saveRiddle(data);
  form.reset();
  alert('Riddle Saved to Codex!');
};

window.adminRemoveRiddle = async (id) => {
  if (confirm("Delete this riddle?")) {
    await dbAdmin.deleteRiddle(id);
  }
};

window.handleAdminLogin = (e) => {
  e.preventDefault();
  const pass = document.getElementById('admin-pass').value;
  if (pass === 'admin123') { // requested default
    state.adminLoggedIn = true;
    renderAdmin();
  } else {
    alert('Invalid Admin Ritual');
  }
};

window.adminCreateGame = async () => {
  const btn = document.getElementById('btn-create-game');
  btn.innerText = 'Creating...';
  await dbAdmin.createGame();
  btn.innerText = 'Game Created';
};

window.adminAddTeam = async (e) => {
  e.preventDefault();
  const name = document.getElementById('admin-team-name').value;
  const code = document.getElementById('admin-team-code').value;

  const success = await dbAdmin.addTeam(name, code);
  if (success) {
    document.getElementById('admin-team-name').value = '';
    document.getElementById('admin-team-code').value = '';
    alert('Team Add Successful!');
  } else {
    alert('Failed to add team');
  }
};

window.adminSetStatus = async (id, status) => {
  await dbAdmin.updateTeamStatus(id, status);
};

window.adminUpdateScore = async (id) => {
  const newScore = prompt('Enter new score:');
  if (newScore && !isNaN(newScore)) {
    await dbAdmin.updateTeamScore(id, newScore);
  }
};

window.adminSetRound = async (round) => {
  const confirmMsg = `Advance game to Round ${round}?`;
  if (confirm(confirmMsg)) {
    await dbAdmin.updateGameRound(round);
  }
};

window.adminToggleGame = async (isActive) => {
  await dbAdmin.updateGameState(isActive);
};

window.adminDeleteTeam = async (id) => {
  if (confirm("Are you sure you want to completely delete this team?")) {
    await dbAdmin.deleteTeam(id);
  }
};

function renderAdmin() {
  const app = document.getElementById('app');
  if (!state.adminLoggedIn) {
    app.innerHTML = `
      ${renderNav('admin')}
    <div class="page login-page">
      <div class="login-container">
        <div class="login-card">
          <h2 class="login-title">Admin Login</h2>
          <form onsubmit="handleAdminLogin(event)">
            <div class="form-group">
              <label class="form-label" for="admin-pass">Secret Password</label>
              <input class="form-input" type="password" id="admin-pass" placeholder="Enter strictly..." required />
            </div>
            <button type="submit" class="btn btn-primary login-btn">Authenticate</button>
          </form>
        </div>
      </div>
    </div>
    `;
    return;
  }

  // Dashboard View
  app.innerHTML = `
    ${renderNav('admin')}
    <div class="page" style="padding-top:20px; padding-bottom:50px;">
      <section class="section">
        <h2 class="section-title">Admin Sabha</h2>
        <div class="rounds-grid">

          <div class="ancient-card">
            <h3 style="color:var(--gold); margin-bottom:10px; font-family:var(--font-ui);">Game Control</h3>
            <div style="display:flex; gap:10px; margin-bottom: 15px;">
              <button id="btn-create-game" class="btn btn-primary" onclick="adminCreateGame()">Create/Reset Game</button>
              <button class="btn btn-outline" style="color:var(--sindoor); border-color:var(--sindoor);" onclick="adminToggleGame(false)">Halt Game</button>
            </div>

            <h4 style="color:var(--text-secondary); margin-bottom:10px; font-size:0.85rem; text-transform:uppercase; letter-spacing:2px;">Set Active Round</h4>
            <div style="display:flex; gap:5px; margin-bottom: 15px;">
              <button class="btn btn-outline" style="padding: 8px 15px;" onclick="adminSetRound(1)">Round 1</button>
              <button class="btn btn-outline" style="padding: 8px 15px;" onclick="adminSetRound(2)">Round 2</button>
              <button class="btn btn-outline" style="padding: 8px 15px;" onclick="adminSetRound(3)">Round 3</button>
            </div>

            <p style="margin-top:10px; font-size:0.8rem; color:var(--text-muted);" id="admin-game-status">Game Status: Unknown</p>
          </div>

          <div class="ancient-card">
            <h3 style="color:var(--gold); margin-bottom:10px; font-family:var(--font-ui);">Add Team</h3>
            <form onsubmit="adminAddTeam(event)" style="display:flex; flex-direction:column; gap:10px;">
              <input class="form-input" id="admin-team-name" placeholder="Team Name" required />
              <input class="form-input" id="admin-team-code" placeholder="Secret Access Code" required />
              <button type="submit" class="btn btn-sindoor">Add Team to Lobby</button>
            </form>
          </div>
        </div>

        <div class="ancient-card" style="margin-top:20px; overflow-x:auto;">
          <h3 style="color:var(--gold); margin-bottom:15px; font-family:var(--font-ui);">Lobby & Teams</h3>
          <table class="leaderboard-table" style="width:100%;">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Status</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="admin-teams-list">
              <tr><td colspan="5" style="text-align:center;">Loading...</td></tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top:40px;">
          <h3 style="color:var(--gold); margin-bottom:15px; font-family:var(--font-ui); font-size:1.5rem;">Manage Codex Riddles</h3>

          <div class="ancient-card" style="margin-bottom: 20px;">
            <h4 style="color:var(--text-primary); margin-bottom:10px;">Add New Riddle / Shloka</h4>
            <form onsubmit="adminAddRiddle(event)" style="display:flex; flex-direction:column; gap:10px;">
              <select name="round" class="form-input" style="background:var(--bg-dark)" required>
                <option value="1">Round 1</option>
                <option value="2">Round 2</option>
                <option value="3">Round 3</option>
              </select>
              <textarea name="shloka" class="form-input" placeholder="Sanskrit Shloka..." rows="2" required></textarea>
              <input type="text" name="translation" class="form-input" placeholder="Translation / Context" required />
              <textarea name="riddle" class="form-input" placeholder="The actual Riddle..." rows="2" required></textarea>
              <input type="text" name="answer" class="form-input" placeholder="Answer / Code / Location" required />
              <button type="submit" class="btn btn-primary">Save to Codex</button>
            </form>
          </div>

          <div class="rounds-grid" id="admin-riddles-list">
            <p>Loading Riddles...</p>
          </div>
        </div>
      </section>
    </div>
    `;

  // Init Realtime Listeners
  if (unsubscribeTeams) unsubscribeTeams();
  if (unsubscribeGame) unsubscribeGame();
  if (unsubscribeRiddles) unsubscribeRiddles();

  unsubscribeGame = dbAdmin.listenToGame((game) => {
    const el = document.getElementById('admin-game-status');
    if (el) {
      if (game) {
        el.innerText = `Game Active: ${game.isActive ? 'Yes' : 'No'} | Current Round: ${game.currentRound} `;
      } else {
        el.innerText = 'Game Status: Offline / Not Created';
      }
    }
  });

  unsubscribeTeams = dbAdmin.listenToTeams((teams) => {
    const list = document.getElementById('admin-teams-list');
    if (!list) return;

    // Sort by score
    teams.sort((a, b) => b.score - a.score);

    list.innerHTML = teams.map(t => `
      < tr >
        <td>${t.name}</td>
        <td style="color:var(--gold-dark);">${t.code}</td>
        <td>
           <span style="color: ${t.status === 'qualified' ? 'var(--success-light)' : t.status === 'disqualified' ? 'var(--sindoor)' : 'var(--text-muted)'};">
             ${t.status.toUpperCase()}
           </span>
        </td>
        <td>${t.score}</td>
        <td style="display:flex; gap:5px;">
          <button class="btn btn-outline" style="padding: 5px 10px; font-size:0.6rem;" onclick="adminUpdateScore('${t.id}')">Score</button>
          <button class="btn btn-outline" style="padding: 5px 10px; font-size:0.6rem; color:var(--success-light); border-color:var(--success-light);" onclick="adminSetStatus('${t.id}', 'qualified')">Q</button>
          <button class="btn btn-outline" style="padding: 5px 10px; font-size:0.6rem; color:var(--sindoor); border-color:var(--sindoor);" onclick="adminSetStatus('${t.id}', 'disqualified')">DQ</button>
          <button class="btn btn-outline" style="padding: 5px 10px; font-size:0.6rem; color:#888; border-color:#888;" onclick="adminDeleteTeam('${t.id}')">Del</button>
        </td>
      </tr >
      `).join('') || '<tr><td colspan="5" style="text-align:center;">No teams found</td></tr>';
  });

  unsubscribeRiddles = dbAdmin.listenToRiddles((riddles) => {
    const container = document.getElementById('admin-riddles-list');
    if (!container) return;
    riddles.sort((a, b) => a.round - b.round);

    container.innerHTML = riddles.map(r => `
      < div class="ancient-card" >
           <div style="display:flex; justify-content:space-between;">
              <span class="rank-badge rank-1">R${r.round}</span>
              <button class="btn btn-outline" style="padding: 2px 8px; font-size:0.6rem; color:var(--sindoor); border-color:var(--sindoor);" onclick="adminRemoveRiddle('${r.id}')">Delete</button>
           </div>
           <p style="font-family:var(--font-display); color:var(--gold); margin-top:10px; font-size:0.9rem;">${r.shloka}</p>
           <p style="color:var(--text-secondary); font-size:0.75rem; margin-top:5px;">${r.translation}</p>
           <hr style="border-color:var(--border-color); margin:10px 0;">
           <p style="color:var(--text-primary); font-size:0.85rem;">Q: ${r.riddle}</p>
           <p style="color:var(--success-light); font-size:0.85rem; margin-top:5px; font-weight:bold;">A: ${r.answer}</p>
        </div>
    `).join('') || '<p>No riddles recorded in the Codex.</p>';
  });
}
