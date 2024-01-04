window.onload = () => {
    let progressSlider = document.querySelector('.progress-slider');
    let progressNumber = document.querySelectorAll('.progress-number p');
    let song = document.querySelector('.song');
    const songImage = document.querySelector('.song-info img');
    const songTitle = document.querySelector('.title');
    const artistName = document.querySelector('.artist');
    const playButton = document.querySelector('.play-pause');
    const playIcon = document.querySelector('.play-icon');
    const nextSongBtn = document.querySelector('.next');
    const prevSongBtn = document.querySelector('.prev');
    let songs = [
        {
            title: 'Lost in the City Lights',
            artist: 'Cosmo Sheldrake',
            image: 'assets/images/cover-1.png',
            file: 'assets/audios/lost-in-city-lights-145038.mp3',
        },
        {
            title: 'Forest Lullaby',
            artist: 'Lesfm',
            image: 'assets/images/cover-2.png',
            file: 'assets/audios/forest-lullaby-110624.mp3',
        },
        {
            title: 'Call My Name',
            artist: 'J Calm',
            image: 'assets/images/call-my-name.jpg',
            file: 'assets/audios/call my name.mp3.mp3',
        },
        {
            title: 'Asiwaju',
            artist: 'Ruger',
            image: 'assets/images/Ruger-Asiwaju-artwork.jpg',
            file: 'assets/audios/Ruger-Asiwaju-(TrendyBeatz.com).mp3',
        }
    ];
    let currentIndex = 0;

    // Get the audio element and add an event listener to it for when the track is loaded
    song.addEventListener('loadedmetadata', () => {
        progressSlider.max = song.duration;
        progressSlider.value = song.currentTime;
        displayProgress();
        displayDuration();
        
    })

    progressSlider.addEventListener('change', function () {
        song.currentTime = progressSlider.value;
    })

    playButton.addEventListener('click', () => {
        if (playIcon.src === 'http://127.0.0.1:5500/simple-music-player/assets/icons/play-solid.svg') {
            song.play();
            playIcon.src = 'assets/icons/pause-solid.svg';
        } else {
            song.pause();
            playIcon.src = 'assets/icons/play-solid.svg';
        }
    })

    nextSongBtn.addEventListener('click', playNextSong());

    prevSongBtn.addEventListener('click', playPrevSong());

    if (song.play()) {
        setInterval(() => {
            updateProgressBar();
            displayProgress();
        }, 500)
    }

    song.addEventListener('ended', playNextSong());

    function updateProgressBar() {
       progressSlider.value = song.currentTime;
    }

    function displayProgress() {
        let minutes = Math.floor(progressSlider.value / 60);
        let seconds = Math.round(progressSlider.value % 60);
        let timeDisplay = `${addZero(minutes)}:${addZero(seconds)}`;
        progressNumber[0].textContent = timeDisplay;
    }

    function displayDuration() {
        let durationMinutes = Math.floor(progressSlider.max / 60);
        let durationSeconds = Math.round(progressSlider.max % 60);
        let durationDisplay = `${addZero(durationMinutes)}:${addZero(durationSeconds)}`;
        progressNumber[1].textContent = durationDisplay;
    }

    function addZero(number) {
        return number < 10 ? `0${number}` : number;
    }

    function playNextSong() {
        return () => {
            stopSong();
            currentIndex++;
            if (currentIndex >= songs.length) {
                currentIndex = 0;
                loadNewSong(songs[currentIndex]);
            } else {
                loadNewSong(songs[currentIndex]);
                song.play();
                playIcon.src = 'assets/icons/pause-solid.svg';
            }
        }
    }

    function playPrevSong() {
        return () => {
            stopSong();
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = songs.length - 1;
                loadNewSong(songs[currentIndex]);
            } else {
                loadNewSong(songs[currentIndex]);
                song.play();
                playIcon.src = 'assets/icons/pause-solid.svg';
            }
        }
    }

    function loadNewSong(track) {
        song.src = track.file;
        songTitle.innerHTML = track.title;
        artistName.innerHTML = track.artist;
        songImage.src = track.image;
        playIcon.src = 'assets/icons/play-solid.svg';
    }

    function stopSong() {
        song.pause();
        progressSlider.value = 0;
        playIcon.src = 'assets/icons/play-solid.svg';
    }
}