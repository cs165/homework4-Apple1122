// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(containerElement) {
    // TODO(you): Implement the constructor and add fields as necessary.

    // bind function
    this.hide = this.hide.bind(this);

    // attribute
    const themes =['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];


    // html attribute
    this.containerElement = containerElement;
    this.songSelector = containerElement.querySelector('#song-selector');
    this.queryInput = containerElement.querySelector('#query-input');
    this.submitForm = containerElement.querySelector('form');

    fetch('https://fullstackccu.github.io/homeworks/hw4/songs.json')
      .then((response) => {
          return response.json();
      })
      .then((jsonOptions) => {
        // console.log(jsonOptions);
        this.jsonOptions = jsonOptions;

        // add options
        for(var key in jsonOptions)
        {
          var option = document.createElement("option");
          option.text = jsonOptions[key].title;
          option.value = jsonOptions[key].songUrl;
          this.songSelector.add(option);
        }
      });




      this.queryInput.value = themes[Math.floor(Math.random() * themes.length)];

      // console.log('hello');

      this.submitForm.addEventListener('submit', (event) => {
  
        event.preventDefault();
        var data = {
          "selectedSong": this.songSelector.value,
          "gifUrl": this.queryInput.value
        };// IZdz8B09DglQg3dTJUMTgqLGCesMPOVZ
        document.dispatchEvent(new CustomEvent('submitForm', { detail: data}));//, gifUrl: this.queryInput.value}));
      });




  }
  // TODO(you): Add methods as necessary.
  hide(){
    //hide the menu screen
    this.containerElement.style.display="none";
  }
}
