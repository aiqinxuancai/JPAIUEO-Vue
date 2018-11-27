
module.exports = EliminateGame;

function EliminateGame() {
    this.name = "eliminateGame";

    //载入数据 

    this.show = function () {
        console.log(this.name)
    }

    this.startGame = function () {
        //开始游戏
        console.log(this.name)
    }
}
