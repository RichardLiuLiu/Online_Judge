import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SearchInputService {

  private _inputSubject = new BehaviorSubject<string>('');

  constructor() { }

  changeInput(term) {
    this._inputSubject.next(term);
  }

  getInput(): Observable<string> {
    return this._inputSubject.asObservable();
  }

}
