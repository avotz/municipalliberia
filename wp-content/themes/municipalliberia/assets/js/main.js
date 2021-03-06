;(function($){

  var btnMenu = $('#btn-menu'),
      menu = $('.header__menu');
     
     $(window).load(function() {
        //$('.main').fadeTo(1000, 1);
        //$('.media').fadeTo(1000, 1);
        new WOW().init();
        setupMediaSlider();     
      });

   /* var wd = $(".textwidget iframe").contents();
    var content = $(".textwidget iframe").contents().find('body').html();
      $('.textwidget iframe', frames['myIframe'].document)
    alert(content);*/
    
     $("#banner-home").owlCarousel({
          items : 1,
          autoplay : true,
          loop : true,
          nav : true,
          navText : ['',''],
          autoplayTimeout : 6000
          /*onChange : function (e) {
            console.log(e.target);
            $('.owl-item.active span').addClass('animated');
            $('.owl-item.active h1').addClass('animated');
          }*/
          /*slideSpeed : 300,
          paginationSpeed : 400,*/
          /*singleItem:true*/
     });
     $("#store-slider").owlCarousel({
          items : 5,
          autoplay : false,
          loop : true,
          nav : true,
          navText : ['',''],
          margin: 5,
          responsiveClass:true,
          responsive:{
              0:{
                  items:1,
                  nav:false
              },
              480:{
                  items:2,
                  nav:true
              },
              640:{
                  items:3,
                  nav:true
              },
              1000:{
                  items:4,
                  nav:true,
                  
              },
              1200:{
                  items:5,
                  nav:true,
              }
          }
          /*onChange : function (e) {
            console.log(e.target);
            $('.owl-item.active span').addClass('animated');
            $('.owl-item.active h1').addClass('animated');
          }*/
          /*slideSpeed : 300,
          paginationSpeed : 400,*/
          /*singleItem:true*/
     });


     function setupMediaSlider() 
     {
        $("#gallery-1").find(".gallery-item").each(function(index, value) { 
             //console.log(index + ':' + $(this).attr('class'));
             /*$(this).find('a').attr('data-facebook','http://www.facebook.com/sharer.php?s=100&p[title]='+ $(this).find('a').find('img').attr('alt') +'&p[summary]='+ $(this).find('a').find('img').attr('alt') +'&p[url]='+ $(this).find('a').attr('href') +'&p[images][0]='+ $(this).find('a').find('img').attr('src'));*/
             $(this).find('a').attr('data-facebook','https://www.facebook.com/sharer/sharer.php?u='+ $(this).find('a').attr('href') );
             $(this).find('a').attr('data-twitter','https://twitter.com/intent/tweet?via=realmadrid&url='+ $(this).find('a').attr('href') );
             $(this).find('a').attr('data-googleplus','https://plus.google.com/share?url='+ $(this).find('a').attr('href') );
             http://www.facebook.com/sharer.php?s=100&p[title]=+ $(this).find('a').attr('href') +'&amp;p[summary]=<?php echo urlencode(YOUR_PAGE_DESCRIPTION) ?>&amp;p[url]=<?php echo urlencode(YOUR_PAGE_URL); ?>&amp;p[images][0]=<?php echo urlencode(YOUR_LINK_THUMBNAIL); ?>"
             $(this).find('a').attr('href','#image-popup');
        });


        $('#gallery-1').scrollingCarousel();

        $('.gallery-item a').attr('data-effect', 'mfp-zoom-out');
        $('.gallery-item a').magnificPopup({

                type:'inline',

                midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
                //removalDelay: 500, //delay removal by X to allow out-animation
               /* gallery: {
                  enabled: true
                },*/
                callbacks: {
                    beforeOpen: function() {

                        this.st.mainClass = 'mfp-with-zoom';//this.st.el.attr('data-effect');
                    },
                     open: function() {
                        this.content.find('#contenido-popup').html(this.st.el.find('img').clone());
                        this.content.find('.media__share__facebook').attr('href',this.st.el.attr('data-facebook'));
                        this.content.find('.media__share__twitter').attr('href',this.st.el.attr('data-twitter'));
                        this.content.find('.media__share__googleplus').attr('href',this.st.el.attr('data-googleplus'));


                    },

                }
            });
     }


      
       btnMenu.on('click', function(){
            menu.toggleClass('show');
           
        });

    menu.find(".menu-item-has-children").hoverIntent({
          over: function() {

                $(this).find(">.sub-menu").slideDown(200 );
                $(this).find(">.sub-menu").addClass('active')
              },
          out:  function() {
                
                $(this).find(">.sub-menu").slideUp(200);
                 $(this).find(">.sub-menu").removeClass('active')
              },
          timeout: 200

           });




   menu.find(".menu-item").hover(
          function() {
                menu.find(".menu-item").css('opacity','0.5');
                $(this).parents('.menu-item').css('opacity','1');
                $(this).css('opacity','1');

              },
          function() {
                menu.find(".menu-item").css('opacity','1');
               
              }
         

           );

   $('.store__slider').contentcarousel({
        nav: 5,
        auto:false,
        space: 20

    });



 $('.media__item__link').magnificPopup({

        type:'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function() {

                this.st.mainClass = this.st.el.attr('data-effect');
            },
             open: function() {
                this.content.find('img').attr('src', this.st.el.attr('data-img'));
            },

        }
    });
     

    // SMOOTH ANCHOR SCROLLING
    var $root = $('html, body');
    $('a.anchor').click(function(e) {
        var href = $.attr(this, 'href');
        if (typeof($(href)) != 'undefined' && $(href).length > 0) {
            var anchor = '';

            if (href.indexOf("#") != -1) {
                anchor = href.substring(href.lastIndexOf("#"));
            }

            if (anchor.length > 0) {
                console.log($(anchor).offset().top);
                console.log(anchor);
                $root.animate({
                    scrollTop: $(anchor).offset().top
                }, 500, function() {
                    window.location.hash = anchor;
                });
                e.preventDefault();
            }
        }
    });


   // Forms with ajax process
    $('form[data-remote]').on('submit', function(e){
        var form =$(this);
        var method = form.find('input[name="_method"]').val() || 'POST';
        var url = form.prop('action');
        form.find('.loader').show();
        $.ajax({
            type: method,
            url: url,
            data: form.serialize(),
            success: function(){
                var message = form.data('remote-success-message');
                form.find('.loader').hide();
                if(message)
                {

                    $('.response').removeClass('message-error').addClass('message-success').html(message).fadeIn(300).delay(4500).fadeOut(300);
                }
            },
            error:function(){
                form.find('.loader').hide();
                $('.response').removeClass('message-success').addClass('message-error').html('Whoops, looks like something went wrong.').fadeIn(300).delay(4500).fadeOut(300);

            }
        });

        limpiaForm(form);

        e.preventDefault();
    });

    $('input[data-confirm], button[data-confirm]').on('click', function(e){
       var input = $(this);

        input.prop('disabled','disabled');

        if(! confirm(input.data('confirm'))){
            e.preventDefault();
        }
    });

    function limpiaForm(miForm) {

        // recorremos todos los campos que tiene el formulario
        $(":input", miForm).each(function() {
            var type = this.type;
            var tag = this.tagName.toLowerCase();
            //limpiamos los valores de los campos…
            if (type == 'text' || type == 'password'  || type == 'email' || tag == 'textarea')
                this.value = "";
            // excepto de los checkboxes y radios, le quitamos el checked
            // pero su valor no debe ser cambiado
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
            // los selects le ponesmos el indice a -
            else if (tag == 'select')
                this.selectedIndex = -1;
        });
    }
      
      
      

    //$(".chosen-select").chosen();
    
    //SCROLL WINDOW FUNCTIONALITY

    /*$(window).scroll(function () {
          if ($(this).scrollTop() > 50) {
              $('.header').addClass("header--fixed");
          } else {
              $('.header').removeClass("header--fixed");
          }
      });*/

    

   /* $(window).load(function() {
     
     
      resizes();

    });

    $(window).resize(resizes);

    function resizes()
     {
      
      
        if(getWindowWidth() > 900){
         
        
          $('.intro__banner').height($(".intro__featured").height());
          //$('.intro__banner__slide img').height($(".intro__featured").height());
        
        
        }else{
          $('.intro__banner').height('auto');
        } 
          
      

     }*/






})(jQuery);


function getScrollerWidth() {
  var scr = null;
  var inn = null;
  var wNoScroll = 0;
  var wScroll = 0;

  // Outer scrolling div
  scr = document.createElement('div');
  scr.style.position = 'absolute';
  scr.style.top = '-1000px';
  scr.style.left = '-1000px';
  scr.style.width = '100px';
  scr.style.height = '50px';
  // Start with no scrollbar
  scr.style.overflow = 'hidden';

  // Inner content div
  inn = document.createElement('div');
  inn.style.width = '100%';
  inn.style.height = '200px';

  // Put the inner div in the scrolling div
  scr.appendChild(inn);
  // Append the scrolling div to the doc
  document.body.appendChild(scr);

  // Width of the inner div sans scrollbar
  wNoScroll = inn.offsetWidth;
  // Add the scrollbar
  scr.style.overflow = 'auto';
  // Width of the inner div width scrollbar
  wScroll = inn.offsetWidth;

  // Remove the scrolling div from the doc
  document.body.removeChild(
    document.body.lastChild);

  // Pixel width of the scroller
  return (wNoScroll - wScroll);
}

function getWindowHeight() {
  var windowHeight=0;
  if (typeof(window.innerHeight)=='number') {
    windowHeight=window.innerHeight;
  } else {
    if (document.documentElement && document.documentElement.clientHeight) {
      windowHeight = document.documentElement.clientHeight;
    } else {
      if (document.body && document.body.clientHeight) {
        windowHeight=document.body.clientHeight;
      }
    }
  }
  return windowHeight;
}

function getWindowWidth() {
  var windowWidth=0;
  if (typeof(window.innerWidth)=='number') {
    windowWidth=window.innerWidth;
  } else {
    if (document.documentElement && document.documentElement.clientWidth) {
      windowWidth = document.documentElement.clientWidth;
    } else {
      if (document.body && document.body.clientWidth) {
        windowWidth=document.body.clientWidth;
      }
    }
  }
  return windowWidth;
}

