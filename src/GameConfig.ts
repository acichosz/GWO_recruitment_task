export class GameConfig{
    static gameTime: number = 60;
    static changeFieldInterval: number = 3000;
    static fieldIsActiveDuration: number = 2000;
    static points: any = 0;
    static lifes: number = 3;
    static playgroundSize: number = 10;

    static setScores(){
        this.setPoints();
        this.setLifes();
    }
    static setPoints(){
        document.getElementById('points').innerHTML = 'Punkty: ' + GameConfig.points;
    }
    static setLifes(){
        document.getElementById('lifes').innerHTML = 'Życia: ' + GameConfig.lifes;
    }
    static resetConfig(){
        this.gameTime = DefaultConfig.gameTime;
        this.points = DefaultConfig.points;
        this.lifes = DefaultConfig.lifes;
    }
    static savePlaygroundSize(){
        this.playgroundSize = Number((<HTMLInputElement>document.getElementById('playgroundSize')).value);
    }
}

export class DefaultConfig{
    static readonly gameTime: number = 60;
    static readonly points: any = 0;
    static readonly lifes: number = 3;
}