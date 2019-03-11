import { GameConfig } from "./GameConfig";
import { ITimeObserved } from "./interaces/timerInterface";
import { IScoreObserved } from "./interaces/scoreInterface";

export class TimeManagement implements IScoreObserved{
    timer: any = null;
    runOutOfTime: ITimeObserved[] = [];

    addObserver(observer: ITimeObserved){
        this.runOutOfTime.push(observer);
    }
    
    countCurrentTime(){
        GameConfig.gameTime -= 1;
        this.setTime();
        if( GameConfig.gameTime < 10){
            document.getElementById('time').classList.add('redText');
        }
        if( GameConfig.gameTime == 0 ){
            this.runOutOfTime.forEach(observer => observer.runOutOfTime());
            this.timerStop();
        }
    }
    
    timerStart(){
        this.timer = setInterval(() => this.countCurrentTime(), 1000);
    }
    timerStop(){
        clearInterval(this.timer);
    }
    setTime(){
        document.getElementById('time').innerHTML = 'Czas: ' + GameConfig.gameTime;
    }
    runOutOfLifes() {
        this.timerStop();
    }
}