/* =====================================================================
   FILL THIS IN — everything you need to edit lives in this CONFIG object.
   ===================================================================== */
const CONFIG = {
  herName: "Gullsha",
  yourName: "Noel",

  // Background/ambient song toggle (top-right button) — direct mp3/audio URL
  bgSongUrl: "../assets/bgmusic.mp3", // e.g. "https://example.com/song.mp3"

  // ---- Chapter 1: Our Moments ----
  // category: "start" | "adventures" | "little"
  moments: [
    { category: "start", date: "June 21, 2023", location: "Erbil", caption: "The beginning", image: "assets/polaroid_photo_1.png", story: "This the very first picture u sent me, i kept it safe and will keep it forever." },
    { category: "start", date: "July 10, 2023", location: "Erbil", caption: "First Baby Picture", image: "assets/polaroid_photo_2.png", story: "Look at my Adorable Gullsha!" },
    { category: "adventures", date: "July 30, 2023", location: "Erbil", caption: "Second Baby Picture", image: "assets/polaroid_photo_3.jpg", story: "This is such a cute picture of u when you're a baby hahahahah" },
    { category: "adventures", date: "August 9, 2023", location: "Erbil", caption: "Baddie Gullsha", image: "assets/polaroid_photo_4.png", story: "What a baddie you are!" },
  ],

  // ---- Chapter 2: Reasons ----
  reasons: [
    "The way you laugh at your own jokes before you finish telling them.",
    "How you remember tiny details in every topic we had.",
    "The way you fight for the people you love.",
    "How safe your love feels in mine.",
    "The way you say my name 'nuwil'.",
    "That you still get excited about small things.",
    "The way you make me feel like the most important person in the world.",
    "The way you you still stay up late to talk to me even when you're tired.",
    "The way you stay in every arguemetns even if im pushing you away.",
    "Simply — you, exactly as you are.",
  ],

  // ---- Chapter 2: Open-When Letters ----
  letters: [
    { image: "assets/envelope_image_1.png", label: "Open when you need a smile", text: "Hey MIAAAA, heheheh cheer up my love, i know you look cute when ure sad but you look more beautiful when ure happy." },
    { image: "assets/envelope_image_2.jpg", label: "Open when you miss me", text: "I always miss you my love, i always hope that we can be together soon." },
    { image: "", label: "Open on your actual birthday morning", text: "My love this is your day, and i want you to know how much you mean to me. I build this site js for you" },
  ],

  // ---- Chapter 3: Our Soundtrack ----
  song: {
    title: "ONLY",
    artist: "Lee Hi",
    note: "Why this song? — becuase this is the first song you liked when i first knew you. Also this is the song that reminds me of you.",
    previewUrl: "assets/only.mp3", // direct mp3/audio URL for the preview button
  },

  // ---- Chapter 4: Secret Reveal ----
  // Set the exact unlock date/time (local time). Format: "YYYY-MM-DDTHH:MM:SS"
  revealDateTime: "2026-09-09T00:00:00",
  revealMessage: "Hello my love, today is your best day!!! i hope that you will enjoy your day and i hope that you will like this site that i made for you. I love you so much my love, and i hope that we will be together soon. I know we are having a little hard time since we will be more busier together <3",
};

/* =====================================================================
   Below this line: page logic. No need to touch unless changing behavior.
   ===================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("heroName").textContent = CONFIG.herName;
  document.getElementById("footerName").textContent = CONFIG.herName;

  // ---- Hero enter ----
  const enterBtn = document.getElementById("enterBtn");
  const hero = document.getElementById("hero");
  const main = document.getElementById("mainContent");
  enterBtn.addEventListener("click", () => {
    main.hidden = false;
    hero.style.transition = "opacity 0.5s ease";
    hero.style.opacity = "0";
    setTimeout(() => {
      hero.style.display = "none";
      hero.setAttribute("aria-hidden", "true");
      main.scrollIntoView({ behavior: "smooth" });
      main.querySelector(".section-title")?.setAttribute("tabindex", "-1");
      main.querySelector(".section-title")?.focus();
    }, 450);
  });

  // ---- Song toggle (ambient) ----
  const songToggle = document.getElementById("songToggle");
  const bgAudio = document.getElementById("bgAudio");
  if (CONFIG.bgSongUrl) bgAudio.src = CONFIG.bgSongUrl;
  if (!CONFIG.bgSongUrl) {
    songToggle.hidden = true; // no dead-end button if nothing to play
  }
  songToggle.addEventListener("click", () => {
    const playing = songToggle.getAttribute("aria-pressed") === "true";
    if (playing) {
      bgAudio.pause();
      songToggle.setAttribute("aria-pressed", "false");
      songToggle.querySelector(".song-toggle__label").textContent = "Our Song";
    } else {
      bgAudio.play().catch(() => {});
      songToggle.setAttribute("aria-pressed", "true");
      songToggle.querySelector(".song-toggle__label").textContent = "Pause";
    }
  });

  // ---- Polaroid grid ----
  const grid = document.getElementById("polaroidGrid");
  function renderMoments(filter) {
    grid.innerHTML = "";
    CONFIG.moments
      .filter((m) => filter === "all" || m.category === filter)
      .forEach((m) => {
        const card = document.createElement("div");
        card.className = "polaroid";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-expanded", "false");
        card.innerHTML = `
          <div class="polaroid__photo">${m.image ? `<img src="${m.image}" alt="${m.caption}" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;">` : m.caption}</div>
          <p class="polaroid__caption">${m.caption}</p>
          <p class="polaroid__meta">${m.date} · ${m.location}</p>
          ${m.story ? `<p class="polaroid__story">${m.story}</p>` : ""}
        `;
        const toggle = () => {
          const open = card.classList.toggle("is-open");
          card.setAttribute("aria-expanded", String(open));
        };
        card.addEventListener("click", toggle);
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
        });
        grid.appendChild(card);
      });
  }
  renderMoments("all");

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderMoments(tab.dataset.filter);
    });
  });

  // ---- Reasons accordion ----
  const reasonsList = document.getElementById("reasonsList");
  CONFIG.reasons.forEach((reason, i) => {
    const row = document.createElement("div");
    row.className = "reason";
    row.innerHTML = `
      <button class="reason__q"><span class="reason__num">${String(i + 1).padStart(2, "0")}</span>${cropTitle(reason)}</button>
      <div class="reason__a">${reason}</div>
    `;
    row.querySelector(".reason__q").addEventListener("click", () => row.classList.toggle("is-open"));
    reasonsList.appendChild(row);
  });
  function cropTitle(text) {
    return text.length > 42 ? text.slice(0, 42).trim() + "…" : text;
  }

  // ---- Letters / envelopes ----
  const lettersGrid = document.getElementById("lettersGrid");
  const modal = document.getElementById("envelopeModal");  
  const modalLabel = document.getElementById("envelopeLabel");
  const modalText = document.getElementById("envelopeText");


  let lastFocused = null;
  CONFIG.letters.forEach((letter) => {
    const env = document.createElement("div");
    if (letter.image) env.style.setProperty("--env-bg", `url(${letter.image})`);
    env.className = "envelope";
    env.setAttribute("role", "button");
    env.setAttribute("tabindex", "0");
    env.innerHTML = `<div class="envelope__seal"></div><p class="envelope__label">${letter.label}</p>`;
    env.addEventListener("click", () => openEnvelope(letter, env));
    env.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openEnvelope(letter, env); }
    });
    lettersGrid.appendChild(env);
  });

  const modalCard = modal.querySelector(".envelope-modal__card");
  function openEnvelope(letter, trigger) {
    lastFocused = trigger;
    const modalImage = document.getElementById("envelopeImage");
    modalImage.hidden = !letter.image;
    if (letter.image) { modalImage.src = letter.image; modalImage.alt = letter.label; }
    modalLabel.textContent = letter.label;
    modalText.textContent = letter.text;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("envelopeClose").focus();
  }
  function closeEnvelope() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  document.getElementById("envelopeClose").addEventListener("click", closeEnvelope);
  document.getElementById("envelopeBackdrop").addEventListener("click", closeEnvelope);
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") return closeEnvelope();
    if (e.key === "Tab") { // simple focus trap
      const f = modalCard.querySelectorAll("button, [href], img, [tabindex]:not([tabindex='-1'])");
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // ---- Song card ----
  document.getElementById("songTitle").textContent = CONFIG.song.title;
  document.getElementById("songArtist").textContent = CONFIG.song.artist;
  document.getElementById("songNote").textContent = CONFIG.song.note;

  const previewAudio = new Audio();
  if (CONFIG.song.previewUrl) previewAudio.src = CONFIG.song.previewUrl;
  const playBtn = document.getElementById("songCardPlay");
  playBtn.addEventListener("click", () => {
    if (!CONFIG.song.previewUrl) return;
    if (previewAudio.paused) {
      previewAudio.play();
      playBtn.innerHTML = `<span class="song-card__play-icon">❚❚</span> Pause`;
    } else {
      previewAudio.pause();
      playBtn.innerHTML = `<span class="song-card__play-icon">▶</span> Play a preview`;
    }
  });
  previewAudio.addEventListener("ended", () => {
    playBtn.innerHTML = `<span class="song-card__play-icon">▶</span> Play a preview`;
  });

  // ---- Reveal countdown ----
  const target = new Date(CONFIG.revealDateTime).getTime();
  const lockedEl = document.getElementById("revealLocked");
  const unlockedEl = document.getElementById("revealUnlocked");
  document.getElementById("revealMessage").textContent = CONFIG.revealMessage;

  function tick() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      lockedEl.hidden = true;
      unlockedEl.hidden = false;
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("cd-mins").textContent = String(mins).padStart(2, "0");
    document.getElementById("cd-secs").textContent = String(secs).padStart(2, "0");
  }
  tick();
  const timer = setInterval(tick, 1000);
});