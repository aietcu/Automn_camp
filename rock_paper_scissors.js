let paused: Image = null
let spock: Image = null
let lizzard: Image = null
let scissors: Image = null
let paper: Image = null
let rock: Image = null

rock = images.createImage(`
    . . # . .
    . # # # .
    . # # # .
    . # # # .
    . . # . .
    `)
paper = images.createImage(`
    # # # # #
    # . . . #
    # . . . #
    # . . . #
    # # # # #
    `)
scissors = images.createImage(`
    . # . # .
    . # . # .
    . . # . .
    # # . # #
    # . . . #
    `)
lizzard = images.createImage(`
    . . . . #
    # # . . #
    # # . # #
    . # # # .
    . # . # .
    `)
spock = images.createImage(`
    # . . . #
    # # . # #
    # # # # #
    . # # # .
    . # # # .
    `)
paused = images.createImage(`
    . # . # .
    . # . # .
    . # . # .
    . # . # .
    . # . # .
    `)

let p1 = -1
let p2 = -1
let r2 = -1
let r1 = -1

let pause = false
let lizzardPin = false
let spockPin = false

input.calibrateCompass()

basic.forever(() => {
    if (pause) {
        showImage(paused)
    } else {
        if (p1 < 0 && p2 < 0) {
            defaultAnimation()
        } else {
            if (p1 < 0 && !(p2 < 0)) {
                p1Animation()
            } else {
                p2Animation()
            }
        }
    }
})

input.onButtonPressed(Button.A, () => {
    led.stopAnimation()
    basic.clearScreen()
    basic.showString(" P1: ")
    r1 = input.compassHeading()
    if (r1 >= 45 && r1 < 136) {
        p1 = 3
    } else {
        if (spockPin) {
            p1 = 4
        } else {
            p1 = Math.random(3)
        }
    }
    basic.pause(250)
    switch (p1) {
        case 0:
            showSelectedImage(rock);
            break;
        case 1:
            showSelectedImage(paper);
            break;
        case 2:
            showSelectedImage(scissors);
            break;
        case 3:
            showSelectedImage(lizzard)
            break;
        case 4:
            showSelectedImage(spock)
            break;
    }
})

input.onButtonPressed(Button.B, () => {
    led.stopAnimation()
    basic.clearScreen()
    basic.showString(" P2: ")
    r2 = input.compassHeading()
    if (r2 > 225 && r2 <= 315) {
        p2 = 5
    } else {
        if (lizzardPin){
            p2 = 3
        } else {
            p2 = Math.random(3)
        }
    }
    switch (p2) {
        case 0:
            showSelectedImage(rock)
            break;
        case 1:
            showSelectedImage(paper)
            break;
        case 2:
            showSelectedImage(scissors)
            break;
        case 3:
            showSelectedImage(lizzard)
            break;
        case 5:
            showSelectedImage(spock)
            break;
    }
    basic.showString(" SHAKE ME!")
})

input.onButtonPressed(Button.AB, () => {
    pause = !(pause)
    if (pause) {
        defaultAnimation()
        led.fadeIn()
    } else {
        led.fadeOut()
        basic.clearScreen()
        led.stopAnimation()
    }
})

input.onGesture(Gesture.Shake, () => {
    led.stopAnimation()
    basic.clearScreen()
    basicAnimation()
    led.stopAnimation()
    basic.clearScreen()
    // missing condition for either p1 or p2 is negative
    if (p1 < 0 && p2 < 0) {
        basic.showString("!VALUES")
    } else {
        if (p1 == p2) {
            basic.showString(" TIE! ")
        } else {
            if (p1 < p2) {
                basic.showString(" P2 WINS!")
            } else {
                basic.showString(" P1 WINS!")
            }
        }
    }
    p1 = -1
    p2 = -1
    r1 = -1
    r2 = -1
})

input.onPinPressed(TouchPin.P0, () => {
    if (spockPin) {
        spockPin = false
    } else {
        spockPin = true
    }
})

input.onPinPressed(TouchPin.P1, () => {
    if (lizzardPin) {
        lizzardPin = false
    } else {
        lizzardPin = true
    }
})

function basicAnimation() {
    showImage(rock)
    showImage(paper)
    showImage(scissors)
}

function showImage(image: Image) {
    led.stopAnimation()
    basic.clearScreen()
    image.showImage(0)
    control.waitMicros(100000)
}

function showSelectedImage(image: Image) {
    image.showImage(0)
    control.waitMicros(500000)
    led.fadeOut()
    control.waitMicros(500000)
    led.fadeIn()
}

function defaultAnimation() {
    basicAnimation()
    p1Animation()
    p2Animation()
}

function p1Animation() {
    basic.showArrow(6)
    basic.showString(" P1 ")
}

function p2Animation() {
    basic.showArrow(2)
    basic.showString(" P2 ")
}
basic.clearScreen()
basic.pause(500)
