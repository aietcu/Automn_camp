class LaneDivider {
    render(offsetY: number) {
        led.plot(2, 0 + offsetY);
        led.plot(2, 2 + offsetY);
        led.plot(2, 4 + offsetY);
    }
}

class RacingCar {
    render(offsetX: number, offsetY: number) {
        led.plot(offsetX, offsetY);
        led.plot(offsetX + 1, offsetY);
        led.plot(offsetX, offsetY + 1);
        led.plot(offsetX + 1, offsetY + 1);
    }
}

function playerCar(offsetX: number, offsetY: number) {
    led.plot(offsetX, offsetY);
    led.plot(offsetX + 1, offsetY);
    led.plot(offsetX, offsetY + 1);
    led.plot(offsetX + 1, offsetY + 1);
}

function pickLaneForNormalCar() {
    let pick = Math.random(4)
    if (pick < 3) {
        return 0;
    } else {
        return 3;
    }
}

function crashAnimation() {

}

let refreshSpeed = 700;
let laneSideForRacer = 0;
let laneSideForNormalCar = pickLaneForNormalCar();

let laneDivider = new LaneDivider();
let racingCar = new RacingCar();
let normalCar = new RacingCar();
let counter = 0;

let isGameOver = false;

input.onButtonPressed(Button.A, () => {
    laneSideForRacer = 0;
})
input.onButtonPressed(Button.B, () => {
    laneSideForRacer = 3;
})

input.onPinPressed(TouchPin.P0, () => {
    isGameOver = false;
})

input.onButtonPressed(Button.AB, () => {
    isGameOver = false;
})

basic.forever(() => {
    if (isGameOver == false) {
        // cleanup the screen
        basic.clearScreen();
        if (counter % 5 == 0) {
            laneSideForNormalCar = pickLaneForNormalCar();
        }

        // render the lane
        laneDivider.render(counter % 2);
        // render the normal car at
        normalCar.render(laneSideForNormalCar, counter % 5);
        // render the racer
        playerCar(laneSideForRacer, 3);
        // check collision
        if (counter % 5 == 3 && laneSideForNormalCar == laneSideForRacer) {
            isGameOver = true;
        }

        // increase the counters
        basic.pause(refreshSpeed);
        counter++;
    } else {
        basic.showString("START!")
        counter = 0;
        laneSideForNormalCar = pickLaneForNormalCar();
    }
})
