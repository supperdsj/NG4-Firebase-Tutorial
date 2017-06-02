import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {Observable} from "rxjs/Observable";
import {Lesson} from "../shared/model/lesson";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  lessonss: Observable<Lesson[]>;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const courseUrl = this.route.snapshot.params['id'];
    this.coursesService.findLessonsForCourse(courseUrl);

  }

}
