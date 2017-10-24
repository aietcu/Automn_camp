let paused: Image = null
let spock: Image = null
let lizzard: Image = null
let scissors: Image = null
let paper: Image = null
let rock: Image = null
let p1 = 0
let p2 = 0
let r2 = 0
let pause = false
let r1 = 0
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
input.onButtonPressed(Button.B, () => {
    led.stopAnimation()
    basic.clearScreen()
    basic.showString(" P2 ")
    r2 = input.compassHeading()
    if (r2 > 180 && r2 <= 360) {
        p2 = 5
    } else {
        p2 = Math.random(3)
    }
    basic.pause(250)
    switch (p2) {
        case 0: showImage(rock)
            break;
        case 1: showImage(paper)
            break;
        case 2: showImage(scissors)
            break;
        case 3: showImage(lizzard)
            control.waitMicros(25000)
            led.fadeOut()
            control.waitMicros(25000)
            images.arrowImage(ArrowNames.South)
            led.fadeIn()
            break;
        case 5: showImage(spock)
            break;
    }
    basic.showString(" SHAKE ME!")
})
function basicAnimation() {
    showImage(rock)
    showImage(paper)
    showImage(scissors)
}
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
input.onButtonPressed(Button.A, () => {
    led.stopAnimation()
    basic.clearScreen()
    basic.showString(" P1 ")
    r1 = input.compassHeading()
    if (r1 >= 0 && r1 < 181) {
        p1 = 3
    } else {
        p1 = Math.random(3)
    }
    basic.pause(250)
    switch (p1) {
        case 0: showImage(rock)
            break;
        case 1: showImage(paper)
            break;
        case 2: showImage(scissors)
            break;
        case 3: showImage(lizzard)
            control.waitMicros(25000)
            led.fadeOut()
            control.waitMicros(25000)
            images.arrowImage(ArrowNames.North)
            led.fadeIn()
            break;
    }
})
r1 = -1
r2 = -1
p2 = -1
p1 = -1
p1 = -1
p2 = -1
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
function showImage(image: Image) {
    image.showImage(0)
    control.waitMicros(100000)
}
basic.clearScreen()
basic.pause(500)
