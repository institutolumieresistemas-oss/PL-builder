import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ejemplo } from '../../componentes/ejemplo/ejemplo';
import { PageElement } from '../../models/element.model';

@Component({
  selector: 'app-element-host',
  standalone: true,
  imports: [CommonModule, Ejemplo],
  templateUrl: './element-host.html',
  styleUrl: './element-host.css',
})
export class ElementHost {
  @Input() element!: PageElement;
}
