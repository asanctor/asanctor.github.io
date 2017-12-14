/*Poker Active Component
* Requirements from UI: 
*	none
* Parameters (Requirements from user):
*	ac that needs to be poked
*	time => every how many miliseconds should it be poked?
*/

var TimePoker = class TimePoker {
    constructor(acPara) {
        // search for right parameter in parameter array
        for (var l = 0; l < acPara.length; l++) {
            if (acPara[l].name == "ac") {
                this.ac = acPara[l].value;
            } else if (acPara[l].name == "time") {
                this.time = acPara[l].value;
            }
        }

        //TODO: better error reports / handling
        if (this.ac == null || this.time == null) {
            console.log("Error, ac or time is missing!!");
        }
        var self = this;

        //poke function to update the AC every "this.time" miliseconds
        this.timer = setInterval( () => {this.ac.update();}, this.time);
        console.log("poker");
    }

    //following function takes the ids of the UI component and link it to functionality
    initialise(uiPara) {
        //nothing to do here I think
        console.log("nothing to do");
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
