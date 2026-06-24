document.addEventListener("DOMContentLoaded", () => {
  //Navbar
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

  // Countdown
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
