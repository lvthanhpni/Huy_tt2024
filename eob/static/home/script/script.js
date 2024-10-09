document.getElementById("dropdown-menu-button").addEventListener("click", function() {
  const menu = document.getElementById("dropdown-menu");
  const computedStyle = window.getComputedStyle(menu)
  if (computedStyle.height != "0px" && !computedStyle.border.includes("0px")){
    menu.style.border =  "none"
    menu.style.height = "0px"
  } else {
    menu.style.height = "114px";
    menu.style.border = "1px solid rgba(0, 0, 0, 0.15)"
  }
})

document.getElementById("searchbox-section-button").addEventListener("click", function() {
  const dropdown_menu = document.getElementById("dropdown-search-section");
  const computedStyle = window.getComputedStyle(dropdown_menu)
  if(computedStyle.height != "0px" && !computedStyle.border.includes("0px")) {
    dropdown_menu.style.border = "none"
    dropdown_menu.style.height = "0px"
  } else {
    dropdown_menu.style.border = "1px solid rgba(0, 0, 0, 0.15)"
    dropdown_menu.style.height = "248px"
  }
})

let currentIndex = 0;

const carousel_buttons = [
  document.getElementById("paginator-first-button"),
  document.getElementById("paginator-second-button"),
  document.getElementById("paginator-third-button")
]

const carousels = [
  document.getElementById("carousel-first"),
  document.getElementById("carousel-second"),
  document.getElementById("carousel-third")
]

function updateCarousel() {
  const carousel_backgrounds = [
    "/static/home/images/carousel_background.png",
    "/static/home/images/carousel_background_1.png",
    "/static/home/images/carousel_background_2.png",
  ]

  const carousel_background = document.getElementById("main-banner");



  carousel_buttons.forEach(function(carousel_button, index) {
    carousel_button.style.backgroundColor = "transparent"
  })

  carousels.forEach(function(carousel) {
    carousel.style.opacity="0";
    carousel.style.transition = "opacity 1s";
  })


  carousel_buttons[currentIndex].style.backgroundColor = "#1c2d5a"

  carousels[currentIndex].style.opacity = "1";
  carousel_background.style.backgroundImage = "url('" + carousel_backgrounds[currentIndex] + "')";

}

carousel_buttons.forEach(function(button, index) {
  button.addEventListener('click', function(){
    currentIndex = index;
    updateCarousel();
  })
})

setInterval(function() {
  currentIndex = (currentIndex + 1) % carousels.length;
  updateCarousel();
}, 5000)