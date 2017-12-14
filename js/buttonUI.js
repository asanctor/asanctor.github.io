function ButtonUI(namePara) {

	// search for right parameter in parameter array
	for(var l = 0; l < namePara.length; l++){
		if(namePara[l].name == "ButtonName"){
			this.buttonName = namePara[l].value;	
		}
	}

	if(this.buttonName == null){
		this.buttonName = "1";
	} 


	//button that should be linked to some functionality
	this.button = "button" + this.buttonName;

}

ButtonUI.prototype.displayUI = function(){

	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "buttonDiv"+this.buttonName);
	newDiv.setAttribute("style", "display: inline-block;");
    newDiv.setAttribute("style", "position: relative; left: 230px; top: -50px;");
  	
  	var newButton = document.createElement("button");
	newButton.setAttribute("id", "button"+this.buttonName);
	newButton.setAttribute("class", "btn btn-primary btn-lg");
	newButton.setAttribute("style", "border-radius: 50%; height: 62px; width: 80.031px;");
	newButton.setAttribute("type", "button");  
	newButton.innerHTML = this.buttonName;

	newDiv.appendChild(newButton);
	document.body.appendChild(newDiv);

	//TODO: resize DIV!!!
  	$("#button"+this.buttonName).resizable({grid: 10});
  	$("#buttonDiv"+this.buttonName).draggable({
		cancel:false,
		grid: [ 10,10 ],
        stop: function (event, ui) {
            console.log(ui.position)
            console.log(ui);
        }
  	});


}