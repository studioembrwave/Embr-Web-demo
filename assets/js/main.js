
$(function () {
    /**
     * ===============================================
     *      TABLE OF CONTENT
     * ===============================================
     * # Loader
     * # Media
     * # Real Time
     * # Popup Menu
     * # Gsap Smooth Scroll
     * # Experience Popup
     * # Custom Cursor
     * # Contact Form
     *
     */


    /* ===== Media ===== */
    // Discourage casual saving, including on linked portfolio thumbnails and
    // media inserted later (such as employee-slider copies). This is not DRM.
    const mediaSelector = 'img, video, picture, .logo, .work-box .overlay, .work-box .hover_mouse, [data-protected-media]';
    function preventMediaSave(event) {
        if (event.target instanceof Element && event.target.closest(mediaSelector)) {
            event.preventDefault();
        }
    }
    document.addEventListener('contextmenu', preventMediaSave, true);
    document.addEventListener('dragstart', preventMediaSave, true);

    /* ===== Loader ===== */
    const loader = document.querySelector('.preloader-wrap');
    let introFinishing = false;
    const loaderFallback = setTimeout(revealPage, 8000);

    function revealPage() {
        if (introFinishing) return;
        introFinishing = true;
        clearTimeout(loaderFallback);

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ripple = loader?.querySelector('.preloader-ripple-fill')?.getAnimations()[0];
        const duration = Number(ripple?.effect.getTiming().duration) || 0;
        const elapsed = Number(ripple?.currentTime) || 0;
        // Show one complete white-blue-white cycle without adding a delay to slow loads.
        const remaining = reducedMotion ? 0 : Math.max(0, duration - elapsed);

        setTimeout(() => {
            const finish = () => {
                if (!loader) return;
                loader.hidden = true;
                loader.setAttribute('aria-hidden', 'true');
            };
            if (!loader || reducedMotion) finish();
            else $(loader).fadeOut(300, finish);
            scroll_animations();
        }, remaining);
    }

    if (document.readyState === 'complete') revealPage();
    else $(window).one('load', revealPage);



    /* ===== Real Time ===== */
    if ($('.realtime').length) {
        startTime();
    }
    
    function startTime() {
        const dhakaTime = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Dhaka', hour: 'numeric', minute: '2-digit', hour12: true
        }).format(new Date());
        document.querySelectorAll('.realtime').forEach(item => {
            item.textContent = dhakaTime;
        });
        setTimeout(startTime, 1000);
    }
    document.querySelectorAll('[data-year]').forEach(item => {
        item.textContent = new Intl.DateTimeFormat('en', {
            timeZone: 'Asia/Dhaka', year: 'numeric'
        }).format(new Date());
    });

    // Custom Mouse Cursor for Work
    if (document.querySelectorAll('.work-box')) {
        document.querySelectorAll('.work-box').forEach(box => {
            const hoverElement = box.querySelector('.hover_mouse');

            box.addEventListener('mousemove', (event) => {
                const boxRect = box.getBoundingClientRect();
                const mouseX = event.clientX - boxRect.left;
                const mouseY = event.clientY - boxRect.top;

                if (hoverElement) {
                    hoverElement.style.transform = `translate3d(${mouseX - 50}px, ${mouseY - 50}px, 0)`;
                    hoverElement.classList.add('active');
                }
            });

            if (hoverElement) {
                box.addEventListener('mouseleave', () => {
                    // hoverElement.style.transform = `translate3d(0, 0, 0)`;
                    hoverElement.classList.remove('active');
                });
            }

            box.addEventListener('mouseenter', function () {
                // Animate cursorBall on mouseenter
                cursorBall.classList.add('hovered');
                gsap.to(cursorBall, {
                    duration: 0.3,
                    scale: 2, // Increase scale
                    opacity: 0, // Set opacity to 0
                    ease: 0.1
                });
            });
    
            box.addEventListener('mouseleave', function () {
                // Restore cursorBall on mouseleave
                cursorBall.classList.remove('hovered');
                gsap.to(cursorBall, {
                    duration: 0.3,
                    scale: 1, // Restore scale to normal
                    opacity: 1, // Restore opacity
                    ease: 'power2.out'
                });
            });
        });
    }



    /* ===== # Popup Menu ===== */
    if ($('.show-navigation-popover').length) {
        $(document).on('click', '.show-navigation-popover', function (e) {
            e.preventDefault();
            $('.popup-menu-wrap').addClass('active').attr('aria-hidden', 'false');
            $('.show-navigation-popover').attr('aria-expanded', 'true');
            document.querySelector('.close-navigation-btn').focus();
            $('body').css({
                overflow: 'hidden'
            })
        });
        $(document).on('click', '.close-navigation-btn', function (e) {
            e.preventDefault();
            $('.popup-menu-wrap').removeClass('active').attr('aria-hidden', 'true');
            $('.show-navigation-popover').attr('aria-expanded', 'false');
            document.querySelector('.show-navigation-popover').focus();
            $('body').css({
                overflowX: 'hidden',
                overflowY: 'auto'
            })
        });
    }



    /* ===== # Gsap Smooth Scroll ===== */
    // gsap.config({ trialWarn: false });
    // console.clear();
    // gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // let smoother = ScrollSmoother.create({ smooth: 2 });

    // let masks;

    // ScrollTrigger.create({
    //     trigger: "#smooth-content", // Change trigger to .line instead of .line span
    //     start: "top bottom",
    //     end: "bottom bottom",
    //     refreshPriority: -1,
    //     scrub: 5 // Adjust this value to control animation speed (higher value for slower animation)
    // });

    // const btt = document.querySelector("#back-to-top");

    // btt.addEventListener("click", () => gsap.to(window, { scrollTo: 0 }));
    // gsap.set(btt, { y: 50 });

    // gsap.to(btt, {
    //     y: 0,
    //     autoAlpha: 1,
    //     scrollTrigger: {
    //         trigger: "body",
    //         start: "top -20%",
    //         end: "top -20%",
    //         toggleActions: "play none reverse none"
    //     }
    // });








    // ScrollTrigger manages scroll updates after scroll_animations initializes on load.



    // $(window).scroll(function () {
    //     var windscroll = $(window).scrollTop();

    // }).scroll();



    // window.addEventListener("load", function() {
    //     // Add event listener for scroll
    //     window.addEventListener("scroll", function() {
    //     //   var stickyStatement = document.querySelector('.sticky-statement');
    //       stickyEls2.forEach((panel, i) => {
    //         var stickyPosition = panel.offsetTop;
    //         var scrollPosition = window.scrollY;
        
    //         // Add or remove 'sticky' class based on scroll position
    //         if (scrollPosition >= stickyPosition) {
    //             panel.classList.add('sticky');
    //         } else {
    //             panel.classList.remove('sticky');
    //         }
    //         })
    //     });
    //   });
      


    // gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // var container = document.querySelector("#smooth-content");

    // var height;
    // function setHeight() {
    //     height = container.clientHeight;

    //     document.body.style.height = height + "px";
    // }
    // ScrollTrigger.addEventListener("refreshInit", setHeight);

    // gsap.to(container, {
    //     y: () => -(height - document.documentElement.clientHeight),
    //     ease: "none",
    //     scrollTrigger: {
    //         trigger: container,
    //         start: "top top",
    //         end: "bottom bottom",
    //         scrub: 1,
    //         invalidateOnRefresh: true,
    //     }
    // });




    // New Scroll start
    // function initSmoothScroll() {
    //     var html = document.documentElement;
    //     var body = document.body;

    //     var scroller = {
    //         target: document.querySelector("#smooth-content"),
    //         ease: 0.05, // <= scroll speed
    //         endY: 0,
    //         y: 0,
    //         resizeRequest: 1,
    //         scrollRequest: 0,
    //     };

    //     var requestId = null;

    //     TweenLite.set(scroller.target, {
    //         rotation: 0.01,
    //         force3D: true
    //     });

    //     window.addEventListener("load", onLoad);

    //     function onLoad() {    
    //         updateScroller();  
    //         window.focus();
    //         window.addEventListener("resize", onResize);
    //         document.addEventListener("scroll", onScroll); 
    //     }

    //     function updateScroller() {
        
    //         var resized = scroller.resizeRequest > 0;
                
    //         if (resized) {    
    //             var height = scroller.target.clientHeight;
    //             body.style.height = height + "px";
    //             scroller.resizeRequest = 0;
    //         }
                
    //         var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

    //         scroller.endY = scrollY;
    //         scroller.y += (scrollY - scroller.y) * scroller.ease;

    //         if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    //             scroller.y = scrollY;
    //             scroller.scrollRequest = 0;
    //         }
            
    //         TweenLite.set(scroller.target, { 
    //             y: -scroller.y 
    //         });
            
    //         requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
    //     }

    //     function onScroll() {
    //         scroller.scrollRequest++;
    //         if (!requestId) {
    //             requestId = requestAnimationFrame(updateScroller);
    //         }
    //     }

    //     function onResize() {
    //         scroller.resizeRequest++;
    //         if (!requestId) {
    //             requestId = requestAnimationFrame(updateScroller);
    //         }
    //     }
            
    // }
    // initSmoothScroll();
    // New Scroll End


    // window.onbeforeunload = function () {
    //     window.scrollTo(0, 0);
    //     $("#smooth-content").style.transform = 'translate3d(0px, 0px, 0px)';
    // }


    // Transform Text Anim Start

    // function ShowcaseOverlapping() {
		
        
    //     gsap.utils.toArray('#smooth-content').forEach((pinnedSection) => {
            
    //         const transformTextsAnim = pinnedSection.querySelectorAll('.sticky-statement2');
            
    //         function setImagesProperties() {								
    //             gsap.set(transformTextsAnim, { height: window.innerHeight});	
    //         }
            
    //         setImagesProperties();
            
    //         window.addEventListener('resize', setImagesProperties);	
        
    //         transformTextsAnim.forEach((transformTextAnim, i, arr) => {
    //                 const durationMultiplier = arr.length - i - 1;
                    
                    
    //                 ScrollTrigger.create({
    //                     trigger: transformTextAnim,
    //                     start: function() {
    //                         const centerPin = (window.innerHeight - transformTextAnim.offsetHeight) / 2;
    //                         return "top +=" + centerPin;
    //                     },
    //                     end: function() {
    //                         const durationHeight = transformTextAnim.offsetHeight * durationMultiplier + (transformTextAnim.offsetHeight - transformTextAnim.offsetHeight)/2;
    //                         return "+=" + durationHeight;
    //                     },
    //                     pin: true,
    //                     pinSpacing: false,
    //                     scrub: true,
    //                 });
                    
    //                 const animationProperties = {
    //                     y: 500,
    //                     scale: 0.65,
    //                     opacity: 0,
    //                     zIndex: 0,
    //                     duration: 0.05,
    //                     ease: 0.05,
    //                     // ease: Linear.easeNone
    //                 };
                    
    //                 // animationProperties.filter = "blur(10px)";
                    
    //                 ScrollTrigger.create({
    //                     trigger: transformTextAnim,
    //                     start: function() {
    //                         const centerPin = (window.innerHeight - transformTextAnim.offsetHeight) / 2;
    //                         console.log('center pin' , centerPin);
    //                         return "top top";
    //                     },
    //                     end: function() {
    //                         const durationHeight = transformTextAnim.offsetHeight + (transformTextAnim.offsetHeight - transformTextAnim.offsetHeight) / 2;
    //                         return "+=" + durationHeight;
    //                     },
    //                     scrub: true,
    //                     animation: gsap.to(transformTextAnim, animationProperties),
    //                 });

    //         });
        
    //     });
		
	// }
    // ShowcaseOverlapping();
    // Transform Text Anim End





    // window.addEventListener('scroll', {
    //     scroll_animations,
    // });


    // Array.prototype.slice.call(document.querySelectorAll(".page-section")).forEach(function (e, t) {
    //     ScrollTrigger.create({
    //         trigger: e,
    //         id: t + 1,
    //         start: "top center",
    //         end: function () {
    //             return "+=".concat(e.clientHeight - 30);
    //         },
    //         toggleActions: "play reverse none reverse",
    //         toggleClass: { targets: e, className: "active" },
    //         onToggle: function () {

    //         },
    //     });
    // });



    /* ===== # Experience Popup ===== */
    $(document).on('click', '.experience-box .experience-button-box .experience-button', function (e) {
        e.preventDefault();
        $('.experience-popup').addClass('active');
    });
    $(document).on('click', '.experience-popup .experience-popup-content-wrap .close-experience-popup-btn', function () {
        $('.experience-popup').removeClass('active');
    });


    /* ==== # Custom Cursor ===== */
    const cursorBall = document.getElementById('ball');

    document.addEventListener('mousemove', function (e) {
        // Update cursor position and opacity on mousemove
        gsap.to(cursorBall, {
            duration: 0.3,
            x: e.clientX,
            y: e.clientY,
            opacity: 1, // Ensure cursor is visible
            ease: 'power2.out'
        });
    });

    // Hover effect on elements
    const hoverElements = document.querySelectorAll('a');
    hoverElements.forEach(function (element) {
        element.addEventListener('mouseenter', function () {
            // Animate cursorBall on mouseenter
            cursorBall.classList.add('hovered');
            gsap.to(cursorBall, {
                duration: 0.3,
                scale: 2, // Increase scale
                opacity: 0, // Set opacity to 0
                ease: 0.1
            });
        });

        element.addEventListener('mouseleave', function () {
            // Restore cursorBall on mouseleave
            cursorBall.classList.remove('hovered');
            gsap.to(cursorBall, {
                duration: 0.3,
                scale: 1, // Restore scale to normal
                opacity: 1, // Restore opacity
                ease: 'power2.out'
            });
        });
    });



    // Prepare an email draft until a studio-owned form delivery service is configured.
    // No form fields are sent to the inherited template's third-party account.
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const name = [data.get('first_name'), data.get('last_name')].filter(Boolean).join(' ');
            const body = [
                'Name: ' + name,
                'Email: ' + data.get('email'),
                'Phone: ' + (data.get('phone') || 'Not provided'),
                'Company / organization: ' + (data.get('company') || 'Not provided'),
                'Social link: ' + (data.get('social_link') || 'Not provided'),
                'Creating for: ' + data.get('company_type'),
                'Budget: ' + (data.get('budget') || 'To discuss'),
                '', data.get('message')
            ].join('\n');
            result.style.display = 'block';
            const emailLink = document.createElement('a');
            emailLink.href = 'mailto:studioembrwave@gmail.com';
            emailLink.className = 'email-link';
            emailLink.textContent = 'studioembrwave@gmail.com';
            result.replaceChildren(
                document.createTextNode('Opening an email draft. Review it and press Send in your email app. If nothing opens, email '),
                emailLink,
                document.createTextNode(' directly.')
            );
            window.location.href = 'mailto:studioembrwave@gmail.com?subject=' +
                encodeURIComponent('New project inquiry — ' + name) + '&body=' + encodeURIComponent(body);
        });
    }
    document.querySelectorAll('[data-comment-draft]').forEach(commentForm => {
        commentForm.addEventListener('submit', event => {
            event.preventDefault();
            if (!commentForm.reportValidity()) return;
            const data = new FormData(commentForm);
            const body = ['Article: ' + document.title, 'Name: ' + (data.get('name') || ''),
                'Email: ' + (data.get('email') || ''), '', data.get('comment')].join('\n');
            window.location.href = 'mailto:studioembrwave@gmail.com?subject=' +
                encodeURIComponent('Thoughts from the Embrwave™ Journal') + '&body=' + encodeURIComponent(body);
        });
    });
    const journalEntries = [...document.querySelectorAll('[data-journal-entry]')];
    const query = (new URLSearchParams(window.location.search).get('s') || '').trim().toLocaleLowerCase();
    if (journalEntries.length && query) {
        journalEntries.forEach(entry => {
            entry.hidden = !entry.textContent.toLocaleLowerCase().includes(query);
        });
        const empty = document.querySelector('.journal-empty');
        if (empty) empty.hidden = journalEntries.some(entry => !entry.hidden);
    }
    document.addEventListener('keydown', event => {
        const menu = document.querySelector('.popup-menu-wrap.active');
        if (!menu) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            document.querySelector('.close-navigation-btn').click();
        } else if (event.key === 'Tab') {
            const links = [...menu.querySelectorAll('a[href], button')];
            const first = links[0], last = links[links.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }
    });

});



function scroll_animations() {
    // var allow_on_mobile = !0;
    // if (typeof config_scroll_animation_on_mobile !== "undefined") allow_on_mobile = config_scroll_animation_on_mobile;
    // if (allow_on_mobile == !1 && is_mobile_device) return;
    var defaults = {
        ease: 4,
        animation: "fade_from_bottom",
        once: !1,
        delay: 0, // Default delay value
    };
    gsap.utils.toArray(".scroll-animation").forEach(function (box) {
        var gsap_obj = {};
        var settings = {
            // ease: box.dataset.animationEase || defaults.ease,
            duration: box.dataset.animationDuration || defaults.duration,
            delay: box.dataset.animationDelay || defaults.delay, // Get the delay from data attribute or use default
        };
        var animations = {
            slide_up: {
                y: -180,
            },
            slide_down: {
                y: 180,
            },
            slide_up2: {
                y: -100,
            },
            slide_down2: {
                y: 100,
            },
            fade_from_bottom: {
                y: 180,
                opacity: 0,
            },
            fade_from_top: {
                y: -180,
                opacity: 0,
            },
            fade_from_bottom2: {
                y: 100,
                opacity: 0,
            },
            fade_from_top2: {
                y: -100,
                opacity: 0,
            },
            fade_from_left: {
                x: -180,
                opacity: 0,
            },
            fade_from_right: {
                x: 180,
                opacity: 0,
            },
            fade_in: {
                opacity: 0,
            },
            rotate_up: {
                y: 180,
                rotation: 10,
                opacity: 0,
            },
            embrwave_zoom_out: {
                scale: 2,
            },
            embrwave_zoom_in: {
                scale: 0,
                opacity: 1,
            },
            slide_and_scale: {
                // y: 180,
                scale: 1,
                opacity: 1
            },
        };
        var globalWidth = window.innerWidth;
        if (globalWidth > 809) {
            var transWidth = '10%';
        } else {
            var transWidth = '30%';
        }
        var scroll_trigger = {
            scrollTrigger: {
                trigger: box,
                once: defaults.once,
                // start: "top bottom+=20%",
                start: "top bottom+="+transWidth,
                toggleActions: "play none none reverse",
                markers: !1,
                onUpdate: function(self) {
                    // Get the current position of the box relative to the viewport
                    // var bounding = box.getBoundingClientRect();
                    // var offsetTopFromViewport = bounding.top;

                    
                    // if (box.dataset.animation == 'slide_and_scale') {
                    //     console.log("Offset from top:", offsetTopFromViewport);

                    //     // Example: Toggle opacity and scale based on offset
                    //     if (offsetTopFromViewport < 0) {
                    //         const replaceVal = Math.abs(offsetTopFromViewport);
                    //         console.log(replaceVal, 'if');
                    //         // box.style.transform = `translateY(${replaceVal}px)`;
                    //         gsap.to(box, { y: replaceVal, duration: 0.5 });
                    //     } else {
                    //         console.log('else');
                    //         // box.style.transform = `translateY(0px)`;
                    //         gsap.to(box, { y: 0, duration: 0.5 });
                    //     }
                    // }
                }
            },
        };
        if (box.dataset.animation == 'embrwave_zoom_out') {
            scroll_trigger = {
                scrollTrigger: {
                    trigger: box,
                    once: defaults.once,
                    // start: "top bottom+=20%",
                    start: "top bottom",
                    toggleActions: "play none none reverse",
                    markers: !1,
                },
            };
        }
        if (box.dataset.animation == 'embrwave_zoom_in') {
            scroll_trigger = {
                scrollTrigger: {
                    trigger: box,
                    once: defaults.once,
                    // start: "top bottom+=20%",
                    start: "top bottom",
                    toggleActions: "play none none reverse",
                    markers: !1,
                },
            };
        }
        jQuery.extend(gsap_obj, settings);
        jQuery.extend(gsap_obj, animations[box.dataset.animation || defaults.animation]);
        jQuery.extend(gsap_obj, scroll_trigger);
        gsap.from(box, gsap_obj);
    });
}
