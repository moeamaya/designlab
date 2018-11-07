/*
Copyright (c) 2018 by Johan Karlsson (https://codepen.io/DonKarlssonSan/pen/WzbYBr)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function simplex() {
  let canvas;
  let ctx;
  let w, h;
  let m;
  let simplex;
  let ticker;
  let mx, my;

  function setup() {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    reset();
    window.addEventListener("resize", reset);
    // canvas.addEventListener("mousemove", mousemove);
  }

  function reset() {
    simplex = new SimplexNoise();
    ticker = 0;
    w = canvas.width = window.innerWidth + 200;
    h = canvas.height = window.innerHeight + 200;
    m = Math.min(w, h);
    mx = w  / 2;
    my = h / 2;
  }

  function mousemove(event) {
    // mx = event.clientX + 1;
    // my = event.clientY + 1;
  }

  function draw(i) {
    ticker += 0.0025;
    requestAnimationFrame(draw);

    ctx.fillStyle = "#1E2238";
    ctx.fillRect(0, 0, w, h);
    for(let i = 10; i < m / 2 - 40; i += 30) {
      drawCircle(i);
    }
  }

  function drawCircle(r) {
    ctx.beginPath();
    let point, x, y;
    let deltaAngle = Math.PI * 2 / 400;
    for(let angle = 0; angle < Math.PI * 2; angle += deltaAngle) {
      point = calcPoint(angle, r);
      x = point[0];
      y = point[1];
      ctx.lineTo(x, y);
    }
    // const color = pickHex([30,34,56], [238,238,161], r/250);
    const color = pickHex([236,235,159], [207,107,106], r/350);
    // console.log(color);
    // const color = "#ECEB9F";
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function calcPoint(angle, r) {
    // let noiseFactor = mx / w * 50;
    let noiseFactor = 15;
    let zoom = my / h * 400;
    let x = Math.cos(angle) * r + w / 2;
    let y = Math.cos(angle) * r + h / 2;
    n = (simplex.noise3D(x / zoom, y / zoom, ticker)) * noiseFactor;
    x = Math.cos(angle) * (r + n) + w / 2;
    y = Math.sin(angle) * (r + n) + h / 2;
    return [x, y];
  }

  function pickHex(color1, color2, weight) {
    var p = weight;
    var w = p * 2 - 1;
    var w1 = (w/1+1) / 2;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
    return rgb;
  }

  function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  setup();
  draw();
}


function simplexAnimation() {
  return new Promise((res, rej) => {
    simplex()

    setTimeout(res, 1400)
  })
}
