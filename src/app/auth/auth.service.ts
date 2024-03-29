import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  work: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uriseg = 'http://localhost:5000/api/users'; // used for localhost
  // private uriseg = 'api/users'; // used for Build and Development
  private decodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
   }

  public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/register';
    return this.http.post(URI, userData);
  }

  public update(userData: any): Observable<any> {
    const URI = this.uriseg + '/update';
    return this.http.patch(URI, userData).pipe(map(token => {
      return this.saveToken(token);
    }));
  }

  public login(userData: any): Observable<any> {
    const URI = this.uriseg + '/login';
    return this.http.post(URI, userData).pipe(map(token => {
      return this.saveToken(token);
    }));
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public getUserFirstName(): string {
    return this.decodedToken.firstName;
  }
  public getUserLastName(): string {
    return this.decodedToken.lastName;
  }
  public getUserEmail(): string {
    return this.decodedToken.email;
  }
  public getUserPhone(): string {
    return this.decodedToken.phone;
  }
  public getUserWork(): string {
    return this.decodedToken.work;
  }
  public getUserId(): string {
    return this.decodedToken.id;
  }

}
