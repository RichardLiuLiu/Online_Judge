import { Component, OnInit } from '@angular/core';
import { FormControl }  from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import { SearchInputService } from '../../services/search-input.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchInput: string = "";
  difficultySearch: string = "";

  searchBox: FormControl = new FormControl();
  subscription: Subscription;

  difficulties: string[] = ['easy', 'medium', 'hard', 'ultimate'];

  constructor(private inputService: SearchInputService,
              private router: Router) { }

  ngOnInit() {
    // this.subscription = this.searchBox
    //                         .valueChanges
    //                         .debounceTime(200)
    //                         .subscribe(term => {
    //                           this.inputService.changeInput(term);
    //                         });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblems(): void {
    this.router.navigate(['/problems']);
  }

  searchProblems_btn(): void {
    this.inputService.changeInput(this.searchInput);
    this.router.navigate(['/problems']);
  }

  difficultyFilter(): void {
    this.inputService.changeInput(this.difficultySearch);
    this.router.navigate(['/problems']);
  }

}
