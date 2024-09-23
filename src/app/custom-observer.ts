import { Observer } from "rxjs";

/* 
* content of the class is the same as the object content inside a normal subscriber.
* class is reusable and observer can be used in multiple places, without the 
* need to duplicate code
**/
export class CustomObserver implements Observer<number> {
    next(data: number) {
        console.log('next: customObserver class', data);
    }
    error(err: string) {
        console.log('err: customObserver class', err);
    }
    complete() {
        console.log('complete: customObserver class');
    }
}