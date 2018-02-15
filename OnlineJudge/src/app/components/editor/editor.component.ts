import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CollaborationService } from '../../services/collaboration.service';
import { DataService } from '../../services/data.service'


declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editor: any;
  result: string = '';

  public languages: string[] = ['Java', 'Python', 'C++'];
  language: string = 'Java';
  sessionId: string;

  users: string;
  subscriptionUsers: Subscription;

  constructor(private collaboration: CollaborationService,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  defaultContent = {
    'Java':
`public class Example {
    public static void main(String[] args) {
        // Type your Java code here.
    }
}`,
    'Python':
`class Example:
    def main():
        # Type your Python code here.
`,
    'C++':
`int main() {
    // Type your C++ code here.
    return 0;
}`
  };

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
        this.collaboration.restoreBuffer();
      });
  }

  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();

    // this.collaboration.init(this.editor, this.sessionId);
    this.subscriptionUsers = this.collaboration.init(this.editor, this.sessionId)
      .subscribe(users => this.users = users);
    this.editor.lastAppliedChange = null;

    this.editor.on("change", (e) => {
      console.log('editor changes' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    });   
  }

  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/" + this.language.toLocaleLowerCase());
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  submit(): void {
    let user_code = this.editor.getValue();
    console.log(user_code);

    const data = {
      user_code: user_code,
      lang: this.language.toLocaleLowerCase()
    };
    this.dataService.build_and_run(data)
      .then(res => this.result = res);
  }

}
