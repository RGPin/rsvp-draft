document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  navToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  // Optional: Close the menu when a link is clicked
  const navLinks = document.querySelectorAll(".nav-item a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
    });
  });
});
