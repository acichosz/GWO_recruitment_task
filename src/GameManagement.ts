import { GameConfig } from "./GameConfig";
import { Playground } from "./Playground";
import { ScoreManagement } from "./ScoreManagement";

export class GameManagement{
    playground: Playground = new Playground();
    scoreManagement: ScoreManagement = new ScoreManagement();
    startButton = document.getElementById('startButton').addEventListener('click', () => this.startGame());
    resetButton = document.getElementById('resetButton').addEventListener('click', () => this.resetGame());
    timer:any = null;
    
    initGame(){
        this.playground.createPlayground();
        this.scoreManagement.setScores();
    }
    startGame(){
        this.playground.randomField();
        setInterval(() => this.playground.randomField(), 3000);
        this.timerStart();
    }
    timerStart(){
        this.timer = setInterval(() => this.countCurrentTime(), 1000);
    }
    timerStop(){
        clearInterval(this.timer);
    }
    countCurrentTime(){
        GameConfig.gameTime -= 1;
        this.scoreManagement.setTime();
    }

    finishGame(){
        this.timerStop();
    }

    resetGame(){
        GameConfig.lifes = 3;
        GameConfig.gameTime = 60;
        GameConfig.points = 0;
        this.scoreManagement.setScores();
        this.initGame();
    }
}
