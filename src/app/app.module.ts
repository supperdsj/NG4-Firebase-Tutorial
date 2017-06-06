import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '../environments/firebase.config';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {HomeComponent} from './home/home.component';
import {LessonsService} from "./shared/model/lessons.service";
import {LessonsListComponent} from './lessons-list/lessons-list.component';
import {RouterModule} from "@angular/router";
import {routerConfig} from "./router.config";
import {TopMenuComponent} from './top-menu/top-menu.component';
import {CoursesComponent} from './courses/courses.component';
import {CoursesService} from "./shared/model/courses.service";
import {CourseDetailComponent} from './course-detail/course-detail.component';
import {LessonDetailComponent} from './lesson-detail/lesson-detail.component';
import {SafeUrlPipe} from './shared/security/safe-url.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    TopMenuComponent,
    CoursesComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    SafeUrlPipe,
    NewLessonComponent,
    LessonFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routerConfig),
    ReactiveFormsModule
  ],
  providers: [LessonsService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
