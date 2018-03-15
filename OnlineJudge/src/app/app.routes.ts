import { Routes, RouterModule } from '@angular/router';

import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { EditProblemComponent } from './components/edit-problem/edit-problem.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'problems',
        pathMatch: 'full'
    },
    {
        path: 'loading',
        component: LoadingComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
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