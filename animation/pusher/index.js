function pusher(
  el,
  duration,
  direction = "horizontal",
  colors = [],
  className = ""
) {
  if (!el) {
    return
  }
  const content = el.textContent.trim()
  const clones = Array.from({ length: colors.length }, createClone)
  const list = document.createElement("div")
  let currIndex = 0
  let count = 0
  let interval = setInterval(update, duration)

  setup()

  function update() {
    clones.forEach(updateClone)
    const index = currIndex + 1
    currIndex = index > clones.length - 1 ? 0 : index

    count++
    if (count > clones.length - 1) clearInterval(interval)
  }

  function setup() {
    list.style.setProperty("--duration", duration + "ms")
    list.classList = [className, "pusher_list"].filter(_ => _).join(" ")
    el.innerHTML = null
    clones.forEach(initClone)
    el.appendChild(list)
  }

  function createClone(x, i) {
    return {
      content,
      color: colors[i],
      element: document.createElement("span")
    }
  }

  function initClone(clone) {
    clone.element.textContent = content
    clone.element.classList.add("pusher_item", direction)
    clone.element.style.color = clone.color
    list.appendChild(clone.element)
  }

  function updateClone(c, i) {
    if (i === currIndex) {
      c.element.classList = ["pusher_item", direction, "in"].join(" ")
      return
    }
    if (
      currIndex !== 0 && currIndex === 0
        ? i === clones.length - 1
        : i === currIndex - 1
    ) {
      c.element.classList = ["pusher_item", direction, "out"].join(" ")
      return
    }
    c.element.classList = ["pusher_item", direction].join(" ")
  }
}

function pushAnimation() {
  //// consumer
  return new Promise((res, rej) => {

    pusher(
      document.querySelector("#host"),
      150,
      "horizontal",
      ["#ECEB9F", "#CF6B6A", "#ECEB9F"],
      "host"
    )

    pusher(
      document.querySelector("#location"),
      150,
      "horizontal",
      ["#ECEB9F", "#CF6B6A", "#ECEB9F"],
      "location"
    )
    pusher(
      document.querySelector("#dates"),
      150,
      "horizontal",
      ["#ECEB9F", "#CF6B6A", "#ECEB9F"],
      "dates"
    )
    setTimeout(res, 150)
  })
}
