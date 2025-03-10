import { Component, Input } from '@angular/core';
import { Program } from '../../../models/program';
import { ProgramService } from '../../../services/program.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrl: './program-card.component.css'
})

export class ProgramCardComponent {
  @Input() public program!: Program;

  constructor(
    private programService: ProgramService,
    private router: Router
  ) { }

  public onDelete(): void {
    if (confirm('Supprimer ' + this.program.getName() + ' ?')) {
      this.programService.deleteProgram(this.program).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}