import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseApp} from "angularfire2";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LessonsService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkDb = fb.database().ref();
  }

  findAllLessons(): Observable<Lesson[]> {
    return this.db.list('lessons');
  }

  findLessonByUrl(url: string): Observable<Lesson> {
    return this.db.list('lessons', {
      query: {
        orderByChild: 'url',
        equalTo: url
      }
    }).map(result => result[0]);
  }

  loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        startAt: lessonId,
        limitToFirst: 2
      }
    })
      .filter(results => results && results.length > 0)
      .map(results => results[1].$key)
      .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }


  loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        endAt: lessonId,
        limitToLast: 2
      }
    })
      .filter(results => results && results.length > 0)
      .map(results => results[0].$key)
      .switchMap(lessonid => this.db.object(`lessons/${lessonid}`))
      .map(Lesson.fromJson);

  }

  createNewLesson(courseId: string, lesson: any): Observable<any> {
    const lessonsToSave = Object.assign({}, lesson, {courseId: courseId});
    const newLessonKey = this.sdkDb.child('lessons').push().key;
    console.log(`add lesson key: ${newLessonKey}`);
    const dataToSave = {};
    dataToSave["lessons/" + newLessonKey] = lessonsToSave;
    dataToSave["lessonsPerCourse/" + courseId + "/" + newLessonKey] = true;

    return this.firebaseUpdate(dataToSave);
  }

  saveLesson(lessonId: string, lesson): Observable<any> {
    const lessonsToSave = Object.assign({}, lesson);
    delete(lessonsToSave.$key);
    const dataToSave = {};
    dataToSave["lessons/" + lessonId] = lessonsToSave;
    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();
    this.sdkDb.update(dataToSave)
      .then(val => {
        subject.next(val);
        subject.complete();
      }, err => {
        subject.error(err);
        subject.complete();
      });
    return subject.asObservable();
  }
}
