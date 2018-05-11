

import { Injectable } from '@angular/core';

/* Importing http service starts*/
import { HttpService } from './http.service';
/* Importing http service ends*/

@Injectable()
export class ChatService {

	constructor(private httpService : HttpService) { }

  //проверить, существует ли имя пользователя
	public checkUserNameCheck(params,callback){
		console.log("checkUserNameCheck request :"+JSON.stringify(params));
		this.httpService.userNameCheck(params).subscribe(
  				response => {
  					callback(response);
  				},
  				error => {
  					alert('HTTP fail.usernameee');
  				}
  			);
	 }

  	public login(params ,callback):any{
		console.log("login request :"+JSON.stringify(params));
  		this.httpService.login(params).subscribe(
  				response => {
  					callback(false,response);
  				},
  				error => {
  					callback(true,'HTTP fail.');
  				}
  			);
  	}


    //добавить нового пользователя
  	public registerUser(params,callback):any{
		console.log("registerUser request :"+JSON.stringify(params));
  		this.httpService.registerUser(params).subscribe(
  				response => {
                  callback(false,response);
                },
                error => {
                  callback(true,'Failed to register user. Server might be down.');
                }
  			);
  	}


    //получить сообщения между двумя пользователями
    public getMessages(params ,callback):any{
		console.log("getMessages request :"+JSON.stringify(params));
        this.httpService.getMessages(params).subscribe(
                  response => {
                      callback(false,response);
                  },
                  error => {
                      callback(true,'HTTP fail.');
                  }
              );
	  }


    //получить сообщения между группой пользователей
    public getGroupMessages(params ,callback):any{
		console.log("getGroupMessages request :"+JSON.stringify(params));
        this.httpService.getGroupMessages(params).subscribe(
                  response => {
                      callback(false,response);
                  },
                  error => {
                      callback(true,'HTTP fail.');
                  }
              );
    }
    //получить профайлер позьзователя
	  public getprofile(userId ,callback):any{
        this.httpService.getprofile({userId : userId}).subscribe(
                  response => {
					  console.log("Leading HTTP Request");
                      callback(false,response);
                  },
                  error => {
                      callback(true,'HTTP fail.');
                  }
              );
    }
   //выбрать собеседника для чата
	 public fetchMembers(params ,callback):any{
		console.log("Entered Fetch Components");
        this.httpService.fetchMembers(params).subscribe(
                  response => {
                      callback(false,response);
                  },
                  error => {
                      callback(true,'HTTP fail.');
                  }
              );
	 }

    //проверка айди сессии
    public userSessionCheck(userId , callback):any{
    	this.httpService.userSessionCheck({userId : userId}).subscribe(
                  response => {
                      callback(false,response);
                  },
                  error => {
                      callback(true,'HTTP fail.');
                  }
              );
	  }
    //изменить пароль
    public changePassword(params,callback):any{
		  this.httpService.changePassword(params).subscribe(
		    response => {
			    console.log(JSON.stringify(response)+" in res");
			    callback(false,response);
		    },
		    error => {
			    callback(true,'HTTP status fail.');
		  });
    }

    //создать группу для чата
	  public registerGroup(params,callback):any{
      this.httpService.registerGroup(params).subscribe(
			  response => {
				  callback(false,response);
			  },
			  error => {
				  callback(true,'HTTP fail.');
			  });

	  }

    //удалить пользователя из группы
	  public deregisterGroup(params,callback):any{
		  this.httpService.deregisterGroup(params).subscribe(
		    response => {
			    callback(false,response);
		    },
		    error => {
			    callback(true,'HTTP fail.');
		    });

    }

    //удалить пользователя из листа друзей
	  public deregisterUsers(params,callback):any{
		  this.httpService.deregisterUsers(params).subscribe(
		    response => {
			    callback(false,response);
		    },
		    error => {
			    callback(true,'HTTP fail.');
		  });

    }

	  public addGroupUsers(params,callback):any{
		  this.httpService.addGroupUsers(params).subscribe(
		    response => {
			    callback(false,response);
		    },
		    error => {
			    callback(true,'HTTP fail.');
		  });

    }

    //обновить статус (некоторый короткий текст - настроение)
	  public updateStatus(params,callback):any{
      this.httpService.updateStatus(params).subscribe(
			  response => {
				  console.log(JSON.stringify(response)+" in res");
				  callback(false,response);
			  },
			error => {
				callback(true,'HTTP status fail.');
			});
	  }

    //изменить фото профиля
	  public updatePic(params,callback):any{
		  console.log(JSON.stringify(params));
		  this.httpService.updatePic(params).subscribe(
		    response => {
			    console.log(JSON.stringify(response)+" in res");
			    callback(false,response);
		    },
		    error => {
			    callback(true,'HTTP status fail.');
		    });
    }


}
