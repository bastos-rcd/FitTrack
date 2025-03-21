import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FoodCardComponent } from './food/food-card/food-card.component';
import { FoodGetComponent } from './food/food-get/food-get.component';
import { FoodListComponent } from './food/food-list/food-list.component';
import { FoodNewComponent } from './food/food-new/food-new.component';
import { ProgramListComponent } from './program/program-list/program-list.component';
import { ProgramCardComponent } from './program/program-card/program-card.component';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';
import { WorkoutCardComponent } from './workout/workout-card/workout-card.component';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { ExerciseCardComponent } from './exercise/exercise-card/exercise-card.component';
import { ProgramNewComponent } from './program/program-new/program-new.component';
import { WorkoutNewComponent } from './workout/workout-new/workout-new.component';
import { ExerciseNewComponent } from './exercise/exercise-new/exercise-new.component';
import { CardLoadingComponent } from './card/card-loading/card-loading.component';
import { CardErrorComponent } from './card/card-error/card-error.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LoginComponent,
    CalculatorComponent,
    FoodCardComponent,
    FoodGetComponent,
    FoodListComponent,
    FoodNewComponent,
    ProgramListComponent,
    ProgramCardComponent,
    WorkoutListComponent,
    WorkoutCardComponent,
    ExerciseListComponent,
    ExerciseCardComponent,
    ProgramNewComponent,
    WorkoutNewComponent,
    ExerciseNewComponent,
    CardLoadingComponent,
    CardErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }