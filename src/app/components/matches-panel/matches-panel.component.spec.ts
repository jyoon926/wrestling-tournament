import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchesPanelComponent } from './matches-panel.component';

describe('MatchesPanelComponent', () => {
  let component: MatchesPanelComponent;
  let fixture: ComponentFixture<MatchesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchesPanelComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});