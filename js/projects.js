const imagesFolder = "/assets/images/projects/";
const projects = [
  {
    "project-name": "Rubiks Cube Solver",
    "project-description":
      "A Java application that allows the user to play with a virtual rubiks cube, with a built in solver that solves the cube and outputs the algorithms used.",
    "project-progress": "Complete",
    "project-progress-tag": "complete",
    "project-img-main": "Cube.png",
    "project-img-folder": "cube/",
    "project-desc-long": "Long Cube Desc",
    "project-tags": "[Java, Gui, ...]",
  },
  {
    "project-name": "Spotify Lights",
    "project-description":
      "Makes your arduino controlled rgb strip the same color as your current spotify album",
    "project-progress": "Complete",
    "project-progress-tag": "complete",
    "project-img-main": "Spotify.png",
    "project-img-folder": "spotify/",
    "project-desc-long": "Long Spotify Desc",
    "project-tags": "[Python, Arduino, Spotify API,...]",
  },
  {
    "project-name": "Waifu",
    "project-description": "My Waifu",
    "project-progress": "Theorized",
    "project-progress-tag": "theory",
    "project-img-main": "ten-facts-about-zero-two.png",
    "project-img-folder": "../highlighted-projects/",
    "project-desc-long": "Beautiful",
    "project-tags": "[I LOST,...]",
  },
  {
    "project-name": "TESTING",
    "project-description": "TEST DESC",
    "project-progress": "Work in Progress",
    "project-progress-tag": "wip",
    "project-img-main": "Slide1.png",
    "project-img-folder": "../highlighted-projects/",
    "project-desc-long": "TEST DESC LONG",
    "project-tags": "[TEST1, TEST2, TEST3 TEST4,...]",
  },
  {
    "project-name": "TESTING",
    "project-description": "TEST DESC",
    "project-img-main": "Slide1.png",
    "project-img-folder": "../highlighted-projects/",
    "project-desc-long": "TEST DESC LONG",
    "project-tags": "[TEST1, TEST2, TEST3 TEST4,...]",
  },
  {
    "project-name": "TESTING",
    "project-description": "TEST DESC",
    "project-img-main": "Slide1.png",
    "project-img-folder": "../highlighted-projects/",
    "project-desc-long": "TEST DESC LONG",
    "project-tags": "[TEST1, TEST2, TEST3 TEST4,...]",
  },
];
const listPageTemplate = document.getElementById("project-template").content;
const detailsPageTemplate = document.getElementById(
  "detail-page-template"
).content;

const projectsList = document.querySelector(".projects-list");
const navBarList = document.querySelector("#projects-nav-list");

const popouts = document.querySelector("#detail-popouts");
popouts.style.zIndex = projects.length + 1;

let read_more = function (project) {
  project = projects.findIndex((p) => p["project-name"] == project);
  const detailsTemplateCopy = document
    .importNode(detailsPageTemplate, true)
    .querySelector(".project-details");

  loadCarouselImages(
    detailsTemplateCopy.querySelector(".projects-carousel"),
    imagesFolder + projects[project]["project-img-folder"]
  );
  detailsTemplateCopy.querySelector("#page-title").textContent =
    projects[project]["project-name"];
  detailsTemplateCopy.querySelector("#project-tags").textContent =
    projects[project]["project-tags"];
  detailsTemplateCopy.querySelector("#project-description").textContent =
    projects[project]["project-desc-long"];
  const oldEvenDetails = document.querySelector(".even-details");
  const oldOddDetails = document.querySelector(".odd-details");
  if (project % 2 == 0) {
    if (oldEvenDetails) {
      oldEvenDetails.classList.remove("details-open");
      oldEvenDetails.classList.add("even-details-close");
      setTimeout(function () {
        popouts.removeChild(oldEvenDetails);
      }, 1000);
    } else if (oldOddDetails) {
      oldOddDetails.classList.remove("details-open");
      setTimeout(function () {
        popouts.removeChild(oldOddDetails);
      }, 1000);
    }
    const newDetails = detailsTemplateCopy;
    newDetails.classList.add("even-details");
    newDetails
      .querySelector(".back-btn")
      .addEventListener("click", function () {
        const page = popouts.querySelector(".even-details");
        page.classList.remove("details-open");
        popouts.style.background = "rgba(0,0,0,0)";
        setTimeout(function () {
          popouts.removeChild(page);
          popouts.classList.remove("details-background");
        }, 1000);
      });
    popouts.appendChild(newDetails);
    setTimeout(function () {
      newDetails.classList.add("details-open");
    }, 100);
  } else {
    if (oldOddDetails) {
      oldOddDetails.classList.remove("details-open");
      oldOddDetails.classList.add("odd-details-close");
      setTimeout(function () {
        popouts.removeChild(oldOddDetails);
      }, 1000);
    } else if (oldEvenDetails) {
      oldEvenDetails.classList.remove("details-open");
      setTimeout(function () {
        popouts.removeChild(oldEvenDetails);
      }, 1000);
    }
    const newDetails = detailsTemplateCopy;
    newDetails.classList.add("odd-details");
    newDetails
      .querySelector(".back-btn")
      .addEventListener("click", function () {
        const page = popouts.querySelector(".odd-details");
        page.classList.remove("details-open");
        popouts.style.background = "rgba(0,0,0,0)";
        setTimeout(function () {
          popouts.removeChild(page);
          popouts.classList.remove("details-background");
        }, 1000);
      });
    popouts.appendChild(newDetails);
    setTimeout(function () {
      newDetails.classList.add("details-open");
    }, 100);
  }
  popouts.style.background = "rgba(0,0,0,0.85)";
  popouts.classList.add("details-background");
};

for (let project = 0; project < projects.length; project++) {
  let projectElem = document.createElement("li");
  projectElem.classList.add("project");
  let template = "odd";
  if (project % 2 == 0) {
    template = "even";
  }
  projectElem.classList.add(template + "-project");
  let listTemplateCopy = document.importNode(listPageTemplate, true);
  listTemplateCopy
    .querySelector(".project-img-container")
    .classList.add(template + "-img-container");
  listTemplateCopy
    .querySelector(".project-img")
    .classList.add(template + "-img");
  listTemplateCopy
    .querySelector(".project-info-container")
    .classList.add(template + "-info-container");
  listTemplateCopy
    .querySelector(".project-name")
    .classList.add(template + "-name");
  listTemplateCopy
    .querySelector(".project-description")
    .classList.add(template + "-description");
  listTemplateCopy
    .querySelector(".project-progress")
    .classList.add(template + "-progress");
  listTemplateCopy
    .querySelector(".read-more")
    .classList.add(template + "-read-more");

  listTemplateCopy.querySelector(".project-img").src =
    imagesFolder +
    projects[project]["project-img-folder"] +
    projects[project]["project-img-main"];
  listTemplateCopy.querySelector(".project-name").textContent =
    projects[project]["project-name"];
  listTemplateCopy.querySelector(".project-description").textContent =
    projects[project]["project-description"];
  listTemplateCopy.querySelector(".project-progress").textContent =
    projects[project]["project-progress"];
  listTemplateCopy
    .querySelector(".project-progress")
    .classList.add(projects[project]["project-progress-tag"]);
  listTemplateCopy.querySelector(".read-more").onclick = function () {
    read_more(projects[project]["project-name"]);
  };

  projectElem.style.zIndex = projects.length - project;

  projectElem.addEventListener("mouseover", (e) => {
    update_elevator(projects.length - project);
  });
  projectElem.appendChild(listTemplateCopy);
  projectElem.querySelector(".read-more").addEventListener("focus", (e) => {
    projectElem.style.transform = "perspective(none)";
    update_elevator(projects.length - project);
  });
  projectElem.querySelector(".read-more").addEventListener("focusout", (e) => {
    projectElem.style.transform = "";
  });
  document.querySelector(".projects-list").appendChild(projectElem);

  let projectLink = document.createElement("li");
  projectLink.classList.add("project-item");
  let projectButton = document.createElement("button");
  projectButton.textContent = projects[project]["project-name"];
  projectButton.onclick = function () {
    read_more(projects[project]["project-name"]);
  };
  projectButton.classList.add("project-link");
  projectLink.classList.add("project-item");
  projectLink.appendChild(projectButton);
  navBarList.appendChild(projectLink);
}

const loadCarouselImages = function (carousel, path) {
  const user = "Dino-Jesus";
  const repo = "Dino-Jesus.github.io";
  const imgUrl =
    "https://api.github.com/repos/" + user + "/" + repo + "/contents/" + path;
  console.log(imgUrl);
  $(document).ready(function () {
    $.ajax({
      url: imgUrl,
      success: function (data) {
        console.log(data);
        for (let file of data) {
          console.log(
            `file path: ${file.path} \nfile name: ${
              file.name
            } \nfile is img? ${file.name.match(
              /\.(jpe?g|png|gif)$/
            )} \nfile dw url: ${file.download_url}`
          );
          let val = file.name;
          if (val.match(/\.(jpe?g|png|gif)$/)) {
            let start, end;
            for (let i = val.length - 1; i >= 0; i--) {
              if (!end && val[i] == ".") {
                end = i;
              } else if (!start && val[i] == "/") {
                start = i + 1;
              } else if (!start && i == 0) {
                start = i;
              } else if (start && end) {
                break;
              }
            }
            $(carousel.querySelector(".names-track")).append(
              `<li class="slide-name"><h3>${val.slice(start, end)}</h3></li>`
            );
            $(carousel.querySelector(".carousel-track")).append(
              `<li class="carousel-slide current-slide"><img class="carousel-image" src="${file.download_url}" alt=""/></li>`
            );
            $(carousel.querySelector(".carousel-nav")).append(
              `<button class="carousel-indicator"></button>`
            );
          }
        }
        refreshCarousel(carousel);
      },
    });
  });
};

let project_num = projects.length;
const project_list = document.querySelector(".projects-list");
const project_list_item = document.querySelector(".project");

window.addEventListener("scroll", function (e) {
  let project_height = getAbsoluteHeight(project_list_item);
  let scroll_pos = document.documentElement.scrollTop + 100;
  if (
    scroll_pos + document.documentElement.clientHeight - project_height >=
    document.body.clientHeight
  ) {
    project_num = 1;
  } else if (
    Math.floor(scroll_pos / project_height) !=
    projects.length - project_num
  ) {
    project_num = projects.length - Math.floor(scroll_pos / project_height);
  }
  update_elevator(project_num);
});

const getAbsoluteHeight = function (el) {
  var styles = window.getComputedStyle(el);
  var margin =
    parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

  return Math.ceil(el.offsetHeight + margin);
};

const update_elevator = function (num) {
  const font_path = "../assets/images/general/font/";
  const counter_digits = document.querySelectorAll(".digit");
  let digits = num.toString().split("");
  for (let i = 0; i < digits.length && i < counter_digits.length; i++) {
    counter_digits[counter_digits.length - 1 - i].src =
      font_path + digits[digits.length - 1 - i] + ".png";
  }
  for (let i = counter_digits.length - 1; i >= digits.length; i--) {
    counter_digits[counter_digits.length - 1 - i].src =
      font_path + "0" + ".png";
  }
};

update_elevator(project_num);
