//expects a array of songs as parameter
var musicPlayer = class musicPlayer {
    constructor(songsPara) {
        // search for right parameter in parameter array, namely songs
        for(var l = 0; l < songsPara.length; l++){
            if(songsPara[l].name == "songs"){
                this.songsArray = songsPara[l].value;
            }
        }

        //if no songs are given it will just make an empty player
        if(this.songsArray == null){
            this.songsArray = [];
        }

        this.audio;
        this.audioElement;
        console.log("musicPlayer");

        //holds the index of the song that is currently playing
        this._next = 0;
    }

	//only needs an audio HTML tag
    initialise(uiPara) {
        var self = this;

        // search for right parameter in ui parameter array being an audio tag
        for(var m = 0; m < uiPara.length; m++){
            if(uiPara[m].name == "player"){
                //get ui element id to link functionality to it
                self.audio = uiPara[m].value;
            }
        }

        self.audioElement = document.getElementById(self.audio);
        self.audioElement.src = URL.createObjectURL(self.songsArray[self._next]);
        self.audioElement.play();

        self.audioElement.addEventListener("ended", function(){
            //free the URI when don't needed anymore
            URL.revokeObjectURL(self.audioElement.src);

            self._next += 1;
            if(self._next < self.songsArray.length){
                self.audioElement.src = URL.createObjectURL(self.songsArray[self._next]);
                self.audioElement.play();
            }

        });
    }


}

