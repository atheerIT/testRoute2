import '@splidejs/splide/css/core';
import Splide from '@splidejs/splide';

window.naveTo = naveTo;

const routes = {
  "/": "home.html",
  "/about": "about.html",
  "/contact": "contact.html"
}

const currentPath = window.location.pathname

window.addEventListener("popstate", ()=>{
  const route = routes[currentPath]
  console.log(route);
  if (route){
      renderPages(route)
  }
  else{
      console.log('here');
  }
})

function renderPages (route){
  const container = document.querySelector("#container")
  const path = routes[route]
  if(path){
    fetch(path)
    .then(res=>res.text())
    .then(html=>{
        container.innerHTML = html
        switch (route) {
          case '/contact':
            counter()
            break;
          case '/':
            homeSlider();
            break
          default:
            break;
        }
    })
    
  }
  else{
    container.innerHTML= "not found"
  }
}
renderPages(currentPath)

function naveTo(path){
  window.history.pushState({}, null, path)
}



var count=0;
function counter (){
const countDiv = document.querySelector('.count')
console.log(countDiv);
  setInterval(function()
  {
    count++
    countDiv.innerHTML = count
    console.log(count);
  },1000);
}

function homeSlider (){
  const splide = new Splide( '.splide', {
    width : '100vw',
		height: '50vh',
    pagination: false,
    arrows    : true,
    autoplay: true,
    type: 'loop',
    speed: 1000,
    interval: 2000,
    classes: {
      arrows: 'splide__arrows',
      prev  : 'splide__arrow splide__arrow--prev',
      next  : 'splide__arrow splide__arrow--next',
    },
  }).mount();

}