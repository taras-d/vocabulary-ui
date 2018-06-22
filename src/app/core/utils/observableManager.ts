import { Observable, Subscription } from 'rxjs';

export class ObservableManager {

  private subs: Subscription[] = [];

  constructor(
    private observers: {
      [key: string]: {
        create: (...args: any[]) => Observable<any>;
        next?: (data: any, ...args: any[]) => void;
        error?: (error: any, ...args: any[]) => void;
        complete?: (args: any[]) => void;
      }
    },
    private options?: {
      next?: (name: string, data: any, ...args: any[]) => void;
      error?: (name: string, error: any, ...args: any[]) => void;
      complete?: (name: string, ...args: any[]) => void;
    }
  ) {

  }

  invoke(name: string, ...args: any[]): void {
    const observer = this.observers[name];

    if (!observer) {
      console.warn(`Observer with name "${name}" not found`);
      return;
    }

    this.unsub(name);

    const options = this.options || {};

    this.subs[name] = observer.create(...args).subscribe(
      data => {
        this.callFn(observer.next, data, ...args);
        this.callFn(options.next, name, data, ...args);
      },
      error => {
        this.callFn(observer.error, error, ...args);
        this.callFn(options.error, name, error, ...args);
      },
      () => {
        this.callFn(observer.complete, ...args);
        this.callFn(options.complete, name, ...args);
      }
    );
  }

  unsub(name: string): void {
    if (name in this.subs) {
      this.subs[name].unsubscribe();
    }
  }

  unsubAll(): void {
    Object.keys(this.observers).forEach(name => this.unsub(name));
  }

  private callFn(fn: Function, ...args: any[]): any {
    if (typeof fn === 'function') {
      return fn(...args);
    }
  }

}
