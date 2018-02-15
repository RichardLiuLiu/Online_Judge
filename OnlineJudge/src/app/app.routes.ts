import { Routes, RouterModule } from '@angular/router';

import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { EditProblemComponent } from './components/edit-problem/edit-problem.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'problems',
        pathMatch: 'full'
    },
    {
        path: 'problems',
        component: ProblemListComponent
    },
    {
        path: 'problems/:id',
        component: ProblemDetailComponent
    },
    {
        path: 'newProblem',
        component: NewProblemComponent
    },
    {
        path: 'editProblem/:id',
        component: EditProblemComponent
    },
    {
        path: '**',
        redirectTo: 'problems'
    }
]

export const routing = RouterModule.forRoot(routes);