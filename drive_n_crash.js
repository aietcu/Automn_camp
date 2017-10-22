class SimultatedCar {
    render(offsetX: number, offsetY: number) {
        led.plot(offsetX, offsetY);
        led.plot(offsetX + 1, offsetY);
        led.plot(offsetX, offsetY + 1);
        led.plot(offsetX + 1, offsetY + 1);
    }
}

function laneDevide(offsetY: number) {
    led.plot(2, 0 + offsetY);
    led.plot(2, 2 + offsetY);
    led.plot(2, 4 + offsetY);
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
let laneSideForPlayer = 0;
let laneSideForTrafficCar = pickLaneForNormalCar();

let playerCar = new SimultatedCar();
let trafficCar = new SimultatedCar();
let counter = 0;

let isGameOver = false;

input.onButtonPressed(Button.A, () => {
    laneSideForPlayer = 0;
})
input.onButtonPressed(Button.B, () => {
    laneSideForPlayer = 3;
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
            laneSideForTrafficCar = pickLaneForNormalCar();
        }

        // render the lane
        laneDevide(counter % 2);
        // render the traffic car at
        trafficCar.render(laneSideForTrafficCar, counter % 5);
        // render the racer
        playerCar.render(laneSideForPlayer, 3);
        // check collision
        if (counter % 5 == 3 && laneSideForTrafficCar == laneSideForPlayer) {
            isGameOver = true;
        }

        // increase the counters
        basic.pause(refreshSpeed);
        counter++;
    } else {
        basic.showString("START!")
        counter = 0;
        laneSideForTrafficCar = pickLaneForNormalCar();
    }
})
