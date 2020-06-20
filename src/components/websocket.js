class WebSocketService {
    constructor(){
        this.socketRef = null;
        this.connect = this.connect.bind(this)
    }

    static instance = null;
    callbacks = {};

    static getInstance(){
        if(!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
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
            this.connect(path);
        }
    }
  
    disconnect() {
        this.socketRef.close();
      }
    
    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        console.log('hello')
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
          console.log('0')
          return;
        }
        if (command === "messages" || command === "new_message") {
          this.callbacks[command](parsedData)
          console.log(parsedData)
        }
        else { console.log(parsedData) }
    
      }
    fetchMessages() {
       console.log('yo')
        this.sendMessage({
          command: "fetch_messages",
        });
      }
    
      newComment(message) {
        console.log('hello')
        this.sendMessage({
          command: "new_message",
          body: message
        })
      }
    
      addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks["messages"] = messagesCallback;
        this.callbacks["new_message"] = newMessageCallback;
      }

      sendMessage(data) {
        data.token = sessionStorage.getItem("token")
        console.log(data)
        try {
          this.socketRef.send(JSON.stringify({ ...data }));
        } catch (err) {
          console.log(err)
          console.log(err.message);
        }
      }

    state(){
        return this.socketRef.readyState;
    }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;