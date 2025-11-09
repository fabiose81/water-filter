import { Component, Input } from '@angular/core';
import { Water } from '../interface/water.interface'

@Component({
  selector: 'app-accordion',
  templateUrl: 'accordion.component.html',
})
export class AccordionComponent {
  @Input() waters: Water[] = [];

  openIndex: number | null = null;

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
