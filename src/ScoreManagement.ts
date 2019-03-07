import { GameConfig } from "./GameConfig";

export class ScoreManagement{
    addPoint(){
        GameConfig.points += 1;
        this.setPoints();
    }
    removeLife(){
        GameConfig.lifes -= 1;
        this.setLifes();
        if(GameConfig.lifes == 0){
            alert('Game over!');
        }
    }
    setScores(){
        this.setPoints();
        this.setLifes();
        this.setTime();
    }
    setPoints(){
        document.getElementById('points').innerHTML = 'Punkty: ' + GameConfig.points;
    }
    setLifes(){
        document.getElementById('lifes').innerHTML = 'Życia: ' + GameConfig.lifes;
    }
    setTime(){
        document.getElementById('time').innerHTML = 'Czas: ' + GameConfig.gameTime;
    }
}