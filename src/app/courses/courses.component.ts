import { Component, OnInit, inject } from '@angular/core';
import { Course } from '../Models/course';
import { CourseService } from '../Services/course.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  coursesService = inject(CourseService);
  AllCourses: Course[];
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  searchString: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  //  this.searchString = this.activeRoute.snapshot.queryParams['search'];

  //  this.searchString = this.activeRoute.snapshot.queryParamMap.get('search');

  this.activeRoute.queryParamMap.subscribe((data) => { 
    this.searchString = data.get('search');
    if(this.searchString === undefined || this.searchString ===''|| this.searchString == null) {
       this.coursesService.getAllCourses().subscribe((courseData: Course[])=> {
        this.AllCourses = courseData;
      })
     } else {
      this.AllCourses = this.coursesService.courses
          .filter(x => x.title.toLowerCase().includes(this.searchString));
     }
    console.log(this.searchString);
  })
   

  }

}
