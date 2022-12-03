import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  totalTime: string = "0";
  rounds : number = 0;
  breakTime: string = "00:00";
  timeRound: string = "00:00";

  breakTimeData: any = {
    minutes: 0,
    seconds: 0
  }

  roundTimeData: any = {
    minutes: 0,
    seconds: 0
  }


  constructor() {

  }

  calcTotalTime(){

  }

  nextBreakTime(){
    //Obtiene el valor guardado
    let seconds = this.breakTimeData.seconds;
    let minutes = this.breakTimeData.minutes;

    if(seconds == 55){
      minutes = minutes + 1;
      seconds = 0;
    }else{
      seconds = seconds + 5;
    }

    //Asigno el valor de los segundos y minutos para guardarlo
    this.breakTimeData.seconds = seconds;
    this.breakTimeData.minutes = minutes;

    //Formatea el texto que sé visualiza
    const minuteText = minutes >= 10? minutes :  "0" + minutes;
    const secondsText = seconds >= 10? seconds :  "0" + seconds;
    this.breakTime = minuteText +":"+ secondsText;
  }

  backBreakTime(){
    let seconds = this.breakTimeData.seconds;
    let minutes = this.breakTimeData.minutes;

    if(minutes == 0 && seconds == 0){ return; }

    if(seconds == 0){
      minutes --;
      seconds = 55;
    }else{
      seconds = seconds - 5;
    }

    this.breakTimeData.seconds = seconds;
    this.breakTimeData.minutes = minutes;

     //Formatea el texto que sé visualiza
     const minuteText = minutes >= 10? minutes :  "0" + minutes;
     const secondsText = seconds >= 10? seconds :  "0" + seconds;
     this.breakTime = minuteText +":"+ secondsText;
  }

  nextRoundTime(){
    //Obtiene el valor guardado
    let seconds = this.roundTimeData.seconds;
    let minutes = this.roundTimeData.minutes;

    if(seconds == 55){
      minutes = minutes + 1;
      seconds = 0;
    }else{
      seconds = seconds + 5;
    }

    //Asigno el valor de los segundos y minutos para guardarlo
    this.roundTimeData.seconds = seconds;
    this.roundTimeData.minutes = minutes;

    //Formatea el texto que sé visualiza
    const minuteText = minutes >= 10? minutes :  "0" + minutes;
    const secondsText = seconds >= 10? seconds :  "0" + seconds;
    this.timeRound = minuteText +":"+ secondsText;
  }

  backRoundTime(){
    let seconds = this.roundTimeData.seconds;
    let minutes = this.roundTimeData.minutes;

    if(minutes == 0 && seconds == 0){ return; }

    if(seconds == 0){
      minutes --;
      seconds = 55;
    }else{
      seconds = seconds - 5;
    }

    this.roundTimeData.seconds = seconds;
    this.roundTimeData.minutes = minutes;

     //Formatea el texto que sé visualiza
     const minuteText = minutes >= 10? minutes :  "0" + minutes;
     const secondsText = seconds >= 10? seconds :  "0" + seconds;
     this.timeRound = minuteText +":"+ secondsText;
  }


  backRound(){
    if(this.rounds <= 0){ return; }
    this.rounds --;
  }

  nextRound(){
    this.rounds ++;
  }

  resetTimes(){
    this.totalTime = "0";
    this.rounds = 0;
    this.breakTime = "00:00";
    this.timeRound = "00:00";

    this.breakTimeData = {
      minutes: 0,
      seconds: 0
    }

    this.roundTimeData = {
      minutes: 0,
      seconds: 0
    }

  }
}
