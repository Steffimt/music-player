const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
progressCircle = document.getElementById('progress-circle');
playerProgress = document.getElementById('player-progress'),
shufBtn = document.getElementById('shuffle'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
volBtn = document.getElementById('volume'),
background = document.getElementById('bg-img');
var audioPlayer = document.getElementById('audioPlayer');
// const currentSongSource = getCurrentSource();
const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Abiogenesis',
        cover: 'assets/abiogenesis2.jpg',
        artist: 'Juggernaut.',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Doushite',
        cover: 'assets/doushite.jpg',
        artist: '高瀬統也',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'The Last Page',
        cover: 'assets/thelastpage2.jpg',
        artist: 'ARForest',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Marigold',
        cover: 'assets/marigold.webp',
        artist: 'M2U',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'ベテルギウス',
        cover: 'assets/betelgeuse.jpg',
        artist: 'Yuuri',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Movie',
        cover: 'assets/movie2.jpg',
        artist: 'Junny',
    },
    {
        path: 'assets/7.mp3',
        displayName: '7PM',
        cover: 'assets/7pm.jpeg',
        artist: 'BSS',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Our dawn is hotter than day',
        cover: 'assets/odihtd.jpg',
        artist: 'SEVENTEEN',
    },
    {
        path: 'assets/9.mp3',
        displayName: 'Everything Goes On',
        cover: 'assets/everything.jpg',
        artist: 'Porter Robinson',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'damn',
        cover: 'assets/damn2.jpg',
        artist: 'Fujii Kaze',
    },
    {
        path: 'assets/11.mp3',
        displayName: 'Overdose',
        cover: 'assets/overdose.jpg',
        artist: 'natori',
    },
    {
        path: 'assets/12.mp3',
        displayName: '大正浪漫',
        cover: 'assets/romance2.jpg',
        artist: 'YOASOBI',
    },
    {
        path: 'assets/13.mp3',
        displayName: 'Night Dancer',
        cover: 'assets/night.jpg',
        artist: 'imase',
    },
    {
        path: 'assets/14.mp3',
        displayName: 'Peru',
        cover: 'assets/peru2.jpg',
        artist: 'Ed Sheeran',
    },
    {
        path: 'assets/15.mp3',
        displayName: 'Scars',
        cover: 'assets/scars.jpg',
        artist: 'Keenan Te',
    },
    {
        path: 'assets/16.mp3',
        displayName: 'Closed Ending',
        cover: 'assets/closed.jpg',
        artist: 'SHAUN',
    },
    {
        path: 'assets/17.mp3',
        displayName: '風になる',
        cover: 'assets/ghibli2.jpg',
        artist: 'Tsuji Ayano',
    },
    {
        path: 'assets/18.mp3',
        displayName: 'Lady',
        cover: 'assets/lady2.jpg',
        artist: '米津玄師',
    },
    {
        path: 'assets/19.mp3',
        displayName: 'くちづけ Diamond',
        cover: 'assets/yamada.jpg',
        artist: 'WEAVER',
    }
]

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play()
}

function pauseMusic(){
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    // musicIndex = Math.floor(Math.random() * songs.length);
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// function changeMusic() {
//     let randomIndex;
//     do {
//         randomIndex = Math.floor(Math.random() * songs.length);
//     } while (randomIndex === musicIndex); // Ensure it's not the same as the current index
//     musicIndex = randomIndex;
//     loadMusic(songs[musicIndex]);
//     playMusic();
// }

function changeMusic2(){
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === musicIndex); // Ensure it's not the same as the current index
    musicIndex = randomIndex;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function getCurrentSource() {
    return music.src;
}

function muteVolume() {
    music.muted = true;
    volBtn.classList.replace('fa-volume-high', 'fa-volume-mute');
}

function unmuteVolume() {
    music.muted = false;
    volBtn.classList.replace('fa-volume-mute', 'fa-volume-high');
}

function toggleVolume() {
    if (music.muted) {
        unmuteVolume();
    } else {
        muteVolume();
    }
}


function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    if (!isNaN(duration) && !isNaN(currentTime)) {
        const circleWidth = 12;
        progressCircle.style.left = `calc(${progressPercent}% - ${circleWidth/2}px)`;

        const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
        durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
        currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
    }
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
// prevBtn.addEventListener('click', changeMusic);
// nextBtn.addEventListener('click', changeMusic);
shufBtn.addEventListener('click', changeMusic2);
volBtn.addEventListener('click', toggleVolume);
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);