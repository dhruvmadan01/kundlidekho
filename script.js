const form = document.getElementById("kundliForm");
const resultCard = document.getElementById("resultCard");
const landingScreen = document.getElementById("landingScreen");
const startKundli = document.getElementById("startKundli");
const questionContainer = document.getElementById("questionContainer");
const questionPrompt = document.getElementById("questionPrompt");
const questionInput = document.getElementById("questionInput");
const nextQuestion = document.getElementById("nextQuestion");

const answers = {
  name: "",
  dob: "",
  birthTime: "",
  place: "",
  gpa: "",
  snack: "",
  procrastination: "",
};

const steps = [
  { key: "name", prompt: "First, what is your full name?" },
  { key: "dob", prompt: "Your date of birth?" },
  { key: "birthTime", prompt: "What time were you born?" },
  { key: "place", prompt: "Where were you born?" },
  { key: "gpa", prompt: "What is your college GPA?" },
  { key: "snack", prompt: "What’s your go-to study snack?" },
  { key: "procrastination", prompt: "How do you usually procrastinate?" },
];

let currentStep = 0;

function getRashi(month, day) {
  const rashis = [
    { name: "Mesh (Aries)", start: [3, 21] },
    { name: "Vrishabh (Taurus)", start: [4, 20] },
    { name: "Mithun (Gemini)", start: [5, 21] },
    { name: "Karka (Cancer)", start: [6, 22] },
    { name: "Singha (Leo)", start: [7, 23] },
    { name: "Kanya (Virgo)", start: [8, 23] },
    { name: "Tula (Libra)", start: [9, 23] },
    { name: "Vrischik (Scorpio)", start: [10, 23] },
    { name: "Dhanu (Sagittarius)", start: [11, 22] },
    { name: "Makar (Capricorn)", start: [12, 22] },
    { name: "Kumbh (Aquarius)", start: [1, 20] },
    { name: "Meen (Pisces)", start: [2, 19] },
  ];

  const dateValue = month * 100 + day;
  for (let i = 0; i < rashis.length; i += 1) {
    const current = rashis[i];
    const next = rashis[(i + 1) % rashis.length];
    const currentValue = current.start[0] * 100 + current.start[1];
    const nextValue = next.start[0] * 100 + next.start[1];

    if (i === rashis.length - 1) {
      if (dateValue >= currentValue || dateValue < nextValue) return current.name;
    } else if (dateValue >= currentValue && dateValue < nextValue) {
      return current.name;
    }
  }

  return rashis[0].name;
}

function getMoonSign(month, day) {
  const moonSigns = [
    "Chandra in Krittika",
    "Chandra in Rohini",
    "Chandra in Mrigashira",
    "Chandra in Ardra",
    "Chandra in Punarvasu",
    "Chandra in Pushya",
    "Chandra in Ashlesha",
    "Chandra in Magha",
    "Chandra in Purva Phalguni",
    "Chandra in Uttara Phalguni",
    "Chandra in Hasta",
    "Chandra in Chitra",
  ];
  const index = (month + Math.floor(day / 10)) % moonSigns.length;
  return moonSigns[index];
}

function getLagna(hour, month) {
  const lagnaList = ["Mesha Lagna", "Vrishabha Lagna", "Mithuna Lagna", "Karka Lagna", "Simha Lagna", "Kanya Lagna", "Tula Lagna", "Vrischika Lagna", "Dhanu Lagna", "Makar Lagna", "Kumbha Lagna", "Meena Lagna"];
  const index = (hour + month) % lagnaList.length;
  return lagnaList[index];
}

function getNakshatra(dayOfYear, hour) {
  const nakshatras = [
    "Ashwini",
    "Bharani",
    "Krittika",
    "Rohini",
    "Mrigashira",
    "Ardra",
    "Punarvasu",
    "Pushya",
    "Ashlesha",
    "Magha",
    "Purva Phalguni",
    "Uttara Phalguni",
    "Hasta",
    "Chitra",
    "Swati",
    "Vishakha",
    "Anuradha",
    "Jyeshtha",
    "Mula",
    "Purva Ashadha",
    "Uttara Ashadha",
    "Shravana",
    "Dhanishta",
    "Shatabhisha",
    "Purva Bhadrapada",
    "Uttara Bhadrapada",
    "Revati",
  ];

  const index = (dayOfYear + hour) % nakshatras.length;
  return nakshatras[index];
}

function getPlanetaryMessage(rashi, lagna) {
  const messages = {
    "Mesh (Aries)": "Your inner fire is strong. This is the perfect vibe for taking an exam with confidence.",
    "Vrishabh (Taurus)": "Steady energy surrounds you. You’re built for long study sessions and strong coffee.",
    "Mithun (Gemini)": "Your brain is buzzing. Group chats, late-night notes, and creative hacks are your allies.",
    "Karka (Cancer)": "Your emotions are solid fuel. Use them to support your friends and your assignment drafts.",
    "Singha (Leo)": "You’ve got boss energy. Lead the project team and claim the spotlight in presentations.",
    "Kanya (Virgo)": "Your organization is queen. Time to make a schedule and actually stick to it.",
    "Tula (Libra)": "Balance is calling. Social life plus study life = your best semester yet.",
    "Vrischik (Scorpio)": "Your intensity is unmatched. Use it for deep focus, not for doomscrolling.",
    "Dhanu (Sagittarius)": "Adventure mode is on. Pick a fun elective, explore clubs, and learn beyond the syllabus.",
    "Makar (Capricorn)": "Hard work pays off. Your grind is visible to professors and future you.",
    "Kumbh (Aquarius)": "New ideas are your thing. Bring memes to the group project and innovation to your study plan.",
    "Meen (Pisces)": "Your creativity is peak. Write notes as art, not just bullet points.",
  };

  const baseMessage = messages[rashi] || "Your path is guided by calm reflection and steady growth.";
  const lagnaNote = lagna.includes("Lagna") ? `Your ascendant is ${lagna}, giving you a strong sense of direction.` : "";
  return `${baseMessage} ${lagnaNote}`;
}

function getCollegeComment(gpa) {
  const score = parseFloat(gpa);
  if (!score || isNaN(score)) {
    return "Your GPA is mysterious, like a hidden meme stash. Time to reveal it when the professor asks.";
  }
  if (score >= 9) {
    return "Your GPA is flex-worthy. You can totally ace that seminar and still order pizza.";
  }
  if (score >= 7) {
    return "You’re in the solid zone. Study smart, chill harder, and keep the good vibes.";
  }
  return "Your GPA says you’re on the struggle bus, but you’ve got the energy to make a comeback.";
}

function getSnackEnergy(snack) {
  if (!snack) {
    return "No snack info means you might be surviving on air and caffeine.";
  }
  const lowercase = snack.toLowerCase();
  if (lowercase.includes("maggi") || lowercase.includes("noodles")) {
    return "Maggi power activated. You’re fueled by instant noodles and midnight deadlines.";
  }
  if (lowercase.includes("coffee") || lowercase.includes("chai")) {
    return "Caffeine vibes detected. Your brain is wired for late-night lecture slides.";
  }
  return `Your snack choice of ${snack} shows you’re staying cozy while conquering campus life.`;
}

function getProcrastinationAdvice(procrastination) {
  if (!procrastination) {
    return "No procrastination details? Nice, either you’re efficient or you’re hiding something.";
  }
  if (procrastination.toLowerCase().includes("netflix") || procrastination.toLowerCase().includes("youtube")) {
    return "Netflix breaks are real, but don’t let a single episode turn into a whole semester.";
  }
  if (procrastination.toLowerCase().includes("napping") || procrastination.toLowerCase().includes("sleep")) {
    return "Naps are cute, but set an alarm; your study session wants to happen too.";
  }
  return `Procrastinating with ${procrastination}? That’s creative, but maybe save it for after the deadline.`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

startKundli.addEventListener("click", () => {
  landingScreen.classList.add("hidden");
  form.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const step = steps[currentStep];
  questionPrompt.textContent = step.prompt;
  questionInput.value = answers[step.key] || "";
  questionInput.type = step.key === "dob" ? "date" : step.key === "birthTime" ? "time" : "text";
  questionInput.placeholder = step.key === "name" ? "e.g. Riya from 2nd year" : step.key === "place" ? "e.g. Delhi, India" : step.key === "gpa" ? "e.g. 8.5 / 10" : step.key === "snack" ? "e.g. Maggi, samosa, coffee" : step.key === "procrastination" ? "e.g. Netflix, napping, group chat" : "";
  nextQuestion.textContent = currentStep < steps.length - 1 ? "Next" : "Reveal My Kundli";
}

nextQuestion.addEventListener("click", () => {
  const step = steps[currentStep];
  const value = questionInput.value.trim();
  if (!value) {
    alert("Please fill in this answer before continuing.");
    return;
  }

  answers[step.key] = value;
  currentStep += 1;

  if (currentStep >= steps.length) {
    form.classList.add("hidden");
    showResult();
    return;
  }

  showQuestion();
});

function showResult() {
  const { name, dob, birthTime, place, gpa, snack, procrastination } = answers;
  const birthDate = new Date(`${dob}T${birthTime}`);
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const hour = birthDate.getHours();
  const dayOfYear = Math.floor((birthDate - new Date(birthDate.getFullYear(), 0, 0)) / 86400000);

  const rashi = getRashi(month, day);
  const moonSign = getMoonSign(month, day);
  const lagna = getLagna(hour, month);
  const nakshatra = getNakshatra(dayOfYear, hour);
  const guidance = getPlanetaryMessage(rashi, lagna);
  const gpaComment = getCollegeComment(gpa);
  const snackEnergy = getSnackEnergy(snack);
  const procrastinationAdvice = getProcrastinationAdvice(procrastination);

  resultCard.innerHTML = `
    <div class="result-header">
      <p class="eyebrow">Campus Kundli</p>
      <h2>${name || "Campus Star"}</h2>
      <p>${formatDate(dob)} • ${birthTime || "Time not provided"} • ${place || "Your hometown"}</p>
      <p><strong>GPA:</strong> ${gpa || "Still counting"}</p>
      <p><strong>Snack:</strong> ${snack || "Mystery munchies"}</p>
    </div>

    <div class="stats">
      <div class="stat">
        <span>Rashi</span>
        <strong>${rashi}</strong>
      </div>
      <div class="stat">
        <span>Moon Sign</span>
        <strong>${moonSign}</strong>
      </div>
      <div class="stat">
        <span>Ascendant</span>
        <strong>${lagna}</strong>
      </div>
    </div>

    <div class="reading">
      <h3>Campus Vibes</h3>
      <p>${guidance}</p>
      <p>${gpaComment}</p>
      <p>${snackEnergy}</p>
      <p>${procrastinationAdvice}</p>

      <h3>Student Guide</h3>
      <ul>
        <li>Finish one assignment before it becomes a bigger project.</li>
        <li>Use snack breaks to recharge, not to scroll forever.</li>
        <li>Trust your stars, but also trust your calendar.</li>
      </ul>
    </div>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
});
