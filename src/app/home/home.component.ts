import {Component, OnInit} from '@angular/core';
import {LessonsService} from '../shared/model/lessons.service';
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lessons: Lesson[];
  lessonsFiltered: Lesson[];

  constructor(private lessonsService: LessonsService) {
  }

  ngOnInit() {
    this.lessonsService.findAllLessons()
      .map(Lesson.fromJsonList)
      .do(console.log)
      .subscribe(lessons => this.lessons = this.lessonsFiltered = lessons);
  }

  search(value: string) {
    return this.lessonsFiltered = this.lessons.filter(lesson => lesson.description.includes(value));
  }

}
