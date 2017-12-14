// this function looks the component up and loads the javascript code inside the html file
lookupComp = function(ac) {

	console.log("test app " + ac);
	
	var server = "http://localhost:8080/api/v1/";
	var serverAC = server + "acs/name?";
	//in case of multiple ACs
	var ACArray = [];
	// TODO: remove super dirty fix to test for multiple ACs
	var ACCount = 0;

	$.getJSON( serverAC, { name: ac}, function( data ) {
		console.log(data);
		ACArray.push(data);

		//verify how many parameters needed
		//e.g. parameterArray: [{name: "channelName", value: "", description: "Give the name of your channel"}]
		var parameterArray = data.parameters;

		//ask user for the required parameters by creating a modal
		//e.g. for Publisher AC we ask for the channelname
		if(parameterArray.length > 0){

			//we assume that the body of the modal already exists and has id: parameterModalBody
			var bodyDiv = document.getElementById("parameterModalBody");

			//empty the body to create new modal
			bodyDiv.innerHTML = "";

			// add for each parameter a new form group to ask user to fill in each parameter
			for (var i = 0; i < parameterArray.length; i++) {
			    /* e.g.
				<span class="form-group">
			  		<label for="parameter-text1" class="form-control-label">Give the name of your channel:</label>
		            <input id="textareaID" class="rm-control" style="width: 100%");></input>
		        </span>
				*/
			    var newSpan = document.createElement("span");
				newSpan.setAttribute("class", "form-group"); 

				var innerLabel = document.createElement("label");
				innerLabel.setAttribute("for", "parameter-text"+i);
				innerLabel.setAttribute("class", "form-control-label");
				innerLabel.innerHTML = parameterArray[i].description;

				var innerInput = document.createElement("input");
				innerInput.setAttribute("class", "rm-control");
				innerInput.setAttribute("type", parameterArray[i].type);
				//a bit dirty fix to allow the selection of multiple files
				innerInput.setAttribute("multiple", "");
				innerInput.setAttribute("style", "width: 100%");
				innerInput.setAttribute("id", parameterArray[i].name); //we assume no 2 times same para name in one AC

				newSpan.appendChild(innerLabel);
				newSpan.appendChild(innerInput);

				bodyDiv.appendChild(newSpan);
			}

			//once modal ready, show it to the user
			$("#parameterModal").modal("show");
		
		} else { //when no parameters needed from user, go to next step => ask UI preference or look for compatible AC
			//TODO: remove HACK to test
			if(ACArray[0].name == "weather"){
                getAC("timepoker");
			} else {
                //TODO: test if this works... + add option to go to AC instead of UI
                createUIModal();
			}

		}


		//for now all compatible UIs has name of the AC + "UI"
		var ACUI = ac + "UI";
		var serverUI = server + "uis/name?"

		// creates UI Modal depending on number of available/compatible UIs
		createUIModal = function(){

			//returns all compatible UIs
			$.getJSON( serverUI, { name: ACUI}, function( uiData ) {
				console.log(uiData);

				if(uiData.length > 0){ // at least one compatible UI


				/*	e.g.
					<div class="btn-group" role="group" data-toggle="buttons" aria-label="Button group" id="groupUI">
					  	<label class="btn btn-secondary active">
					  		<input type="radio" name="options" value="1" id="option1" checked><img class="modal-content" pointer-events="none" id="myImg" src="http://localhost:8080/api/v1/uis/img?name=Publisher1" width="400" height="150">
		  				</label>
						<label class="btn btn-secondary">
							<input type="radio" name="options" id="option2" value="2"> <img class="modal-content" pointer-events="none" id="myImg" src="http://localhost:8080/api/v1/uis/img?name=Publisher1" width="400" height="150">
						</label>
					</div>
				*/

					//we assume that the body of the modal already exists and has id: uiModalBody
					var bodyUIDiv = document.getElementById("uiModalBody");

					//empty the body of the modal
					bodyUIDiv.innerHTML = "";

					var newDiv = document.createElement("div");
					newDiv.setAttribute("class", "btn-group");
					newDiv.setAttribute("role", "group");
					newDiv.setAttribute("data-toggle", "buttons");
					newDiv.setAttribute("aria-label", "Button group");
					newDiv.setAttribute("id", "groupUI");

					for (var k = 0; k < uiData.length; k++) {
						var newLabel = document.createElement("label");
						newLabel.setAttribute("class", "btn btn-secondary active");

						var newInput = document.createElement("input");
						newInput.setAttribute("type", "radio");
						newInput.setAttribute("name", "options");
						newInput.setAttribute("value", k);
						newInput.setAttribute("id", "option"+k);

						var newImg = document.createElement("img");
						newImg.setAttribute("class", "modal-content");
						newImg.setAttribute("pointer-events", "none");
						newImg.setAttribute("id", uiData[k].preview);
						newImg.setAttribute("src", "http://localhost:8080/api/v1/uis/img?name=" + uiData[k].preview);
						newImg.setAttribute("width", "70%");
						newImg.setAttribute("height", "auto");

						newLabel.appendChild(newInput);
						newLabel.appendChild(newImg);
						newDiv.appendChild(newLabel);

						$('#'+uiData[k].preview).css("display","block");
					}
					//append all the UIs in Div
					bodyUIDiv.appendChild(newDiv);
					//adds scrollbar
					bodyUIDiv.setAttribute("style", "max-height: calc(100vh - 200px); overflow-y: auto;");

					$("#chooseUIModal").modal("show");

				} else {
					//TODO: handle error
					// return error to user ==> means that there is no available UI for this AC yet
				}


				//when user selected preferred UI generate the AC with the selected UI
				document.getElementById("validateUI").onclick = function() {

					var script = document.createElement('script');

					//get selected UI
					var selectedUI = $('#groupUI input:radio:checked').val();

					$("#chooseUIModal").modal("hide");

					//append the UI script to the HTML page
					var uiElement = uiData[selectedUI];
					script.setAttribute('type', 'text/javascript');
					script.innerHTML = uiElement.code;
					document.getElementsByTagName('head')[0].appendChild(script);

					//get ui-function from code
					var fun = uiElement.code.substr('function '.length);
					fun = fun.substr(0, fun.indexOf('('));

					//draw UI component e.g. new PublisherUI(channel);
					var ui  = new window[fun](parameterArray);
					var test = () => {ui.displayUI();};
					test();

                    var acScript;
                    var component;
					//first AC contains the UI rest should just be loaded
                    for (var a = 0; a < ACArray.length; a++) {

                        //link AC functionality to UI
                        acScript = document.createElement('script');

                        acScript.setAttribute('type', 'text/javascript');
                        acScript.innerHTML = ACArray[a].code;
                        $('body').append(acScript);

                        var funAC = data.name;

                        //get function from code ==> could possibly also be done by asking the name of the Ac
                        /*var funAC = ACArray[a].code.substr('function '.length);
                        funAC = funAC.substr(0, funAC.indexOf('('));
                        if(a == 0){
                            funAC = "Weather";
                        }
                        else */if(a == 1){
							funAC = "TimePoker";
                            ACArray[a].parameters[0].value = component;
						}
						console.log("new" + window[funAC] + "(" + ACArray[a].parameters + ")");
                        //create AC component e.g. new Publisher(channel);
                        component = new window[funAC](ACArray[a].parameters);

                        //fill in the right ui requirement for the AC from the UI attributes
                        //we assume the ui has all required AC-parameters
                        //TODO: maybe check if UI has all required AC-parameters
                        //e.g. uiParameterArray: [{name: "area", value: ui.area, description: "Area UI"}, {name: "input", value: ui.input, description: "Input UI"}];
                        var uiParameterArray = ACArray[a].uiParameters;
                        for (var n = 0; n < uiParameterArray.length; n++) {
                            var name = uiParameterArray[n].name;
                            //ask from UI object the value of its attributes, e.g. ui.area, which corresponds to the id of this UI element
                            uiParameterArray[n].value = ui[name];
                        }

                        component.initialise(uiParameterArray);
                    }
				}

			});
		}

		//when AC parameters are filled in ask user about the UI
		document.getElementById("validate").onclick = function() { 
			var array = ACArray[ACCount].parameters;

			//fill in values given by the user in the parameterArray
			for (var j = 0; j < array.length; j++) {
				if(array[j].type == "file" ){
                    array[j].value = document.getElementById(array[j].name).files;
				} else if(array[j].type == "ac" ){ //TODO: remove HACK
                    array[j].value = ACArray[0];
                } else{
                    array[j].value = document.getElementById(array[j].name).value;
				}
			}	

	  		$("#parameterModal").modal("hide");


            //TODO: remove HACK to test
            if(ACArray[ACCount].name == "weather"){
            	ACCount = 1;
                getAC("timepoker");
            } else {
                //create UI modal to ask user his/her preferred UI
                createUIModal();
            }
		}

	});


	//TODO: remove duplicated code
	getAC = function (ACName) {
        $.getJSON( serverAC, { name: ACName}, function( acdata ) {
            ACArray.push(acdata);

            //verify how many parameters needed
            var acparameterArray = acdata.parameters;

            //ask user for the required parameters by creating a modal
            if(acparameterArray.length > 0){

                //we assume that the body of the modal already exists and has id: parameterModalBody
                var bodyDiv = document.getElementById("parameterModalBody");

                //empty the body to create new modal
                bodyDiv.innerHTML = "";

                // add for each parameter a new form group to ask user to fill in each parameter
                for (var i = 0; i < acparameterArray.length; i++) {
                    /* e.g.
                    <span class="form-group">
                          <label for="parameter-text1" class="form-control-label">Give the name of your channel:</label>
                        <input id="textareaID" class="rm-control" style="width: 100%");></input>
                    </span>
                    */
                    var newSpan = document.createElement("span");
                    newSpan.setAttribute("class", "form-group");

                    var innerLabel = document.createElement("label");
                    innerLabel.setAttribute("for", "parameter-text"+i);
                    innerLabel.setAttribute("class", "form-control-label");
                    innerLabel.innerHTML = acparameterArray[i].description;

                    var innerInput = document.createElement("input");
                    innerInput.setAttribute("class", "rm-control");
                    innerInput.setAttribute("type", acparameterArray[i].type);
                    //a bit dirty fix to allow the selection of multiple files
                    innerInput.setAttribute("multiple", "");
                    innerInput.setAttribute("style", "width: 100%");
                    innerInput.setAttribute("id", acparameterArray[i].name); //we assume no 2 times same para name in one AC

                    newSpan.appendChild(innerLabel);
                    newSpan.appendChild(innerInput);

                    bodyDiv.appendChild(newSpan);
                }

                //once modal ready, show it to the user
                $("#parameterModal").modal("show");

            } else { //when no parameters needed from user, go to next step => ask UI preference or look for compatible AC

                //TODO: test if this works... + add option to go to AC instead of UI
                createUIModal();
            }
        });
    }

//TODO: requirements array?? to link AC and UI ???

	
	
	
	

	

}