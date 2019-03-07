import { PlaygroundField } from "./models/PlaygroundField";
import { ScoreManagement } from "./ScoreManagement";
import { GameConfig } from "./GameConfig";

export class Playground{
    playgroundFields: PlaygroundField[] = [];
    scoreManagement: ScoreManagement = new ScoreManagement();

    createPlayground(){
        this.createPlaygroundFieldsArray();
        this.drawPlayground();
    }
    createPlaygroundFieldsArray(){
        for(var i: number = 0; i<GameConfig.playgroundSize*GameConfig.playgroundSize; i++ ){
            let field: PlaygroundField = new PlaygroundField;
            field.id = i;
            this.playgroundFields.push(field);
        }
    }

    drawPlayground(){
        var playgroundDraft = document.getElementById('playground');
        this.playgroundFields.forEach(field => {
            var playgroundField = document.createElement('div');
            playgroundField.className += 'playgroundField';
            playgroundField.style.width = this.countFieldSize() + 'px';
            playgroundField.style.height = this.countFieldSize() + 'px';
            playgroundField.setAttribute("id", field.id.toString());
            playgroundField.addEventListener('click', this.checkField);
            playgroundDraft.appendChild(playgroundField);
        });
    }

    countFieldSize(): string{
        return ((400-20)/GameConfig.playgroundSize).toString();
    }

    checkField = (event =>{
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
        this.unmarkField();
        var rand = this.playgroundFields[Math.floor(Math.random() * this.playgroundFields.length)];
        rand.isActive = true;
        this.markField();
        return rand
    }
    markField(){
        this.playgroundFields.forEach(field => {
            if(field.isActive == true){
                let fieldToSelect = document.getElementById(field.id.toString())
                fieldToSelect.style.backgroundColor = 'green';
                // fieldToSelect.className += 'activeField';
            }
        });
    }
    unmarkField(){
        this.playgroundFields.forEach(field => {
            if(field.isActive == true){
                field.isActive = false
                let fieldToSelect = document.getElementById(field.id.toString());
                fieldToSelect.style.backgroundColor = 'white';
                // fieldToSelect.classList.remove('activeField');
            }
        });
    }
}