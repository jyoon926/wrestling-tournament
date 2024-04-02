import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { InputPanelComponent } from './components/input-panel/input-panel.component';
import { OutputPanelComponent } from './components/ouput-panel/ouput-panel.component';
import { MatchesPanelComponent } from './components/matches-panel/matches-panel.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        InputPanelComponent,
        OutputPanelComponent,
        MatchesPanelComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});