const delay = timeout => () => new Promise(res => setTimeout(res, timeout))

function animationA() {

  pusher(
    document.querySelector("#desform"),
    150,
    "horizontal",
    ["#CF6B6A", "#ECEB9F", "#CF6B6A"],
    "host"
  )

  staggerAnimation()
    .then(delay(100))
    .then(pushAnimation)
    .then(delay(450))
    .then(scribbleAnimation)
  simplexAnimation()
}

animationA()

// blotterAnimation()

