import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, fromEvent, Observable, of } from 'rxjs';
import { CustomObserver } from './custom-observer';

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

        const rejectMessagePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('Server error!');
            }, 1000)
        })

        const users$ = of(users);
        /** important to use from when dealing with promises
         *  as 'from' returns the value once the promise has resolved
         *  whereas 'of' returns the promise itself and not the resolved value
         * */
        const message$ = from(messagePromise);
        const bodyClicks$ = fromEvent(document, 'click');
        const rejectMessage$ = from(rejectMessagePromise);

        const usersCustomObservable$ = new Observable(observer => {
            //comment out this code when running the operator simulations below
            observer.next(1);
            observer.next(2);
            observer.next(3);
            observer.complete();    // closes/kills the stream, prevents data mutation
            // observer.next(5)  // this code will not fire since the data stream is closed

            // simulate of operator
            // uncomment the code below
            // observer.next(users);

            // simulate from operator
            // uncomment the code below
            // users.forEach((user) => {
            //     observer.next(user);
            // })
        })

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

        rejectMessage$.subscribe({
            next: (rejectMessage) => {
                console.log('resolved with message', rejectMessage)
            },
            error: (err) => {
                console.log('rejected with error', err)
            },
            complete: () => {
                console.log('complete, it is done.')
            }
        })

        usersCustomObservable$.subscribe({
            next: (customObservable) => {
                console.log('customObservable', customObservable)
            },
            complete: () => {
                console.log('completed')
            }
        })

        // subscribe to custom observer
        // completed object is console logged due to the use of 'from' operator,
        // which knows the last value of the stream when using an array.
        numbers$.subscribe(new CustomObserver());
    }
}
