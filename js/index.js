const projectsToggle = document.getElementById("projects-slider-toggle");

projectsToggle.addEventListener("click", function () {
  document.body.classList.toggle("projects-slide-open");
});

const carouselTrack = document.querySelector(".carousel-track");
const user = "Dino-Jesus";
const repo = "Dino-Jesus.github.io";
const imgDir = "assets/images/Highlighted Projects/";
const imgUrl =
  "https://api.github.com/repos/" + user + "/" + repo + "/contents/" + imgDir;
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
          $(".names-track").append(
            `<li class="slide-name"><h3>${val.slice(start, end)}</h3></li>`
          );
          $(".carousel-track").append(
            `<li class="carousel-slide current-slide"><img class="carousel-image" src="${file.download_url}" alt=""/></li>`
          );
          $(".carousel-nav").append(
            `<button class="carousel-indicator"></button>`
          );
        }
      }
      refreshCarousel(document.querySelector(".projects-carousel"));
    },
  });
});
