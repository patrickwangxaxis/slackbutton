var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

 
console.log('----///im in slack-button-xaxis server.js file ');
console.log('--urlencodedParser, (req, res) is ' + urlencodedParser, (req, res));
app.post('/slack/slash-commands/send-me-buttons', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with empty 200 status code
	console.log('----place 1 ');
    var reqBody = req.body
	console.log('----place 2 ');
    var responseURL = reqBody.response_url
	console.log('----place 3 ');
    if (reqBody.token != "qAuoAiwY3kSaSC076U3EfkNr"){
		console.log('----place 4 ');
        res.status(403).end("Access forbidden")
    }else{
        
		console.log('----place 5 ');
		var message = {
            "text": "This is your first interactive message",
            "attachments": [
                {
                    "text": "Building buttons is easy right?",
                    "fallback": "Shame... buttons aren't supported in this land",
                    "callback_id": "button_tutorial",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "yes",
                            "text": "yes",
                            "type": "button",
                            "value": "yes"
                        },
                        {
                            "name": "no",
                            "text": "no",
                            "type": "button",
                            "value": "no"
                        },
                        {
                            "name": "maybe",
                            "text": "maybe",
                            "type": "button",
                            "value": "maybe",
                            "style": "danger"
                        }
                    ]
                }
            ]
        }
        sendMessageToSlackResponseURL(responseURL, message)
    }
})

function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});