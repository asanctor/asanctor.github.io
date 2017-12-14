// this function looks the component up and loads the javascript code inside the html file
lookupComp = function(comp) {

	console.log("test app " + comp);
	
	var ServerAPI = "http://localhost:8080/api/v1/acs/name?name=" + comp;
	
	var script = document.createElement('script');
	script.src = 'js/' + comp + '.js';
	
	/*
	$.getJSON( ServerAPI, function( data ) {
	  console.log(data);
	  script.setAttribute('type', 'text/javascript');
	  script.innerHTML = data.code;
	  document.head.appendChild(script);
	  mainfunction();
	});
	*/
	
	//TODO: make this more generic
	//ask user for the required parameters, in this case the channelname
	$("#myModal").modal("show");
	
	document.getElementById("validate").onclick = function() { 
		//textfield of model containing name of the channel
  		var channel = document.getElementById("textareaID").value;

  		//TODO: remove hardcoded code and replace by database!!!
  		//make user choose the UI
  		//load UI
  		var UIscript = document.createElement('script');
  		UIscript.setAttribute('type', 'text/javascript');
  		
		if(comp == "publisher"){
  			//temporary UI code
  			UIscript.innerHTML = 'function PublisherUI(e){this.channelName=null==e?"Channel1":e,this.area="box"+this.channelName,this.input="input"+this.channelName}PublisherUI.prototype.displayUI=function(){var e=document.createElement("div");e.setAttribute("id","publisher"+this.channelName),e.setAttribute("class","panel panel-primary");var t=document.createElement("div");t.setAttribute("class","panel-heading");var a=document.createElement("span");a.setAttribute("class","glyphicon glyphicon-comment");var n=document.createTextNode(" "+this.channelName);a.appendChild(n),t.appendChild(a);var i=document.createElement("div");i.setAttribute("class","panel-footer");var l=document.createElement("div");l.setAttribute("class","input-group"),l.setAttribute("style","width: 100%");var s=document.createElement("input");s.setAttribute("id","input"+this.channelName),s.setAttribute("class","form-control"),s.setAttribute("data-width","fit"),s.setAttribute("placeholder","Type your message here"),l.appendChild(s),i.appendChild(l);var d=document.createElement("div");d.setAttribute("class","panel-body");var r=document.createElement("div");r.setAttribute("class","chat"),r.setAttribute("id","box"+this.channelName),d.appendChild(r),e.appendChild(t),e.appendChild(d),e.appendChild(i),document.body.appendChild(e)};'
		} else {
			UIscript.innerHTML = 'function SubscriberUI(e){this.channelName=null==e?"Channel1":e.replace(" ",""),this.area="box"+this.channelName}SubscriberUI.prototype.displayUI=function(){var e=document.createElement("div");e.setAttribute("id","subscriber"+this.channelName),e.setAttribute("class","panel panel-primary");var t=document.createElement("div");t.setAttribute("class","panel-heading");var a=document.createElement("span");a.setAttribute("class","glyphicon glyphicon-comment");var n=document.createTextNode(" "+this.channelName);a.appendChild(n),t.appendChild(a);var i=document.createElement("div");i.setAttribute("class","panel-body");var c=document.createElement("div");c.setAttribute("class","chat"),c.setAttribute("id","box"+this.channelName),i.appendChild(c),e.appendChild(t),e.appendChild(i),document.body.appendChild(e)};';
		}

		document.head.appendChild(UIscript);

		if(comp == "publisher"){
			//draw UI component
			var ui  = new PublisherUI(channel);
			ui.displayUI();
		} else {
			var ui  = new SubscriberUI(channel);
			ui.displayUI();
		}

		//TODO: remove hardcoded code and replace by database!!!
  		//make user choose the AC
  		//load AC
  		var ACscript = document.createElement('script');
  		ACscript.setAttribute('type', 'text/javascript');
  		if(comp == "publisher"){
		//temporary AC code
  		ACscript.innerHTML = 'function Publisher(e){this.channel=e.replace(" ",""),console.log("publisher"),this.pubnub=new PubNub({subscribeKey:"sub-c-f6d29f98-5d7b-11e7-b272-02ee2ddab7fe",publishKey:"pub-c-593f99ef-228e-4531-8cb8-30eaeb88666c",ssl:!0})}Publisher.prototype.initialise=function(e,n){var u=this,b=document.getElementById(e),n=document.getElementById(n);u.pubnub.addListener({message:function(e){b.innerHTML=(""+e.message).replace(/[<>]/g,"")+"<br>"+b.innerHTML}}),u.pubnub.subscribe({channels:[u.channel]}),n.addEventListener("keyup",function(e){13===(e.keyCode||e.charCode)&&u.pubnub.publish({channel:u.channel,message:n.value,x:n.value=""})})};'
		
  		} else{
  			ACscript.innerHTML = 'function Subscriber(e){this.channel=e.replace(" ",""),console.log("subscriber"),this.pubnub=new PubNub({subscribeKey:"sub-c-f6d29f98-5d7b-11e7-b272-02ee2ddab7fe",ssl:!0})}Subscriber.prototype.initialise=function(e){var n=this,b=document.getElementById(e);n.pubnub.addListener({message:function(e){b.innerHTML=(""+e.message).replace(/[<>]/g,"")+"<br>"+b.innerHTML}}),n.pubnub.subscribe({channels:[n.channel]})};';
  		}
  		document.head.appendChild(ACscript);


		if(comp == "publisher"){
			publisher = new Publisher(channel);
			publisher.initialise(ui.area, ui.input);
		} else{
			subscriber = new Subscriber(channel);
			subscriber.initialise(ui.area);
		}

	};

	
	
	/* //to use when taking data from database
	script.setAttribute('type', 'text/javascript');
	script.innerHTML = 'mainfunction=function(){console.log("subscriber");var e=new PubNub({subscribeKey:"sub-c-f6d29f98-5d7b-11e7-b272-02ee2ddab7fe",ssl:!0}),t=document.createElement("div");t.setAttribute("id","subscriber"),t.setAttribute("class","row");var n=document.createElement("p"),d=document.createTextNode("Chat Output");n.appendChild(d);var s=document.createElement("div");s.setAttribute("id","box"),t.appendChild(n),t.appendChild(s),document.body.appendChild(t),e.addListener({message:function(e){box.innerHTML=(""+e.message).replace(/[<>]/g,"")+"<br>"+box.innerHTML}}),e.subscribe({channels:["10chat-demo"]})};'
	document.head.appendChild(script);
	mainfunction();*/

	/*script.onload = function () {
		console.log("loaded");
		//below function works only if comp implements it
		mainfunction();

		//makes component draggable
		//$("#"+comp).draggable({cancel:false});
	};

	document.head.appendChild(script); //or something of the likes
	*/
}

/* var loadJS = function(url, implementationCode, location){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};
var yourCodeToBeCalled = function(){
//your code goes here
}
loadJS('yourcode.js', yourCodeToBeCalled, document.body); */


/* function includeJs(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
}

includeJs("/path/to/some/file.js");
js.onload = callback; */