import * as io from 'socket.io-client';

export class ChatService {
    private url = 'https://flask-shop-api.herokuapp.com';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }
}