const select = x => document.querySelector(x)

function blotter(els, { uniforms, material }) {
  if (!els) {
    return
  }
  els.forEach(el => {
    if (!el) {
      return
    }
    const content = el.textContent.trim()
    el.textContent = null

    const { fontFamily, fontSize, color } = getComputedStyle(el)
    var text = new Blotter.Text(content, {
      family: fontFamily,
      size: parseInt(fontSize, 10),
      fill: color
    })

    Object.keys(uniforms).forEach(key => {
      material.uniforms[key].value = uniforms[key]
    })

    //   setTimeout(() => {
    //     material.uniforms.uSpeed.value = 0.0
    //   }, 3000)
    var blotter = new Blotter(material, {
      texts: text
    })

    var scope = blotter.forText(text)

    scope.appendTo(el)
  })
}

function blotterAnimation() {
  // blotter([document.querySelector(".title")], {
  //   material: new Blotter.SlidingDoorMaterial(),
  //   uniforms: {
  //     uDivisions: 11,
  //     uDivisionWidth: 0.2,
  //     uAnimateHorizontal: 1.0,
  //     uFlipAnimationDirection: 0.0,
  //     uSpeed: 0.2
  //   }
  // })

  // blotter([select(".title")], {
  //   material: new Blotter.FliesMaterial(),
  //   uniforms: {
  //     uPointCellWidth: 0.01,
  //     uPointRadius: 0.8,
  //     uSpeed: 5
  //   }
  // })

  blotter(
    [select(".title"), select("#desform"), select("#t3"), select("#t4")],
    {
      material: new Blotter.LiquidDistortMaterial(),
      uniforms: {
        uSeed: 0.0,
        uVolatility: 0.03,
        uSpeed: 0.1
      }
    }
  )
}
