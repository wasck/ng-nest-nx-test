import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'org-root',
  template: `<h1>Welcome apps/ng-nest-ui</h1>
    <router-outlet></router-outlet>`,
  styles: [''],
})
export class AppComponent {}
