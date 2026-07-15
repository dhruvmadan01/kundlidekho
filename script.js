const form = document.getElementById("kundliForm");
const resultCard = document.getElementById("resultCard");

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
    "Mesh (Aries)": "Your inner fire is strong. This is a time to act with courage and clarity.",
    "Vrishabh (Taurus)": "Steady energy surrounds you. Patience and grounded choices will bring peace.",
    "Mithun (Gemini)": "Your mind is sharp and curious. Communication and learning will open new doors.",
    "Karka (Cancer)": "Emotional depth supports your decisions. Nurture home, family, and your heart.",
    "Singha (Leo)": "Confidence shines through your path. Lead with warmth and self-belief.",
    "Kanya (Virgo)": "Your discipline is your strength. Focus on refinement and meaningful service.",
    "Tula (Libra)": "Harmony matters. Seek balance in relationships and create beauty around you.",
    "Vrischik (Scorpio)": "Your intuition is powerful. Trust your instincts and stay resilient.",
    "Dhanu (Sagittarius)": "Expansion and wisdom are your allies. Travel, study, and explore.",
    "Makar (Capricorn)": "Purpose fuels your progress. Hard work and responsibility will shape your future.",
    "Kumbh (Aquarius)": "Innovation and independence guide you. Stay open to new ideas and communities.",
    "Meen (Pisces)": "Compassion and imagination are your gifts. Follow your spiritual and creative path.",
  };

  const baseMessage = messages[rashi] || "Your path is guided by calm reflection and steady growth.";
  const lagnaNote = lagna.includes("Lagna") ? `Your ascendant is ${lagna}, giving you a strong sense of direction.` : "";
  return `${baseMessage} ${lagnaNote}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value;
  const birthTime = document.getElementById("birthTime").value;
  const place = document.getElementById("place").value.trim();
  const gender = document.getElementById("gender").value;

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

  resultCard.innerHTML = `
    <div class="result-header">
      <p class="eyebrow">प्रेम और शुभाशिष</p>
      <h2>${name || "A Devotee"}</h2>
      <p>${formatDate(dob)} • ${birthTime || "Time not provided"} • ${place || "A sacred place"}</p>
      <p><strong>Gender:</strong> ${gender}</p>
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
      <h3>Birth Nakshatra</h3>
      <p>Your nakshatra is <strong>${nakshatra}</strong>, a sign of deep karmic influence and inner strength.</p>

      <h3>Astrological Insight</h3>
      <p>${guidance}</p>

      <h3>Daily Guidance</h3>
      <ul>
        <li>Spend time in quiet reflection before making important decisions.</li>
        <li>Offer gratitude and kindness to family, elders, and community.</li>
        <li>Choose patience over haste, especially during the next few weeks.</li>
      </ul>
    </div>
  `;
});
