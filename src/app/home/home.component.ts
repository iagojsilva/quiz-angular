import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { QuizModel } from './quiz.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  quizes: QuizModel[]

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getQuizes().subscribe(data =>{
      this.quizes = data.map((arg)=> {
        return {
          name : arg['nome'],
          image: arg['image'],
          id: arg['id']
        } as QuizModel
      })
    })
  }

  

}
