/*Subscriber Active Component
* Requirements from UI: 
*	chat area 
* Parameters (Requirements from user):
*	nameChannel: the name of your channel without spaces!!
* Required libraries:
* 	<script src="https://cdn.pubnub.com/sdk/javascript/pubnub.4.12.0.js"></script>
*/
var Subscriber = class Subscriber {

    constructor(nameChannelPara) {
        // search for right parameter in parameter array
        for(var l = 0; l < nameChannelPara.length; l++){
            if(nameChannelPara[l].name == "ChannelName"){
                //remove spaces from channel
                this.channel = nameChannelPara[l].value.replace(" ", "");
            }
        }

        if(this.channel == null){
            this.channel = "Channel1";
        }

        this.box;
        console.log("subscriber");

        this.pubnub = new PubNub({
            subscribeKey: "sub-c-f6d29f98-5d7b-11e7-b272-02ee2ddab7fe",
            ssl: true
        })
    }

	//subscriber functionality should be linked to an area UI
	//following function takes the ids of this area UI component and link it to functionality
    initialise(uiPara) {
        var self = this;

        // search for right parameter in parameter array being the area and input
        for(var m = 0; m < uiPara.length; m++){
            if(uiPara[m].name == "area"){
                self.box = document.getElementById(uiPara[m].value);
            }
        }

        self.pubnub.addListener({
            message: function(obj) {
                self.box.innerHTML = (''+obj.message).replace( /[<>]/g, '' ) + '<br>' + self.box.innerHTML
            }});

        //subscribe to channel
        self.pubnub.subscribe({channels:[self.channel]});
    }
}