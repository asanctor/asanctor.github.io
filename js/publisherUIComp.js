
/*Publisher UI Component
* Provides: 
*	input field called "input"+channelname 
*	chat area called "box"+channelname
* Parameters:
*	nameChannel: the name of your channel without spaces!!
*/
function PublisherUI(nameChannelPara) {


	// search for right parameter in parameter array
	for(var l = 0; l < nameChannelPara.length; l++){
		if(nameChannelPara[l].name == "ChannelName"){
			//remove spaces from channel
			this.channelName = nameChannelPara[l].value.replace(" ", "");	
		}
	}

	if(this.channelName == null){
		this.channelName = "Channel1";
	} 

	//fields that should be linked to some functionality
	this.area = "box" + this.channelName;
	this.input = "input" + this.channelName;

}

PublisherUI.prototype.displayUI = function(){

	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "publisher"+this.channelName);
	newDiv.setAttribute("class", "panel panel-primary"); 

	var innerDiv1 = document.createElement("div");
	innerDiv1.setAttribute("class", "panel-heading");
	innerDiv1.setAttribute("id", "publisher"+this.channelName+"heading");
	var span = document.createElement("span");
	span.setAttribute("class", "glyphicon glyphicon-comment")

  	var innerContent1 = document.createTextNode(" " + this.channelName); 
  	
  	span.appendChild(innerContent1);
  	innerDiv1.appendChild(span);

	var innerDiv2 = document.createElement("div");  	
	innerDiv2.setAttribute("class", "panel-footer");
	//var innerContent2 = document.createTextNode("Type your message and press enter"); 
	var innerInnerDiv = document.createElement("div"); 
	innerInnerDiv.setAttribute("class", "input-group");
	innerInnerDiv.setAttribute("style", "width: 100%");
	var input = document.createElement("input");
	input.setAttribute("id", "input"+this.channelName);
	input.setAttribute("class","form-control");
	input.setAttribute("data-width", "fit");
	input.setAttribute("placeholder","Type your message here");
	
	innerInnerDiv.appendChild(input);
	//innerDiv2.appendChild(innerContent2);
	innerDiv2.appendChild(innerInnerDiv);

	var innerDiv3 = document.createElement("div");	
	innerDiv3.setAttribute("class", "panel-body");
	var innerInnerDiv3 = document.createElement("div");
	innerInnerDiv3.setAttribute("class", "chat");
	innerInnerDiv3.setAttribute("id", "box"+this.channelName);

	innerDiv3.appendChild(innerInnerDiv3);

	newDiv.appendChild(innerDiv1);
	newDiv.appendChild(innerDiv3);
	newDiv.appendChild(innerDiv2);

  	document.body.appendChild(newDiv);
  	$("#publisher"+this.channelName).draggable({cancel:false, handle:'#publisher'+this.channelName+'heading'});
  	//only horizontaly resizable
  	$("#publisher"+this.channelName).resizable({grid: [1, 10000]});
}
  	

