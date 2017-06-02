import {Component} from '@angular/core';
import {initializeApp, database} from 'firebase'
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'app';
  // courses$: FirebaseListObservable<any>;
  // course$: FirebaseObjectObservable<any>;
  // lastCourse: any;

  constructor(private db: AngularFireDatabase) {
    // this.courses$ = db.list('courses');
    // this.courses$.subscribe(console.log);
    // this.course$ = db.object('courses/-KlXW9ABuOzkCe5Vo255');
    // this.course$.subscribe(console.log);
    // this.courses$.map(courses => courses[courses.length - 1]).subscribe(course => this.lastCourse = course);
    // const config = {
    //   apiKey: 'AIzaSyDLlNNKJCGsN4m03iAdFaDxiiggGCitWV8',
    //   authDomain: 'old-patient.firebaseapp.com',
    //   databaseURL: 'https://old-patient.firebaseio.com',
    //   projectId: 'old-patient',
    //   storageBucket: 'old-patient.appspot.com',
    //   messagingSenderId: '628096158884'
    // };
    // initializeApp(config);
    // const root = database().ref('testArray');
    // // const root = database().ref();
    // root.on('value', function (snap) {
    //   console.log(snap.key, snap.val())
    // });
  }
  //
  // listPush() {
  //   this.courses$.push({desc: 'test new course'}).then(() => console.log('push success'), () => console.error('push error'));
  // }
  //
  // listRemove() {
  //   this.courses$.remove(this.lastCourse);
  // }
  //
  // listUpdate() {
  //   this.courses$.update(this.lastCourse, {desc: 'updated course ' + (new Date())});
  //
  // }
  //
  // objUpdate() {
  //   this.course$.update({desc: 'update course ' + (new Date())}).then(() => console.log('update success', () => console.error('update error')));
  // }
  //
  // objSet() {
  //   this.course$.set({desc: 'update course ' + (new Date())}).then(() => console.log('set success', () => console.error('set error')));
  // }
}
