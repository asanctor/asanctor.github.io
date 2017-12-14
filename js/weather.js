/*Weather Active Component
* Requirements from UI: 
*	text area => city
*   text area => temperature
*	image => icon
* Parameters (Requirements from user):
*	cityName: the name of the city the user wants to know the weather of
*/
var Weather = class Weather {

    constructor(nameCityPara) {
        // search for right parameter in parameter array
        for(var l = 0; l < nameCityPara.length; l++){
            if(nameCityPara[l].name == "cityName"){
                this.city = nameCityPara[l].value;
            }
        }

        if(this.city == null){
            console.log("Error, city not given!!");
        }

        //key needed for weather API
        this.key = "db781705d2bba8a45dd4c37204325aab";
        this.weather =   "http://api.openweathermap.org/data/2.5/find?q=" + this.city + "&units=metric&appid=" + this.key;

        this.cityArea;
        this.tempArea;
        this.icon;
        this.date;

        console.log("weather");
    }




    //weather functionality should be linked to an area UI
    //following function takes the ids of the UI component and link it to functionality
    initialise(uiPara){

        // search for right parameter in parameter array being the area and link it to the correct attribute
        for(var m = 0; m < uiPara.length; m++){
            if(uiPara[m].name == "city"){
                console.log(document.getElementById(uiPara[m].value));
                this.cityArea = document.getElementById(uiPara[m].value);
            } else if(uiPara[m].name == "temperature") {
                this.tempArea = document.getElementById(uiPara[m].value);
                console.log(this.cityArea);
            } else if(uiPara[m].name == "icon") {
                this.icon = document.getElementById(uiPara[m].value);
            } else if(uiPara[m].name == "date") {
                this.date = document.getElementById(uiPara[m].value);
            }
        }

        this.update();

    }

    //general function to update the weather in area UI (used by poker AC)
    update(){

        console.log(this);
        //dirty fix because "this" changes inside getJSON call
        let cityArea = this.cityArea;
        let tempArea = this.tempArea;
        let icon = this.icon;
        let date = this.date;

        $.getJSON( this.weather, function( wData ) {
            let wCity = wData.list[0].name; // to see if we got the right city
            let wTemperature = wData.list[0].main.temp;
            let wIcon = wData.list[0].weather[0].id;

            console.log(wData);
            console.log(this.cityArea + ", " + this.tempArea + ", " + this.icon + ", " + this.date);

            //update UI elements
            cityArea.innerHTML = wCity;
            tempArea.innerHTML = Math.round(wTemperature);
            icon.className = "owf owf-" + wIcon + " owf-5x";

            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth()+1; //January is 0!

            if(dd<10) {
                dd = '0'+dd
            }

            if(mm<10) {
                mm = '0'+mm
            }
            let weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            let dayOfWeek = weekday[today.getDay()].substr(0, 3);

            date.innerHTML = dayOfWeek + " " + dd + '/' + mm;
        });

    }
}







/*Weather.prototype.printMsg = function(msgPara){

	var self = this;
	
	//look for right para? paraArray expected?? ==> I think so since it's received from other ac
	for(var m = 0; m < msgPara.length; m++){
		if(msgPara[m].name == "text"){
			//each time a msg is received, add the message in box div
			self.box.innerHTML = self.box.innerHTML + (''+msgPara[m].value).replace( /[<>]/g, '' ) + '<br>';
		}
	}

}*/
