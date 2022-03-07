import React, { Component} from 'react';
import AWS from 'aws-sdk';
import "./lexchat.css";
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';

class LexChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '', 
      lexUserId: 'chatbot-demo' + Date.now(), 
      sessionAttributes: {}, visible: 'closed'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.getElementById("inputField").focus();
    AWS.config.region = 'us-west-2';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-west-2:172452a5-65ec-4890-abe0-a06c848ee6f1",
    });
    AWS.config.credentials.get(function(){
      // Credentials will be available when this function is called.
      var accessKeyId = AWS.config.credentials.accessKeyId;
      var secretAccessKey = AWS.config.credentials.secretAccessKey;
      var sessionToken = AWS.config.credentials.sessionToken;
    })
    
    var lexruntime = new AWS.LexRuntime();
    this.lexruntime = lexruntime;

  }

  handleClick() {
    this.setState({ visible: this.state.visible == 'open'? 'closed' : 'open' });
    console.log(this.state);
  }

  pushChat(event) {
    event.preventDefault();

    var inputFieldText = document.getElementById('inputField');

    if (inputFieldText && inputFieldText.value && inputFieldText.value.trim().length > 0) {

      // disable input to show we're sending it
      var inputField = inputFieldText.value.trim();
      inputFieldText.value = '...';
      inputFieldText.locked = true;

      // send it to the Lex runtime
      var params = {
        botAlias: '$LATEST',
        botName: 'UmbrellaTest',
        inputText: inputField,
        userId: this.state.lexUserId,
        sessionAttributes: this.state.sessionAttributes
      };
      this.showRequest(inputField);
      var a = function(err, data) {
        if (err) {
          console.log(err, err.stack);
          this.showError('Error:  ' + err.message + ' (see console for details)')
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          this.setState({sessionAttributes: data.sessionAttributes})
          //sessionAttributes = data.sessionAttributes;
          // show response and/or error/dialog status
          this.showResponse(data);
        }
        // re-enable input
        inputFieldText.value = '';
        inputFieldText.locked = false;
      };

      this.lexruntime.postText(params, a.bind(this));
      this.setState({data: ""})
    }
    // we always cancel form submission
    return false;
  }

  showRequest(daText) {
    var conversationDiv = document.getElementById('conversation');
    var requestPara = document.createElement("P");
    requestPara.className = 'userRequest';
    requestPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(requestPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showError(daText) {

    var conversationDiv = document.getElementById('conversation');
    var errorPara = document.createElement("P");
    errorPara.className = 'lexError';
    errorPara.appendChild(document.createTextNode(daText));
    conversationDiv.appendChild(errorPara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showResponse(lexResponse) {

    var conversationDiv = document.getElementById('conversation');
    var responsePara = document.createElement("P");
    responsePara.className = 'lexResponse';
    if (lexResponse.message) {
      responsePara.appendChild(document.createTextNode(lexResponse.message));
      responsePara.appendChild(document.createElement('br'));
    }
    if (lexResponse.dialogState === 'ReadyForFulfillment') {
      responsePara.appendChild(document.createTextNode(
        'Ready for fulfillment'));
      // TODO:  show slot values
    } else {
      responsePara.appendChild(document.createTextNode(
        ''));
    }
    conversationDiv.appendChild(responsePara);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({data: event.target.value});
  }

  render() {

    const chatcontainerStyle = {
      backgroundColor: '#FFFFFF',
      transition: 'all .5s'
    }
    


    return (
      <div id="chatwrapper">
        <div id="chat-header-rect" className='lexheader' onClick={this.handleClick} >
              <p><ChatIcon className='chaticon'/>聊聊</p>
              {(this.state.visible === 'open') ? <span className='chevron top'></span> : <span className='chevron bottom'></span>}
        </div>
        <div id="chatcontainer" className={this.state.visible} style={chatcontainerStyle}>
          <div id="conversation" className='conversationStyle' ></div>
            <form id="chatform" onSubmit={this.pushChat.bind(this)}>
                <div className='initconversation'>
                  <Button variant="outlined" value='weather' onClick={this.handleChange.bind(this)}>天氣</Button>
                  <Button variant="outlined" value='borrow or return' onClick={this.handleChange.bind(this)}>我要借/還傘</Button>
                  <Button variant="outlined" value='pricing' onClick={this.handleChange.bind(this)}>價錢</Button>
                  <Button variant="outlined" value='situation' onClick={this.handleChange.bind(this)}>問題回報</Button>
                </div>
                <input type="text"
                       id="inputField"
                       size="40"
                       value={this.state.data}
                       placeholder="gogogo"
                       onChange={this.handleChange.bind(this)}
                       className="inputStyle"
                      />
            </form>
        </div>
      </div>
    )
  }
}


export default LexChat;

