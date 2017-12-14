var urlOpener = class urlOpener {

    constructor(urlPara) {

        // search for right parameter in parameter array, namely url
        for (var l = 0; l < urlPara.length; l++) {
            if (urlPara[l].name == "url") {
                this.url = urlPara[l].value;
            }
        }

        //default url is google
        if (this.url == null) {
            this.url = "http://google.com";
        }

        this.button;
        console.log("urlOpener");
    }

    initialise(uiPara) {

    	var self = this;

        // search for right parameter in ui parameter array being a button
        for(var m = 0; m < uiPara.length; m++){
            if(uiPara[m].name == "button"){
                //get ui element id to link functionality to it
                self.button = uiPara[m].value;
            }
        }

        $("#"+self.button).click(function(){
            //open url in new tab
            window.open(self.url);
        });
    }
}
