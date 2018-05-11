

import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class HttpService {

  //хост:порт сервера
  private BASE_URL = 'http://127.0.0.1:4000/';
  results: boolean;

  // настройка Request headers
  private headerOptions = new RequestOptions({
        headers : new Headers({ 'Content-Type' : 'application/json;charset=UTF-8' })
  });

  constructor( private http:Http) {
		this.results = true;
	  }
    
  //роутинг всего функционала приложения (см. server-in/utils/routes.js )

  public userNameCheck(params){
    return this.http.post(`${this.BASE_URL}usernameCheck`,JSON.stringify(params),this.headerOptions)
  			.map( (response:Response) => response.json())
  			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public login(params){
        return this.http.post(`${this.BASE_URL}login`,JSON.stringify(params),this.headerOptions)
  			.map( (response:Response) => response.json())
  			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
  	}

  public registerUser(params){
  		return this.http.post(`${this.BASE_URL}registerUser`,JSON.stringify(params),this.headerOptions)
  			.map( (response:Response) => response.json())
  			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
  }

  public changePassword(params){
		  return this.http.post(`${this.BASE_URL}changePassword`,JSON.stringify(params),this.headerOptions)
			  .map( (response:Response) => response.json())
			  .catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public deregisterGroup(params){
		  return this.http.post(`${this.BASE_URL}deregisterGroup`,JSON.stringify(params),this.headerOptions)
			  .map( (response:Response) => response.json())
			  .catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public deregisterUsers(params){
		return this.http.post(`${this.BASE_URL}deregisterUsers`,JSON.stringify(params),this.headerOptions)
			.map( (response:Response) => response.json())
			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

  public userSessionCheck(params){
    return this.http.post(`${this.BASE_URL}userSessionCheck`,JSON.stringify(params),this.headerOptions)
      .map( (response:Response) => response.json())
      .catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
  }

	public getMessages(params){
		return this.http.post(`${this.BASE_URL}getMessages`,JSON.stringify(params),this.headerOptions)
	    .map( (response:Response) => response.json())
	    .catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public fetchMembers(params){
		console.log("Entered HTTP Service");
		return this.http.post(`${this.BASE_URL}fetchMembers`,JSON.stringify(params),this.headerOptions)
	    	.map( (response:Response) => response.json())
	      .catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public getGroupMessages(params){
		return this.http.post(`${this.BASE_URL}getGroupMessages`,JSON.stringify(params),this.headerOptions)
	    	.map( (response:Response) => response.json())
	      .catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}


	public registerGroup(params){
		return this.http.post(`${this.BASE_URL}registerGroup`,JSON.stringify(params),this.headerOptions)
			.map( (response:Response) => response.json())
			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public addGroupUsers(params){
		return this.http.post(`${this.BASE_URL}addGroupUsers`,JSON.stringify(params),this.headerOptions)
			.map( (response:Response) => response.json())
			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

  	public updateStatus(params){
		return this.http.post(`${this.BASE_URL}updateStatus`,JSON.stringify(params),this.headerOptions)
			.map( (response:Response) => response.json())
			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public updateProfilepic(params){
		return this.http.post(`${this.BASE_URL}updateProfilepic`,JSON.stringify(params),this.headerOptions)
			.map( (response:Response) => response.json())
			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public getprofile(params){
		console.log("Entered HTTP Service");
		return this.http.post(`${this.BASE_URL}getprofile`,JSON.stringify(params),this.headerOptions)
			.map( (response:Response) => response.json())
			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

	public updatePic(params){
		console.log("HTTP Service");
		return this.http.post(`${this.BASE_URL}updatePic`,JSON.stringify(params),this.headerOptions)
			.map( (response:Response) => response.json())
			.catch( (error:any) => Observable.throw(error.json().error || `Server error`) );
	}

}
