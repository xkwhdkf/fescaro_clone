// const wrap = document.querySelector("#wrap");
// const header = document.querySelector("#header");
// const gnb = document.querySelector(".gnb");
// const gnbMenu = document.querySelectorAll(".gnb_inner>ul>li");

document.write("<script src='js/header.js'></script>");
const sections = document.querySelectorAll("section");
const footer = document.querySelector("#footer");
const snb = document.querySelectorAll(".snb li a");

// h2에 span으로 문자 묶기.
const h2 = document.querySelectorAll("h2.char");
for(let i=0;i<h2.length;i++){
  let arr="";
  let flag = 0;
  for(let j=0;j<h2[i].innerText.length;j++) {
    if (h2[0].innerText[j] == ' ' & flag == 0) {
      arr+=`<br />`;
      flag = 1;
    }else if(h2[i].innerText[j] == ' ') arr+=` `;
    else arr+=`<span>${h2[i].innerText[j]}</span>`;
  } 
  h2[i].innerHTML = arr;
}
// // header 작동
// gnbMenu.forEach((el,i)=>{
//   el.querySelector("a").addEventListener("mouseenter", e=>{
//     e.preventDefault();
//     wrap.classList.add("black");
//     gnb.classList.add("on");
//   });
//   gnb.children[2].addEventListener("mouseleave", e=>{
//     e.preventDefault();
//     wrap.classList.remove("black");
//     gnb.classList.remove("on");
//     if(window.pageYOffset>=sections[2].offsetTop&&window.pageYOffset<=sections[3].offsetTop){
//       wrap.classList.add("black");
//     }
//   });
// });

// // sitemap 작동
// const btn_sitemap = document.querySelector(".btn_sitemap");
// btn_sitemap.addEventListener("click",e=>{
//   e.preventDefault();
//   document.querySelector(".sitemap").classList.add("on");
// });
// document.querySelector(".btn_close").addEventListener("click",e=>{
//   e.preventDefault();
//   document.querySelector(".sitemap").classList.remove("on");
// });
// 스크롤
sections.forEach((el,i) =>{
  el.addEventListener("wheel", e=>{
    if(e.deltaY > 0 & i < sections.length-1) {
      scrollTo(sections[i+1],i+1);
    } else if(e.deltaY < 0 & i > 0){
      scrollTo(sections[i-1],i-1);
    }
  });
});
// snb 클릭 시 스크롤
snb.forEach((el,i) =>{
  el.addEventListener("click", e=>{
    e.preventDefault();
    scrollTo(sections[i],i);
  });
});

// content2 오토배너
const banner = document.querySelectorAll(".banner li");
const banner_box = document.querySelectorAll(".banner ul");
const banner_btns = document.querySelectorAll(".banner_btns i");
let step = 0;
let step2 = 0;
let sec = 1;
const slide_width = banner[0].offsetWidth;
banner_btns.forEach((el,i) =>{
  el.addEventListener("click", e=>{
    e.preventDefault();
    sec=0;
    // 배너 재생 초기화
    if(i==0){ // 왼쪽버튼 prev
      step--;
      step2--;
      if (step == -5){
        step = 3;
        banner_box[0].style.transitionProperty =`none`;
      }else banner_box[0].style.transitionProperty = `all`;
      if (step2 == -9){
        banner_box[1].style.transitionProperty = `none`;
        step2 = -1;
      }else banner_box[1].style.transitionProperty = `all`;
      banner_box[0].style.transform = `translateX(${slide_width*(step)}px)`;
      banner_box[1].style.transform = `translateX(${slide_width*step2}px)`;
    }else{
      step++;
      step2++;
      if (step2 == 1){
        banner_box[1].style.transitionProperty = `none`;
        step2 = -7;
      }else banner_box[1].style.transitionProperty = `all`;
      if (step == 5){
        step = -3;
        banner_box[0].style.transitionProperty =`none`;
      }else banner_box[0].style.transitionProperty = `all`;
      banner_box[0].style.transform = `translateX(${slide_width*(step)}px)`;
      banner_box[1].style.transform = `translateX(${slide_width*(step2)}px)`;
    }
  })
})
const progress_bar = document.querySelector(".bar span");
play_banner();

// function 모음
function scrollTo(object,i){
  let height = object.offsetTop;
  snb[i].classList.add("on");
  window.scroll({
    top:height,
    behavior:"smooth"
  });
  nav_Interative(i);
  turn_black(i);
}

function turn_black(i){
  wrap.classList.remove("black");
  if(i==2 || i==3){
    wrap.classList.add("black");
  }
}

function nav_Interative(i){
  let white = document.querySelector(".nav_bar");
  let prev = document.querySelector(".snb .prev_num");
  let next = document.querySelector(".snb .next_num");
  white.style.height = `${(i+1)*20}%`;
  switch_num(prev,next,i,5);
}

function switch_num(prev,next,i,length){
  prev.innerText=`0${i+1}`;
  if(i+1==length) next.innerText=` 0${length}`;
  else next.innerText=`0${i+2}`;
}

function play_banner(){
  setTimeout(() => {
    if(sec == 0) progress_bar.style.transitionDuration = `0s`;
    else progress_bar.style.transitionDuration = `1s`;
    let width = sec*25;
    sec++;
    console.log(sec);
    progress_bar.style.width = `${width}%`;
    play_banner();
  }, 1000);
  if(sec > 5) {
    sec=0;
    step++;
    banner_box[0].style.transform = `translateX(${-slide_width*(step)}px)`;
    banner_box[1].style.transform = `translateX(${-slide_width*(step)}px)`;
  }
}