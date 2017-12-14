function musicPlayerUI(namePara) {

	// search for right parameter in parameter array
	for(var l = 0; l < namePara.length; l++){
		if(namePara[l].name == "PlayerName"){
			this.playerName = namePara[l].value;	
		}
	}

	//playername used as id of the UI element
	if(this.playerName == null){
		this.playerName = "1";
	} 


	//id that should be linked to some functionality
	this.player = "player" + this.playerName;

}

musicPlayerUI.prototype.displayUI = function(){

	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "playerDiv"+this.playerName);
	newDiv.setAttribute("style", "display: inline-block;");
  	
  	var newPlayer = document.createElement("audio");
	newPlayer.setAttribute("id", this.player);
	newPlayer.setAttribute("controls", "controls");
	

	newDiv.appendChild(newPlayer);
	document.body.appendChild(newDiv);

	//TODO: resize DIV!!!
  	$("#"+this.player).resizable({grid: 10});
  	$("#playerDiv"+this.buttonName).draggable({cancel:false, grid: [ 10,10 ]});
}