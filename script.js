// ==========================================================
// Elements
// ==========================================================

const openBtn      = document.getElementById("openBtn");
const landing      = document.getElementById("landing");
const envelope     = document.getElementById("envelope");

const letterSection = document.getElementById("letterSection");
const letterText     = document.getElementById("letterText");
const letterScroll   = document.getElementById("letterScroll");
const progressFill   = document.getElementById("progressFill");
const scrollHint     = document.getElementById("scrollHint");
const continueBtn1   = document.getElementById("continueBtn1");

const catSection   = document.getElementById("catSection");
const cat          = document.getElementById("cat");
const continueBtn2 = document.getElementById("continueBtn2");

const ending = document.getElementById("ending");
const music  = document.getElementById("music");

// ==========================================================
// The letter
// ==========================================================

const message = `happy 4 months bachuu ❤️

i still cant believe its already been 4 months with u it feels like yesterday we started talking and somehow u became the most important person in my life thank u for loving me even when i'm difficult thank u for staying even when i messed up and thank u for every laugh every call every little moment we've shared they all mean more to me than i could ever explain

i love u so so much and i dont think i'll ever be able to put all of it into words ur the first person i wanna talk to when something happens the first person i think about when i wake up and the last person on my mind before i sleep u make my days better just by being in them and i honestly cant imagine my life without u anymore

i know i havent been perfect and i know i've hurt u in ways i never wanted to and i'll always be sorry for that but one thing thats never changed not even for a second is how much i love u i choose u every single day and i'd choose u again and again without even thinking

i hope this is just the beginning of so many more months and years with u i wanna keep making memories with u keep annoying u keep making u laugh keep growing with u and keep loving u more than i did the day before

happy 4 months my love ❤️ thank u for being my favorite person thank u for being u and thank u for letting me love someone as beautiful as u i love u more than i'll ever be able to explain`;

letterText.textContent = message;

// ==========================================================
// Screen switching helper
// ==========================================================

function showScreen(hide, show) {
  hide.classList.remove("active", "entering");
  show.classList.add("active", "entering");
  show.addEventListener("animationend", () => show.classList.remove("entering"), { once: true });
}

// ==========================================================
// Music fade-in (clamped so it never throws on float drift)
// ==========================================================

function fadeMusic() {
  music.volume = 0;
  music.play().catch(() => { /* autoplay blocked until gesture; button click already is one */ });

  let volume = 0;
  const fade = setInterval(() => {
    volume = Math.min(1, volume + 0.02);
    music.volume = volume;
    if (volume >= 1) clearInterval(fade);
  }, 120);
}

music.loop = true;

// ==========================================================
// Open envelope -> letter
// ==========================================================

openBtn.onclick = () => {
  if (navigator.vibrate) navigator.vibrate(40);

  fadeMusic();
  envelope.classList.add("open");
  openBtn.disabled = true;

  setTimeout(() => {
    showScreen(landing, letterSection);
    initLetterScrollGate();
  }, 1400);
};

// ==========================================================
// Letter: gate the Continue button behind actually scrolling
// through the whole message
// ==========================================================

function initLetterScrollGate() {
  const checkProgress = () => {
    const max = letterScroll.scrollHeight - letterScroll.clientHeight;
    const progress = max <= 0 ? 1 : letterScroll.scrollTop / max;
    progressFill.style.width = `${Math.min(100, progress * 100)}%`;

    if (progress >= 0.96) {
      unlockContinue1();
    }
  };

  letterScroll.addEventListener("scroll", checkProgress);
  // Run once in case the letter already fits without scrolling
  checkProgress();
}

function unlockContinue1() {
  if (!continueBtn1.classList.contains("unlocked")) {
    continueBtn1.classList.remove("locked");
    continueBtn1.classList.add("unlocked");
    continueBtn1.disabled = false;
    scrollHint.classList.add("hidden");
  }
}

continueBtn1.onclick = () => {
  if (continueBtn1.disabled) return;
  showScreen(letterSection, catSection);
};

// ==========================================================
// Cat interaction
// ==========================================================

cat.onclick = () => {
  cat.style.transform = "scale(1.1) rotate(-6deg)";
  setTimeout(() => { cat.style.transform = "scale(1)"; }, 250);

  createLilies();

  if (continueBtn2.style.display !== "inline-block") {
    continueBtn2.style.display = "inline-block";
    continueBtn2.animate(
      [
        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 700, fill: "forwards" }
    );
  }
};

function createLilies() {
  for (let i = 0; i < 40; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.textContent = Math.random() > 0.5 ? "🤍" : "🌸";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 3 + Math.random() * 4 + "s";
    petal.style.fontSize = 18 + Math.random() * 15 + "px";
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 7000);
  }
}

continueBtn2.onclick = () => {
  showScreen(catSection, ending);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ==========================================================
// Ambient floating hearts
// ==========================================================

setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "petal";
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 6 + Math.random() * 5 + "s";
  heart.style.fontSize = 10 + Math.random() * 15 + "px";
  heart.style.opacity = ".5";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}, 1200);

// ==========================================================
// Init
// ==========================================================

landing.classList.add("active");
