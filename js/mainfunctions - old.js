// this function looks the component up and loads the javascript code inside the html file
lookupComp = function(comp) {

	console.log("test app " + comp);
	
	var script = document.createElement('script');
	script.src = 'js/' + comp + '.js';
	
	/* //to use when taking data from database
	script.setAttribute('type', 'text/javascript');
	script.innerHTML = 'mainfunction=function(){console.log("subscriber");var e=new PubNub({subscribeKey:"sub-c-f6d29f98-5d7b-11e7-b272-02ee2ddab7fe",ssl:!0}),t=document.createElement("div");t.setAttribute("id","subscriber"),t.setAttribute("class","row");var n=document.createElement("p"),d=document.createTextNode("Chat Output");n.appendChild(d);var s=document.createElement("div");s.setAttribute("id","box"),t.appendChild(n),t.appendChild(s),document.body.appendChild(t),e.addListener({message:function(e){box.innerHTML=(""+e.message).replace(/[<>]/g,"")+"<br>"+box.innerHTML}}),e.subscribe({channels:["10chat-demo"]})};'
	document.head.appendChild(script);
	mainfunction();*/

	script.onload = function () {
		console.log("loaded");
		//below function works only if comp implements it
		mainfunction();

		//makes component draggable
		//$("#"+comp).draggable({cancel:false});
	};

	document.head.appendChild(script); //or something of the likes
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