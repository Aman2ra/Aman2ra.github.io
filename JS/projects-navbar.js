const navBarToggle = document.getElementById("projects-nav-toggle");
navBarToggle.addEventListener("click", function () {
  document.body.classList.toggle("nav-open");
});

const navLinks = document.querySelectorAll(".project-link");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    document.body.classList.remove("nav-open");
  });
});

const mainPage = document.getElementById("main-page-link");
mainPage.addEventListener("click", function () {
  location.href = "../HTML/index.html";
});

const allProjects = document.getElementById("nav-all-projects");
allProjects.addEventListener("click", function () {
  const page = popouts.querySelector(".project-details");
  if (page) {
    page.classList.remove("details-open");
    popouts.style.background = "rgba(0,0,0,0)";
    setTimeout(function () {
      popouts.removeChild(page);
      popouts.classList.remove("details-background");
    }, 1000);
  }
});
