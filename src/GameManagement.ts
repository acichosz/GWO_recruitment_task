import { GameConfig } from "./GameConfig";
import { Playground } from "./Playground";
import { IScoreObserved } from "./interaces/scoreInterface";
import { ITimeObserved } from "./interaces/timerInterface";
import * as $ from 'jquery';

export class GameManagement implements IScoreObserved, ITimeObserved {
    constructor(private playground: Playground){
    }

    initGame(){
        this.playground.createPlayground();
        GameConfig.setScores();
    }

    startGame(){
        document.getElementById('startButton').classList.add('disabled');
        GameConfig.setScores();
        this.playground.activatePlayground();
        this.playground.randomField();
    }

    stopGame(){
        this.playground.blockPlayground();
    }
    
    resetGame(){
        this.stopGame();
        this.playground.clearPlaygroundIntervals();
        this.playground.unmarkField();
        GameConfig.resetConfig();
    }
    
    runOutOfLifes(){
        this.stopGame();
        document.getElementById('toast-message').innerHTML = 'Straciłeś wszystkie życia, spróbuj ponownie.';
        $('.toast').toast('show');
    };

    runOutOfTime(){
        this.stopGame();
        document.getElementById('toast-message').innerHTML = 'Koniec czasu.';
        $('.toast').toast('show');
        this.playground.clearPlaygroundIntervals();
    };
}
