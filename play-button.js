// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(containerElement, playButtonCallback) {
    // TODO(you): Implement the constructor and add fields as necessary.
    this.isPlaying = true;

    this.containerElement = containerElement;
    this.playButtonCallback = playButtonCallback;

    this.containerElement.addEventListener('click', (event) => {
      console.log("click button");
      this.playButtonCallback(this.isPlaying)

      if(this.isPlaying)
      {
        this.isPlaying = false;
        this.containerElement.style.backgroundImage="url(images/play.png)";
      }
      else 
      {
        this.isPlaying = true;
        this.containerElement.style.backgroundImage="url(images/pause.png)";
      }

    })

  }
  // TODO(you): Add methods as necessary.
}
