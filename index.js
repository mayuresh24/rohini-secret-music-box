const playlist = [

{
title:"Agar Tum Saath Ho",
artist:"Artist",
src:"https://raw.githubusercontent.com/mayuresh24/rohini-secret-music-box/main/agar%20tum%20sath%20ho.mp3",
color:"#ffb6d9"
},

{
title:"Zindagi ke safar me",
artist:"Artist",
src:"https://raw.githubusercontent.com/mayuresh24/rohini-secret-music-box/main/zindagi ke safar me.mp3",
color:"#cdb4ff"
},

{
title:"Jane wo kaise log the",
artist:"Artist",
src:"https://raw.githubusercontent.com/mayuresh24/rohini-secret-music-box/main/jane wo kaise log the.mp3",
color:"#ffd6a5"
},

{
title:"Luka Chuppi",
artist:"Artist",
src:"https://raw.githubusercontent.com/mayuresh24/rohini-secret-music-box/main/luka chuppi.mp3",
color:"#a8edea"
},

{
title:"Jeev Rangala",
artist:"Artist",
src:"https://raw.githubusercontent.com/mayuresh24/rohini-secret-music-box/main/jeev rangala.mp3",
color:"#fbc2eb"
}

];

const audio =
document.getElementById("audio");

const playBtn =
document.getElementById("playBtn");

const nextBtn =
document.getElementById("nextBtn");

const prevBtn =
document.getElementById("prevBtn");

const progress =
document.getElementById("progress");

const progressContainer =
document.getElementById("progressContainer");

const songTitle =
document.getElementById("songTitle");

const songArtist =
document.getElementById("songArtist");

const disc =
document.getElementById("disc");

const volumeSlider =
document.getElementById("volumeSlider");

const playlistDiv =
document.getElementById("playlist");

const currentTimeEl =
document.getElementById("currentTime");

const durationEl =
document.getElementById("duration");

let currentSong = 0;

let shuffle = false;
let repeat = false;

function loadSong(index){

currentSong=index;

audio.src=
playlist[index].src;

songTitle.textContent=
playlist[index].title;

songArtist.textContent=
playlist[index].artist;

document.body.style.background=
`linear-gradient(
135deg,
${playlist[index].color}, #d9c5ff, #fff0c9
)`;

document
.querySelectorAll(".song")
.forEach(el=>el.classList.remove("active"));

document
.querySelectorAll(".song")[index]
.classList.add("active");

}

function playSong(){

audio.play();

playBtn.textContent="⏸";

disc.classList.add("playing");

}

function pauseSong(){

audio.pause();

playBtn.textContent="▶";

disc.classList.remove("playing");

}

playBtn.addEventListener("click",()=>{

if(audio.paused){

playSong();

}else{

pauseSong();

}

});

nextBtn.addEventListener("click",()=>{

if(shuffle){

currentSong=
Math.floor(
Math.random()*playlist.length
);

}else{

currentSong=
(currentSong+1)%playlist.length;

}

loadSong(currentSong);

playSong();

});

prevBtn.addEventListener("click",()=>{

currentSong--;

if(currentSong<0){

currentSong=
playlist.length-1;

}

loadSong(currentSong);

playSong();

});

audio.addEventListener("timeupdate",()=>{

const percent=
(audio.currentTime/audio.duration)*100;

progress.style.width=
percent+"%";

currentTimeEl.textContent=
formatTime(audio.currentTime);

durationEl.textContent=
formatTime(audio.duration);

});

function formatTime(time){

if(isNaN(time))
return "0:00";

const min=
Math.floor(time/60);

const sec=
Math.floor(time%60);

return `${min}:${sec<10?"0":""}${sec}`;

}

progressContainer
.addEventListener("click",(e)=>{

const width=
progressContainer.clientWidth;

const clickX=
e.offsetX;

audio.currentTime=
(clickX/width)*audio.duration;

});

volumeSlider
.addEventListener("input",()=>{

audio.volume=
volumeSlider.value;

});

audio.addEventListener("ended",()=>{

if(repeat){

playSong();

return;

}

nextBtn.click();

});

document
.getElementById("shuffleBtn")
.addEventListener("click",()=>{

shuffle=!shuffle;

});

document
.getElementById("repeatBtn")
.addEventListener("click",()=>{

repeat=!repeat;

});

playlist.forEach((song,index)=>{

const div=
document.createElement("div");

div.className="song";

div.innerHTML=
`🎵 ${song.title}`;

div.addEventListener("click",()=>{

loadSong(index);
playSong();

});

playlistDiv.appendChild(div);

});

loadSong(0);

for(let i=0;i<80;i++){

const star=
document.createElement("div");

star.className="star";

star.style.left=
Math.random()*100+"vw";

star.style.top=
Math.random()*100+"vh";

star.style.animationDelay=
Math.random()*3+"s";

document
.querySelector(".stars")
.appendChild(star);

}
