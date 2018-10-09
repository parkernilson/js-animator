const Animation = require('./animator.js');

module.exports = class Square{
    constructor(position, size, color){
        this.position = position;
        this.size = size;
        this.color = color;
        this.animator = new Animation(
            this.position.x,
            200, //end pos x
            200, //ms
            (value)=>{
                this.position.x = value;
            }
        );
    }

    startAnimation(){
        this.animator.start();
    }

    set targetx(value){
        this._targetx = value;
        this.animator.cancel();
        this.animator = new Animation(
            this.position.x,
            this._targetx, //end pos x
            1000, //ms
            (newValue)=>{
                this.position.x = newValue;
            }
        );
        this.animator.start();
    }
    get targetx(){
        return this._targetx;
    }

    draw(graphics){
        graphics.beginFill(this.color);
        graphics.drawRect(this.position.x, this.position.y, this.size.width, this.size.height);
        graphics.endFill();
    }
}
