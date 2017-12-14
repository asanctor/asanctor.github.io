/*Publisher Active Component
* Requirements from UI: 
*	input field 
*	chat area 
* Parameters (Requirements from user):
*	nameChannel: the name of your channel without spaces!!
* Required libraries:
* 	<script src="https://cdn.pubnub.com/sdk/javascript/pubnub.4.12.0.js"></script>
*/
var Publisher = class Publisher {

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
        this.input;
        console.log("publisher");

        this.pubnub = new PubNub({
            subscribeKey: "sub-c-f6d29f98-5d7b-11e7-b272-02ee2ddab7fe",
            publishKey: "pub-c-593f99ef-228e-4531-8cb8-30eaeb88666c",
            ssl: true
        })
    }

    //publisher functionality should be linked to an area UI and input field UI
	//following function takes the ids of these two UI components and link them to functionality
    initialise(uiPara) {
        var self = this;

        // search for right parameter in parameter array being the area and input
        for(var m = 0; m < uiPara.length; m++){
            if(uiPara[m].name == "area"){
                self.box = document.getElementById(uiPara[m].value);
            } else if(uiPara[m].name == "input"){
                self.input = document.getElementById(uiPara[m].value);
            }
        }

        //each time listener receives object, add the message in box div
        self.pubnub.addListener({
            message: function(obj) {
                self.box.innerHTML = (''+obj.message).replace( /[<>]/g, '' ) + '<br>' + self.box.innerHTML
            }
        });

        //subscribe to channel
        self.pubnub.subscribe({channels:[self.channel]});

        //when "enter"-key is pressed publish the content of the input field
        self.input.addEventListener('keyup', function(e) {
            if ((e.keyCode || e.charCode) === 13) {
                self.pubnub.publish({channel : self.channel,message : self.input.value,x : (self.input.value='')});
            }
        });
    }

}
