/* =====================================================
   CODEX HUNT — Main Application
   ===================================================== */

import { gameData } from './data.js';
import { Router } from './router.js';
import { createHeroShader } from './hero-shader.js';
import { dbAdmin, db } from './firebase.js';

// --- App State ---
const state = {
  currentTeam: null,
  round1: { currentRiddle: 0, solved: [], answers: {} },
  round2: { currentLocation: 0, solved: [], codes: {} },
  round3: { currentClue: 0, solved: [], codes: {} },
  superpowers: { round1: false, round2: false },
  timer: null,
  timerValue: 0,
  currentTimerRound: null,
  adminLoggedIn: false,
};

// --- Persistence Helpers ---
function saveState() {
  const stateToSave = {
    currentTeam: state.currentTeam,
    round1: state.round1,
    round2: state.round2,
    round3: state.round3,
    superpowers: state.superpowers,
    timerValue: state.timerValue,
    currentTimerRound: state.currentTimerRound,
    adminLoggedIn: state.adminLoggedIn
  };
  localStorage.setItem('codex_hunt_session', JSON.stringify(stateToSave));
}

function loadState() {
  const saved = localStorage.getItem('codex_hunt_session');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
      return true;
    } catch (e) {
      console.error("Failed to load state", e);
    }
  }
  return false;
}

function clearState() {
  localStorage.removeItem('codex_hunt_session');
}

window.handleLogout = () => {
  if (confirm("Are you sure you wish to leave the Sabha? Your progress is saved in the Codex.")) {
    clearState();
    state.currentTeam = null;
    state.timerValue = 0;
    state.currentTimerRound = null;
    if (window.teamUnsubscribe) window.teamUnsubscribe();
    if (window.gameUnsubscribe) window.gameUnsubscribe();
    window.router.navigate('/');
    location.reload(); // Hard reload to clear all states and intervals
  }
};

// --- Initialize ---
window.addEventListener('DOMContentLoaded', async () => {
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
    '/victory': () => renderVictory(), // Fixed reference from renderRound3Complete
    '/admin': () => renderAdmin(),
    '/admin/superpower': () => renderAdminSuperpowerClaim(),
    '/claim': () => renderClaimPage(),
  });

  window.router = router;
  window.state = state;
  window.gameData = gameData;

  // Restore session
  if (loadState()) {
    if (state.currentTeam) {
      await initGameListeners(state.currentTeam);

      // Auto-navigate if they land on login or home while already logged in
      const path = window.location.hash.slice(1) || '/';
      if (path === '/login' || path === '/') {
        dbAdmin.getGameStatus().then(game => {
          if (game && game.isActive) {
            const round = game.currentRound || 1;
            router.navigate(`/round${round}`);
          }
        });
      }
    }
  }

  router.init();
});

// --- Listeners Setup ---
async function initGameListeners(team) {
  if (window.teamUnsubscribe) window.teamUnsubscribe();
  const { onSnapshot, doc } = await import("firebase/firestore");

  window.teamUnsubscribe = onSnapshot(doc(db, "teams", team.id), (docSnap) => {
    if (!docSnap.exists()) return;
    const updatedTeam = docSnap.data();

    // Sync all progress
    if (updatedTeam.progress) {
      const oldProgress = JSON.stringify({
        r1: state.round1,
        r2: state.round2,
        r3: state.round3,
        powers: state.superpowers
      });

      state.round1 = updatedTeam.progress.round1 || state.round1;
      state.round2 = updatedTeam.progress.round2 || state.round2;
      state.round3 = updatedTeam.progress.round3 || state.round3;
      state.superpowers = updatedTeam.progress.superpowers || state.superpowers;

      if (state.currentTeam) {
        state.currentTeam.score = updatedTeam.score || state.currentTeam.score;
      }

      saveState();

      // If progress changed, re-render current page
      const newProgress = JSON.stringify({
        r1: state.round1,
        r2: state.round2,
        r3: state.round3,
        powers: state.superpowers
      });

      if (oldProgress !== newProgress) {
        const path = window.router.currentPath;
        if (path === '/round2') renderRound2();
        else if (path === '/round3') renderRound3();
        else if (path.includes('round1')) renderRound1();
      }
    }
  });

  if (window.gameUnsubscribe) window.gameUnsubscribe();
  window.gameUnsubscribe = dbAdmin.listenToGame((game) => {
    if (!game) return;

    const oldRound = state.gameStatus?.currentRound;
    state.gameStatus = game;

    if (!game.isActive) {
      renderWarEnded("The Sabha has been temporarily halted by the Elders.");
      return;
    }

    if (state.currentTeam?.status === 'disqualified') {
      renderWarEnded("Your team has been disqualified from the quest.");
      return;
    }

    if (oldRound && oldRound !== game.currentRound) {
      const targetRound = game.currentRound;
      const prevRound = targetRound - 1;
      const qualifiedForPrev = game.qualifiedTeams?.[`round${prevRound}`]?.some(t => t.id === state.currentTeam?.id);

      if (qualifiedForPrev) {
        window.router.navigate(`/round${targetRound}`);
      } else {
        renderWarEnded(`Round ${targetRound} has commenced, but your journey ended in the previous trial.`);
      }
    }
  });
}

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
          <span class="nav-text">About</span>
        </a>
        ${state.currentTeam ? `
          <a class="nav-link ${activePage === 'login' ? 'active' : ''}" onclick="const r = state.gameStatus?.currentRound || 1; router.navigate('/round' + r)">
            <span class="nav-icon">✦</span>
            <span class="nav-text">Round ${state.gameStatus?.currentRound || 1}</span>
          </a>
        ` : `
          <a class="nav-link ${activePage === 'login' ? 'active' : ''}" onclick="router.navigate('/login')">
            <span class="nav-icon">✦</span>
            <span class="nav-text">Sabha</span>
          </a>
        `}
        <a class="nav-link ${activePage === 'rules' ? 'active' : ''}" onclick="router.navigate('/rules')">
          <span class="nav-icon">◈</span>
          <span class="nav-text">Rules</span>
        </a>
        <a class="nav-link ${activePage === 'leaderboard' ? 'active' : ''}" onclick="router.navigate('/leaderboard')">
          <span class="nav-icon">☸</span>
          <span class="nav-text">Ranks</span>
        </a>
        ${state.currentTeam ? `
          <a class="nav-link" onclick="handleLogout()" style="color: var(--sindoor);">
            <span class="nav-icon">⎋</span>
            <span class="nav-text">Exit</span>
          </a>
        ` : ''}
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
  if (state.currentTeam) {
    const round = state.gameStatus?.currentRound || 1;
    router.navigate(`/round${round}`);
    return;
  }

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

      // Record initial entry/re-entry location
      dbAdmin.updateTeamProgress(team.id, {
        sessionActive: true,
        lastLocation: team.lastLocation || 'Entered the Sabha'
      });

      // Load saved progress if exists
      if (team.progress) {
        state.round1 = team.progress.round1 || state.round1;
        state.round2 = team.progress.round2 || state.round2;
        state.round3 = team.progress.round3 || state.round3;
        state.superpowers = team.progress.superpowers || state.superpowers;
      }

      // FALLBACK: Sync boolean flags
      if (team.superpower) {
        if (team.superpower.includes("Chakra")) state.superpowers.round1 = true;
        if (team.superpower.includes("Gandiva")) state.superpowers.round2 = true;
      }

      // Initialize unique riddles for Round 1
      if (!state.round1.riddles || state.round1.riddles.length > 5) {
        const pool = gameData.round1Riddles || [];
        state.round1.riddles = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
        state.round1.shuffled = true;
        dbAdmin.updateTeamProgress(team.id, { "progress.round1": state.round1 });
      }

      saveState();

      // Start real-time listeners
      await initGameListeners(team);

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
  const allRiddles = state.round1.riddles || gameData.round1Riddles;
  // Always limit to 5 riddles to prevent "infinite questions" fallback
  const riddles = allRiddles.slice(0, 5);
  const current = state.round1.currentRiddle;
  const riddle = riddles[current];

  if (!riddle) {
    // All riddles solved — show completion
    renderRound1Complete();
    return;
  }

  // Check if Admin has started the round
  if (state.gameStatus && state.gameStatus.currentRound !== 1) {
    if (state.gameStatus.currentRound > 1) {
      // Force them to their actual round if they are trying to access R1
      const target = state.gameStatus.currentRound;
      const qualifiedForTarget = state.gameStatus.qualifiedTeams?.[`round${target - 1}`]?.some(t => t.id === state.currentTeam?.id);
      if (qualifiedForTarget) {
        router.navigate(`/round${target}`);
        return;
      }
    }
    renderWarEnded("Round I is not currently active in the Sabha.");
    return;
  }

  // Check if round is already full
  if (state.gameStatus) {
    const limits = state.gameStatus.qualificationLimits || {};
    const qualified = state.gameStatus.qualifiedTeams || {};
    if (qualified.round1?.length >= (limits.round1 || 999)) {
      // Only block if they aren't already qualified
      const isAlreadyQualified = qualified.round1.some(t => t.id === state.currentTeam?.id);
      if (!isAlreadyQualified) {
        renderWarEnded("The Signal has faded. Enough warriors have already qualified for the next stage.");
        return;
      }
    }
  }

  // Pulse location to admin
  if (state.currentTeam) {
    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      lastLocation: `Round 1: Riddle ${current + 1}`
    });
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
          
          <p style="text-align:center; font-size:0.6rem; color:var(--text-muted); margin-top:15px; text-transform:uppercase; letter-spacing:1px; opacity:0.5;">
            Sacred Trial Specific to team ${state.currentTeam?.name}
          </p>
        </div>
      </div>
      ${renderKrishnaBot(riddle.hint)}
    </div>
  `;

  startTimer('round1-timer', riddle.hint, 'round1');

  // Enter key listener
  document.getElementById('riddle-answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkRound1Answer();
  });
}

window.checkRound1Answer = function () {
  const input = document.getElementById('riddle-answer');
  const answer = input.value.trim().toUpperCase();
  const allRiddles = state.round1.riddles || gameData.round1Riddles;
  const riddles = allRiddles.slice(0, 5);
  const riddle = riddles[state.round1.currentRiddle];

  if (answer === riddle.answer.toUpperCase()) {
    input.classList.add('correct');
    state.round1.solved.push(state.round1.currentRiddle);
    state.round1.answers[state.round1.currentRiddle] = answer;

    // Increment Score
    state.currentTeam.score = (state.currentTeam.score || 0) + 100;

    state.round1.currentRiddle++;

    // Calculate Secret Code if finished
    let secretCode = null;
    if (state.round1.currentRiddle >= riddles.length) {
      secretCode = riddles.map((r, i) => {
        const ans = state.round1.answers[i];
        return ans ? ans[0] : '';
      }).join('').toUpperCase();
      state.round1.secretCode = secretCode;
    }

    // Push to Firebase
    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      score: state.currentTeam.score,
      progress: {
        round1: state.round1,
        round2: state.round2,
        round3: state.round3,
        superpowers: state.superpowers
      },
      lastLocation: state.round1.currentRiddle >= riddles.length ? 'Round 1 Completed' : 'Round 1 - Riddle ' + state.round1.currentRiddle
    }).then(async () => {
      saveState();
      if (state.round1.currentRiddle >= riddles.length) {
        // Attempt to qualify
        const res = await dbAdmin.qualifyTeam(1, state.currentTeam.id, state.currentTeam.name);
        if (res.success) {
          renderQualified(1, res.position);
        } else if (res.error === 'SLOTS_FULL') {
          renderWarEnded("The first trial has closed. You fought bravely, but others reached the mark first.");
        }
      }
    });

    setTimeout(() => {
      if (state.round1.currentRiddle < riddles.length) renderRound1();
    }, 800);
  } else {
    input.classList.add('wrong');
    input.value = '';
    setTimeout(() => input.classList.remove('wrong'), 500);
  }
};

async function renderRound1Complete() {
  const secretCode = state.round1.secretCode;

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
            Your Sacred Code
          </h3>

          <p style="font-family: var(--font-ui); font-size: 0.7rem; letter-spacing: 3px; color: var(--text-muted); text-transform: uppercase; margin-bottom: var(--space-md);">
            Present this code at the Public Claim Sabha to earn your superpower
          </p>

          <div class="code-input-group">
            ${secretCode.split('').map(ch => `
              <div class="code-char" style="display:flex;align-items:center;justify-content:center;pointer-events:none; border-color:var(--gold); color:var(--gold-light); text-shadow:0 0 10px var(--glow-gold);">${ch}</div>
            `).join('')}
          </div>

          <div id="superpower-status" class="mt-3">
             <!-- Status shown here if they already secured it -->
          </div>

          ${(state.gameStatus?.currentRound >= 2) ? `
            <button class="btn btn-primary mt-3" onclick="router.navigate('/round2')">
              Proceed to Round II →
            </button>
          ` : `
            <div style="margin-top:20px; padding:15px; border:1px dashed var(--border-gold); color:var(--gold-light); font-size:0.85rem;">
              ⚔ Round II has not yet commenced. Prepare for the treasure hunt and wait for the Admin's command.
            </div>
          `}
        </div>

        <p class="text-center mt-2" style="font-family: var(--font-sanskrit); color: var(--gold); opacity: 0.6;">
          ॥ कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ॥
        </p>
      </div>
    </div>
  `;

  const statusEl = document.getElementById('superpower-status');
  if (state.superpowers.round1) {
    statusEl.innerHTML = `
        <div class="round-superpower">
          <div class="superpower-label">⟡ Divine Blessing ⟡</div>
          <div class="superpower-name">Sudarshana Chakra Active</div>
        </div>
      `;
  }
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

  // Check if Admin has started the round
  if (!state.gameStatus || state.gameStatus.currentRound < 2) {
    renderWarEnded("The second trial has not yet been authorized by the Elders. Wait for the signal.");
    return;
  }

  // Check if qualified for this specific round (Must have finished R1)
  const qualifiedForR1 = state.gameStatus.qualifiedTeams?.round1?.some(t => t.id === state.currentTeam?.id);
  if (!qualifiedForR1) {
    renderWarEnded("You have not been chosen to enter the second trial. Your journey remains in the previous cycle.");
    return;
  }

  // Check if round is already full (slots for Round 2 completion)
  if (state.gameStatus) {
    const limits = state.gameStatus.qualificationLimits || {};
    const qualified = state.gameStatus.qualifiedTeams || {};
    if (qualified.round2?.length >= (limits.round2 || 999)) {
      const isAlreadyQualified = qualified.round2.some(t => t.id === state.currentTeam?.id);
      if (!isAlreadyQualified) {
        renderWarEnded("The hunt has concluded. Enough teams have secured their place in the final Codex trial.");
        return;
      }
    }
  }

  // Pulse location to admin
  if (state.currentTeam) {
    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      lastLocation: `Searching: ${location.locationName}`
    });
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

          <!-- Superpower Usage -->
          <div class="superpowers-container mt-3">
            <p class="code-label" style="font-size: 0.55rem; color: var(--gold-dark); margin-bottom: 15px;">Divine Assistance</p>
            
            ${(!state.superpowers.round1) ? `
              <p style="font-size: 0.7rem; color: var(--text-muted); font-style: italic; margin-bottom: 5px;">
                No divine boons currently available in your quiver.
              </p>
              <p style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">
                Earn them by visiting the Claim Sabha after Round I.
              </p>
            ` : ''}

            ${state.superpowers.round1 ? `
              <div class="superpower-action">
                <button class="btn btn-primary" onclick="useRound1Power()" style="background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border: none; box-shadow: 0 0 15px var(--glow-gold); width: 100%;">
                  🪯 Invoke Sudarshana Chakra
                </button>
                <p style="font-size: 0.65rem; color: var(--gold-light); margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;">
                  Skip this location with divine power (Single Use)
                </p>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
      ${renderKrishnaBot(location.hint)}
    </div>
  `;

  startTimer('round2-timer', location.hint, 'round2');

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

    // Increment Score
    state.currentTeam.score = (state.currentTeam.score || 0) + 200;

    state.round2.currentLocation++;

    // Push to Firebase
    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      score: state.currentTeam.score,
      progress: {
        round1: state.round1,
        round2: state.round2,
        round3: state.round3,
        superpowers: state.superpowers
      },
      lastLocation: location.locationName
    }).then(async () => {
      saveState();
      if (state.round2.currentLocation >= gameData.round2Locations.length) {
        const res = await dbAdmin.qualifyTeam(2, state.currentTeam.id, state.currentTeam.name);
        if (res.success) {
          renderQualified(2, res.position);
        } else if (res.error === 'SLOTS_FULL') {
          renderWarEnded("The second trial has closed. Other warriors have filled the scrolls of qualification.");
        }
      }
    });

    setTimeout(() => {
      if (state.round2.currentLocation < gameData.round2Locations.length) renderRound2();
    }, 800);
  } else {
    input.classList.add('wrong');
    input.value = '';
    setTimeout(() => input.classList.remove('wrong'), 500);
  }
};

async function renderRound2Complete() {
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

          <div id="superpower-status-r2" class="mb-3">
             <div style="text-align:center; color: var(--text-muted); font-style: italic;">Consulting the Akashic record for rewards...</div>
          </div>

          ${(state.gameStatus?.currentRound >= 3) ? `
            <button class="btn btn-sindoor" onclick="router.navigate('/round3')">
              ⚔ Enter Kurukshetra — Round III ⚔
            </button>
          ` : `
            <div style="margin-top:20px; padding:15px; border:1px dashed var(--sindoor); color:var(--sindoor); font-size:0.85rem;">
              ⚔ The final battle has not yet commenced. Hone your skills and wait for the Elders' command.
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  // Claim superpower if 1st
  const statusEl = document.getElementById('superpower-status-r2');
  if (state.superpowers.round2) {
    statusEl.innerHTML = `
        <div class="round-superpower">
          <div class="superpower-label">⟡ Divine Favor ⟡</div>
          <div class="superpower-name">Gandiva's Arrow is in your quiver</div>
          <p style="font-size: 0.7rem; margin-top: 5px; color: var(--gold-light);">Ready for use in Round III.</p>
        </div>
      `;
    return;
  }

  const claimResult = await dbAdmin.claimSuperpower('round2', state.currentTeam.id, state.currentTeam.name);
  if (statusEl) {
    if (claimResult && claimResult.success) {
      statusEl.innerHTML = `
          <div class="round-superpower">
            <div class="superpower-label">⟡ Divine Favor ⟡</div>
            <div class="superpower-name">Gandiva's Arrow Assigned</div>
            <p style="font-size: 0.7rem; margin-top: 5px; color: var(--gold-light);">Use this in Round III for an instant revelation.</p>
          </div>
        `;
      state.superpowers.round2 = true;
    } else if (claimResult) {
      statusEl.innerHTML = `
          <div class="round-superpower claimed">
            <div class="superpower-label">⟡ Reward Taken ⟡</div>
            <div class="superpower-name">Already claimed by ${claimResult.claimedBy}</div>
          </div>
        `;
    } else {
      statusEl.innerHTML = '';
    }
  }
}

// =====================================================
// ROUND 3: THE CODEX
// =====================================================
function renderRound3() {
  const clues = gameData.round3Clues;
  const current = state.round3.currentClue;
  const clue = clues[current];

  if (!clue) {
    renderRound3Complete();
    return;
  }

  // Check if Admin has started the round
  if (!state.gameStatus || state.gameStatus.currentRound < 3) {
    renderWarEnded("The final battle of Kurukshetra has not yet commenced. Prepare your spirit.");
    return;
  }

  // Check if qualified (Must have finished R2)
  const qualifiedForR2 = state.gameStatus.qualifiedTeams?.round2?.some(t => t.id === state.currentTeam?.id);
  if (!qualifiedForR2) {
    renderWarEnded("Only those who solved the Vanvaas trials may enter the final Sabha.");
    return;
  }

  // Check if round is already full
  if (state.gameStatus) {
    const limits = state.gameStatus.qualificationLimits || {};
    const qualified = state.gameStatus.qualifiedTeams || {};
    if (qualified.round3?.length >= (limits.round3 || 999)) {
      const isAlreadyQualified = qualified.round3.some(t => t.id === state.currentTeam?.id);
      if (!isAlreadyQualified) {
        renderWarEnded("The Codex has been claimed. The scrolls are sealed and the final glory is won.");
        return;
      }
    }
  }

  // Pulse location to admin
  if (state.currentTeam) {
    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      lastLocation: `Codex: ${clue.locationName}`
    });
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

          <!-- Superpower Usage -->
          <div class="superpowers-container mt-3">
            <p class="code-label" style="font-size: 0.55rem; color: var(--gold-dark); margin-bottom: 15px;">Divine Assistance</p>
            
            ${(!state.superpowers.round1 && !state.superpowers.round2) ? `
              <p style="font-size: 0.7rem; color: var(--text-muted); font-style: italic; margin-bottom: 5px;">
                No divine boons currently available in your quiver.
              </p>
              <p style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">
                Earn them by being first in trials or visit the Claim Sabha.
              </p>
            ` : ''}

            ${state.superpowers.round1 ? `
              <div class="superpower-action">
                <button class="btn btn-primary" onclick="useRound1Power()" style="background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border: none; box-shadow: 0 0 15px var(--glow-gold); width: 100%; margin-bottom: 10px;">
                  🪯 Invoke Sudarshana Chakra
                </button>
                <p style="font-size: 0.65rem; color: var(--gold-light); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">
                  Skip this trial with divine power (Single Use)
                </p>
              </div>
            ` : ''}
            
            ${state.superpowers.round2 ? `
              <div class="superpower-action">
                <button class="btn btn-sindoor" onclick="useRound2Power()" style="background: linear-gradient(135deg, var(--sindoor), var(--sindoor-dark)); border: none; box-shadow: 0 0 15px var(--sindoor); width: 100%;">
                  🏹 Shoot Gandiva's Arrow
                </button>
                <p style="font-size: 0.65rem; color: var(--sindoor); margin-top: 5px; text-transform: uppercase; letter-spacing: 1px;">
                  Instantly reveal this clue's location code (Single Use)
                </p>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
      ${renderKrishnaBot(clue.hint)}
    </div>
  `;

  startTimer('round3-timer', clue.hint, 'round3');

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

    // Increment Score
    state.currentTeam.score = (state.currentTeam.score || 0) + 300;

    state.round3.currentClue++;

    // Push to Firebase
    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      score: state.currentTeam.score,
      progress: {
        round1: state.round1,
        round2: state.round2,
        round3: state.round3,
        superpowers: state.superpowers
      },
      lastLocation: clue.locationName
    }).then(async () => {
      saveState();
      if (state.round3.currentClue >= gameData.round3Clues.length) {
        const res = await dbAdmin.qualifyTeam(3, state.currentTeam.id, state.currentTeam.name);
        if (res.success) {
          renderRound3Complete();
        } else if (res.error === 'SLOTS_FULL') {
          renderWarEnded("The Codex was sealed. The final victory belongs to another house.");
        }
      }
    });

    setTimeout(() => {
      if (state.round3.currentClue < gameData.round3Clues.length) renderRound3();
    }, 800);
  } else {
    input.classList.add('wrong');
    input.value = '';
    setTimeout(() => input.classList.remove('wrong'), 500);
  }
};

window.useRound1Power = function () {
  const isRound2 = window.router.currentPath === '/round2';
  const isRound3 = window.router.currentPath === '/round3';

  if (!confirm(`Invoke the Sudarshana Chakra to skip this ${isRound3 ? 'clue' : 'location'}? This divine power is single-use.`)) return;

  if (isRound2) {
    const location = gameData.round2Locations[state.round2.currentLocation];
    state.round2.solved.push(state.round2.currentLocation);
    state.round2.codes[state.round2.currentLocation] = "POWER_USED";
    state.round2.currentLocation++;
    state.superpowers.round1 = false;

    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      superpower: "", // CLEAR STRING FIELD TO PREVENT RE-SYNC
      progress: {
        round1: state.round1,
        round2: state.round2,
        round3: state.round3,
        superpowers: state.superpowers
      },
      lastLocation: "Used Sudarshana Chakra at " + location.locationName
    });
    saveState();
    renderRound2();
  } else if (isRound3) {
    const clue = gameData.round3Clues[state.round3.currentClue];
    state.round3.solved.push(state.round3.currentClue);
    state.round3.codes[state.round3.currentClue] = "POWER_USED";
    state.round3.currentClue++;
    state.superpowers.round1 = false;

    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      superpower: "", // CLEAR STRING FIELD
      progress: {
        round1: state.round1,
        round2: state.round2,
        round3: state.round3,
        superpowers: state.superpowers
      },
      lastLocation: "Used Sudarshana Chakra at " + clue.locationName
    });
    saveState();
    renderRound3();
  }
};

window.useRound2Power = function () {
  if (!confirm("Shoot Gandiva's Arrow to instantly decode this location? This divine power is single-use.")) return;

  const clue = gameData.round3Clues[state.round3.currentClue];
  state.round3.solved.push(state.round3.currentClue);
  state.round3.codes[state.round3.currentClue] = "POWER_USED";
  state.round3.currentClue++;
  state.superpowers.round2 = false; // Single use

  dbAdmin.updateTeamProgress(state.currentTeam.id, {
    superpower: "", // CLEAR STRING FIELD
    progress: {
      round1: state.round1,
      round2: state.round2,
      round3: state.round3,
      superpowers: state.superpowers
    },
    lastLocation: "Used Gandiva's Arrow at " + clue.locationName
  });
  saveState();
  renderRound3();
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

        <div class="leaderboard-list" id="leaderboard-list">
          <div style="text-align:center; padding: var(--space-xl); color: var(--text-muted); font-style: italic;">Consulting the Codex...</div>
        </div>
      </div>

      ${renderFooter()}
    </div>
  `;

  if (window.leaderboardUnsubscribe) window.leaderboardUnsubscribe();
  window.leaderboardUnsubscribe = dbAdmin.listenToTeams((teams) => {
    const listEl = document.getElementById('leaderboard-list');
    if (!listEl) return;

    teams.sort((a, b) => (b.score || 0) - (a.score || 0));

    listEl.innerHTML = teams.map((team, i) => `
      <div class="warrior-card ${i < 3 ? 'top-warrior' : ''}">
        <div class="warrior-rank">
          <span class="rank-badge rank-${i < 3 ? i + 1 : 'other'}">${i + 1}</span>
        </div>
        <div class="warrior-info">
          <div class="warrior-name">
            ${team.name}
            ${team.superpower ? `<span class="superpower-badge">${team.superpower}</span>` : ''}
          </div>
          <div class="warrior-meta">
            <span>Round ${team.currentRound || 1}</span>
            <span class="warrior-dot">◆</span>
            <span class="${team.status === 'disqualified' ? 'status-locked' : 'status-active'}">
              ${team.status === 'disqualified' ? '✗ DQ' : '● Active'}
            </span>
          </div>
        </div>
        <div class="warrior-score">
          <div class="score-value">${team.score || 0}</div>
          <div class="score-label">Points</div>
        </div>
      </div>
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
function startTimer(elementId, hintText = null, roundId = null) {
  if (state.timer) clearInterval(state.timer);

  // If we changed rounds, reset the timer. Otherwise, keep it.
  if (roundId && state.currentTimerRound !== roundId) {
    state.timerValue = 0;
    state.currentTimerRound = roundId;
    state.krishnaHintAvailable = false;
  }

  const updateDisplay = () => {
    const mins = String(Math.floor(state.timerValue / 60)).padStart(2, '0');
    const secs = String(state.timerValue % 60).padStart(2, '0');
    const el = document.getElementById(elementId);
    if (el) el.textContent = `${mins}:${secs}`;

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
  };

  updateDisplay();

  state.timer = setInterval(() => {
    state.timerValue++;
    updateDisplay();
    // Save state every 10 seconds to avoid too many writes but keep it fresh
    if (state.timerValue % 10 === 0) saveState();
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

window.adminBulkAddTeams = async (e) => {
  e.preventDefault();
  const rawData = document.getElementById('admin-bulk-data').value;
  const lines = rawData.split('\n').filter(line => line.trim() !== '');

  const teams = lines.map(line => {
    // Split by tab, pipe, or comma
    const parts = line.split(/[\t|,|]/);
    if (parts.length < 2) return null;
    return {
      code: parts[0].trim(),
      name: parts[1].trim()
    };
  }).filter(t => t !== null);

  if (teams.length === 0) {
    alert("No valid team data found. Ensure each line has 'Event Code [tab/comma] Team Name'");
    return;
  }

  const btn = e.target.querySelector('button');
  const orgText = btn.innerText;
  btn.innerText = `Enlisting ${teams.length} teams...`;

  const success = await dbAdmin.bulkAddTeams(teams);
  if (success) {
    document.getElementById('admin-bulk-data').value = '';
    alert(`${teams.length} Teams Added Successfully!`);
  } else {
    alert('Failed to batch enlist teams.');
  }
  btn.innerText = orgText;
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

window.adminSetQualificationLimit = async (round, limit) => {
  await dbAdmin.setQualificationLimit(round, limit);
};

window.adminResetQualifiers = async (round) => {
  if (confirm(`Reset all qualified teams for Round ${round}?`)) {
    await dbAdmin.resetQualifiers(round);
  }
};

window.adminClaimSuperpower = async (e) => {
  e.preventDefault();
  const teamId = document.getElementById('claim-team-id').value;
  const code = document.getElementById('claim-code').value;
  const round = document.getElementById('claim-round').value;

  // Calculate correct code for R1 based on team's unique riddles
  const team = (state.allTeams || []).find(t => t.id === teamId);
  const riddles = team?.progress?.round1?.riddles || gameData.round1Riddles.slice(0, 5);
  const correctCode = riddles.map(r => r.answer[0]).join('').toUpperCase();

  const btn = e.target.querySelector('button');
  const orgText = btn.innerHTML;
  btn.innerText = 'Verifying...';

  const result = await dbAdmin.claimSuperpowerWithCode(round, teamId, code, correctCode);

  if (result && result.success) {
    alert(`Success! Superpower assigned to ${result.teamName}`);
    router.navigate('/admin');
  } else {
    alert(result?.error || 'Failed to claim superpower');
    btn.innerHTML = orgText;
  }
};

function renderAdminSuperpowerClaim() {
  const app = document.getElementById('app');
  if (!state.adminLoggedIn) {
    router.navigate('/admin');
    return;
  }

  app.innerHTML = `
    ${renderNav('admin')}
    <div class="page" style="padding-top:40px;">
      <div class="login-container">
        <div class="login-card">
          <h2 class="login-title">Award Superpower</h2>
          <p class="login-sanskrit">वरदान सभा</p>
          
          <form onsubmit="adminClaimSuperpower(event)">
            <div class="form-group">
              <label class="form-label">Select Warrior Team</label>
              <select id="claim-team-id" class="form-input" style="background:var(--bg-dark)" required>
                <option value="">Choose a team...</option>
                ${(state.allTeams || []).map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Round</label>
              <select id="claim-round" class="form-input" style="background:var(--bg-dark)" required>
                <option value="round1">Round 1: The Signal</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Sacred Code</label>
              <input id="claim-code" class="form-input" placeholder="Enter code presented by team" required />
            </div>
            <button type="submit" class="btn btn-primary login-btn">⟡ Award Divine Power ⟡</button>
            <button type="button" class="btn btn-outline w-full mt-2" onclick="router.navigate('/admin')">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function renderQualified(round, position) {
  const app = document.getElementById('app');
  const secretCode = state.round1.secretCode;

  app.innerHTML = `
    ${renderNav()}
    <div class="page victory-page">
      <div class="victory-container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">॥ योग्यता सिद्धिः ॥</p>
          <h2 class="section-title">YOU ARE QUALIFIED!</h2>
          <span class="status-badge status-completed">Position: #${position}</span>
        </div>
        <div class="riddle-card" style="text-align: center;">
          <p style="color: var(--gold); font-size: 1.2rem; margin-bottom: 20px;">
            Warrior ${state.currentTeam?.name}, you have proven your worth in Round ${round}.
          </p>

          ${round === 1 ? `
            <h3 style="font-family: var(--font-display); color: var(--gold); font-size: 1.3rem; margin-bottom: var(--space-md);">
              Your Sacred Code
            </h3>
            <div class="code-input-group" style="justify-content:center; margin-bottom:20px;">
              ${secretCode.split('').map(ch => `
                <div class="code-char" style="display:flex;align-items:center;justify-content:center;pointer-events:none; border-color:var(--gold); color:var(--gold-light); text-shadow:0 0 10px var(--glow-gold); width:40px; height:50px;">${ch}</div>
              `).join('')}
            </div>
            <p style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:20px;">
              Present this code at the Public Claim Sabha to earn your superpower.
            </p>
          ` : ''}

          <p style="color: var(--text-secondary); line-height: 1.6;">
            Wait for the Admin to commence the next stage of the Kurukshetra. 
            Do not refresh your browser, or you may lose your synchronization with the cosmos.
          </p>
          <div class="mt-3">
             <div class="hero-chakra" style="width:80px; height:80px; margin: 0 auto;">☸</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderWarEnded(reason) {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page signal-page">
      <div class="signal-container" style="max-width: 600px; margin: 0 auto; text-align: center;">
        <h2 class="section-title" style="color: var(--sindoor); font-size: 3rem;">WAR HAS ENDED</h2>
        <p class="section-sanskrit">॥ युद्धस्य विरामः ॥</p>
        
        <div class="riddle-card" style="margin-top: 30px; border-color: var(--sindoor);">
          <p style="color: var(--text-primary); font-size: 1.1rem; margin-bottom: 20px;">
            ${reason || "The time for this trial has passed."}
          </p>
          <p style="color: var(--text-secondary); font-style: italic;">
            "Better luck next time, O Warrior. Even in defeat, there is wisdom to be gained."
          </p>
          <button class="btn btn-primary mt-3" onclick="router.navigate('/leaderboard')">
            Hall of Warriors
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderRound3Complete() {
  if (state.currentTeam) {
    dbAdmin.updateTeamProgress(state.currentTeam.id, {
      lastLocation: 'QUEST COMPLETED!',
      status: 'qualified'
    });
  }

  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page victory-page">
      <div class="victory-container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">जयतु कोडेक्सः — विजयः</p>
          <h2 class="section-title">The Codex is Unlocked!</h2>
          <span class="status-badge status-completed">✓ Param-Vijayi</span>
        </div>

        ${renderDivider('⚔')}

        <div class="riddle-card" style="text-align: center;">
          <h3 style="font-family: var(--font-display); color: var(--gold); font-size: 1.8rem; margin-bottom: var(--space-md);">
            Congratulations, ${state.currentTeam?.name || 'Warrior'}!
          </h3>

          <p style="color: var(--text-secondary); font-style: italic; margin-bottom: var(--space-xl);">
            You have successfully decoded the ancient Codex and preserved the legacy of Mahabharata. Your name shall be etched in the halls of Hastinapur!
          </p>

          <div style="padding: var(--space-xl); background: rgba(201,168,76,0.1); border: 1px solid var(--gold); border-radius: var(--radius-md); margin-bottom: var(--space-2xl);">
            <p style="color:var(--gold-light); font-size:0.9rem; letter-spacing:1px; margin-bottom:5px;">FINAL SCORE</p>
            <h2 style="font-size:3rem; color:var(--gold); font-family:var(--font-accent);">${state.currentTeam?.score || 0} Points</h2>
          </div>

          <button class="btn btn-primary" onclick="router.navigate('/leaderboard')">
            View Hall of Warriors
          </button>
        </div>
      </div>
    </div>
  `;
}

// =====================================================
// GLOBAL CLAIM PAGE (PUBLIC)
// =====================================================
function renderClaimPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNav()}
    <div class="page claim-page">
      <div class="claim-container">
        <div class="text-center mb-4">
          <p class="section-sanskrit">॥ वरदान सिद्धिः ॥</p>
          <h2 class="section-title">Divine Blessing Portal</h2>
          <p class="section-subtitle">Enter the Sacred Code from your trial to claim your Reward.</p>
        </div>

        <div class="riddle-card claim-card">
          <div class="claim-instruction">
            Enter your 5-Letter Sacred Code
          </div>
          
          <div class="pin-entry-container" id="pin-entry">
            <input type="text" maxlength="1" class="pin-box" autofocus />
            <input type="text" maxlength="1" class="pin-box" />
            <input type="text" maxlength="1" class="pin-box" />
            <input type="text" maxlength="1" class="pin-box" />
            <input type="text" maxlength="1" class="pin-box" />
          </div>

          <div id="claim-message" class="mt-4 text-center"></div>

          <button class="btn btn-primary mt-4" onclick="handleGlobalClaim()" style="width:100%; justify-content:center;">
             ⟡ Reveal Divine Reward ⟡
          </button>
        </div>

        <div id="claim-result-overlay" class="claim-result-overlay">
           <div class="claim-success-content">
              <div class="success-chakra">☸</div>
              <h2 id="success-team-name">TEAM NAME</h2>
              <p>HAS ASCENDED!</p>
              <div class="success-reward">CHAKRA OF SUDARSHANA OBTAINED</div>
              <p class="success-shloka">॥ यत्र धर्मस्तत्र जयः ॥</p>
              <button class="btn btn-primary mt-4" onclick="document.getElementById('claim-result-overlay').classList.remove('active')">
                Continue Quest
              </button>
           </div>
        </div>
      </div>
    </div>
  `;

  // PIN Entry Logic
  const boxes = document.querySelectorAll('.pin-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', (e) => {
      if (box.value.length === 1 && i < boxes.length - 1) {
        boxes[i + 1].focus();
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && box.value.length === 0 && i > 0) {
        boxes[i - 1].focus();
      }
      if (e.key === 'Enter') {
        handleGlobalClaim();
      }
    });
  });
}

window.handleGlobalClaim = async function () {
  const boxes = document.querySelectorAll('.pin-box');
  const code = Array.from(boxes).map(b => b.value).join('').toUpperCase();
  const msgEl = document.getElementById('claim-message');

  if (code.length < 5) {
    msgEl.innerHTML = '<span style="color:var(--sindoor)">Code incomplete, warrior.</span>';
    return;
  }

  msgEl.innerHTML = '<span style="color:var(--gold)">Consulting the Akashic record...</span>';

  const result = await dbAdmin.claimSuperpowerWithGlobalCode('round1', code);

  if (result && result.success) {
    const overlay = document.getElementById('claim-result-overlay');
    const teamEl = document.getElementById('success-team-name');
    teamEl.innerText = result.teamName;
    overlay.classList.add('active');
    msgEl.innerHTML = '';
    // Clear boxes
    boxes.forEach(b => b.value = '');
  } else {
    msgEl.innerHTML = `<span style="color:var(--sindoor)">${result?.error || 'Claim failed.'}</span>`;
    boxes.forEach(b => b.classList.add('wrong'));
    setTimeout(() => boxes.forEach(b => b.classList.remove('wrong')), 500);
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
    <div class="page" style="padding-top:20px; padding-bottom:100px;">
      <div class="container">
        <div class="text-center mb-3">
          <p class="section-sanskrit">॥ प्रशासन सभा ॥</p>
          <h2 class="section-title">Admin Dashboard</h2>
          <p class="section-subtitle">Real-time management of the sacred Codex Hunt.</p>
        </div>

        <div class="admin-grid">
          <div class="admin-card">
            <h3 style="color:var(--gold); margin-bottom:15px; font-family:var(--font-accent); font-size:1.1rem;">Game Mastery</h3>
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; gap:10px;">
                <button id="btn-create-game" class="btn btn-primary" style="flex:1" onclick="adminCreateGame()">Init Game</button>
                <button class="btn btn-outline" style="color:var(--sindoor); border-color:var(--sindoor);" onclick="adminToggleGame(false)">Halt</button>
              </div>

              <button class="btn btn-sindoor" onclick="router.navigate('/admin/superpower')" style="background: linear-gradient(135deg, var(--gold), var(--saffron)); border:none; color:black; font-weight:bold;">
                ⟡ Award Superpower ⟡
              </button>
              
              <div style="margin-top:10px;">
                <p style="font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:8px; letter-spacing:1px;">Active Phase</p>
                <div style="display:flex; gap:8px;">
                  <button class="btn btn-outline" style="padding: 6px 12px; font-size:0.8rem; flex:1" onclick="adminSetRound(1)">R1</button>
                  <button class="btn btn-outline" style="padding: 6px 12px; font-size:0.8rem; flex:1" onclick="adminSetRound(2)">R2</button>
                  <button class="btn btn-outline" style="padding: 6px 12px; font-size:0.8rem; flex:1" onclick="adminSetRound(3)">R3</button>
                </div>
              </div>

              <div id="admin-game-status" style="margin-top:15px; padding:10px; background:rgba(0,0,0,0.3); border-radius:var(--radius-sm); font-size:0.75rem; color:var(--gold-light);">
                Loading status...
              </div>
            </div>
          </div>

          <div class="admin-card">
            <h3 style="color:var(--gold); margin-bottom:15px; font-family:var(--font-accent); font-size:1.1rem;">Quest Limits</h3>
            <div style="display:flex; flex-direction:column; gap:15px;">
              ${[1, 2, 3].map(r => `
                <div style="padding:10px; background:rgba(0,0,0,0.2); border-radius:var(--radius-sm);">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:0.8rem; color:var(--gold-light)">Round ${r} Slots</span>
                    <div style="display:flex; gap:5px; align-items:center;">
                      <input type="number" id="limit-r${r}" style="width:50px; background:var(--bg-dark); border:1px solid var(--border); color:var(--gold); padding:2px 5px; font-size:0.8rem;" value="${state.gameStatus?.qualificationLimits?.[`round${r}`] || 0}" />
                      <button class="btn btn-outline" style="padding:2px 8px; font-size:0.6rem;" onclick="adminSetQualificationLimit(${r}, document.getElementById('limit-r${r}').value)">Set</button>
                    </div>
                  </div>
                  <div style="display:flex; justify-content:space-between; margin-top:8px;">
                     <span id="limit-label-r${r}" style="font-size:0.6rem; color:var(--text-muted)">Current: ${state.gameStatus?.qualifiedTeams?.[`round${r}`]?.length || 0} / ${state.gameStatus?.qualificationLimits?.[`round${r}`] || 0}</span>
                     <button style="background:none; border:none; color:var(--sindoor); font-size:0.6rem; cursor:pointer;" onclick="adminResetQualifiers(${r})">Reset List</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="admin-card">
            <h3 style="color:var(--gold); margin-bottom:15px; font-family:var(--font-accent); font-size:1.1rem;">Recruit Team</h3>
            <form onsubmit="adminAddTeam(event)" style="display:flex; flex-direction:column; gap:12px;">
              <input class="form-input" id="admin-team-name" placeholder="Team Name" required style="background:rgba(0,0,0,0.2)" />
              <input class="form-input" id="admin-team-code" placeholder="Secret Access Code" required style="background:rgba(0,0,0,0.2)" />
              <button type="submit" class="btn btn-sindoor">Enlist Warrior Team</button>
            </form>
          </div>

          <div class="admin-card">
            <h3 style="color:var(--gold); margin-bottom:15px; font-family:var(--font-accent); font-size:1.1rem;">Bulk Enlist</h3>
            <p style="font-size:0.6rem; color:var(--text-muted); margin-bottom:10px;">Format: Code [tab/comma] Name (CSV/Excel support)</p>
            <form onsubmit="adminBulkAddTeams(event)" style="display:flex; flex-direction:column; gap:12px;">
              <textarea class="form-input" id="admin-bulk-data" placeholder="EVENTCODE	TEAM NAME..." rows="4" required style="background:rgba(0,0,0,0.2); font-family:monospace; font-size:0.7rem;"></textarea>
              <button type="submit" class="btn btn-primary">⟡ Batch Enlist ⟡</button>
            </form>
          </div>
        </div>

        <div style="margin-top:40px;">
          <h3 style="color:var(--gold); margin-bottom:15px; font-family:var(--font-accent); text-align:center;">Team Monitor — Live Pulse</h3>
          <div id="admin-teams-grid" class="team-monitor-grid">
            <div style="grid-column: 1/-1; text-align:center; padding: 50px; color:var(--text-muted);">Consulting the Akashic records...</div>
          </div>
        </div>

        <div style="margin-top:60px;">
          <h3 style="color:var(--gold); margin-bottom:20px; font-family:var(--font-accent); text-align:center;">Codex Management</h3>
          <div class="admin-card" style="max-width:800px; margin: 0 auto 30px;">
            <h4 style="color:var(--text-primary); margin-bottom:15px; font-family:var(--font-ui);">Draft New Riddle</h4>
            <form onsubmit="adminAddRiddle(event)" style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
              <select name="round" class="form-input" style="background:var(--bg-dark); grid-column: span 2;" required>
                <option value="1">Round 1: The Signal</option>
                <option value="2">Round 2: Mini Treasure Hunt</option>
                <option value="3">Round 3: The Codex</option>
              </select>
              <textarea name="shloka" class="form-input" placeholder="Sanskrit Shloka..." rows="2" required></textarea>
              <input type="text" name="translation" class="form-input" placeholder="Translation" required />
              <textarea name="riddle" class="form-input" placeholder="Riddle Text..." rows="2" required></textarea>
              <input type="text" name="answer" class="form-input" placeholder="Answer/Code" required />
              <button type="submit" class="btn btn-primary" style="grid-column: span 2;">Add to Codex</button>
            </form>
          </div>
          <div id="admin-riddles-list" class="admin-grid"></div>
        </div>
      </div>
    </div>
    `;

  // Init Realtime Listeners
  if (unsubscribeTeams) unsubscribeTeams();
  if (unsubscribeGame) unsubscribeGame();
  if (unsubscribeRiddles) unsubscribeRiddles();

  unsubscribeGame = dbAdmin.listenToGame((game) => {
    state.gameStatus = game; // Store globally
    const el = document.getElementById('admin-game-status');
    if (el) {
      if (game) {
        el.innerHTML = `
          <div style="display:flex; justify-content:space-between;">
            <span>Game Active:</span> 
            <span style="color:${game.isActive ? 'var(--success-light)' : 'var(--sindoor)'}">${game.isActive ? 'YES' : 'NO'}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:5px;">
            <span>Current Round:</span> 
            <span style="color:var(--gold)">Round ${game.currentRound}</span>
          </div>
          <div style="font-size:0.6rem; color:var(--text-muted); margin-top:8px;">
             ${[1, 2, 3].map(r => `R${r}: ${game.qualifiedTeams?.[`round${r}`]?.length || 0}/${game.qualificationLimits?.[`round${r}`] || 0}`).join(' | ')}
          </div>
        `;

        // Update individual limit inputs and labels if they exist
        [1, 2, 3].forEach(r => {
          const input = document.getElementById(`limit-r${r}`);
          const label = document.getElementById(`limit-label-r${r}`);
          const limitVal = game.qualificationLimits?.[`round${r}`] || 0;
          const currentVal = game.qualifiedTeams?.[`round${r}`]?.length || 0;

          if (input && document.activeElement !== input) {
            input.value = limitVal;
          }
          if (label) {
            label.innerText = `Current: ${currentVal} / ${limitVal}`;
          }
        });
      } else {
        el.innerText = 'Game Status: Offline / Not Created';
      }
    }
  });

  unsubscribeTeams = dbAdmin.listenToTeams((teams) => {
    state.allTeams = teams; // Store for other pages
    const grid = document.getElementById('admin-teams-grid');
    if (!grid) return;

    teams.sort((a, b) => b.score - a.score);

    grid.innerHTML = teams.map(t => {
      const lastSeen = t.lastActivityAt ? new Date(t.lastActivityAt.seconds * 1000).toLocaleTimeString() : 'N/A';
      const progressLabel = t.progress ?
        (t.progress.round3?.currentClue > 0 ? `Codex: Clue ${t.progress.round3.currentClue}` :
          t.progress.round2?.currentLocation > 0 ? `Hunt: Location ${t.progress.round2.currentLocation}` :
            `Signal: Riddle ${t.progress.round1?.currentRiddle || 0}`) : 'Not Started';

      const statusClass = t.status === 'qualified' ? 'status-q' : t.status === 'disqualified' ? 'status-dq' : 'status-l';

      return `
        <div class="team-admin-card ${!t.sessionActive ? 'offline' : ''}">
          <div class="team-admin-header">
            <div>
              <div class="team-admin-name">${t.name}</div>
              <div class="team-admin-code">ID: ${t.code}</div>
            </div>
            <div class="team-admin-status ${statusClass}">${t.status.toUpperCase()}</div>
          </div>

          <div class="team-admin-stats">
            <div class="stat-box">
              <div class="stat-label">Valor (Score)</div>
              <div class="stat-value">${t.score || 0} pts</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Current Quest</div>
              <div class="stat-value">${progressLabel}</div>
            </div>
          </div>

          <div class="team-admin-location">
            <div class="location-title">
              <span>📍</span> Last Recorded Location
            </div>
            <div class="location-text">${t.lastLocation || 'At the Gates'}</div>
            <div class="pulse-info">Last Pulse: ${lastSeen}</div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:5px;">
            <div class="session-indicator">
              <div class="${t.sessionActive ? 'dot-online' : 'dot-offline'}"></div>
              <span style="color:${t.sessionActive ? 'var(--success-light)' : 'var(--text-muted)'}">${t.sessionActive ? 'LINKED' : 'UNLINKED'}</span>
            </div>
            <div style="font-size:0.6rem; color:var(--text-muted);">Joined: ${t.joinedAt ? new Date(t.joinedAt.seconds * 1000).toLocaleTimeString() : '?'}</div>
          </div>

          <div class="team-admin-actions">
            <button title="Update Score" class="action-btn btn-pts" onclick="adminUpdateScore('${t.id}')">Pts</button>
            <button title="Qualify" class="action-btn btn-q ${t.status === 'qualified' ? 'active-q' : ''}" onclick="adminSetStatus('${t.id}', 'qualified')">Q</button>
            <button title="Disqualify" class="action-btn btn-dq ${t.status === 'disqualified' ? 'active-q' : ''}" onclick="adminSetStatus('${t.id}', 'disqualified')">DQ</button>
            <button title="Remove Team" class="action-btn btn-del" onclick="adminDeleteTeam('${t.id}')">Del</button>
          </div>
        </div>
      `;
    }).join('') || '<div style="grid-column: 1/-1; text-align:center; padding: 50px; color:var(--text-muted);">No teams have entered the Sabha yet.</div>';
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
