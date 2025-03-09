import { Component, Input } from '@angular/core';
import { Program } from '../../../models/program';

@Component({
  selector: 'app-program-card',
  templateUrl: './program-card.component.html',
  styleUrl: './program-card.component.css'
})

export class ProgramCardComponent {
  @Input() public program!: Program;

  constructor() { }
}