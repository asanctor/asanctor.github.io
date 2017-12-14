/*Conditional Active Component
* Requirements from UI: 
*	NO UI????
* Parameters (Requirements from user):
*	conditionKind: can be "=", "<", ">" or "not"   (equal to, different from, bigger than, smaller than)
* 	number1: left side of the condition
*	number2: right side of the condition
*/
function Conditional(conditionPara) {

	// search for right parameter in parameter array
	for(var l = 0; l < conditionPara.length; l++){
		if(conditionPara[l].name == "condionKind"){
			this.condionKind = conditionPara[l].value;
		} else if (conditionPara[l].name == "number1") {
			this.number1 = conditionPara[l].value;
		} else if (conditionPara[l].name == "number2") {
			this.number2 = conditionPara[l].value;
		}
	}

	if(this.conditionKind == null || this.number1 == null || this.number2 == null){
		console.log("Parameter missing!!!");
	} 
	
	console.log("conditional");

}

//memo functionality should be linked to an area UI
//following function takes the ids of the UI component and link it to functionality
Conditional.prototype.initialise = function(uiPara){

	var self = this;
	
	//?? nothing needed?

	
}

//returns parameterArray with value of the condition
Conditional.prototype.checkCondition = function(){

	var self = this;
	var value;
	var parameterArray = [{name:"condition", type:"boolean"}];

	//alternative, use eval(number1 + conditionKind + number2) ==> but not error prove

	switch (self.conditionKind){
		case '=':
			value = self.number1 ==  self.number2;
			parameterArray[0].value = value;
			return parameterArray;
 			//break;
		case '<':
			value = self.number1 <  self.number2;
			parameterArray[0].value = value;
			return parameterArray;
		case '>':
			value = self.number1 >  self.number2;
			parameterArray[0].value = value;
			return parameterArray;
		case 'not':
			value = self.number1 !=  self.number2;
			parameterArray[0].value = value;
			return parameterArray;
		default:
			console.log("Unknown condition given"):
			return null;
	}

}