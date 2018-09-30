function scribble(el, jibrish, duration = 1200) {
  if (!el || !jibrish) {
    return
  }

  const content = el.textContent.trim()
  const chars = content.split("")
  const black = [0, 0, 0]
  const white = [255, 255, 255]
  const list = document.createElement("div")
  const clones = Array.from(chars, createClone)
  setup()
  clones.forEach(initClone)

  let start = 0
  let raf = requestAnimationFrame(loop)

  function setup() {
    el.innerHTML = null
    el.appendChild(list)
    el.style.opacity = 1
  }

  function initClone(x, i) {
    x.element.innerHTML = jibrish[i]
    x.element.className = "scribble_item"
    list.appendChild(x.element)
  }
  function createClone(x, i) {
    return {
      element: document.createElement("span"),
      content: chars[i],
      stage: ~~(Math.random() * jibrish.length)
    }
  }

  function loop(t) {
    start = start || t
    const d = (t - start) / duration

    clones.forEach((c, i) => updateClone(c, i, d))

    if (d >= 1) cancelAnimationFrame(raf)
    else raf = requestAnimationFrame(loop)
  }

  function updateClone(x, i, d) {
    const s = Math.min(
      ~~(x.stage + (jibrish.length - 1) * d),
      jibrish.length - 1
    )
    const char = jibrish[s]
    const rgb = !!(i % 2) ? black : white
    const color = `rgba(${[...rgb, 1 * d].join(",")})`
    x.element.innerHTML = char || x.content
    x.element.style.backgroundColor = char ? color : "transparent"
  }
}

const jibrish = [
  ...Array.from({ length: 5 }).fill(`&nbsp;`),
  ">",
  "<",
  "#",
  "$",
  undefined
]

function scribbleAnimation() {
  return new Promise((res, rej) => {
    scribble(document.querySelector("#location_t1"), jibrish, 1200)
    scribble(document.querySelector("#location_t2"), jibrish, 1400)
    scribble(document.querySelector("#location_t3"), jibrish, 1700)

    scribble(document.querySelector("#host_t1"), jibrish, 1200)
    scribble(document.querySelector("#dates_t1"), jibrish, 1400)

    setTimeout(res, 1400)
  })
}
