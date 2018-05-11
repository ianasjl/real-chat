import { async, ComponentFixture, TestBed , fakeAsync, tick} from '@angular/core/testing';
import { HttpModule, Http,BaseRequestOptions } from '@angular/http';
import { HomeComponent } from './home.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import {Location} from "@angular/common";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule  } from '@angular/platform-browser';
import { DebugElement, Type } from "@angular/core";
import {By} from "@angular/platform-browser";
import { SocketService } from './../socket.service';
import { HttpService } from './../http.service';
import { ChatService } from './../chat.service';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from "ng2-translate";
import { Ng2EmojiModule } from "ng2-emoji";
import { appRoutes } from "../app.module"
import {LoginComponent } from '../login/login.component';
import { Observable } from "rxjs/Observable";
import { MockBackend } from "@angular/http/testing";
import {
  JsonpModule,
  Jsonp,
  Response,
  ResponseOptions
} from "@angular/http";


var window = document.defaultView;
import { Route, ActivatedRouteSnapshot, UrlSegment, Params, Data, ParamMap } from '@angular/router';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let loginComp : LoginComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let regSpy: jasmine.Spy;
  let service:ChatService;
  let backend: MockBackend;
  let location: Location;
  let router: Router;



  beforeEach(fakeAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        Ng2SearchPipeModule,
        RouterTestingModule.withRoutes(appRoutes)
       ],
       providers: [
        ChatService,
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

       ],

      declarations: [ HomeComponent, LoginComponent]

    });

      router = TestBed.get(Router);
      location = TestBed.get(Location);

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();


      router.initialNavigation();

    backend = TestBed.get(MockBackend);
    service = TestBed.get(ChatService);

  }));



  it('should be created', () => {
    expect(component).toBeTruthy();

  });

      describe('On page load', () => {

        it('usersession check should run', () => {

            service.userSessionCheck("59e503b3333b2d08d8edc3f0", (res) => {
            expect(res).toBeTruthy;
            });
        });

      });
    });
