import { Component } from '@angular/core';
import { ProgramService } from '../../../services/program.service';
import { Router } from '@angular/router';
import { Program } from '../../../models/program';

@Component({
  selector: 'app-program-new',
  templateUrl: './program-new.component.html',
  styleUrl: './program-new.component.css'
})

export class ProgramNewComponent {
  public model: any = {};

  constructor(
    private programService: ProgramService,
    private router: Router
  ) { }

  public onSubmit() {
    this.programService.createProgram(
      new Program(
        this.model.name,
        []
      )
    ).then(() => {
      this.router.navigate(['/program/' + this.model.name]);
    });
  }
}