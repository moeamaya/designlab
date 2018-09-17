
// ................sticky elements.....................

// var topics = document.querySelector('.topics-graphic')
// var col = document.querySelector('.topic-col')
// var topicsPosition = topics.getBoundingClientRect()
// var colPosition = col.getBoundingClientRect()
// // var placeholder = document.createElement('div')
// // placeholder.style.width = topicsPosition.width + 'px'
// // placeholder.style.height = topicsPosition.height + 'px'
// var topicsIsSticky = false
//
// window.addEventListener('scroll', function() {
//     if (window.pageYOffset >= topicsPosition.top && !topicsIsSticky) {
//         topics.classList.add('sticky')
//         topics.style.width = colPosition.width + 'px'
//         // topics.parentNode.insertBefore(placeholder, topics)
//         topicsIsSticky = true
//     } else if (window.pageYOffset < topicsPosition.top && topicsIsSticky) {
//         topics.classList.remove('sticky')
//         // topics.parentNode.removeChild(placeholder)
//         topicsIsSticky = false
//     }
// })

function isIE() {
  ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  return is_ie;
}

var stickybit = stickybits('.topics-graphic', { useStickyClasses: true })

if (isIE()){
    window.addEventListener('resize', function() {
      stickybit.update()
    })
}
