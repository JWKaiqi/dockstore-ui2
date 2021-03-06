import { Injectable } from '@angular/core';
import { LoginApi } from './login.api';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { AuthService } from 'ng2-ui-auth';

@Injectable()
export class LoginService {

  constructor(private api: LoginApi, private auth: AuthService) { }

  login(credentials): Observable<Response> {
    return Observable.create(observable => {
      this.api.login(credentials).subscribe(user => {
        this.onLoginSuccess(user);
        observable.next(user);
        observable.complete();
      },
      err =>  observable.error(err.json())
      );
    });
  }

  authenticate(provider: string): Observable<any> {
    return Observable.create(observable => {
      return this.api.authenticate(provider).subscribe(user => {
        this.onLoginSuccess(user);
        observable.next(user);
        observable.complete();
      });
    });
  }

  private onLoginSuccess(user) {
    return user;
  }
}
