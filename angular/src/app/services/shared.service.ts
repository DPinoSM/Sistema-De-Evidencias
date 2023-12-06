import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private evidenciaIdSource = new BehaviorSubject<number | null>(null);
  evidenciaId$ = this.evidenciaIdSource.asObservable();

  setEvidenciaId(id: number) {
    this.evidenciaIdSource.next(id);
  }
}
