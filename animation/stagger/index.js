function stagger(
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
  const clones = Array.from(colors, createClone)
  const list = document.createElement("div")
  const dur = duration / 1000 + "s"

  setup()
  clones.forEach(initClone)

  function setup() {
    list.style.setProperty("--duration", dur)
    list.style.setProperty("--total_items", colors.length)
    list.classList = [className, "stagger_list"].filter(_ => _).join(" ")
    list.style.height = el.getBoundingClientRect().height + "px"
    el.textContent = null
    el.appendChild(list)
  }

  function createClone(color) {
    return {
      content,
      color,
      element: document.createElement("span")
    }
  }
  function initClone(clone, i) {
    clone.element.textContent = content
    clone.element.style.color = clone.color
    clone.element.style.setProperty("--item_index", i)
    clone.element.style.setProperty("--o", 1 - i / clones.length)
    clone.element.classList.add("stagger_item", direction)
    // clone.element.addEventListener("animationend", () => {})
    list.appendChild(clone.element)
  }
}

function staggerAnimation() {
  return new Promise(res => {
    stagger(document.querySelector(".title-1"), 350, "vertical", [
      `rgba(255,255,255, 1)`,
      `rgba(255,255,255, 0.9)`,
      `rgba(255,255,255, 0.8)`
    ])
    stagger(document.querySelector(".title-2"), 500, "vertical", [
      `rgba(255,255,255, 1)`,
      `rgba(255,255,255, 0.9)`,
      `rgba(255,255,255, 0.8)`
    ])
    setTimeout(res, 350)
  })
}
