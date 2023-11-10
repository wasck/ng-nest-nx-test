import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

@Component({
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  selector: 'org-root',
  template: `<h1>Welcome apps/ng-nest-ui</h1>
    <h3>Api response</h3>
    <span #response>
      {{apiResponse()}}
    </span>
    <router-outlet></router-outlet>`,
  styles: [''],
})
export class AppComponent implements AfterViewInit{
  public readonly apiResponse = signal('default-value');

  @ViewChild('response') elementRef!: ElementRef;

  public constructor(
    private readonly httpClient: HttpClient
  ){}
  ngAfterViewInit(): void {
    this.httpClient.get<{message: string}>('/api')
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.apiResponse.set(error.statusText)
        this.elementRef.nativeElement.style.color = 'red'
        return EMPTY
      })
    )
    .subscribe({
      next: (response: {message: string}) => this.apiResponse.set(response.message)
    })
  }

}
