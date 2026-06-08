"use client";

import { useEffect } from "react";

const COLORS = ["#adc6ff", "#d0bcff", "#4edea3", "#ffffff"];

function spawnConfetti(container: HTMLElement) {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    const size = Math.random() * 6 + 4;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0];
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = "-10px";

    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;
    confetti.style.animation = `confetti-fall ${duration}s linear ${delay}s infinite`;

    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, (duration + delay) * 1000);
  }
}

export function Confetti() {
  useEffect(() => {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    spawnConfetti(container);
    const interval = setInterval(() => spawnConfetti(container), 10000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
