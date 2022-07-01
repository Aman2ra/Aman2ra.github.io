var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf("/"));
console.log(loc);
console.log(dir);

const projectsToggle = document.getElementById("projects-slider-toggle");

projectsToggle.addEventListener("click", function () {
  document.body.classList.toggle("projects-slide-open");
});

const carouselTrack = document.querySelector(".carousel-track");
let imgDir = "../assets/images/General/";
$(document).ready(function () {
  document.querySelector(".imtwo").src = "../assets/images/General/Logo.png";
  document.querySelector(".imone").src =
    "../assets/images/Highlighted Projects/Slide1.png";
  $.ajax({
    url: imgDir,
    success: function (data) {
      console.log(data);
      $(data)
        .find("a")
        .attr("href", function (i, val) {
          if (val.match(/\.(jpe?g|png|gif)$/)) {
            let start, end;
            for (let i = val.length - 1; i >= 0; i--) {
              if (!end && val[i] == ".") {
                end = i;
              } else if (!start && val[i] == "/") {
                start = i + 1;
              } else if (start && end) {
                break;
              }
            }
            $(".names-track").append(
              '<li class="slide-name"><h3>' +
                val.slice(start, end).replace("%20", " ") +
                "</h3></li>"
            );
            $(".carousel-track").append(
              ' <li class="carousel-slide current-slide"><img class="carousel-image" src="' +
                val +
                '" alt=""/></li>'
            );
            $(".carousel-nav").append(
              '<button class="carousel-indicator"></button>'
            );
          }
        });
      refreshCarousel(document.querySelector(".projects-carousel"));
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
  imgDir = "../assets/images/General";
  $.ajax({
    url: imgDir,
    success: function (data) {
      console.log(data);
      $(data)
        .find("a")
        .attr("href", function (i, val) {
          if (val.match(/\.(jpe?g|png|gif)$/)) {
            let start, end;
            for (let i = val.length - 1; i >= 0; i--) {
              if (!end && val[i] == ".") {
                end = i;
              } else if (!start && val[i] == "/") {
                start = i + 1;
              } else if (start && end) {
                break;
              }
            }
            $(".names-track").append(
              '<li class="slide-name"><h3>' +
                val.slice(start, end).replace("%20", " ") +
                "</h3></li>"
            );
            $(".carousel-track").append(
              ' <li class="carousel-slide current-slide"><img class="carousel-image" src="' +
                val +
                '" alt=""/></li>'
            );
            $(".carousel-nav").append(
              '<button class="carousel-indicator"></button>'
            );
          }
        });
      refreshCarousel(document.querySelector(".projects-carousel"));
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus);
      alert("Error: " + errorThrown);
    },
  });
});
