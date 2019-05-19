// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.

    //bind funcotion
    this.show = this.show.bind(this);
    this.playButtonCallback = this.playButtonCallback.bind(this);

    // html attribute
    this.containerElement = containerElement;
    this.gifContainer = document.querySelector('#gif');
    this.loadingPage = document.querySelector('#loading');
    this.foreground = document.querySelector('#foreground');
    this.background = document.querySelector("#background");
    this.button = document.querySelector('#button');
    
    // attribute
    this.gifDisplay = new GifDisplay(this.gifContainer, this.show);
    this.isPlaying = true;
    this.playButton = new PlayButton(this.button, this.playButtonCallback);
    this.isFore = true;

    


    document.addEventListener('openMusicPage', (event) => {

      this.loadingPage.style.diplay = "block";
      this.audioPlayer = new AudioPlayer();
      this.audioPlayer.setSong(event.detail['selectedSong']);
      // console.log(event.detail['selectedSong']);
      this.audioPlayer.setKickCallback(() => {
        console.log("kick");

        if(this.isFore)
        {
          this.foreground.style.zIndex="1";
          this.background.style.zIndex="99";
          this.isFore = false;
        }
        else
        {
          this.foreground.style.zIndex="99";
          this.background.style.zIndex="1";
          this.isFore = true;
        }
        this.gifDisplay.changeImage(this.isFore);
      })
      document.dispatchEvent(new CustomEvent('loadingImages', { detail: event.detail}));//, gifUrl: this.queryInput.value}));

    });

  }
  // TODO(you): Add methods as necessary.
  show() {
    this.loadingPage.style.display = "none";
    this.containerElement.style.display = "flex";

    this.audioPlayer.play();
    this.gifDisplay.setGif(this.foreground, this.background);
  }
  playButtonCallback(isPlaying)
  {  
    if(isPlaying)
      this.audioPlayer.pause();
    else
      this.audioPlayer.play();
  }
}
