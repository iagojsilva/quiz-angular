import { AngularFirestore, DocumentSnapshot, CollectionReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class QuizService {
    constructor(private firestore: AngularFirestore){}


    getQuizes() {
        return this.firestore.collection('info').valueChanges()
    }
    
    getQuestionsOfQuiz(quizName){
        return this.firestore.collection(quizName).valueChanges()
    }
}