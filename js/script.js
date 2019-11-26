
//SMOOTH PAGE SCROLL
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


//OWL CAROSEL TESTIMONIAL
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:true,
    dotsEach:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

$(document).ready(

  function() { 

    $("html").niceScroll({
    	cursorcolor:"#f74d65",
    	scrollspeed :"100",
    	cursorborder:"1px solid #f74d65",
    	horizrailenabled: "false",
    	cursorborderradius: "0px"
    });

  }

);

new WOW().init();


    
/*Preloader*/
//<![CDATA[
$(window).load(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({'overflow':'visible'});
})
//]]>


function splitWords() {
  let quote = document.querySelector("blockquote q");
  quote.innerText.replace(/(<([^>]+)>)/ig,"");
  quotewords = quote.innerText.split(" "),
  wordCount = quotewords.length;
  quote.innerHTML = "";
  for (let i=0; i < wordCount; i++) {
    quote.innerHTML += "<span>"+quotewords[i]+"</span>";
    if (i < quotewords.length - 1) {
      quote.innerHTML += " ";
    }
  }
  quotewords = document.querySelectorAll("blockquote q span");
  fadeWords(quotewords);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function fadeWords(quotewords) {
  Array.prototype.forEach.call(quotewords, function(word) {
    let animate = word.animate([{
      opacity: 0,
      filter: "blur("+getRandom(2,5)+"px)"
    }, {
      opacity: 1,
      filter: "blur(0px)"
    }], 
    { 
      duration: 1000,
      delay: getRandom(500,3300),
      fill: 'forwards'
    } 
   )
  })
}


splitWords();
(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from:            $(this).data('from'),
        to:              $(this).data('to'),
        speed:           $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals:        $(this).data('decimals')
      }, options);
      
      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
      
      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
      
      $self.data('countTo', data);
      
      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);
      
      // initialize the element with the starting value
      render(value);
      
      function updateTimer() {
        value += increment;
        loopCount++;
        
        render(value);
        
        if (typeof(settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }
        
        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;
          
          if (typeof(settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      
      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };
  
  $.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };
  
  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
  formatter: function (value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
  }
});