import { Injectable } from '@angular/core';
import data from './data.json';
import { QuizModel } from './models/quiz.model';
import { QuestionsModel } from './models/question.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  dados : QuizModel[]  = []
  questions : QuestionsModel[]  = []

  getQuizes(){
    data[1].map((value)=> this.dados.push(
      new QuizModel(value.dados.nome, value.dados.image, value.dados.id)
      )
    );
    return this.dados;
  }

  getQuestions(){
    data[0]['Quizes'][0].map((value)=> this.questions.push(
      new QuestionsModel(
        value.enunciado,
        value.alternativas[0],
        value.alternativas[1],
        value.alternativas[2],
        value.alternativas[3],
        value.right,
        ),
    ))
    console.log(this.questions)
    return this.questions
  }
}

