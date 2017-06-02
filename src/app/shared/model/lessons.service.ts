import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class LessonsService {

  constructor(private db: AngularFireDatabase) {
  }

  findAllLessons(): Observable<Lesson[]> {
    return this.db.list('lessons');
  }


}
