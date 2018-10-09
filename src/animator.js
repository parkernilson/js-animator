module.exports = class{
    constructor(origin, target, duration, setter){
        this.origin = origin;
        this.target = target;
        this.duration = duration;
        this.setter = setter;

        this.delta = 0;
        this.elapsed = 0;
        this.prev = performance.now();
        this.now = performance.now();
        this.cancelled = false; //this is true if the animation has been cancelled
    }

    /**
     * step through the animation with a requestAnimationFrame loop
     * @param animator
     * reference to this animation object ('this' gets a little messy in callbacks)
     */
    animate(animation){
        animation.now = performance.now();
        animation.delta = animation.now - animation.prev;
        animation.elapsed += animation.delta;

        //if, on the last frame, the elapsed time overshoots the duration, set it within the range of the duration
        if(animation.elapsed > animation.duration){
            animation.elapsed = animation.duration;
        }

        //set the new value to be the percentage along the distance according to how close it is to being finished
        var newValue = (animation.target - animation.origin) * (animation.elapsed / animation.duration) + animation.origin;

        //call the setter callback with the new value
        animation.setter(newValue);

        animation.prev = performance.now();

        //as long as the time elapsed is less than the duration, keep repeating this function
        if(animation.elapsed < animation.duration & !animation.cancelled){
            //request an animation frame for this animate function and pass this object as the context
            requestAnimationFrame(()=>this.animate(this));
        }else{
            //the animation is finished
        }
    }

    /**
     * cancels the requestAnimationFrame loop of the animate function
     */
    cancel(){
        this.cancelled = true;
    }

    /**
     * start the animation
     */
    start(){
        this.cancelled = false;
        this.prev = performance.now();
        this.animate(this);
    }
}
