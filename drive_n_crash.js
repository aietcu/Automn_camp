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
    if (laneSideForPlayer == 3) {
        laneSideForPlayer = 0;
    } else {
        laneSideForPlayer = 3;
    }
})

input.onButtonPressed(Button.B, () => {
    if (laneSideForPlayer == 0) {
        laneSideForPlayer = 3;
    } else {
        laneSideForPlayer = 0;
    }
})

input.onPinPressed(TouchPin.P0, () => {
    if (brake) {
        brake = false;
    } else {
        brake = true;
    }

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
            // game.addScore(points);
            game.setScore(game.score() + points);
            numberOfCars += 1;
            if (numberOfCars == 10) {
                basic.clearScreen();
                game.levelUp();
                brake = false;
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
        basic.showString("GO!");
        basic.clearScreen();
        basic.showLeds(`
                        . . . . .
                        . # . # .
                        # . . . #
                        . # . # .
                        . . . . .
                        `);
        basic.clearScreen();                
        counter = 0;
        laneSideForTrafficCar = pickLaneForNormalCar();
    }
})
