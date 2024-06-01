import { Component, OnInit, inject } from '@angular/core';
import { Course } from '../../Models/course';
import { CourseService } from '../../Services/course.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit{

  selectedCourse : Course;
  courseId :number;

  courseService: CourseService = inject(CourseService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  paramMapObservable;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.courseId = this.activeRoute.snapshot.params['id'];
    // this.courseId = +this.activeRoute.snapshot.paramMap.get('id');

    //using params
    // this.activeRoute.params.subscribe((data) => {
    //   this.courseId = +data['id'];
    // this.selectedCourse = this.courseService.courses.find((courseItem) => courseItem.id === this.courseId );

    // })

    // using paramsMap

    this.paramMapObservable = this.activeRoute.paramMap.subscribe((data) => {
      this.courseId = +data.get('id');
    this.selectedCourse = this.courseService.courses.find((courseItem) => courseItem.id === this.courseId );

    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.paramMapObservable.unsubscribed();
  }
}
