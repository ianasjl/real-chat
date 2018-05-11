

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

//npm i socket.io-client
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  //хост:порт сервера
	private BASE_URL = 'http://127.0.0.1:4000/';
  	private socket;

  	constructor() {}

		//вебсокет на клиенте инициализирует подключение, открывается сессия с
		//привязкой к userId
  	connectSocket(userId:string){
  		this.socket = io(this.BASE_URL,{ query: `userId=${userId}`});
  	}

    //инициализирует отправку сообщения
	  sendMessage(message:any):void{
		  console.log("Trying to send normal message");
		  this.socket.emit('add-message', message);
	  }

	  sendGroupMessage(message:any):void{
		  console.log("Trying to send group message");
		  this.socket.emit('group-message', message);
	  }

		//вебсокет на клиенте инициализирует разрыв соединения, закрывается сессия с
		//сранее привязанным userId
	  logout(userId):any{
		  this.socket.emit('logout', userId);
		  let observable = new Observable(observer => {
			    this.socket.on('logout-response', (data) => {
				    observer.next(data);
			    });
			    return () => {
				      this.socket.disconnect();
			    };
		  })
		  return observable;
	  }

    //инициализирует получение сообщения
	  receiveMessages():any{
		   let observable = new Observable(observer => {
			   this.socket.on('add-message-response', (data) => {
				   observer.next(data);
			   });
			   return () => {
				   this.socket.disconnect();
			   };
		   });
		  return observable;
	  }

	  receiveGroupMessages():any{
		    let observable = new Observable(observer => {
		 	    this.socket.on('group-message-response', (data) => {
		 		    observer.next(data);
		 	    });
		 	    return () => {
		 		    this.socket.disconnect();
		 	    };
		    });
	      return observable;
	  }

    //инициализирует получение массива данных о чат-сессии: передается айди инициатора
		//сессии, его юзернейм, айди сессии и массив юзерАйди чат листа + массив сообшений
	  getChatList(userId:string):any {
		    this.socket.emit('chat-list' , { userId : userId });
		    let observable = new Observable(observer => {
			    this.socket.on('chat-list-response', (data) => {
				    observer.next(data);
			    });
			    return () => {
				    this.socket.disconnect();
			    };
		    })
		    return observable;
	  }

    //инициализирует получение массива юзеров, со статусом Y (enum: online)
	  getGroupsList(userId:string):any {
				this.socket.emit('groups-list' , { userId : userId });
				console.log("socket id waiting for response: "+this.socket.id);
				  let observable = new Observable(observer => {
					this.socket.on('groups-list-response', (data) => {
						console.log("group list response received"+JSON.stringify(data));
						observer.next(data);
					});
					return () => {
						this.socket.disconnect();
					};
				})
				return observable;
	  }

   //инициализирует получение массива юзеров, со статусом N (enum: offline)
	 getOfflineChatList(userId:string):any {

				this.socket.emit('chat-list-offline' , { userId : userId });

				let observable = new Observable(observer => {
					this.socket.on('chat-list-response-offline', (data) => {
						observer.next(data);
					});

					return () => {
						this.socket.disconnect();
					};
				})
				return observable;
			}


}
