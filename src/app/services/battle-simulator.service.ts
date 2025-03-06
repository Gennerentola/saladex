import { Injectable } from '@angular/core';
import { BattlePkmn } from '../dto/battle-pkmn';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BattleSimulatorService {

  emptyPkmnValue: BattlePkmn = new BattlePkmn(
    '',
    '',
    [],
    0,
    0,
    0,
    0,
    0,
    0,
    [],
    [],
    '',
    ''
  )
  ownPkmn: BehaviorSubject<BattlePkmn> = new BehaviorSubject<BattlePkmn>(this.emptyPkmnValue);
  enemyPkmn: BehaviorSubject<BattlePkmn> = new BehaviorSubject<BattlePkmn>(this.emptyPkmnValue);

  ownPkmn$ = this.ownPkmn.asObservable();
  enemyPkmn$ = this.enemyPkmn.asObservable();

  constructor(private http: HttpClient) { }

  getMove(url: string): Observable<any> {
    return this.http.get(url);
  }

  setOwnPkmn(pkmn: BattlePkmn) {
    this.ownPkmn.next(pkmn);
  }

  setEnemyPkmn(pkmn: BattlePkmn) {
    this.enemyPkmn.next(pkmn);
  }

}
