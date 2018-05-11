// /* tslint:disable:no-unused-variable */
// import {
//     JsonpModule,
//     Jsonp,
//     BaseRequestOptions,
//     Response,
//     ResponseOptions,
//     Http,
//     HttpModule
// } from "@angular/http";
// import {TestBed, fakeAsync, tick} from '@angular/core/testing';
// import {MockBackend} from "@angular/http/testing";
// import {SocketService} from './socket.service';
// import { HomeComponent } from "./home/home.component";
// import { ComponentFixture } from "@angular/core/testing";
// import { By } from '@angular/platform-browser';
// import {$,jQuery} from 'jquery';
// import { FormsModule } from '@angular/forms';
// import { Ng2SearchPipeModule } from "ng2-search-filter";

// import { ActivatedRoute } from '@angular/router';


// var io = require('socket.io-client');

// describe('Suite of unit tests', function() {

//     var socket;
//     let service: SocketService;
//     var originalTimeout;
//     let component: HomeComponent;
//     let fixture: ComponentFixture<HomeComponent>;
    
      
//     beforeEach(()=> {
//         originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//         TestBed.configureTestingModule({
//             imports: [JsonpModule, HttpModule, FormsModule,
//                 Ng2SearchPipeModule
//             ],
//             providers: [SocketService],
//             declarations: [HomeComponent]
//         })
//         service = TestBed.get(SocketService);
//         fixture = TestBed.createComponent(HomeComponent);
//         component = fixture.componentInstance;
//               socket = io.connect('http://localhost:4000', {
//             'reconnection delay' : 0
//             , 'reopen delay' : 0
//             , 'force new connection' : true
//         });
//         socket.on('connect', function() {
//             console.log('worked...');
//         });
//         socket.on('disconnect', function() {
//             console.log('disconnected...');
//         })
//       socket.on('add-message'), ()=>{
//       }
//     });

//     afterEach(()=> {
//         // Cleanup
//         jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        
//         if(socket.connected) {
//             console.log('disconnecting...');
//             socket.disconnect();
//         } else {
//             // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
//             console.log('no connection to break...');
//         }
//     });

//     describe('Socket service ', async()=>{

//         it('Connecting socket ', function(done) {            
//            service.connectSocket("59e503b3333b2d08d8edc3f0");
//            done();
//         })

//         it(' socket sendMessage ', function(done) {            
//             let input = fixture.debugElement.query(By.css('#')).nativeElement;
//             var e = $.Event("keypress");
//                         $(input).val("message").trigger("input");
            
            
//                         // execute the event on the input and check for the selected item
//                         $(input).keypress(function () {
//                             // do your check here for the matching item here
//                         }).trigger(e);
//             service.sendMessage("Hi");
//             done();
            
//          })

      

//     });

// });


