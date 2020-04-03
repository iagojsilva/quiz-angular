import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsModel } from './question.model';
import { QuizService } from '../home/quiz.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  quiz_name: string;

  questions: QuestionsModel[]

  constructor(private actRoute: ActivatedRoute, private quiz: QuizService) {
    this.quiz_name = this.actRoute.snapshot.params.id;
  }

 
  
  ngOnInit(): void {

    this.quiz.getQuestionsOfQuiz(this.quiz_name).subscribe(data=>{
      var count = 0
      this.questions = data.map(arg=>{
        count++
        return {
          enunciado: arg['enunciado'],
          a1: arg['alternativas'][0],
          a2: arg['alternativas'][1],
          a3: arg['alternativas'][2],
          a4: arg['alternativas'][3],
          aRight: arg['right'],
          id: count,
        } as QuestionsModel; 
      }) 
    })

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
    $(document).ready(function (){
      $('carousel-item').first().addClass('active')
    })
    $(document).on('click', '.alternativa', function (){
      //await delay(1000)
        if($(this).hasClass('enabled')){
          $('.enabled').removeClass('enabled')
          $('#btn_submit').removeClass('border-btn')
          $('#btn_submit').addClass('disable')
        }else{
          $('.enabled').removeClass('enabled')
          $(this).addClass('enabled')
          $('.disable').addClass('border-btn')
          $('.disable').removeClass('disable')
        }
     
      $('#btn_submit').on('click', async function (){
        $(this).addClass('border')
        $(this).removeClass('border-btn')
        await delay(200)
        $(this).addClass('border-btn')
        $(this).removeClass('border')
        console.log($('#carousel'))
      })
    })
     
  }
}
