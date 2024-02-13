const main_visual = document.querySelector("#container .main_visual");
const menu = document.querySelector("#container .menu_wrap");
const spot = document.querySelector("#container .spot");
const content = document.querySelector("#container #content");
const height = menu.offsetTop;
let scale = 1;
spot.addEventListener("wheel",e=>{
  if(e.deltaY>0 & window.pageYOffset < spot.offsetHeight){
    scrollTo(spot);
    // console.log(e.deltaY); 양수가 아래
  }
  if(e.deltaY<0 & window.pageYOffset <= height){
    scrollTo(content,0);
  }
})

window.addEventListener("scroll", e=>{
  if(window.pageYOffset >= (spot.offsetHeight/3)) {
    scale = 1.2;}
  else if(window.pageYOffset < height){
    scale = 1;
  }
  spot.style.scale = scale;
  if(window.pageYOffset >= spot.offsetHeight){
    main_visual.classList.add("on")
    menu.style.transitionDuration = `0s`;
  }else if(window.pageYOffset < height){
    menu.style.transitionDuration = `.5s`;
    main_visual.classList.remove("on");
  }
})

// function
function scrollTo(){
  let height = arguments[0].offsetHeight;
  if(arguments[1] == 0) height = 0;
  window.scroll({
    top:height,
    behavior:"smooth"
  });
}