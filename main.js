import '@splidejs/splide/css/core';
import Splide from '@splidejs/splide';
import axios from 'axios';
import './style.css'


window.naveTo = naveTo;



const axiosAgent = axios.create({
  baseURL: 'http://149.100.158.175:5000/api/',
  headers: {
    "Content-Type": "application/json",
  }
})

// nav bar logic
const navBar = document.querySelector('.bergur')
const blackBG = document.querySelector('.black_bg')
navBar.addEventListener('click', openNav)
function openNav(){
  const sideBar = document.querySelector('.open-nav');
  if (sideBar.clientWidth === 100){
    sideBar.style.width = "600px"
    blackBG.style.display = 'block'
  }
  else {
    sideBar.style.width = "0px"
    blackBG.style.display = 'none'
  };
};
blackBG.addEventListener('click',()=>{
  const sideBar = document.querySelector('.open-nav');
  if (sideBar.clientWidth > 100){
    sideBar.style.width = "0px"
    blackBG.style.display = 'none'
  }
})

//route logic
const routes = {
  "/": "home.html",
  "/video": "list.html",
}

const currentPath = window.location.pathname

window.addEventListener("popstate", ()=>{
  const route = routes[currentPath]
  if (route){
      renderPages(route)
  }
  else{
      console.log('here');
  }
})

function renderPages (route){
  const reg = /\/[0-9]+/
  const reg2 = /\/post\/[0-9]+/  
  const container = document.querySelector("#container")
  let path = routes[route]

  if(reg.test(route)){
    path = "list.html"
  }
  if(reg2.test(route)){
    path = "post.html"
  }
  if(path){
    fetch(path)
    .then(res=>res.text())
    .then(html=>{
        container.innerHTML = html
        switch (route) {
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

//slider Logic
function homeSlider (){
  const splide = new Splide( '.splide', {
    width : '100vw',
		height: '100vh',
    pagination: false,
    arrows    : true,
    autoplay: true,
    type: 'loop',
    speed: 1000,
    interval: 2000,
    gap: 60,
    classes: {
      arrows: 'splide__arrows',
      prev  : 'splide__arrow splide__arrow--prev',
      next  : 'splide__arrow splide__arrow--next',
    },
  }).mount();

}

//get pages
async function getPages () {
  try{
    const sideBarContent = document.querySelector('.open-nav ul');
    const footerLinks = document.querySelector('.footer-deprt ul')
    const response = await axiosAgent.get('get_pages')
    if (await response.data.status==='success'){
      const data = await response.data.data
      if(data.length>0){
        data.map((val,indx)=>{
          sideBarContent.innerHTML +=`<li key="${indx}"><a href="" onclick="naveTo('/${val.id}')">${val.page_name}</a></li>`
          footerLinks.innerHTML += `<li key="${indx}"><a href="" onclick="naveTo('/${val.id}')">${val.page_name}</a></li>`
        })
      }
    }
  }
  catch(e){
    alert(e)
  }
}
getPages()