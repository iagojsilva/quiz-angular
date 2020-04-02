import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  quiz_id: string;

  constructor(private actRoute: ActivatedRoute) {
    this.quiz_id = this.actRoute.snapshot.params.id;
  }

  data = new DataService().getQuestions()

  ngOnInit(): void {
  }

}
