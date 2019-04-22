let sum = 0
let dif = 0
let y = 4
let x = 0
let line = 0
let denary = [0, 0]
let place = 0
let value = 16

led.plot(x, y)
input.onGesture(Gesture.Shake, () => {
   if (line == 0) {
       line = 1
   } else {
       line = 0
   }
})
input.onButtonPressed(Button.A, () => {
   led.unplot(x, y)
   x += -1
   x = Math.max(0, Math.min(x, 4))
   led.plot(x, y)
})
input.onButtonPressed(Button.B, () => {
   led.unplot(x, y)
   x += 1
   x = Math.max(0, Math.min(x, 4))
   led.plot(x, y)
})
input.onButtonPressed(Button.AB, () => {
   led.toggle(x, line)
})

input.onPinReleased(TouchPin.P0, () => {
   convertNumber()
   displayNumber(denary[0])
   displayNumber(denary[1])
   displayBinValue(denary[0], 0)
   displayBinValue(denary[1], 1)
})

input.onPinReleased(TouchPin.P1, () => {
   convertNumber()
   sum = denary[0] + denary[1]
   displayNumber(sum)
   displayBinValue(denary[0], 0)
   displayBinValue(denary[1], 1)
   displaySumValue(sum, 3)
})

input.onPinReleased(TouchPin.P2, () => {
   convertNumber()
   dif = denary[0] - denary[1]
   displayNumber(dif * (-1))
   displayBinValue(denary[0], 0)
   displayBinValue(denary[1], 1)
   displaySumValue(dif, 3)
})

function convertNumber() {
   denary = [0, 0]
   let place = 0
   let value = 16
   for (let i = 0; i < 5; i++) {
       if (led.point(place, 0)) {
           denary[0] = denary[0] + value
       }
       if (led.point(place, 1)) {
           denary[1] = denary[1] + value
       }
       value = value / 2
       place += 1
   }
}

function displayNumber(displayNb: number) {
   basic.clearScreen()
   basic.showNumber(displayNb)
   basic.pause(500)
   basic.clearScreen()
}

function displaySumValue(plotValue: number, ledLine: number) {
   let ledLinePrime = ledLine - 1
   if (plotValue >= 32) {
       let plotValue2 = plotValue - 32
       let plotValue1 = plotValue - plotValue2 - 31
       displayBinValue(plotValue1, ledLinePrime)
       displayBinValue(plotValue2, ledLine)
   } else {
       if (plotValue >= 0) {
           displayBinValue(plotValue, ledLine)
       } else {
           plotValue = plotValue * (-1)
           displayBinValue(plotValue, 3)
       }

   }
   led.plot(x, y)
}

function displayBinValue(pltValue: number, ledLn: number) {
   let bit = 0
   let xx = 4
   while (pltValue != 0) {
       bit = pltValue % 2
       pltValue = pltValue / 2
       if (bit == 1) {
           led.plot(xx, ledLn)
       }
       xx += -1
   }
   led.plot(x, y)
}
