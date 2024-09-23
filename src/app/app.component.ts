import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, fromEvent, of } from 'rxjs';

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
        const users = [
            {id: '1', name: 'John', age: 30},
            {id: '2', name: 'Jack', age: 35},
            {id: '3', name: 'Mike', age: 40},
        ];

        const messagePromise = new Promise((resolve) => {
            setTimeout(() => {
                resolve('Promise resolved!');
            }, 1000)
        })

        const users$ = of(users);
        /** important to use from when dealing with promises
         *  as 'from' returns the value once the promise has resolved
         *  whereas 'of' returns the promise itself and not the resolved value
         * */
        const message$ = from(messagePromise);
        const bodyClicks$ = fromEvent(document, 'click');

        numbers$.subscribe((data) => {
            console.log('subscriber', data);
            this.data = data;
        })

        users$.subscribe((users) => {
            console.log('users', users)
        })

        message$.subscribe((message) => {
            console.log('message', message)
        })

        bodyClicks$.subscribe((event) => {
            console.log('event', event)
        })
    }
}
