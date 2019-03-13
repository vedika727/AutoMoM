import { Injectable } from "@angular/core";
import * as socketIo from 'socket.io-client';
import { Observable } from "rxjs";
import { Message } from "src/app/shared/models/messages.model";

const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class WebSocketService {
    private socket;

    initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    send(message: any): void {
        console.log(message)
        this.socket.emit('message', message);
    }

    onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    onEvent(event: any): Observable<any> {
        return new Observable<any>(observer => { 
            this.socket.on(event, () => observer.next());
        });
    }
}
