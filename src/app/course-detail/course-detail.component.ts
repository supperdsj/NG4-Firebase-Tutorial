import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {Observable} from "rxjs/Observable";
import {Lesson} from "../shared/model/lesson";
import {ActivatedRoute} from "@angular/router";
import {Course} from "../shared/model/course";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course$: Observable<Course>;
  lessons: Lesson[];
  courseUrl: string;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrl(courseUrl);
    const lessons$ = this.coursesService.loadFirstLessonsPage(this.courseUrl, 3);
    lessons$.subscribe(lessons => this.lessons = lessons);
  }

  next() {
    this.coursesService.loadNextPage(
      this.courseUrl,
      this.lessons[this.lessons.length - 1].$key,
      3
    )
      .subscribe(lessons => this.lessons = lessons);
  }


  previous() {

    this.coursesService.loadPreviousPage(
      this.courseUrl,
      this.lessons[0].$key,
      3
    )
      .subscribe(lessons => this.lessons = lessons);
  }

}
