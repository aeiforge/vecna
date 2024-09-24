import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vecna-angular',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>angular works!</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent {}
