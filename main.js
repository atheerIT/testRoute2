import '@splidejs/splide/css/core';
import Splide from '@splidejs/splide';
import axios from 'axios';
import './style.css'
// import '@splidejs/splide/css';
// import '@splidejs/splide/css/sea-green';
// import '@splidejs/splide/css/skyblue';


window.naveTo = naveTo;
localStorage.setItem('totalPagination',1)
localStorage.setItem('currentPage', 1)


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
  const currentPath = window.location.pathname
  if (currentPath){
      renderPages(currentPath)
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
        switch (path) {
          case 'home.html':
            getSlider();
            getWaterSlider();
            getPollutionSlider();
            energySlider();
            getDesertSlider();
            videoSlider();
            getReports()
            break
          case 'list.html':
            getPageList();
            break;
          case 'post.html':
            getPostDetails();
            break;
          default:
            naveTo('/');
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
  const splide = new Splide( '#home_slider', {
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

function waterSlider (){
  const splide = new Splide( '#water_slider', {
    width : '100%',
		height: '100%',
    pagination: false,
    arrows    : true,
    autoplay: false,
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

function energySlider (){
  const splide = new Splide( '#energy_slider', {
    width : '100%',
		height: '100%',
    pagination: false,
    arrows    : true,
    autoplay: false,
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

function pollutionSlider (){
  const splide = new Splide( '#pollution_slider', {
    width : '100%',
		height: '100%',
    pagination: false,
    arrows    : true,
    autoplay: false,
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

function desertSlider (){
  const splide = new Splide( '#desert_slider', {
    width : '100%',
		height: '100%',
    pagination: false,
    arrows    : true,
    autoplay: false,
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

function videoSlider (){
  const splide = new Splide( '#video_slider', {
    width : '100%',
		height: '100%',
    pagination: false,
    arrows    : true,
    autoplay: false,
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


//first slider
async function getSlider(){
  try{
    const slider = document.querySelector('.splide__list')
    const response = await axiosAgent.get('get_slider')
    if (await response.data.status==='success'){
      const data = await response.data.data
      if(data.length>0){
        data.map((val, indx)=>{
          slider.innerHTML+= `
          <li class="splide__slide">
                    <div class="card">
                        <div class="title">
                          <h1>${val.post_title}</h1>
                        </div>
                        <div class="content">
                          <div class="discrep">
                          ${val.post_description}
                            </div>
                        </div>
                        <div class="img">
                          <img src="http://149.100.158.175/assets/images/${val.post_image}" alt="">
                        </div>
                    </div>
                </li>
          `
        })
      }
      homeSlider();
    }
  }
  catch(e){
    alert(e)
  }
}

//water slides 
async function getWaterSlider(){
  try{
    const slider = document.querySelector('.water_list')
    const response = await axiosAgent.get('get_page_details/1', {
      params:{
        page_number:1,
        items_per_page:5,
    }
  })
    if (await response.data.status==='success'){
      const data = await response.data.data
      if(data.length>0){
        data.map((val, indx)=>{
          slider.innerHTML+= `
          <li class="splide__slide">
          <div class="water_card">
                <div class="water-content">
                  <div class="title">
                    <h1>${val.post_title}</h1>
                  </div>
                  <div class="content">
                    <p>
                    ${val.post_description}
                    </p>
                  </div>
                  <div>
                    <a href="#" class="read-more" onclick="naveTo('/post/${val.post_id}')">Read More</a>
                  </div>
                </div>
                <div class="water-shadow">
                </div>
                <div class="water-post-img">
                  <img class="img" src="http://149.100.158.175/assets/images/${val.post_image}" alt="">
                </div>
                <div class="water-chart">
                  <img src="08.svg" alt="">
                </div>
              </div>
              </li>
          `
        })
      }
      waterSlider();
    }
  }
  catch(e){
    alert(e)
  }
}

async function getPollutionSlider(){
  try{
    const slider = document.querySelector('.pollution_list')
    const response = await axiosAgent.get('get_page_details/2', {
      params:{
        page_number:1,
        items_per_page:5,
    }
  })
  if(response.status === 404){
  }
    if (await response.data.status==='success'){
      const data = await response.data.data
      if(data.length>0){
        data.map((val, indx)=>{
          slider.innerHTML+= `
          <li class="splide__slide">
          <div class="water_card">
                <div class="pollution-content">
                  <div class="title">
                    <h1>${val.post_title}</h1>
                  </div>
                  <div class="content">
                    <p>
                    ${val.post_description}
                    </p>
                  </div>
                  <div>
                    <a href="#" class="read-more" onclick="naveTo('/post/${val.post_id}')">Read More</a>
                  </div>
                </div>
                <div class="pollution-shadow">
                </div>
                <div class="pollution-post-img">
                  <img class="img" src="http://149.100.158.175/assets/images/${val.post_image}" alt="">
                </div>
                <div class="pollution-chart">
                  <h1>the highest levels of pollutions</h1>
                  <img src="09.svg" alt="">
                </div>
              </div>
              </li>
          `
        })
      }
      pollutionSlider();
    }
  }
  catch(e){
    if(e.response.status===404){
    const slider = document.querySelector('.pollution_list')
      slider.innerHTML=`
      <li class="splide__slide">
          <div class="water_card">
                <div class="pollution-content">
                  <div class="title">
                    <h1>There is no post yet in this section </h1>
                  </div>
                </div>
                <div class="pollution-shadow">
                </div>
              </div>
              </li>
      `
      pollutionSlider();
    }
    else{
      alert(e)
    }
  }
}

async function getDesertSlider(){
  try{
    const slider = document.querySelector('.desert_list')
    const response = await axiosAgent.get('get_page_details/3', {
      params:{
        page_number:1,
        items_per_page:5,
    }
  })
    if (await response.data.status==='success'){
      const data = await response.data.data
      if(data.length>0){
        data.map((val, indx)=>{
          slider.innerHTML+= `
          <li class="splide__slide">
          <div class="water_card">
                <div class="water-content">
                  <div class="title">
                    <h1>${val.post_title}</h1>
                  </div>
                  <div class="content">
                    <p>
                    ${val.post_description}
                    </p>
                  </div>
                  <div>
                    <a href="#" id="desert-more" class="read-more" onclick="naveTo('/post/${val.post_id}')">Read More</a>
                  </div>
                </div>
                <div id="desert-shadow" class="water-shadow">
                </div>
                <div class="water-post-img">
                  <img class="img" src="http://149.100.158.175/assets/images/${val.post_image}" alt="">
                </div>
                <div class="water-chart">
                  
                </div>
              </div>
              </li>
          `
        })
      }
      desertSlider();
    }
  }
  catch(e){
    alert(e)
  }
}

async function getReports(){
  try{
    const reportsContainer = document.querySelector('#reports')
    const response = await axiosAgent.get('get_report', {
      params:{
        page_number:1,
        items_per_page:3,
    }
  })
    if (await response.data.status==='success'){
      const data = await response.data.data
      if(data.length>0){
        data.map((val, indx)=>{
          reportsContainer.innerHTML+= `
          <a href="http://149.100.158.175/assets/pdf/${val.pdf_file}"><div id="report_${val.id}" class="report_div">
        <div class="report_title">
          ${val.title} 
        </div>
      </div>
      </a>
          `
          const reportDiv = document.querySelector(`#report_${val.id}`)
          reportDiv.style.backgroundImage = `url('http://149.100.158.175/assets/images/${val.cover_img}')`
        })
      }
    }
  }
  catch(e){
    alert(e)
  }
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

async function getPageList(page = 1, itemPerPage = 1){
  try{
    const path = window.location.pathname
    const listContainer  = document.querySelector('.list-container')
    listContainer.innerHTML=''
    const response = await axiosAgent.get(`get_page_details${path}`, {
      params:{
        page_number:page,
        items_per_page:itemPerPage,
    }
  })
    if (await response.data.status==='success'){
      listContainer.innerHTML=''
      const data = await response.data.data
      if(data.length>0){
        localStorage.setItem('totalPagination', response.data.totalpagination_count)
        data.map((val, indx)=>{
          listContainer.innerHTML+= `
          <a href="" onclick="naveTo('/post/${val.post_id}')">
          <div class="post-card">
          <div class="img">
          <img src="http://149.100.158.175/assets/images/${val.post_image}" alt="">
          </div>
          <div class="title">
          <h2>${val.post_title}</h2>
          </div>
          </div>
          </a>
          `
        })
      }
      paginationControl();
    }
  }
  catch(e){
    if(e.response.status===404){
      const listContainer  = document.querySelector('.list-container')
      listContainer.innerHTML=`
      <div class="post-card">
      <div class="title" style="padding: 0 10px;">
          <h2>There is no post yet in this section</h2>
      </div>
  </div>
      `

    }
    else{
      alert(e)
    }
  }
}

async function paginationControl(){
  let currentPage = localStorage.getItem('currentPage')||1
  const totalPagination = localStorage.getItem('totalPagination')
  currentPage = parseInt(currentPage)
  const nextBtn = document.querySelector('.pagination_arrows .next')
  const prevBtn = document.querySelector('.pagination_arrows .prev')
  const paginationSpan = document.querySelector('.pagination_arrows span')
  paginationSpan.innerHTML = `${currentPage}/${totalPagination}`
  if(currentPage>=totalPagination){
    nextBtn.disabled = true;
  }
  if(currentPage===1){
    prevBtn.disabled = true;
  }
  nextBtn.addEventListener('click', e=>{
    currentPage++;
    prevBtn.disabled = false;
    localStorage.setItem('currentPage', currentPage)
    getPageList(currentPage);
    paginationSpan.innerHTML = `${currentPage}/${totalPagination}`
  })
  prevBtn.addEventListener('click', e=>{
    currentPage--;
    nextBtn.disabled = false;
    localStorage.setItem('currentPage', currentPage);
    getPageList(currentPage);
    paginationSpan.innerHTML = `${currentPage}/${totalPagination}`
  })
}

async function getPostDetails(){
  try{
    const path = window.location.pathname
    const id = path.split('/').pop()
    const postImage = document.querySelector('.post-img-title')
    const postTitle = document.querySelector('.post-img-title h1')
    const postBody = document.querySelector('.post-body')
    const response = await axiosAgent.get(`get_post_details/${id}`)
    if (await response.data.status==='success'){
      const data = await response.data.data
      if(data.length>0){
        postImage.style.backgroundImage = `url('http://149.100.158.175/assets/images/${data[0].img}')`
        postTitle.innerHTML= data[0].title
        const body = data[0].body.split('\\r\\n').join('')
        console.log(body);
        postBody.innerHTML = body
      }else{
        postTitle.innerHTML= 'The post has been moved or deleted by admin'
      }
    }
  }
  catch (e){
    alert(e);
  }
}