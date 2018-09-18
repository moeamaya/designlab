
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

/**
  ................smooth scroll.....................
  https://gist.github.com/iwazaru/4c8819420ce5237aeaf338339df25c32
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */

 var topics = document.getElementById('topics').getBoundingClientRect().top
 var submissions = document.getElementById('submissions').getBoundingClientRect().top
 var program = document.getElementById('program').getBoundingClientRect().top
 var about = document.getElementById('about').getBoundingClientRect().top
 var organizers = document.getElementById('organizers').getBoundingClientRect().top + 100
 var sponsors = document.getElementById('sponsors').getBoundingClientRect().top - 200


 window.smoothScrollTo = function(endX, endY, duration) {
   var startX = window.scrollX || window.pageXOffset,
     startY = window.scrollY || window.pageYOffset,
     distanceX = endX - startX,
     distanceY = endY - startY,
     startTime = new Date().getTime();

   duration = typeof duration !== 'undefined' ? duration : 400;

   // Easing function
   var easeInOutQuart = function(time, from, distance, duration) {
     if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
     return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
   };

   var timer = window.setInterval(function() {
     var time = new Date().getTime() - startTime,
       newX = easeInOutQuart(time, startX, distanceX, duration),
       newY = easeInOutQuart(time, startY, distanceY, duration);
     if (time >= duration) {
       window.clearInterval(timer);
     }
     window.scrollTo(newX, newY);
   }, 1000 / 60); // 60 fps
 };
