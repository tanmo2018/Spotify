console.log("Welcome to Spotify");
// inttialize the variables
let songIndex = 0;
let audioElemt = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let MyP_Bar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
        
let songs = [
    { songName: "Let me Love You", filePath: "song1.mp3", coverPath: "img1.jpg" },
    { songName: "Phir Na Aisi Raat Aayegi - Arijit Singh", filePath: "song2.mp3", coverPath: "img2.avif" },
    { songName: "Jabo Na Jabo Na - Arijit Singh", filePath: "song3.mp3", coverPath: "img3.avif" },
    { songName: "Stay - Justin Beiber", filePath: "song4.mp3", coverPath: "img4.avif" },
    { songName: "Tus Besos -Freebot ", filePath: "song5.mp3", coverPath: "img5.avif" },
    { songName: "Unstoppable - Sia", filePath: "song6.mp3", coverPath: "img6.avif" },
    { songName: "Gangnam Style - Psy", filePath: "song7.mp3", coverPath: "img7.avif" },
    { songName: "Believers - Imagine Dragone", filePath: "song8.mp3", coverPath: "img8.avif" },
    { songName: "Out Of Love - Alan Walker", filePath: "song9.mp3", coverPath: "img9.avif" },
    { songName: "Anyone - Justin Beiber", filePath: "song10.mp3", coverPath: "img10.avif" },
]
// Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElemt.paused || audioElemt.currentTime <= 0) {
        audioElemt.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
            if(parseInt(Element.id)==songIndex)
            Element.classList.remove('fa-circle-play');
            Element.classList.add('fa-circle-pause');
        })
       
    }
    else {
        makeAllPlays();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        audioElemt.pause();
        gif.style.opacity = 0;


    }
})

// Listen to Events
audioElemt.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    let progress = parseFloat((audioElemt.currentTime / audioElemt.duration) * 100);
    console.log(progress);
    MyP_Bar.value = progress;
    // Update Seekbar
})

MyP_Bar.addEventListener('change', () => {
    audioElemt.currentTime = MyP_Bar.value * audioElemt.duration / 100;
})

songItems.forEach((Element, i) => {
    // console.log(Element,i);
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
        Element.classList.remove('fa-circle-pause');
        Element.classList.add('fa-circle-play');
    })
}

// Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
//     Element.addEventListener('click', (e) => {
//         makeAllPlays();
//         songIndex = parseInt(e.target.id);
//         document.getElementById('masterSong').innerHTML = songs[songIndex].songName;
//         // e.target.classList.remove('fa-circle-play');
//         // e.target.classList.add('fa-circle-pause');
//         audioElemt.src = songs[songIndex].filePath;
//         // gif.style.opacity=1;
//         // audioElemt.play();
//         masterPlay.classList.remove('fa-circle-play');
//         masterPlay.classList.add('fa-circle-pause');

//         if (audioElemt.paused || audioElemt.currentTime <= 0) {
//             audioElemt.currentTime = 0;
//             audioElemt.play();
//             gif.style.opacity = 1;
//             e.target.classList.remove('fa-circle-play');
//             e.target.classList.add('fa-circle-pause');


//         }
//         else {
//             // e.target.classList.remove('fa-circle-pause');
//             // e.target.classList.add('fa-circle-play');
//             audioElemt.pause();
//             gif.style.opacity = 0;


//         }
//     })
// })
Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element) => {
    Element.addEventListener('click', (e) => {
        let presongIdx = songIndex;
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        if (presongIdx == songIndex) {
            if (audioElemt.paused) {

                audioElemt.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;

            }
            else {
                audioElemt.pause();
                // e.target.classList.remove('fa-circle-pause');
                // e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 0;



            }
        }
        else {

            document.getElementById('masterSong').innerHTML = songs[songIndex].songName;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElemt.src = songs[songIndex].filePath;
            gif.style.opacity = 1;
            audioElemt.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex > 9)
        songIndex = 0;
    else {
        songIndex++;
    }
    makeAllPlays();
    document.getElementById('masterSong').innerHTML = songs[songIndex].songName;

    audioElemt.src = songs[songIndex].filePath;
    audioElemt.currentTime = 0;
    audioElemt.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex < 0)
        songIndex = 9;
    else {
        songIndex--;
    }
    makeAllPlays();
    audioElemt.src = songs[songIndex].filePath;
    audioElemt.currentTime = 0;
    document.getElementById('masterSong').innerHTML = songs[songIndex].songName;
    audioElemt.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})



