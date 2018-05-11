import { async, ComponentFixture, TestBed , fakeAsync, tick} from '@angular/core/testing';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import {Location} from "@angular/common";
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockBackend } from "@angular/http/testing";
/* tslint:disable:no-unused-variable */
import {
  JsonpModule,
  Jsonp,
  Response,
  ResponseOptions,
  Http
} from "@angular/http";




import {ChatService} from '../chat.service';
import { HttpService } from "../http.service";
var window = document.defaultView;
var $ = require('jquery')(window);

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let h5: HTMLElement;
  let username_HtmlElement: HTMLElement;
  let email_HtmlElement: HTMLElement;
  let password_HtmlElement: HTMLElement;
  let reg_btn: HTMLElement;
  let login_btn: HTMLElement;
  let regSpy: jasmine.Spy;
  let service: ChatService;
  let httpservice: HttpService;

  let backend: MockBackend;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };


  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule,   
       ],
       providers: [
        ChatService,
        HttpService,
        MockBackend,
        BaseRequestOptions,
        { provide: Router, useValue: mockRouter },
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
      ],
      declarations: [ LoginComponent ]

    });

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const h5s = fixture.debugElement.queryAll(By.css('h5'));
      h5 = h5s[0].nativeElement;
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      const buttons = fixture.debugElement.queryAll(By.css('button'));

      login_btn=buttons[0].nativeElement;
      reg_btn=buttons[1].nativeElement;

      username_HtmlElement = fixture.debugElement.query(By.css('#username')).nativeElement;
      email_HtmlElement =  fixture.debugElement.query(By.css('#email')).nativeElement;
      password_HtmlElement = fixture.debugElement.query(By.css('#password')).nativeElement;



    backend = TestBed.get(MockBackend);
    service = TestBed.get(ChatService);

  }));


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('On page load', () => {


        it('should check login page text content', () => {
          expect(h5.textContent).toEqual('Please, login into your account');
        });


        it('should display a blank user input field', () => {
          expect(username_HtmlElement.textContent).toEqual('');
        });

        it('should display a blank email input field', () => {
          expect(email_HtmlElement.textContent).toEqual('');
        });

        it('should display a blank password input field', () => {
          expect(password_HtmlElement.textContent).toEqual('');
        });
      });

      describe('when the user submits the registration form', () => {

            beforeEach(() => {
              regSpy = spyOn(component, 'registerUser');
              reg_btn.click();
            });

            it('should invoke the onRegisterSubmit function', fakeAsync(() => {
              fixture.whenStable().then(() => {
                expect(component.registerUser).toHaveBeenCalled();
              });
            }));


    });

    describe('when the user logs in', () => {

          beforeEach(() => {
            regSpy = spyOn(component, 'login');
            login_btn.click();
          });

          it('should invoke the login function', fakeAsync(() => {
            fixture.whenStable().then(() => {
              expect(component.login).toHaveBeenCalled();
            });
          }));


  });

    describe('when the user logs ', () => {


    beforeEach(() => {
      spyOn(window, 'alert');
      spyOn(service, 'login');
    });

        it('should throw suername cant be empty alert', fakeAsync(() => {
          fixture.whenStable().then(() => {
            login_btn.click();
            expect(username_HtmlElement.textContent).toEqual('');
            expect(window.alert).toHaveBeenCalledWith("Username can't be empty.");
          });
        }));

        it('should throw password cant be empty alert', fakeAsync(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {

            let input = fixture.debugElement.query(By.css('#username')).nativeElement;
            expect(input.value).toBe('');
            input.value = "dimpu";
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(password_HtmlElement.textContent).toEqual('');
            expect(input.value).toBe('dimpu');
            login_btn.click();
             expect(window.alert).toHaveBeenCalledWith("Password can't be empty.");
           });
        }));
});

describe('when the user logs with empty username throws alert', () => {


   beforeEach(() => {
     spyOn(service, 'login');
     spyOn(window, 'alert');

   });
   it('should validate login and direct to home page', fakeAsync(() => {
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css('#username')).nativeElement;
    let inputpass = fixture.debugElement.query(By.css('#password')).nativeElement;
    input.value = "manisha";
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    inputpass.value = "manisha";
    inputpass.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toBe('manisha');
    expect(inputpass.value).toEqual('manisha');


    login_btn.click();
    fixture.whenStable().then(() => {
      expect(service.login).toHaveBeenCalled;
    });
  }));
  });


describe('when the user registers ', () => {


   beforeEach(() => {
    spyOn(window, 'alert');
    spyOn(service, 'registerUser');

   });

         it('should throw username cant be empty alert', fakeAsync(() => {
          fixture.detectChanges();

           fixture.whenStable().then(() => {
             reg_btn.click();
             expect(username_HtmlElement.textContent).toEqual('');
             expect(window.alert).toHaveBeenCalledWith("Username can't be empty for registration.");
           });
         }));

         it('should throw email cant be empty alert', fakeAsync(() => {
           fixture.detectChanges();
           fixture.whenStable().then(() => {

             let input = fixture.debugElement.query(By.css('#username')).nativeElement;
             expect(input.value).toBe('');
             input.value = "dimpu";
             input.dispatchEvent(new Event('input'));
             fixture.detectChanges();
             expect(email_HtmlElement.textContent).toEqual('');
             expect(input.value).toBe('dimpu');
             reg_btn.click();
              expect(window.alert).toHaveBeenCalledWith("Email can't be empty for registration.");
            });
         }));

         it('should throw password  cant be empty alert', fakeAsync(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {

            let input = fixture.debugElement.query(By.css('#username')).nativeElement;
            let email = fixture.debugElement.query(By.css('#email')).nativeElement;

            expect(input.value).toBe('');
            input.value = "dimpu";
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(email_HtmlElement.textContent).toEqual('');
            email.value="Email";
            email.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(email.value).toBe('Email');
            reg_btn.click();
             expect(window.alert).toHaveBeenCalledWith("Password can't be empty for registration.");
           });
        }));

        it('should register user', fakeAsync(() => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {

            let input = fixture.debugElement.query(By.css('#username')).nativeElement;
            let email = fixture.debugElement.query(By.css('#email')).nativeElement;
            let inputpass = fixture.debugElement.query(By.css('#password')).nativeElement;

            expect(input.value).toBe('');
            input.value = "dimpu";
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(email_HtmlElement.textContent).toEqual('');
            email.value="Email";
            email.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(email.value).toBe('Email');


            inputpass.value = "manisha";
            inputpass.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(inputpass.value).toEqual('manisha');
            reg_btn.click();

            expect(service.registerUser).toHaveBeenCalled;
          });
        }));
 });

describe('key up key down', () => {


   beforeEach(() => {
    spyOn(window, "alert");
    spyOn(service, 'checkUserNameCheck');
   });

       it('should check for key up', fakeAsync(() =>
       {
        fixture.detectChanges();
        let input = fixture.debugElement.query(By.css('#username')).nativeElement;



      const event = new KeyboardEvent("keyup",{
        "key": "A"
      });
    username_HtmlElement.dispatchEvent(event);
    fixture.detectChanges();


      expect(component.onkeyup).toHaveBeenCalled;

      tick(1000)
      fixture.detectChanges()

        expect(service.checkUserNameCheck).toHaveBeenCalled;

      input.dispatchEvent(new Event('keydown'));

      fixture.detectChanges();
        expect(component.onkeydown).toHaveBeenCalled;

       }));
});

describe('testing error cases', () => {


   beforeEach(() => {
    spyOn(window, "alert");
    spyOn(service, 'login');

   });

       it('should throw user not found alert', fakeAsync(() =>
       {
        let response = {

                      "error": "true",
                       "response":"server error"


          };

          // When the request subscribes for results on a connection, return a fake response
          backend.connections.subscribe(connection => {
            connection.mockRespond(new Response(<ResponseOptions>{
              body: JSON.stringify(response)
            }));
          });

          let input = fixture.debugElement.query(By.css('#username')).nativeElement;
          let inputpass = fixture.debugElement.query(By.css('#password')).nativeElement;
          input.value = "bbb";
          input.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          inputpass.value = "xyz";
          inputpass.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          login_btn.click();
          expect(window.alert).toHaveBeenCalledWith("Username can't be empty.");



       }));


       it('should throw user not found alert', fakeAsync(() =>
       {
        let response = {

                      "error": "true",
                       "response":"server error"


          };

          // When the request subscribes for results on a connection, return a fake response
          backend.connections.subscribe(connection => {
            connection.mockRespond(new Response(<ResponseOptions>{
              body: JSON.stringify(response)
            }));
          });

          let input = fixture.debugElement.query(By.css('#username')).nativeElement;
          let inputpass = fixture.debugElement.query(By.css('#password')).nativeElement;
          let email = fixture.debugElement.query(By.css('#email')).nativeElement;

          input.value = "bbb";
          input.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          inputpass.value = "xyz";
          inputpass.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          email.value="Email";
          email.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          reg_btn.click();
          expect(window.alert).toHaveBeenCalledWith("Username can't be empty for registration.");



       }));
});


});
