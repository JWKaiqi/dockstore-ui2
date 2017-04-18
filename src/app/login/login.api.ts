import { Injectable } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

@Injectable()
export class LoginApi {
  constructor(private auth: AuthService) { }

  login(credentials): Observable<any> {
    return this.auth.login(credentials).map(res => res.json());
  }

  authenticate(provider): Observable<Response> {
    return this.auth.authenticate(provider).map(res => res.json());
  }
}
