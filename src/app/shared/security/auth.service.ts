import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {AuthInfo} from "./authInfo";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {

  static UNKNOW_USER = new AuthInfo(null);
  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOW_USER);

  constructor(private auth: AngularFireAuth) {
  }

  login(email: string, password: string): Observable<any> {
    return this.fromFirebaseAuthPromise(this.auth.auth.signInWithEmailAndPassword(email, password));
  }

  signUp(email: string, password: string): Observable<any> {
    return this.fromFirebaseAuthPromise(this.auth.auth.createUserWithEmailAndPassword(email, password));
  }

  logout() {
    this.auth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOW_USER);
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();
    promise.then(res => {
        const authInfo = new AuthInfo(res.uid);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
      err => {
        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
      });
    return subject.asObservable();
  }
}
