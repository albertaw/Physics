$(document).ready(function () {

    Physics.objectManager.add(new Physics.body({
        x: Physics.util.randomX(),
        y: Physics.util.randomY(),
        vx: 200,
        vy: -100
    }));
    Physics.objectManager.add(new Physics.body({
        x: Physics.util.randomX(),
        y: Physics.util.randomY(),
        vx: -300,
        vy: 150
    }));

    Physics.objectManager.add(new Physics.body({
        x: Physics.util.randomX(),
        y: Physics.util.randomY(),
        vx: 350,
        vy: 250
    }));

    Physics.objectManager.init();
    Clock.start(Physics.objectManager.update);
});
/**
 * Created by Alberta on 9/14/15.
 */
