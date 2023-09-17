
const song_name = Array.from(document.getElementsByClassName('song_name'));
const song_List = Array.from(document.getElementsByClassName('songlist'));
const song_name_bottom = document.getElementById('song_name_bottom');
const song_List_para = Array.from(document.querySelectorAll('.song_name p'));
const play_pause_button = document.querySelector('.pauseButton');
const range_bar = document.getElementById('range_bar');

const coverImage = Array.from(document.querySelectorAll('.songlist .album img'));
const cover_play_pause = Array.from(document.querySelectorAll('.play_pause'));
const play_pause_icon_cover = Array.from(document.querySelectorAll(".play_pause i"));
const right_song_btn = document.getElementById('right_song_btn');
const left_song_btn = document.getElementById('left_song_btn');
const gif = document.getElementById('gif');
const shuffle_btn = document.querySelector('.fa-shuffle');
const search_btn = document.getElementById('search_bar');
let search_bar_ul = document.getElementById('search_dropdown_ul');
let search = document.getElementById('search_dropdown');
search.classList.add('displayNone');
const replay_btn = document.querySelector('.bx-rotate-right');
////////////////////
let search_list_li;
let percentage;
let search_index;
/////////////////////
const trending_drop_down_div = document.querySelector('.trending-drop-down');
const trending_drop_down_ul = document.querySelector('.trending-drop-down ul');
const mood_genre_drop_down_div = document.querySelector('.mood_genre-drop-down');
const mood_genre_drop_down_ul = document.querySelector('.mood_genre-drop-down ul');
const comedy_drop_down_li = document.querySelector('.comedy_drop_li');
const comedy_drop_down = document.querySelector('.Comedy_drop_down');
const top_artist_drop_down = document.querySelector('.top_artist-drop-down');
const top_artist_drop_down_ul = document.querySelector('.top_artist-drop-down ul');
const starting_time = document.getElementById('starting_time');
const ending_time = document.getElementById('ending_time');

// console.log(top_artist_drop_down_ul);


let audio_arr = [
    { songName: "Arcando _ Maazel - To Be Loved [NCS Release]", filePath: "audio1.mp3", coverPath: "cover1.jpg" },
    { songName: "Henri Werner - Burned [NCS Release]", filePath: "audio2.mp3", coverPath: "cover2.jpg" },
    { songName: "KILLA - Retro Love [NCS Release]", filePath: "audio3.mp3", coverPath: "cover3.jpg" },
    { songName: "Moav - I Don_t Wanna Know [NCS Release]", filePath: "audio4.mp3", coverPath: "cover4.jpg" },
    { songName: "Reece Taylor - Sugar Plumbin_ [NCS Release]", filePath: "audio5.mp3", coverPath: "cover5.jpg" },
    { songName: "ROY KNOX - Closer [NCS Release]", filePath: "audio6.mp3", coverPath: "cover6.jpg" },
    { songName: "VOLT VISION_ Beneath My Shade - Dangerous [NCS Release]", filePath: "audio7.mp3", coverPath: "cover7.jpg" },
    { songName: "Zaug - 8 Rounds [NCS Release]", filePath: "audio8.mp3", coverPath: "cover8.jpg" },
    { songName: "audio9", filePath: "audio9.mp3", coverPath: "cover9.jpg" },
    { songName: "T-Mass _ Rain Man - Follow (feat. Vikki Gilmore) [NCS Release]", filePath: "audio10.mp3", coverPath: "cover10.jpg" }
]



let audioIndex = 1;
let audio = new Audio(`audio${audioIndex}.mp3`);

for (let i = 0; i < audio_arr.length; i++) {
    audio_arr[i].songName = `${song_List_para[i].textContent}`;
    coverImage[i].src = `${audio_arr[i].coverPath}`;
}
function song_play_event(i, e) {
    // console.log("song play event")
    audio.src = `audio${i + 1}.mp3`;

    for (let k = 0; k < play_pause_icon_cover.length; k++) {
        if (k !== i) {
            play_pause_icon_cover[k].classList.add('bx-play-circle');
            play_pause_icon_cover[k].classList.remove('bx-pause-circle');
        }
    }
    play_pause_icon_cover[i].classList.remove('bx-play-circle');
    play_pause_icon_cover[i].classList.add('bx-pause-circle');

    if (play_pause_icon_cover[i].classList.contains('bx-pause-circle')) {
        audio.play();
        gif.classList.remove('displayNone');
        play_pause_button.classList.remove('bx-play-circle');
        play_pause_button.classList.add('bx-pause-circle');
    }
    else if (play_pause_icon_cover[i].classList.contains('bx-play-cirlcle')) {
        audio.pause();
        gif.classList.add('displayNone');
        play_pause_button.classList.add('bx-play-circle');
        play_pause_button.classList.remove('bx-pause-circle');
    }

    if (!isNaN(i)) {
        call_index_i(i);
    }
    song_name_bottom_display_func();
}
function range_bar_event() {
    audio.currentTime = (range_bar.value * audioDuration) / 100;
}
function audio_timeUpdate_event() {
    currentTime = (audio.currentTime);
    audioDuration = Math.floor(audio.duration);
    percentage = Math.floor((currentTime / audioDuration) * 100);
    range_bar.value = percentage;
    console.log(Math.floor(currentTime))

    /// starting time
    let minute = Math.floor(currentTime / 60);
    let remainder = Math.floor(currentTime % 60);
    if (remainder < 10 && minute < 10) {
        starting_time.textContent = `0${minute}:0${remainder}`;
    }
    else if (remainder >= 10 && minute >= 10) {
        starting_time.textContent = `${minute}:${remainder}`;
    }
    else if (remainder < 10 && minute > 10) {
        starting_time.textContent = `${minute}:0${remainder}`;
    }
    else if (remainder > 10 && minute < 10) {
        starting_time.textContent = `0${minute}:${remainder}`;
    }
    else {
        starting_time.textContent = `0${minute}:${remainder}`;
    }
    /// ending time

    let ending_minute = Math.floor(audioDuration / 60);
    let ending_second = Math.floor(audioDuration % 60);
    if (ending_second >= 10) {
        ending_time.textContent = `0${ending_minute}:${ending_second}`
    }
    else if (ending_second < 10) {
        ending_time.textContent = `0${ending_minute}:0${ending_second}`
    }


}
let k;
function call_index_i(i) {
    k = i;
}
let first_icon = true;
function play_pause_button_event() {
    gif.classList.toggle('displayNone');
    if (isNaN(k) && first_icon) {
        song_name_bottom.textContent = audio_arr[0].songName;
        play_pause_icon_cover[0].classList.remove('bx-play-circle');
        play_pause_icon_cover[0].classList.add('bx-pause-circle');
        first_icon = false;
    }

    if (audio.paused) {
        audio.play();
        play_pause_button.classList.remove('bx-play-circle');
        play_pause_button.classList.add('bx-pause-circle');
        if (!isNaN(k)) {
            play_pause_icon_cover[k].classList.remove('bx-play-circle');
            play_pause_icon_cover[k].classList.add('bx-pause-circle');
        }
        else {
            play_pause_icon_cover[audioIndex - 1].classList.remove('bx-play-circle');
            play_pause_icon_cover[audioIndex - 1].classList.add('bx-pause-circle');
        }
    }
    else {
        audio.pause();
        play_pause_button.classList.add('bx-play-circle');
        play_pause_button.classList.remove('bx-pause-circle');
        if (!isNaN(k)) {
            play_pause_icon_cover[k].classList.add('bx-play-circle');
            play_pause_icon_cover[k].classList.remove('bx-pause-circle');
        }
        else {
            play_pause_icon_cover[audioIndex - 1].classList.add('bx-play-circle');
            play_pause_icon_cover[audioIndex - 1].classList.remove('bx-pause-circle');
        }
    }
    song_name_bottom_display_func();
}
function right_song_btn_event() {
    if (audio.paused) {
        return;
    }
    if (!isNaN(k)) {
        k++;
        if (k > 9) {
            k = 0;
        }
        // console.log(k);
        audio.src = `audio${k + 1}.mp3`;
        console.log(k + 1);
        for (let m = 0; m < play_pause_icon_cover.length; m++) {
            if (m !== k) {
                play_pause_icon_cover[m].classList.add('bx-play-circle');
                play_pause_icon_cover[m].classList.remove('bx-pause-circle');
            }
            else {
                play_pause_icon_cover[m].classList.remove('bx-play-circle');
                play_pause_icon_cover[m].classList.add('bx-pause-circle');
            }
        }

    }
    else {
        audioIndex++;
        audio.src = `audio${audioIndex}.mp3`


        for (let m = 0; m < play_pause_icon_cover.length; m++) {
            if (m !== (audioIndex - 1)) {
                play_pause_icon_cover[m].classList.add('bx-play-circle');
                play_pause_icon_cover[m].classList.remove('bx-pause-circle');
            }
            else {
                play_pause_icon_cover[m].classList.remove('bx-play-circle');
                play_pause_icon_cover[m].classList.add('bx-pause-circle');
            }
        }

    }

    audio.play();
    // console.log(k);
    // console.log(audioIndex);
    if (audioIndex > 9) {
        // console.log(audioIndex);
        audioIndex = 0;
    }

    song_name_bottom_display_func()
}
function left_song_btn_event() {
    if (audio.paused) {
        return;
    }
    if (!isNaN(k)) {
        k--;
        if (k < 0) {
            k = 9;
        }
        // console.log(k);
        audio.src = `audio${k + 1}.mp3`;
        console.log(k + 1);
        for (let m = 0; m < play_pause_icon_cover.length; m++) {
            if (m !== k) {
                play_pause_icon_cover[m].classList.add('bx-play-circle');
                play_pause_icon_cover[m].classList.remove('bx-pause-circle');
            }
            else {
                play_pause_icon_cover[m].classList.remove('bx-play-circle');
                play_pause_icon_cover[m].classList.add('bx-pause-circle');
            }
        }

    }
    else {
        audioIndex--;
        if (audioIndex === 0) {

            audioIndex = 10;
        }
        audio.src = `audio${audioIndex}.mp3`
        // console.log(audioIndex);
        for (let m = 0; m < play_pause_icon_cover.length; m++) {
            if (m !== (audioIndex - 1)) {
                play_pause_icon_cover[m].classList.add('bx-play-circle');
                play_pause_icon_cover[m].classList.remove('bx-pause-circle');
            }
            else {
                play_pause_icon_cover[m].classList.remove('bx-play-circle');
                play_pause_icon_cover[m].classList.add('bx-pause-circle');
            }
        }

    }
    audio.play();
    song_name_bottom_display_func()
}
function song_name_bottom_display_func() {
    for (let i = 0; i < audio_arr.length; i++) {
        if (play_pause_icon_cover[i].classList.contains('bx-pause-circle')) {
            song_name_bottom.textContent = audio_arr[i].songName;
        }
        // if(){
        //     song_name_bottom.textContent = audio_arr[0].songName;
        // }
    }
}
function replay_btn_event() {
    audio.currentTime = 0;
    audio.play();
}
function shuffle_btn_event() {
    if (isNaN(k)) {
        return;
    }
    shuffle_btn.classList.toggle('aqua');
    if (shuffle_btn.classList.contains('aqua')) {
        audio.addEventListener('timeupdate', () => {
            console.log(k);

            if (audio.currentTime === audio.duration && !isNaN(k)) {

                k++;
                if (k === 10) {
                    k = 0;
                }
                console.log(k);
                audio.src = `audio${k + 1}.mp3`;
                audio.play();
                for (let i = 0; i < audio_arr.length; i++) {
                    if (i !== k) {
                        play_pause_icon_cover[i].classList.add('bx-play-circle');
                        play_pause_icon_cover[i].classList.remove('bx-pause-circle');
                    }
                    else {
                        play_pause_icon_cover[i].classList.remove('bx-play-circle');
                        play_pause_icon_cover[i].classList.add('bx-pause-circle');
                    }
                }

            }
        })

    }


}
function search_btn_focus_event() {
    let clutter = '';

    for (let i = 0; i < audio_arr.length; i++) {
        if ((audio_arr[i].songName).includes(search_btn.value)) {
            clutter += `<li id="${i}" >${audio_arr[i].songName}</li>`
            search.classList.remove('displayNone');
        }

        if (search_btn.value === '') {
            clutter = '';
            search.classList.add('displayNone');
        }

    }
    search_bar_ul.innerHTML = clutter;
    search_list_li = Array.from(document.querySelectorAll('#search_dropdown_ul li'));
    search_list_li.forEach((element) => {
        element.addEventListener('click', search_list_li_event);
    })
}
function search_list_li_event(e) {
    console.log(e.target.id);
    let number = Number(e.target.id);
    song_play_event(number, e);
}




song_List.forEach((song, i) => {
    song.addEventListener("click", song_play_event.bind(null, i));
})

range_bar.addEventListener('input', range_bar_event);
audio.addEventListener('timeupdate', audio_timeUpdate_event);
play_pause_button.addEventListener('click', play_pause_button_event);
right_song_btn.addEventListener('click', right_song_btn_event);
left_song_btn.addEventListener('click', left_song_btn_event);
replay_btn.addEventListener('click', replay_btn_event);
shuffle_btn.addEventListener('click', shuffle_btn_event);
search_btn.addEventListener("input", search_btn_focus_event);

////////////////////////////

trending_drop_down_div.addEventListener('mouseover', () => {
    trending_drop_down_ul.style.display = 'block';
})
trending_drop_down_div.addEventListener('mouseout', () => {
    trending_drop_down_ul.style.display = 'none';
})

mood_genre_drop_down_div.addEventListener('mouseover', () => {
    mood_genre_drop_down_ul.style.display = 'block';
})
mood_genre_drop_down_div.addEventListener('mouseout', () => {
    mood_genre_drop_down_ul.style.display = 'none';
})
comedy_drop_down_li.addEventListener('mouseover', () => {
    comedy_drop_down.style.display = 'block';
})
comedy_drop_down_li.addEventListener('mouseout', () => {
    comedy_drop_down.style.display = 'none';
})
top_artist_drop_down.addEventListener('mouseover', () => {
    console.log('hii')
    top_artist_drop_down_ul.style.display = 'block';
})
top_artist_drop_down.addEventListener('mouseout', () => {
    top_artist_drop_down_ul.style.display = 'none';
})




// for width < 350px 
