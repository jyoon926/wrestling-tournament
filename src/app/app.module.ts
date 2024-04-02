import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OutputPanelComponent } from './components/ouput-panel/ouput-panel.component';
import { InputPanelComponent } from './components/input-panel/input-panel.component';
import { MatchesPanelComponent } from './components/matches-panel/matches-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputPanelComponent,
    InputPanelComponent,
    MatchesPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
