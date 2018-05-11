import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatCheckboxModule} from '@angular/material';
import {MatTabsModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';
import { AppComponent } from './app.component';
import {LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material';
import { Routes,RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng2EmojiModule } from 'ng2-emoji';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {APP_BASE_HREF} from '@angular/common';
import { TranslateModule, TranslatePipe } from 'ng2-translate/ng2-translate';

import { ActivatedRoute } from '@angular/router';

export const appRoutes:Routes = [
  {path : '' , 
  component : LoginComponent,
  pathMatch: 'full'
},
  {path:'home',
  component: HomeComponent,
  pathMatch: 'full'
},
  {path : 'home/:userid' , 
  component : HomeComponent,
  pathMatch: 'full'
}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NotfoundComponent   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatGridListModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    Ng2SearchPipeModule,
    MatSidenavModule,
    RouterModule.forRoot(appRoutes),
    Ng2EmojiModule.forRoot(),
    TranslateModule.forRoot()
  ],
  exports: [
    Ng2SearchPipeModule
    ],
  
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }
],
  bootstrap: [AppComponent,]
})
export class AppModule { }


