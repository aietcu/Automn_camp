let xx = 0
let bit = 0
let value = 0
let place = 0
let denary = 0
let x = 0
let y = 4
led.plot(x, y)
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
   led.toggle(x, 0)
})
input.onPinReleased(TouchPin.P0, () => {
   denary = 0
   place = 0
   value = 16
   for (let i = 0; i < 5; i++) {
       if (led.point(place, 0)) {
           denary = denary + value
       }
       value = value / 2
       place += 1
   }
   basic.clearScreen()
   basic.showNumber(denary)
   basic.pause(1000)
   basic.clearScreen()
   bit = 0
   xx = 4
   while (denary != 0) {
       bit = denary % 2
       denary = denary / 2
       if (bit == 1) {
           led.plot(xx, 0)
       }
       xx += -1
   }
   led.plot(x, y)
})
