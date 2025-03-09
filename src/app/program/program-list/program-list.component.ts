import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../../../models/program';
import { ProgramService } from '../../../services/program.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.css'
})

export class ProgramListComponent {
  public programs: Program[] = [];

  constructor(
    private programService: ProgramService
  ) {
    this.programService.getPrograms().then(programs => {
      this.programs = programs;
      this.programs.sort((a, b) => a.getName().localeCompare(b.getName()));
    });
  }
}