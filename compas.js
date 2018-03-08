let degrees = 0
basic.forever(() => {
    degrees = input.compassHeading()
    if (degrees < 45 || degrees > 315) {
        basic.showString("N")
    } else if (degrees < 135) {
        basic.showString("E")
    } else if (degrees < 225) {
        basic.showString("S")
    } else if (input.pinIsPressed(TouchPin.P0)) {
        basic.showString("NE")
    } else {
        basic.showString("W")
    }
})
