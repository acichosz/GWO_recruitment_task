import 'bootstrap';
import { GameManagement } from "./GameManagement";
import { TimeManagement } from "./TimeManagement";
import { ScoreManagement } from "./ScoreManagement";
import { Playground } from "./Playground";
import { GameConfig } from "./GameConfig";

var timeManagement: TimeManagement = new TimeManagement();
var scoreManagement: ScoreManagement = new ScoreManagement();
var playground: Playground = new Playground(scoreManagement);
var gameManagement: GameManagement = new GameManagement(playground);


gameManagement.initGame();
timeManagement.setTime();

function startGame(){
    gameManagement.startGame();
    timeManagement.setTime();
    timeManagement.timerStart();

}
function resetGame(){
    gameManagement.resetGame();
    timeManagement.timerStop();
    GameConfig.setScores();
    timeManagement.setTime();
    document.getElementById('startButton').classList.remove('disabled');
    document.getElementById('time').classList.remove('redText');
}

function changePlaygroundSize(){
    if (Number((<HTMLInputElement>document.getElementById('playgroundSize')).value) > 0){
        GameConfig.savePlaygroundSize();
        playground.clearPlayground();
        gameManagement.initGame();
    }
}

scoreManagement.addObserver(gameManagement);
scoreManagement.addObserver(timeManagement);
timeManagement.addObserver(gameManagement);


document.getElementById('startButton').addEventListener('click', () => startGame());
document.getElementById('resetButton').addEventListener('click', () => resetGame());
var saveButton = document.getElementById('saveButton').addEventListener('click', () => changePlaygroundSize());    



