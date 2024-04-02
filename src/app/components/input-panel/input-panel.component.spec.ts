import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPanelComponent } from './input-panel.component';
import { TournamentService } from 'src/app/services/tournament.service';

// Mocking the TournamentService
class MockTournamentService {
  wrestlers = [];
  running = false;

  startTournament(wrestlers: any[]) {
    // Mock implementation
  }
}

describe('InputPanelComponent', () => {
  let component: InputPanelComponent;
  let fixture: ComponentFixture<InputPanelComponent>;
  let mockTournamentService: MockTournamentService;

  beforeEach(async () => {
    mockTournamentService = new MockTournamentService();
    await TestBed.configureTestingModule({
      declarations: [InputPanelComponent],
      providers: [
        { provide: TournamentService, useValue: mockTournamentService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default sampleInput defined', () => {
    expect(component.sampleInput.length).toBeGreaterThan(0);
  });

  it('should call startTournament on valid input', async () => {
    const spy = spyOn(mockTournamentService, 'startTournament').and.callThrough();
    const validInput = JSON.stringify(component.sampleInput);
    await component.startTournament(validInput);
    expect(spy).toHaveBeenCalled();
  });

  it('should alert on invalid JSON input', async () => {
    const spy = spyOn(window, 'alert');
    const invalidInput = "This is not valid JSON!";
    await component.startTournament(invalidInput);
    expect(spy).toHaveBeenCalledWith("Input must be in valid JSON format!");
  });
});