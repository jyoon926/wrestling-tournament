import { TestBed, inject } from '@angular/core/testing';
import { TournamentService } from './tournament.service';
import { WrestlerInput } from '../models/wrestler-input';

describe('TournamentService', () => {
  let service: TournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentService]
    });
    service = TestBed.inject(TournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start and complete a tournament with valid wrestlers', async () => {
    const inputWrestlers: WrestlerInput[] = [
      { name: 'Wrestler A', health: 100, moves: [{ name: 'Move A', damage: 20, type: 'signature' }] },
      { name: 'Wrestler B', health: 100, moves: [{ name: 'Move B', damage: 25, type: 'signature' }] }
    ];

    await service.startTournament(inputWrestlers);

    // Expect the tournament to have been run and completed
    expect(service.running).toBe(false);
    expect(service.wrestlers.length).toBe(2);
    expect(service.matches.length).toBeGreaterThan(0);
    expect(service.messages.length).toBeGreaterThan(0);
    expect(service.messages.join()).toContain('wins the tournament!');
  });
});