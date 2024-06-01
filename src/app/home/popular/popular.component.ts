import { Component, inject } from '@angular/core';
import { CourseService } from '../../Services/course.service';
import { Course } from '../../Models/course';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CurrencyPipe,CommonModule, RouterLink],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent {
  courseService = inject(CourseService)
  popularCourses: Course[] = [];
  router:Router = inject(Router); //we need an instance of router class
  activeRoute: ActivatedRoute = inject(ActivatedRoute); //we need this class for configure relative routes.

  ngOnInit(){
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }

  navigateToCourses(){
    // this.router.navigate(['Courses']); //by default these pahts are absolute. or needed to  use activeRoute class to make it relative paths.
    // this.router.navigateByUrl('Courses');
    this.router.navigate(['/Courses'], {relativeTo: this.activeRoute})
  }
}
