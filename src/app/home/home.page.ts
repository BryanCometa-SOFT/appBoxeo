import { Component } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';

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
  time: string = "";

  breakTimeData: any = {
    minutes: 0,
    seconds: 0
  }

  roundTimeData: any = {
    minutes: 0,
    seconds: 0
  }

  presentingElement: any = undefined;

  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿¿ Estás seguro de que quiere rendirse tan rápido ?? 💪💪💪 Vamos continuemos entrenando 💪💪💪',
      buttons: [
        {
          text: 'Sí. me rindo 😥😥😥',
          role: 'confirm',
        },
        {
          text: 'No. Vamos con toda de nuevo 😎😎💪',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();
    const { role } = await actionSheet.onWillDismiss();
    return role === 'confirm';
  };

  openModal(){
    const element = document.getElementById("open-modal");
    element?.click();
  }


  calcTotalTime(){
    if(this.rounds > 0){
      let totalMinutes = 0;
      let totalSeconds = 0;

      let seconds = (this.breakTimeData.seconds + this.roundTimeData.seconds) * this.rounds;
      let minutes = (this.breakTimeData.minutes + this.roundTimeData.minutes) * this.rounds;

      if(seconds > 60){
        totalSeconds = seconds % 60;
        totalMinutes = seconds / 60;
      }else {
        totalSeconds = seconds;
      }
      totalMinutes = totalMinutes + minutes;

      this.totalTime =  Math.trunc(totalMinutes)  +":"+ Math.trunc(totalSeconds);
    }
  }

  nextBreakTime(){
    const nextData = this.nextTime(this.breakTimeData.seconds,this.breakTimeData.minutes);
    this.breakTimeData.seconds = nextData?.seconds;
    this.breakTimeData.minutes = nextData?.minutes;
    this.breakTime = nextData.timeText;
    this.calcTotalTime();
  }

  backBreakTime(){
    const backData = this.backTime(this.breakTimeData.seconds,this.breakTimeData.minutes);
    this.breakTimeData.seconds = backData?.seconds;
    this.breakTimeData.minutes = backData?.minutes;
    this.breakTime = backData.timeText;
    this.calcTotalTime();
  }

  nextRoundTime(){
    const nextData = this.nextTime(this.roundTimeData.seconds,this.roundTimeData.minutes)
    this.roundTimeData.seconds = nextData.seconds;
    this.roundTimeData.minutes = nextData.minutes;
    this.timeRound = nextData.timeText;
    this.calcTotalTime();
  }

  backRoundTime(){
    const backData = this.backTime(this.roundTimeData.seconds,this.roundTimeData.minutes);
    this.roundTimeData.seconds = backData?.seconds;
    this.roundTimeData.minutes = backData?.minutes;
    this.timeRound = backData.timeText;
    this.calcTotalTime();
  }

  /**
   * @descripcion formatea los valores suministados y aumenta los segundos y minutos
   * @param seconds number
   * @param minutes number
   * @returns obj
   */
  nextTime(seconds:number,minutes:number){
    if(seconds == 55){
      minutes = minutes + 1;
      seconds = 0;
    }else{
      seconds = seconds + 5;
    }

    const minuteText = minutes >= 10? minutes :  "0" + minutes;
    const secondsText = seconds >= 10? seconds :  "0" + seconds;

    return {
      "seconds" : seconds,
      "minutes" : minutes,
      "timeText" : minuteText +":"+ secondsText,
    }
  }

  /**
   * @descripcion formatea los valores suministados y minimiza los segundos y minutos
   * @param seconds number
   * @param minutes number
   * @returns obj
   */
  backTime(seconds:number,minutes:number){
    if(minutes == 0 && seconds == 0){
      return {
        "seconds" : seconds,
        "minutes" : minutes,
        "timeText" : "00:00",
      }
    }

    if(seconds == 0){
      minutes --;
      seconds = 55;
    }else{
      seconds = seconds - 5;
    }

    //Formatea el texto que sé visualiza
    const minuteText = minutes >= 10? minutes :  "0" + minutes;
    const secondsText = seconds >= 10? seconds :  "0" + seconds;

    return {
      "seconds" : seconds,
      "minutes" : minutes,
      "timeText" : minuteText +":"+ secondsText,
    }
  }

  backRound(){
    if(this.rounds <= 0){ return; }
    this.rounds --;
    this.calcTotalTime();
  }

  nextRound(){
    this.rounds ++;
    this.calcTotalTime();
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
