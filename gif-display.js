// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(containerElement, musicStart) {

    // attribute
    this.containerElement = containerElement;
    this.errorDiv = document.querySelector('#error');
    this.menuDiv = document.querySelector('#menu');
    this.musicStart = musicStart;
    this.images = [];
    this.foreImageIndex = -1;
    this.backImageIndex = -1;

    // bind function 
    this._loading = this._loading.bind(this);
    this.setGif = this.setGif.bind(this);
    this.getRandomNum = this.getRandomNum.bind(this);
    this.changeImage = this.changeImage.bind(this);

    // TODO(you): Implement the constructor and add fields as necessary.
    document.addEventListener('loadingImages', (event) => {

      var gifJsonUrl = "https://api.giphy.com/v1/gifs/search?q="+ event.detail["gifUrl"] +"&api_key=IZdz8B09DglQg3dTJUMTgqLGCesMPOVZ&limit=25&rating=g";

      fetch(gifJsonUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        if(json.data.length < 2)
        {
          // error handling
          this.errorDiv.classList.remove("inactive");
          document.querySelector('#musicBox').style.display = "none";
          this.menuDiv.style.display = "flex";
        }
        else
        {
          this._loading(json, 0);
        }
      })

    });

  }
  // TODO(you): Add methods as necessary.
  setGif(foreground, background)
  {
    this.foreground = foreground;
    this.background = background;
    
    this.foreImageIndex = this.getRandomNum(this.backImageIndex);
    this.backImageIndex = this.getRandomNum(this.foreImageIndex);

    this.foreground.style.backgroundImage="url('"+this.images[this.foreImageIndex].src+"')";
    this.background.style.backgroundImage="url('"+this.images[this.backImageIndex].src+"')";
  }
  getRandomNum(counterNum)
  {
    var index = 0;
    while(true)
    {
      index = Math.floor(Math.random() * this.images.length);
      if(index != counterNum)
        break;
    }
    return index
  }
  changeImage(isFore) {
    if(isFore)
    {
      this.foreImageIndex = this.getRandomNum(this.backImageIndex);
      this.foreground.style.backgroundImage="url('"+this.images[this.foreImageIndex].src+"')";
    }
    else
    {
      this.backImageIndex = this.getRandomNum(this.foreImageIndex);
      this.background.style.backgroundImage="url('"+this.images[this.backImageIndex].src+"')";
    }
  }
  _loading(json, i) {
    if (i >= json.data.length)
      return;
    if (i == 2)
      this.musicStart();

    this.images[i] = new Image(json.data[i].images.downsized.width, json.data[i].images.downsized.height);
    this.images[i].src = json.data[i].images.downsized.url;
    this.images[i].addEventListener('load', (event) => {
      this._loading(json, ++i);
    });
  }
}
