import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

declare var io: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;
  private _userSource = new Subject<string>();

  constructor() { }

  init(editor: any, sessionId: string): Observable<string> {
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId });

    this.collaborationSocket.on("change", (delta: string) => {
      console.log('collaboration: editor changes by' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaborationSocket.on("userChange", (data: string[]) => {
      console.log('collabration: user changes ' + data);
      this._userSource.next(data.toString());
    });

    return this._userSource.asObservable();
  }

  change(delta: string): void {
    this.collaborationSocket.emit("change", delta);
  }

  restoreBuffer(): void {
    this.collaborationSocket.emit("restoreBuffer");
  }

}
