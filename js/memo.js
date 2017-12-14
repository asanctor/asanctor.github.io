/*Memo Active Component
* Requirements from UI: 
*	text area 
* Parameters (Requirements from user):
*	nameMemo: the name of your memo
*/
function Memo(nameMemoPara) {

	// search for right parameter in parameter array
	for(var l = 0; l < nameMemoPara.length; l++){
		if(nameMemoPara[l].name == "MemoName"){
			this.memo = nameMemoPara[l].value;	
		}
	}

	if(this.memo == null){
		this.channel = "Memo1";
	} 
	
	console.log("memo");


}

//memo functionality should be linked to an area UI
//following function takes the ids of the UI component and link it to functionality
Memo.prototype.initialise = function(uiPara){

	var self = this;
	
	// search for right parameter in parameter array being the area and link it to the correct attribute
	for(var m = 0; m < uiPara.length; m++){
		if(uiPara[m].name == "area"){
			self.box = document.getElementById(uiPara[m].value);
		}
	}

	
}

Memo.prototype.printMsg = function(msgPara){

	var self = this;
	
	//look for right para? paraArray expected?? ==> I think so since it's received from other ac
	for(var m = 0; m < msgPara.length; m++){
		if(msgPara[m].name == "text"){
			//each time a msg is received, add the message in box div
			self.box.innerHTML = self.box.innerHTML + (''+msgPara[m].value).replace( /[<>]/g, '' ) + '<br>';
		}
	}

}
