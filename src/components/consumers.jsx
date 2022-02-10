class WebSocketService{
    static instance = null;
    callback = {};

    static getInstance(){
        if(!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService();
        }
    }

    constructor(){
        this.socketRef = null;
    }

    connect(commentUrl){
        const path = commentUrl
        this.socketRef = new WebSocket(path);

        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data);
        }

        this.socketRef.onopen = e =>{
            console.log('websoket open');
        }

        this.socketRef.onerror = e =>{
            console.log(e.message);
        }

        this.socketRef.onclose = () => {
            console.log('WebSocket closed, restarting.');
            this.connect();
        }
    }
  
    disconnect() {
        this.socketRef.close();
      }

    socketNewMessage(data){
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if(Object.keys(this.callbacks).length == 0){
            return;
        }
        if(command == 'messages'){
            this.callbacks[command](parsedData.messages);
        }
        if(command == 'new_message'){
            console.log('okay so this was called')
            this.callbacks[command](parsedData.message);
        }
    }

    fetchMessages(){
       this.sendMessage({command: 'fetch_messages'})
    }

    newComment(message){
       this.sendMessage({command: 'new_message', body: message})
    }

    addCallbacks(messagesCallback, newMessageCallback){
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data){
        data.token = sessionStorage.getItem('token')
        try{
            console.log({...data})
            this.socketRef.send(JSON.stringify({...data}))
        }
        catch(err){
            console.log(err.message);
        }
    }

    state(){
        return this.socketRef.readyState;
    }
    waitForSocketConnection(callback){
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function(){
                if(socket.readyState === 1){
                    console.log("Connection is made");
                    if(callback != null){
                        callback();
                    }
                    return;
                }
                else{
                    console.log("Wait for connection..");
                    recursion(callback);
                }
            }, 1);
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;