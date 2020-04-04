import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsModel } from './question.model';
import { QuizService } from '../home/quiz.service';
import * as $ from 'jquery';
import { MatStepper } from '@angular/material/stepper';
import { MatBottomSheet } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  quiz_name: string;

  questions: QuestionsModel[]

  aRight: number

  count: number

  isClickable: boolean
  

  src = {
    "acertou": "assets/audio/right_answer.mp3",
    "error": "assets/audio/wrong_answer.mp3",
    "venceu": "assets/audio/level_up_answer.mp3",
    "perdeu": "assets/audio/lesson_failed.mp3",
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  constructor(private actRoute: ActivatedRoute, private quiz: QuizService) {
    this.quiz_name = this.actRoute.snapshot.params.id;
  }

  next(stepper){
    stepper.next()
  }

  async audio(src){
    let audio = new Audio();
    audio.src = src;
    //audio.load();
    await audio.play();
  }

  async validation(id, stepper){
    console.log($('.disable').length)
    if($('.disable').length == 0){
    this.aRight = this.questions[id].aRight
    var escolha = $('.enabled').text()
    var resposta = $('.alternativa').children(0)[this.aRight+(id*4)].innerText
    if (escolha == resposta){
      this.count++
      await this.audio(this.src['acertou'])
      
      $('.btn_submit').addClass('bg-success')
      //dispose
      this.isClickable = false
      await this.delay(2000)
      this.next(stepper)
      $('.btn_submit').removeClass('bg-success')
      $('.btn_submit').removeClass('border-btn')
      $('.btn_submit').addClass('disable')

    }else{
      await this.audio(this.src['error'])
      
      $('.btn_submit').addClass('bg-danger')
      $('.btn_submit').removeClass('border-btn')
      $('.btn_submit').addClass('border-btn-danger')
      await this.delay(2000)
      this.next(stepper)
      //dispose
      this.isClickable = false
      $('.btn_submit').addClass('disable')
      $('.enabled').removeClass('enabled')
      $('.btn_submit').removeClass('bg-danger')
      $('.btn_submit').removeClass('border-btn')
      $('.btn_submit').removeClass('border-btn-danger')
    }
    }else{
      console.log('selecione')
    }
  }
 
  
  ngOnInit(): void {
    console.log($('.disable').length)

    this.questions
    this.count = 0
    this.quiz.getQuestionsOfQuiz(this.quiz_name).subscribe(data=>{
      var count = -1
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
    $(document).on('click', '.alternativa', function (){
      //await delay(1000)
        if($(this).hasClass('enabled')){
          $('.enabled').removeClass('enabled')
          $('.btn_submit').removeClass('border-btn')
          $('.btn_submit').addClass('disable')
        }else{
          $('.enabled').removeClass('enabled')
          $(this).addClass('enabled')
          $('.disable').addClass('border-btn')
          $('.disable').removeClass('disable')
        }})
        if($('.disable').length == 0){
        $(document).on('click', '.btn_submit', function (){
        
          $('.btn_submit').on('click', async function (){
            console.log($('.disable').length,'aui')
            $(this).addClass('border-fina')
            $(this).removeClass('border-btn')
            await delay(200)
            $(this).addClass('border-btn')
            $(this).removeClass('border-fina')
          })
        })
        }else{
          console.log('wtf')
        }
      
      
    
     
  }
}
