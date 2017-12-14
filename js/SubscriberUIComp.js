
/*Subscriber UI Component
* Provides: 
*	chat area called "box"+channelname
* Parameters:
*	nameChannel: the name of your channel without spaces!!
*/
function SubscriberUI(nameChannelPara) {

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


	//field that should be linked to some functionality
	this.area = "box" + this.channelName;

}

SubscriberUI.prototype.displayUI = function(){

  	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "subscriber"+this.channelName);
	newDiv.setAttribute("class", "panel panel-primary"); 

	var innerDiv1 = document.createElement("div");
	innerDiv1.setAttribute("class", "panel-heading");
	innerDiv1.setAttribute("id", "subscriber"+this.channelName+"heading");
	var span = document.createElement("span");
	span.setAttribute("class", "glyphicon glyphicon-comment")

  	var innerContent1 = document.createTextNode(" " + this.channelName); 
  	
  	span.appendChild(innerContent1);
  	innerDiv1.appendChild(span);

	var innerDiv2 = document.createElement("div");	
	innerDiv2.setAttribute("class", "panel-body");
	var innerInnerDiv2 = document.createElement("div");
	innerInnerDiv2.setAttribute("class", "chat");
	innerInnerDiv2.setAttribute("id", "box"+this.channelName);

	innerDiv2.appendChild(innerInnerDiv2);

	newDiv.appendChild(innerDiv1);
	newDiv.appendChild(innerDiv2);

  	document.body.appendChild(newDiv);
	$("#subscriber"+this.channelName).draggable({cancel:false, handle:'#subscriber'+this.channelName+'heading'});
	//only horizontaly resizable
  	$("#subscriber"+this.channelName).resizable({grid: [1, 10000]});
}