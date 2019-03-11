import { PlaygroundField } from "./models/PlaygroundField";
import { ScoreManagement } from "./ScoreManagement";
import { GameConfig } from "./GameConfig";

export class Playground{
    playgroundFields: PlaygroundField[] = [];
    unmarkFieldInterval: any;
    randomFieldInterval: any;
    didUserClicked: boolean = false;

    constructor(private scoreManagement: ScoreManagement){
    }

    createPlayground(){
        this.createPlaygroundFieldsArray();
        this.drawPlayground();
    }

    createPlaygroundFieldsArray(){
        let fieldsNumber: number = GameConfig.playgroundSize*GameConfig.playgroundSize;
        for(var i: number = 0; i < fieldsNumber; i++ ){
            let field: PlaygroundField = new PlaygroundField();
            field.id = i;
            this.playgroundFields.push(field);
        }
    }

    drawPlayground(){
        let playground = document.getElementById('playground');
        this.playgroundFields.forEach(field => {
            let playgroundField = document.createElement('div');
            playgroundField.className += 'playgroundField';
            playgroundField.style.width = this.countFieldSize() + 'px';
            playgroundField.style.height = this.countFieldSize() + 'px';
            playgroundField.setAttribute("id", field.id.toString());
            playgroundField.addEventListener('click', this.checkField);
            playground.appendChild(playgroundField);
        });
    }

    countFieldSize(): string{
        return ((400)/GameConfig.playgroundSize).toString();
    }

    clearPlayground(){
        this.playgroundFields = [];
        document.querySelectorAll('.playgroundField').forEach(function(a){
            a.remove()
        });
    }

    checkField = (event =>{
        this.didUserClicked = true;
        var isActive: boolean = this.checkisFieldActive(event.target.id);
        if(isActive){
            this.scoreManagement.addPoint();
        }
        else{
            this.scoreManagement.removeLife();
        }
        this.unmarkField();
    });

    checkisFieldActive = (id => {
        var field: PlaygroundField = new PlaygroundField();
        field = this.playgroundFields.find(field => field.id == id);
        return field.isActive
    })

    randomField(){
        var rand = this.playgroundFields[Math.floor(Math.random() * this.playgroundFields.length)];
        rand.isActive = true;
        this.markField();
        return rand
    }
    markField(){
        if(GameConfig.gameTime > 0 && GameConfig.lifes>0){
            this.playgroundFields.forEach(field => {
                if(field.isActive == true){
                    let fieldToSelect = document.getElementById(field.id.toString());
                    fieldToSelect.classList.add('markedField');
                }
            });
            this.unmarkFieldInterval = setTimeout(() => {
                this.unmarkField();
                if(!this.didUserClicked){
                    this.scoreManagement.removeLife();
                }
                this.didUserClicked = false;
            }, GameConfig.fieldIsActiveDuration);
            this.randomFieldInterval = setTimeout(() => this.randomField(), GameConfig.changeFieldInterval);
        }
    }
    
    unmarkField(){
        this.playgroundFields.forEach(field => {
            if(field.isActive == true){
                field.isActive = false;
                let fieldToSelect = document.getElementById(field.id.toString());
                fieldToSelect.classList.remove('markedField');
            }
        });
    }

    clearPlaygroundIntervals(){
        clearTimeout(this.unmarkFieldInterval);
        clearTimeout(this.randomFieldInterval);
    }

    activatePlayground(){
        document.getElementById('playground').classList.remove('disabled');
    }
    blockPlayground(){
        document.getElementById('playground').classList.add('disabled');
    }
}