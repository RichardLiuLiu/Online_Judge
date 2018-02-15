import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';
import { SearchInputService } from '../../services/search-input.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})

export class ProblemListComponent implements OnInit {

  problems: Problem[];
  subscriptionProblems: Subscription;

  searchTerm: string = '';
  subscriptionInput: Subscription;

  constructor(private dataService: DataService,
              private inputService: SearchInputService) { }

  ngOnInit() {
    this.getProblems();
    this.getSearchTerm();
  }

  ngOnDestory() {
    this.subscriptionProblems.unsubscribe();
  }

  getProblems() {
    this.subscriptionProblems = this.dataService.getProblems()
      .subscribe(problems => this.problems = problems);
  }

  getSearchTerm(): void {
    this.subscriptionInput = this.inputService.getInput()
                              .subscribe(inputTerm => this.searchTerm = inputTerm);
  }

}
