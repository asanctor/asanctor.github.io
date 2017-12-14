/*Weather UI Component
* Provides: 
*	field called city
*	field called "temperature"+city
*	icon field called "weather"+city
* Parameters:
*	city
*/
function WeatherUI(cityPara) {


	// search for right parameter in parameter array
	for(var l = 0; l < cityPara.length; l++){
		if(cityPara[l].name == "cityName"){
			this.city = cityPara[l].value;
		}
	}

	if(this.city == null){
		this.city = "City1";
	} 

	//fields that should be linked to some functionality
	this.temperature = "temperature" + this.city;
	this.icon = "weather" + this.city;
	this.date = "date" + this.city;
}

WeatherUI.prototype.displayUI = function(){


	/* how it should look like:
	<div class="panel panel-success" style="width:300px">
		<div id="city" class="panel-heading text-left">City</div>
		<div class="row" style="position: relative; top: 15px;">
			<div class="col-xs-6" style="position: absolute; left: 50%">
				<div id="date" style="font-size: 14">Fri 20/5</div>
				<div style="font-size: 40"><span id="temp" style="font-size: 40">27</span>°<span style="font-size: 30">C</span></div>
			</div>
			<div class="col-xs-6" style="height:100px;">
				<i id="icon"  class="owf owf-500 owf-5x"></i>
			</div>
		</div>
	</div>
	*/

	var newDiv = document.createElement("div");
	newDiv.setAttribute("class", "panel panel-success");
    newDiv.setAttribute("id", "panel" + this.city);
    newDiv.setAttribute("style", "width:300px");

	var innerDiv1 = document.createElement("div");
    innerDiv1.setAttribute("id", this.city);
	innerDiv1.setAttribute("class", "panel-heading text-left");

	var innerDiv2 = document.createElement("div");
    innerDiv2.setAttribute("class", "row");
    innerDiv2.setAttribute("style", "position: relative; top: 15px;");

    var innerDiv2inner1 = document.createElement("div");
    innerDiv2inner1.setAttribute("class", "col-xs-6 text-center");

    var innerDiv2inner1Date = document.createElement("div");
    innerDiv2inner1Date.setAttribute("style", "font-size: 14");
    innerDiv2inner1Date.setAttribute("id", this.date);

    var innerDiv2inner1Temperature = document.createElement("div");
    innerDiv2inner1Temperature.setAttribute("style", "font-size: 40");

    var innerDiv2inner1TemperatureSpan = document.createElement("span");
    innerDiv2inner1TemperatureSpan.setAttribute("style", "font-size: 40");
    innerDiv2inner1TemperatureSpan.setAttribute("id", this.temperature);

    var innerDiv2inner1TemperatureSpan1 = document.createElement("span");
    innerDiv2inner1TemperatureSpan1.setAttribute("style", "font-size: 40");
    innerDiv2inner1TemperatureSpan1.innerHTML = "°";

    var innerDiv2inner1TemperatureSpan2 = document.createElement("span");
    innerDiv2inner1TemperatureSpan2.setAttribute("style", "font-size: 30");
    innerDiv2inner1TemperatureSpan2.innerHTML = "C";

    var innerDiv2inner2 = document.createElement("div");
    innerDiv2inner2.setAttribute("class", "col-xs-6");
    innerDiv2inner2.setAttribute("style", "height:100px;");

    var innerDiv2inner1Icon = document.createElement("i");
    innerDiv2inner1Icon.setAttribute("class", "owf owf-500 owf-5x");
    innerDiv2inner1Icon.setAttribute("id", this.icon);


    //<div style="font-size: 40"><span id="temp" style="font-size: 40">27</span><span style="font-size: 40">°</span><span style="font-size: 30">C</span></div>
    innerDiv2inner1Temperature.appendChild(innerDiv2inner1TemperatureSpan);
    innerDiv2inner1Temperature.appendChild(innerDiv2inner1TemperatureSpan1);
    innerDiv2inner1Temperature.appendChild(innerDiv2inner1TemperatureSpan2);

    innerDiv2inner1.appendChild(innerDiv2inner1Date);
    innerDiv2inner1.appendChild(innerDiv2inner1Temperature);
    innerDiv2inner2.appendChild(innerDiv2inner1Icon);

    innerDiv2.appendChild(innerDiv2inner1);
    innerDiv2.appendChild(innerDiv2inner2);

    newDiv.appendChild(innerDiv1);
    newDiv.appendChild(innerDiv2);

  	document.body.appendChild(newDiv);
  	$("#panel" + this.city).draggable({cancel:false, handle:'#'+this.city});
  	//only horizontaly resizable
  	$("#panel" + this.city).resizable({grid: [1, 10000]});
}
  	

