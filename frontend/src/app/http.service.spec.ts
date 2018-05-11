/* tslint:disable:no-unused-variable */
import {
  JsonpModule,
  Jsonp,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http,
  HttpModule
} from "@angular/http";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {MockBackend} from "@angular/http/testing";
import {HttpService} from './http.service';

describe('Service: HTTP', () => {

let service: HttpService;
let backend: MockBackend;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [JsonpModule, HttpModule],
    providers: [
      HttpService,
      MockBackend,
      BaseRequestOptions,
      {
        provide: Jsonp,
        useFactory: (backend, options) => new Jsonp(backend, options),
        deps: [MockBackend, BaseRequestOptions]
      },
      {
        provide: Http,
        useFactory: (backend, options) => new Http(backend, options),
        deps: [MockBackend, BaseRequestOptions]
      }
    ]
  });

  // Get the MockBackend
  backend = TestBed.get(MockBackend);

  // Returns a service with the MockBackend so we can test with dummy responses
  service = TestBed.get(HttpService);

});

it('search should return username true or false', fakeAsync(() => {
  let response = {

              "id": "59e503b3333b2d08d8edc3f0",
              "results" : "true",
              "username": "name",
              "email": "email",
              "password": "123456",
              "timestamp": 1508180915,
              "online": "Y",
              "socketId": "V033uGP_v6Cue5UKAAAC",


  };


  backend.connections.subscribe(connection => {
    connection.mockRespond(new Response(<ResponseOptions>{
      body: JSON.stringify(response)
    }));
  });


  service.userNameCheck("dimpu").subscribe((res) => {
  expect(res.results).toBe("true");
  });
  service.login({"username": "manisha", "password":"manisha"}).subscribe((res) => {
    expect(res).toBeTruthy;
    });
  service.userSessionCheck("59e503b3333b2d08d8edc3f0").subscribe((res) => {
    expect(res).toBeTruthy;
    });
  service.getMessages({ userId :"59e503b3333b2d08d8edc3f0", toUserId :"59e503b3333b2d08d8edc3f0" }).subscribe((res) => {
    expect(res).toBeTruthy;
    });
  service.getGroupMessages({"groupName":"Hi"}).subscribe((res) => {
    expect(res).toBeTruthy;
    });
  service.registerGroup({"username":"dimpu", 'userId':"59e503b3333b2d08d8edc3f0", 'groupName': "newGroup"}).subscribe((res) => {
  expect(res).toBeTruthy;
  });
}));

it('search should getUSers according to search', fakeAsync(() => {
let response = {

  "id": "59e503b3333b2d08d8edc3f0",
  "results" : "true",
  "username": "name",
  "email": "email",
  "password": "123456",
  "timestamp": 1508180915,
  "online": "Y",
  "socketId": "V033uGP_v6Cue5UKAAAC",


};


backend.connections.subscribe(connection => {
  connection.mockRespond(new Response(<ResponseOptions>{
    body: JSON.stringify(response)
  }));
});

}));



});
