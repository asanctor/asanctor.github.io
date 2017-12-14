mainfunction = function() {
	console.log("publisher");
	var pubnub = new PubNub({
	    subscribeKey: "sub-c-f6d29f98-5d7b-11e7-b272-02ee2ddab7fe",
	    publishKey: "pub-c-593f99ef-228e-4531-8cb8-30eaeb88666c",
	    ssl: true
	})

	/*pubnub.publish(
	    {
	        message: { 
	            messenger: 'Friend1',
	            content: 'Hello!'
	        },
	        channel: 'my_channel',
	        sendByPost: false, // true to send via post
	        storeInHistory: false, //override default storage options
	        meta: { 
	            "cool": "meta"
	        }   // publish extra meta with the request
	    }, 
	    function (status, response) {
	        if (status.error) {
	            // handle error
	            console.log(status)
	        } else {
	            console.log("message Published w/ timetoken", response.timetoken)
	        }
	    }
	);*/



	//following creates this:
	/*<div class="group pubsub">
			<p>Enter Chat and press enter</p>
			<div><input id="input" placeholder="you-chat-here" /></div>
			<p>Chat Output</p>
			<div id="box"></div>
		</div>*/


		/*<div class="panel panel-primary">
			<div class="panel-heading">
                <p> <span class="glyphicon glyphicon-comment"></span> Channel 1 </p>
            </div>
            <div class="panel-footer">
            	<p>Type your message and press enter</p>
				<div class="input-group">
					<input id="input" class="form-control" placeholder="Type your message here"/>
				</div>
			</div>
        	<div class="panel-body">
                <div id="box" class="chat">
            </div>
        </div>*/

    //no space allowed!!!!
 /*   var channelName= "Channel1"

 displayfunction=function(channelName){
	var newDiv = document.createElement("div");
	newDiv.setAttribute("id", "publisher"+channelName);
	newDiv.setAttribute("class", "panel panel-primary"); 

	var innerDiv1 = document.createElement("div");
	innerDiv1.setAttribute("class", "panel-heading");
	var span = document.createElement("span");
	span.setAttribute("class", "glyphicon glyphicon-comment")

  	var innerContent1 = document.createTextNode(" " + channelName); 
  	
  	span.appendChild(innerContent1);
  	innerDiv1.appendChild(span);

	var innerDiv2 = document.createElement("div");  	
	innerDiv2.setAttribute("class", "panel-footer");
	var innerContent2 = document.createTextNode("Type your message and press enter"); 
	var innerInnerDiv = document.createElement("div"); 
	innerInnerDiv.setAttribute("class", "input-group");
	innerInnerDiv.setAttribute("style", "width: 100%");
	var input = document.createElement("input");
	input.setAttribute("id", "input"+channelName);
	input.setAttribute("class","form-control");
	input.setAttribute("data-width", "fit");
	input.setAttribute("placeholder","Type your message here");
	
	innerInnerDiv.appendChild(input);
	innerDiv2.appendChild(innerContent2);
	innerDiv2.appendChild(innerInnerDiv);

	var innerDiv3 = document.createElement("div");	
	innerDiv3.setAttribute("class", "panel-body");
	var innerInnerDiv3 = document.createElement("div");
	innerInnerDiv3.setAttribute("class", "chat");
	innerInnerDiv3.setAttribute("id", "box"+channelName);

	innerDiv3.appendChild(innerInnerDiv3);

	newDiv.appendChild(innerDiv1);
	newDiv.appendChild(innerDiv3);
	newDiv.appendChild(innerDiv2);

	
  	document.body.appendChild(newDiv);
 }
*/
  	
  	$("#myModal").modal("show");

  	initAC = function(){
  		//textfield of model containing name of the channel
  		var channel = document.getElementById("textareaID").value;
  		//TODO: remove spaces from channel name
  		//TODO: let user choose prefered UI
  		///now default UI chosen
  		var UIscript = document.createElement('script');
  		UIscript.setAttribute('type', 'text/javascript');
  		//TODO: remove hardcoded code and replace by database!!!
		//UIscript.innerHTML = 'displayfunction=function(e){var t;t=null==e?"Channel1":e;var a=document.createElement("div");a.setAttribute("id","publisher"+t),a.setAttribute("class","panel panel-primary");var n=document.createElement("div");n.setAttribute("class","panel-heading");var d=document.createElement("span");d.setAttribute("class","glyphicon glyphicon-comment");var r=document.createTextNode(" "+t);d.appendChild(r),n.appendChild(d);var i=document.createElement("div");i.setAttribute("class","panel-footer");var l=document.createTextNode("Type your message and press enter"),p=document.createElement("div");p.setAttribute("class","input-group");var s=document.createElement("input");s.setAttribute("id","input"+t),s.setAttribute("class","form-control"),s.setAttribute("data-width","fit"),s.setAttribute("placeholder","Type your message here"),p.appendChild(s),i.appendChild(l),i.appendChild(p);var c=document.createElement("div");c.setAttribute("class","panel-body");var u=document.createElement("div");u.setAttribute("class","chat"),u.setAttribute("id","box"+t),c.appendChild(u),a.appendChild(n),a.appendChild(i),a.appendChild(c),document.body.appendChild(a)};'
		
		UIscript.innerHTML = 'displayfunction=function(e){var t=document.createElement("div");t.setAttribute("id","publisher"+e),t.setAttribute("class","panel panel-primary");var a=document.createElement("div");a.setAttribute("class","panel-heading");var d=document.createElement("span");d.setAttribute("class","glyphicon glyphicon-comment");var i=document.createTextNode(" "+e);d.appendChild(i),a.appendChild(d);var n=document.createElement("div");n.setAttribute("class","panel-footer");var r=document.createElement("div");r.setAttribute("class","input-group"),r.setAttribute("style","width: 100%");var l=document.createElement("input");l.setAttribute("id","input"+e),l.setAttribute("class","form-control"),l.setAttribute("data-width","fit"),l.setAttribute("placeholder","Type your message here"),r.appendChild(l),n.appendChild(r);var s=document.createElement("div");s.setAttribute("class","panel-body");var c=document.createElement("div");c.setAttribute("class","chat"),c.setAttribute("id","box"+e),s.appendChild(c),t.appendChild(a),t.appendChild(s),t.appendChild(n),document.body.appendChild(t)};'
		document.head.appendChild(UIscript);
		//UI Components implements the displayfunction
		displayfunction(channel);

		//Link AC function to UI:

		//function $(id) { return document.getElementById(id); }
		var box = document.getElementById('box'+channel);
		var input = document.getElementById('input'+channel);

		//each time listener receives object, add the message in box div
		pubnub.addListener({
		  message: function(obj) {
		      box.innerHTML = (''+obj.message).replace( /[<>]/g, '' ) + '<br>' + box.innerHTML
		  }});
		//subscribe to chat-channel
		pubnub.subscribe({channels:[channel]});
		//when "enter" is pressed publish the content of the input field
		input.addEventListener('keyup', function(e) {
		  if ((e.keyCode || e.charCode) === 13) {
		    pubnub.publish({channel : channel,message : input.value,x : (input.value='')});
		  }
		});
  		

  	}


	document.getElementById("validate").onclick = function() { initAC()};


	//var comp = "publisher"
	//create input field!
	/*var x = document.createElement("button");
	x.setAttribute("class", "component");
	x.setAttribute("id", comp);
	var t = document.createTextNode(comp);
	x.appendChild(t);
	
	document.body.appendChild(x);
	//makes component draggable
	$("#"+comp).draggable({cancel:false}); */



}