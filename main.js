
    (function($) {

        var SliceSlider = {

            /**
             * Settings Object
             */
            settings: {
                delta:              0,
                currentSlideIndex:  0,
                scrollThreshold:    40,
                slides:             $('.slide'),
                numSlides:          $('.slide').length,
                navPrev:            $('.js-prev'),
                navNext:            $('.js-next'),
            },

            /**
             * Init
             */
            init: function() {
                s = this.settings;
                this.bindEvents();
            },

            /**
             * Bind our click, scroll, key events
             */
            bindEvents: function(){

                // Scrollwheel & trackpad
                // s.slides.on({
                //     'DOMMouseScroll mousewheel' : SliceSlider.handleScroll
                // });
                // On click prev
                s.navPrev.on({
                    'click' : SliceSlider.prevSlide
                });
                // On click next
                s.navNext.on({
                    'click' : SliceSlider.nextSlide
                });
                // On Arrow keys
                $(document).keyup(function(e) {
                    // Left or back arrows
                    if ((e.which === 37) ||  (e.which === 38)){
                        SliceSlider.prevSlide();
                    }
                    // Down or right
                    if ((e.which === 39) ||  (e.which === 40)) {
                        SliceSlider.nextSlide();
                    }
                });
            },

            /**
             * Interept scroll direction
             */
            handleScroll: function(e){

                // Scrolling up
                if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {

                    s.delta--;

                    if ( Math.abs(s.delta) >= s.scrollThreshold) {
                        SliceSlider.prevSlide();
                    }
                }

                // Scrolling Down
                else {

                    s.delta++;

                    if (s.delta >= s.scrollThreshold) {
                        SliceSlider.nextSlide();
                    }
                }

                // Prevent page from scrolling
                return false;
            },

            /**
             * Show Slide
             */
            showSlide: function(){
                // reset
                s.delta = 0;
                // Bail if we're already sliding
                if ($('body').hasClass('is-sliding')){
                    return;
                }
                // Loop through our slides
                s.slides.each(function(i, slide) {

                    // Toggle the is-active class to show slide
                    $(slide).toggleClass('is-active', (i === s.currentSlideIndex));
                    $(slide).toggleClass('is-prev', (i === s.currentSlideIndex - 1));
                    $(slide).toggleClass('is-next', (i === s.currentSlideIndex + 1));

                    // Add and remove is-sliding class
                    $('body').addClass('is-sliding');

                    setTimeout(function(){
                        $('body').removeClass('is-sliding');
                    }, 1000);
                });
            },

            /**
             * Previous Slide
             */
            prevSlide: function(){

                // If on first slide, loop to last
                if (s.currentSlideIndex <= 0) {
                    s.currentSlideIndex = s.numSlides;
                }
                s.currentSlideIndex--;

                SliceSlider.showSlide();
            },

            /**
             * Next Slide
             */
            nextSlide: function(){

                s.currentSlideIndex++;

                // If on last slide, loop to first
                if (s.currentSlideIndex >= s.numSlides) {
                    s.currentSlideIndex = 0;
                }

                SliceSlider.showSlide();
            },
        };
        SliceSlider.init();
    })(jQuery);
    const cursor = document.querySelector(".view");
    var timeout;

    //follow cursor on mousemove
    document.addEventListener("mousemove", (e) => {
        let x = e.pageX;
        let y = e.pageY;

        cursor.style.top = y + "px";
        cursor.style.left = x + "px";
        cursor.style.display = "block";

        //cursor effects when mouse stopped
        function mouseStopped() {
            cursor.style.display = "none";
        }
        clearTimeout(timeout);
        timeout = setTimeout(mouseStopped, 1000);
    });


const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".footer",
        start: "top bottom-=120px",
        end: "bottom+200px bottom-=200px",
        scrub: true
    }
});

tl.to(".footerContent", {
    opacity: 1,
    transform: 'translateY(0px)',
})


    document.addEventListener('DOMContentLoaded', function(){
        document.querySelector('.horizontal__top').style.height = "50px"
    });

    (function() {
        document.addEventListener('DOMContentLoaded', function(){
            var walkthrough;
            walkthrough = {
                index: 0,
                nextScreen: function() {
                    if (this.index < this.indexMax()) {
                        this.index++;
                        return this.updateScreen();
                    }
                },
                prevScreen: function() {
                    if (this.index > 0) {
                        this.index--;
                        return this.updateScreen();
                    }
                },
                updateScreen: function() {
                    this.reset();
                    this.goTo(this.index);
                    return this.setBtns();
                },
                setBtns: function() {
                    var $lastBtn, $nextBtn, $prevBtn;
                    $nextBtn = $('.next-screen');
                    $prevBtn = $('.prev-screen');
                    $lastBtn = $('.finish');
                    if (walkthrough.index === walkthrough.indexMax()) {
                        $nextBtn.prop('disabled', true);
                        $prevBtn.prop('disabled', false);
                        return $lastBtn.addClass('active').prop('disabled', false);
                    } else if (walkthrough.index === 0) {
                        $nextBtn.prop('disabled', false);
                        $prevBtn.prop('disabled', true);
                        return $lastBtn.removeClass('active').prop('disabled', true);
                    } else {
                        $nextBtn.prop('disabled', false);
                        $prevBtn.prop('disabled', false);
                        return $lastBtn.removeClass('active').prop('disabled', true);
                    }
                },
                goTo: function(index) {
                    $('.screen').eq(index).addClass('active');
                    return $('.dot').eq(index).addClass('active');
                },
                reset: function() {
                    return $('.screen, .dot').removeClass('active');
                },
                indexMax: function() {
                    return $('.screen').length - 1;
                },
                closeModal: function() {
                    $('.walkthrough, .shade').removeClass('reveal');
                    return setTimeout(((function(_this) {
                        return function() {
                            $('.walkthrough, .shade').removeClass('show');
                            _this.index = 0;
                            return _this.updateScreen();
                        };
                    })(this)), 200);
                },
                openModal: function() {
                    $('.walkthrough, .shade').addClass('show');
                    setTimeout(((function(_this) {
                        return function() {
                            return $('.walkthrough, .shade').addClass('reveal');
                        };
                    })(this)), 200);
                    return this.updateScreen();
                }
            };
            $('.next-screen').click(function() {
                return walkthrough.nextScreen();
            });
            $('.prev-screen').click(function() {
                return walkthrough.prevScreen();
            });
            $('.close').click(function() {
                return walkthrough.closeModal();
            });
            $('.open-walkthrough').click(function() {
                return walkthrough.openModal();
            });
            walkthrough.openModal();
            return $(document).keydown(function(e) {
                switch (e.which) {
                    case 37:
                        walkthrough.prevScreen();
                        break;
                    case 38:
                        walkthrough.openModal();
                        break;
                    case 39:
                        walkthrough.nextScreen();
                        break;
                    case 40:
                        walkthrough.closeModal();
                        break;
                    default:
                        return;
                }
                e.preventDefault();
            });
        });

    }).call(this);