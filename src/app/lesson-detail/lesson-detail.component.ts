import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson;

  constructor(private route: ActivatedRoute, private lessonsService: LessonsService, private router: Router) {
  }

  ngOnInit() {

    this.route.params.switchMap(params => {
      return this.lessonsService.findLessonByUrl(params['id']);
    })
      .subscribe(lesson => this.lesson = lesson);
  }

  next() {
    this.lessonsService.loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .do(console.log)
      .subscribe(this.navigateToLesson.bind(this));
  }

  previous() {
    this.lessonsService.loadPreviousLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  navigateToLesson(lesson: Lesson) {
    console.log(lesson);
    this.router.navigate(['lessons', lesson.url]);
  }
}
