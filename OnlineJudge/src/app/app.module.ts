import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { DataService } from './services/data.service';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

import { routing } from './app.routes';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditorComponent } from './components/editor/editor.component';

import { CollaborationService } from './services/collaboration.service';
import { UserNumberComponent } from './components/user-number/user-number.component';
import { SearchInputService } from './services/search-input.service';
import { SearchPipe } from './pipes/search.pipe';
import { EditProblemComponent } from './components/edit-problem/edit-problem.component';
import { AuthService } from './services/auth.service';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    EditorComponent,
    UserNumberComponent,
    SearchPipe,
    EditProblemComponent,
    LoadingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    CollaborationService,
    SearchInputService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
