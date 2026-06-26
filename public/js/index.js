import { weddingThemes } from "./weddingThemes.js";

document.addEventListener("DOMContentLoaded", () => {
  //----------------Root----------------//
  const root = document.querySelector(":root");

  //---------Palette functionality------------------//
  console.log(weddingThemes);
  const palettes = document.querySelector("#palettes");

  palettes.addEventListener("change", () => {
    const selectedPalette = weddingThemes[palettes.value];
    root.style.setProperty("--heading-font", selectedPalette["--heading-font"]);
    root.style.setProperty("--body-font", selectedPalette["--body-font"]);
    root.style.setProperty("--color-bg", selectedPalette["--color-bg"]);
    root.style.setProperty(
      "--color-surface",
      selectedPalette["--color-surface"],
    );
    root.style.setProperty(
      "--color-text-main",
      selectedPalette["--color-text-main"],
    );
    root.style.setProperty(
      "--color-text-muted",
      selectedPalette["--color-text-muted"],
    );
    root.style.setProperty("--color-border", selectedPalette["--color-border"]);
    root.style.setProperty(
      "--color-primary",
      selectedPalette["--color-primary"],
    );
    root.style.setProperty(
      "--color-primary-hover",
      selectedPalette["--color-primary-hover"],
    );
  });

  // body bg fallback for older browsers
  const colorBg = getComputedStyle(root).getPropertyValue("--color-bg").trim();
  root.style.setProperty("--color-bg-fallback", `${colorBg}80`);

  //----------------Navbar----------------//
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  navToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll(".nav-item a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
    });
  });

  // for when anchor tags clicked
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - window.innerHeight / 8;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  //----------------Countdown----------------//
  const daysSpan = document.querySelector(".timer #days");
  const hoursSpan = document.querySelector(".timer #hours");
  const minutesSpan = document.querySelector(".timer #minutes");
  const secondsSpan = document.querySelector(".timer #seconds");

  const targetDate = new Date("2027-06-26T00:00:00").getTime();

  const now = new Date().getTime();
  const difference = targetDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const padify = (num) => String(num).padStart(2, "0");

  daysSpan.textContent = padify(days);
  hoursSpan.textContent = padify(hours);
  minutesSpan.textContent = padify(minutes);
  secondsSpan.textContent = padify(seconds);

  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const padify = (num) => String(num).padStart(2, "0");

    daysSpan.textContent = padify(days);
    hoursSpan.textContent = padify(hours);
    minutesSpan.textContent = padify(minutes);
    secondsSpan.textContent = padify(seconds);
  }, 1000);
});
