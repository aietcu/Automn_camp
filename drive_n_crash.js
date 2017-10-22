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
    let pick = Math.random(255) % 5
    if (pick < 2) {
        return 0;
    } else {
        return 3;
    }
}

let refreshSpeed = 850;
let carSpeed = 0;
let laneSideForPlayer = 0;
let laneSideForTrafficCar = pickLaneForNormalCar();

let playerCar = new SimultatedCar();
let trafficCar = new SimultatedCar();
let counter = 0;
let numberOfCars = 0;
let isGameOver = true;
let brake = false;

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
        if (brake) {
            carSpeed = refreshSpeed;
        } else {
            carSpeed = refreshSpeed - (game.level() * 100);
        }

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
        if (counter % 5 == 3 && laneSideForTrafficCar != laneSideForPlayer) {
            let points = game.level() * 1
            game.addScore(points);
            numberOfCars += 1;
            if (numberOfCars == 10) {
                game.levelUp();
                numberOfCars = 0;
            }
        }
        if (counter % 5 == 3 && laneSideForTrafficCar == laneSideForPlayer) {
            isGameOver = true;
            game.showScore()
            game.gameOver()
        }

        // increase the counters
        basic.pause(carSpeed);
        counter++;
    } else {
        basic.showString("START!");
        counter = 0;
        laneSideForTrafficCar = pickLaneForNormalCar();
    }
})
