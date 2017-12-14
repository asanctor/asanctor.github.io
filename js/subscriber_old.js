mainfunction = function() {
	console.log("subscriber");
	var pubnub = new PubNub({
	    subscribeKey: "sub-c-f6d29f98-5d7b-11e7-b272-02ee2ddab7fe",
	    //publishKey: "myPublishKey",
	    ssl: true
	})
	var channel = '10chat-demo';
	
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "subscriber");
	newDiv.setAttribute("class", "row"); 
  	
  	var innerpara = document.createElement("p");
  	var innerParaText = document.createTextNode("Chat Output");
  	innerpara.appendChild(innerParaText);

  	var innerDiv2 = document.createElement("div");
  	innerDiv2.setAttribute("id", "box");

  	newDiv.appendChild(innerpara);
  	newDiv.appendChild(innerDiv2);

  	document.body.appendChild(newDiv);


	pubnub.addListener({
	  message: function(obj) {
	      box.innerHTML = (''+obj.message).replace( /[<>]/g, '' ) + '<br>' + box.innerHTML
	  }});
	//subscribe to chat-channel
	pubnub.subscribe({channels:[channel]});
	/*
	//should be asked to user in a popups
	pubnub.subscribe({
	    channels: ['my_channel'],
	});

	pubnub.addListener({
	    status: function(statusEvent) {
	        if (statusEvent.category === "PNConnectedCategory") {
	            play();
	        } else if (statusEvent.category === "PNUnknownCategory") {
	            var newState = {
	                new: 'error'
	            };
	            pubnub.setState(
	                {
	                    state: newState 
	                },
	                function (status) {
	                    console.log(statusEvent.errorData.message)
	                }
	            );
	        } 
	    },
	    message: function(message) {
	        checkGameStatus(message);
	        updateUI(message);
	    }
	})
	 
	pubnub.subscribe({ 
	    channels: ['tic-tac-toe'] 
	});*/

}