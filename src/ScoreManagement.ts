import { GameConfig } from "./GameConfig";
import { IScoreObserved } from "./interaces/scoreInterface";
import * as $ from 'jquery';

export class ScoreManagement{
    private runOutOfLifes: IScoreObserved[] = [];

    addObserver(observer: IScoreObserved){
        this.runOutOfLifes.push(observer);
    }
    addPoint(){
        GameConfig.points += 1;
        GameConfig.setPoints();
    }
    removeLife(){
        document.getElementById('toast-message').innerHTML = 'Straciłeś życie.';
        $('.toast').toast('show');
        GameConfig.lifes -= 1;
        GameConfig.setLifes();
        if(GameConfig.lifes == 0){
            this.runOutOfLifes.forEach(observer => observer.runOutOfLifes());
        }
    }
}