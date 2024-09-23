import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
    data: number = 0;

    constructor() {
        // set up observable array with data
        // naming convention is to add a '$' at the end of the name
        const numbers$ = from([1,2,3,4,5]);

        numbers$.subscribe((data) => {
            console.log('subscriber', data);
            this.data = data;
        })
    }
}
