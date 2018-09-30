const delay = timeout => () => new Promise(res => setTimeout(res, timeout))

function animationA() {
  staggerAnimation()
    .then(delay(100))
    .then(pushAnimation)
    .then(delay(450))
    .then(scribbleAnimation)
  simplexAnimation()
}

animationA()

// blotterAnimation()


