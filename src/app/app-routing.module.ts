import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FoodGetComponent } from './food/food-get/food-get.component';
import { FoodListComponent } from './food/food-list/food-list.component';
import { FoodNewComponent } from './food/food-new/food-new.component';
import { FoodEditComponent } from './food/food-edit/food-edit.component';
import { ProgramListComponent } from './program/program-list/program-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'calculator', component: CalculatorComponent, canActivate: [AuthGuard] },
  { path: 'food-get', component: FoodGetComponent, canActivate: [AuthGuard] },
  { path: 'foods', component: FoodListComponent, canActivate: [AuthGuard] },
  { path: 'food-new', component: FoodNewComponent, canActivate: [AuthGuard] },
  { path: 'food-edit/:name', component: FoodEditComponent, canActivate: [AuthGuard] },
  { path: 'programs', component: ProgramListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }