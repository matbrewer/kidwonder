(function () {
  // Menu & sign up
  function navDrawer() {
    const hideDrawerBtn = document.querySelector('.close-btn');
    const drawerContainer = document.querySelector('.drawer-container');
    const overlay = document.querySelector('.dialog-overlay');
    const drawer = document.querySelector('.drawer');
    const menu = document.querySelector('.drawer .menu');
    const signup = document.querySelector('.drawer .signup');

    const showMenuBtn = document.querySelector('.menu-btn');
    const showSignupBtns = document.querySelectorAll('.signup-btn');
    const toggleSignupBtn = document.querySelector('.toggle-signup');

    showMenuBtn.addEventListener('click', function (e) {
      e.preventDefault();
      gsap.set(menu, { display: 'flex' });
      gsap.set(signup, { display: 'none' });
      showDrawerAnimation.restart();
    });

    showSignupBtns.forEach((showSignupBtn) => {
      showSignupBtn.addEventListener('click', function (e) {
        e.preventDefault();
        gsap.set(signup, { display: 'flex' });
        gsap.set(menu, { display: 'none' });
        showDrawerAnimation.restart();
      });
    });

    toggleSignupBtn.addEventListener('click', function (e) {
      e.preventDefault();
      swapDrawerAnimation.restart();
    });

    hideDrawerBtn.addEventListener('click', function (e) {
      e.preventDefault();
      hideDrawerAnimation.restart();
    });

    overlay.addEventListener('click', function () {
      hideDrawerAnimation.restart();
    });

    const showDrawerAnimation = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: 'power1.out'
        }
      })
      .set(drawerContainer, { display: 'block' })
      .set(drawer, { xPercent: 100, x: 0 })
      .to(overlay, { duration: 0.5, opacity: 1 })
      .to(drawer, { duration: 0.2, xPercent: 0 }, '<0.2');

    const hideDrawerAnimation = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: 'power1.out'
        }
      })
      .to(drawer, { delay: 0.2, duration: 0.2, xPercent: 100 })
      .to(overlay, { duration: 0.5, opacity: 0 }, '<0.2')
      .set(drawerContainer, { display: 'none' });

    const swapDrawerAnimation = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: 'power1.out'
        }
      })
      .to(drawer, { delay: 0.2, duration: 0.2, xPercent: 100 })
      .set(signup, { display: 'flex' })
      .set(menu, { display: 'none' })
      .to(drawer, { delay: 0.2, duration: 0.2, xPercent: 0 });
  }

  // Animations

  let heroIntroAnimation;

  function setHeroIntroAnimation() {
    // Get the element with the ID 'heroIntro'
    const heroIntro = document.getElementById('heroIntro');

    // Specify the path to your Lottie animation JSON file
    const animationPath =
      'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/65574b21f3cb4a42120bf247_kw-hero-intro.json';

    // Configure the Lottie options (you can adjust these based on your needs)
    const animationOptions = {
      container: heroIntro,
      renderer: 'svg',
      loop: false, // Set to true if you want the animation to loop
      autoplay: false, // Set to true if you want the animation to play automatically
      path: animationPath,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    // Create the Lottie animation
    heroIntroAnimation = lottie.loadAnimation(animationOptions);
  }

  function playHeroIntroAnimation() {
    // Check if the 'anim' object is defined
    if (heroIntroAnimation) {
      // You can control the animation using the 'heroIntroAnimation' object
      heroIntroAnimation.play();
      // Other control commands...
    } else {
      console.error('Lottie animation not initialized.');
    }
  }

  function homeIntroAnimation() {
    const body = document.body;
    const aoc = document.getElementById('aoc');
    const introWrapper = document.getElementById('heroIntro');
    const heroBullets = document.querySelectorAll('.hero-bullet');
    const heroScroll = document.querySelector('.scroll');

    let tl = gsap.timeline({
      // paused: true
    });

    tl.set(body, {
      overflow: 'hidden',
      width: '100vw',
      position: 'fixed'
    });
    tl.to(aoc, {
      duration: 0.5,
      ease: 'power1.out',
      delay: 3,
      autoAlpha: 0,
      onComplete: playHeroIntroAnimation
    });
    tl.set(
      body,
      {
        position: 'relative'
      },
      '<'
    );
    tl.to({}, { duration: 3.5 }); // empty tween for lottie animation
    tl.from(
      heroBullets,
      {
        duration: 0.5,
        autoAlpha: 0,
        y: 24,
        stagger: {
          each: 0.175,
          ease: 'none'
        }
      },
      '<2'
    );
    tl.from(
      heroScroll,
      {
        duration: 2,
        autoAlpha: 0,
        y: 32
      },
      '<'
    );
    tl.set(
      introWrapper,
      {
        autoAlpha: 0
      },
      '>'
    );
    tl.set(body, {
      overflow: 'auto'
    });
  }

  function heroOutroScrollAnimation() {
    if (document.querySelector('.hero-section')) {
      // set the section container height
      gsap.set('.hero-section', { height: '200vh' });

      LottieScrollTrigger({
        target: '#heroOutro',
        path: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/64da6a8538d8c3f050974311_kw-hero-outro-2.json',
        trigger: '.hero-container',
        pin: true,
        pinSpacing: false,
        scrub: true // seconds it takes for the playhead to "catch up"
        // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
      });

      function LottieScrollTrigger(vars) {
        let playhead = { frame: 0 },
          target = gsap.utils.toArray(vars.target)[0],
          // speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
          st = {
            trigger: target,
            pin: true,
            start: 'top top',
            end: '200% top'
          },
          ctx = gsap.context && gsap.context(),
          animation = lottie.loadAnimation({
            container: target,
            renderer: vars.renderer || 'svg',
            loop: false,
            autoplay: false,
            path: vars.path,
            rendererSettings: vars.rendererSettings || {
              preserveAspectRatio: 'xMidYMid slice'
            }
          });
        for (let p in vars) {
          // let users override the ScrollTrigger defaults
          st[p] = vars[p];
        }
        animation.addEventListener('DOMLoaded', function () {
          let createTween = function () {
            animation.frameTween = gsap.to(playhead, {
              frame: animation.totalFrames - 1,
              ease: 'none',
              onUpdate: () => animation.goToAndStop(playhead.frame, true),
              scrollTrigger: st
            });
            return () => animation.destroy && animation.destroy();
          };
          ctx && ctx.add ? ctx.add(createTween) : createTween();
          // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
        return animation;
      }
    }
  }

  function fullScreenHero() {
    if (document.querySelector('.info-hero-img-scale')) {
      gsap.to('.info-hero-img-scale', {
        scrollTrigger: {
          trigger: '.info-hero-img-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        scale: 1,
        ease: 'power1.out'
      });
    }
  }

  function heroOutroAnimation() {
    if (document.querySelector('.hero-section')) {
      // set the section container height
      gsap.set('.hero-section', { height: '200vh' });

      LottieScrollTrigger({
        target: '.hero',
        path: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/64da6a8538d8c3f050974311_kw-hero-outro-2.json',
        trigger: '.hero-container',
        pin: true,
        pinSpacing: false,
        scrub: true // seconds it takes for the playhead to "catch up"
        // you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
      });

      function LottieScrollTrigger(vars) {
        let playhead = { frame: 0 },
          target = gsap.utils.toArray(vars.target)[0],
          // speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
          st = {
            trigger: target,
            pin: true,
            start: 'top top',
            end: '200% top'
          },
          ctx = gsap.context && gsap.context(),
          animation = lottie.loadAnimation({
            container: target,
            renderer: vars.renderer || 'svg',
            loop: false,
            autoplay: false,
            path: vars.path,
            rendererSettings: vars.rendererSettings || {
              preserveAspectRatio: 'xMidYMid slice'
            }
          });
        for (let p in vars) {
          // let users override the ScrollTrigger defaults
          st[p] = vars[p];
        }
        animation.addEventListener('DOMLoaded', function () {
          let createTween = function () {
            animation.frameTween = gsap.to(playhead, {
              frame: animation.totalFrames - 1,
              ease: 'none',
              onUpdate: () => animation.goToAndStop(playhead.frame, true),
              scrollTrigger: st
            });
            return () => animation.destroy && animation.destroy();
          };
          ctx && ctx.add ? ctx.add(createTween) : createTween();
          // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
        return animation;
      }
    }
  }

  function aboutAnimation() {
    if (document.querySelector('.about-section')) {
      const heading1 = document.querySelector('[data-splittype="heading1"]');
      const heading2 = document.querySelector('[data-splittype="heading2"]');

      const splitHeading1 = new SplitType(heading1, { types: 'words, chars' });
      const splitHeading2 = new SplitType(heading2, { types: 'words, chars' });

      let mm = gsap.matchMedia();

      mm.add('(max-width: 767px)', () => {
        // mobile setup code here...

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'center center',
            end: '1000% top',
            scrub: true,
            pin: '.about-container-grid',
            pinSpacing: true
          }
        });

        tl.set(splitHeading2.words, { overflow: 'hidden' });
        tl.set('.about-hero-image', { opacity: 0, y: 48, rotation: 1.5 });

        tl.from(splitHeading1.chars, {
          opacity: 0.1,
          duration: 0.4,
          ease: 'power1.out',
          stagger: { amount: 1 }
        }).from(splitHeading2.chars, {
          yPercent: 100,
          duration: 0.6,
          ease: 'power1.out',
          stagger: { amount: 3 }
        });

        tl.to(
          '.about-hero-image',
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 2
          },
          '<10%'
        );
      });

      mm.add('(min-width: 768px)', () => {
        // desktop setup code here...

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-container-grid',
            start: 'top top',
            end: '90% bottom',
            scrub: true,
            pin: '.about-heading-container',
            pinSpacing: false
            // anticipatePin: 1
          }
        });

        tl.set(splitHeading2.words, { overflow: 'hidden' });

        tl.to({}, { duration: 0.1 })
          .from(splitHeading1.chars, {
            opacity: 0.1,
            duration: 0.35,
            ease: 'power1.out',
            stagger: { amount: 1 }
          })
          .from(splitHeading2.chars, {
            yPercent: 100,
            duration: 0.55,
            ease: 'power1.out',
            stagger: { amount: 3 }
          });

        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: '.about-container-grid',
            start: 'top top',
            end: '100% bottom',
            scrub: true,
            pin: '.about-hero-image-container',
            pinSpacing: true
            // anticipatePin: 1
          }
        });

        tl2.set('.about-hero-image', { opacity: 0, y: 0, rotation: 1.5 });
        tl2.to({}, { duration: 5 });
        tl2.to('.about-hero-image', {
          opacity: 1,
          y: -96,
          rotation: 0,
          duration: 5
        });
      });
    }
  }

  function phrasesAnimation() {
    if (document.querySelector('.phrases-section')) {
      const phrase1 = document.querySelector('[data-splittype="phrase1"]');
      const phrase2 = document.querySelector('[data-splittype="phrase2"]');
      const phrase3 = document.querySelector('[data-splittype="phrase3"]');

      const splitPhrase1 = new SplitType(phrase1, { types: 'words, chars' });
      const splitPhrase2 = new SplitType(phrase2, { types: 'words, chars' });
      const splitPhrase3 = new SplitType(phrase3, { types: 'words, chars' });

      // console.log({ splitPhrase1 });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.phrase-container',
          start: 'top top',
          end: '300% top',
          scrub: true,
          pin: true,
          pinSpacing: true
          // anticipatePin: 1
        }
      });

      tl.fromTo(splitPhrase1.chars, { visibility: 'hidden' }, { visibility: 'visible', stagger: { amount: 5 } });
      tl.set(splitPhrase1.chars, { visibility: 'hidden' });
      tl.to('.phrase-container', {
        backgroundColor: '#f1efec',
        color: '#373737',
        duration: 0.2
      });
      tl.to('.decoration-border', { borderColor: '#373737', duration: 0.2 }, '<');
      tl.fromTo(splitPhrase2.chars, { visibility: 'hidden' }, { visibility: 'visible', stagger: { amount: 5 } });
      tl.set(splitPhrase2.chars, { visibility: 'hidden' });
      tl.to('.phrase-container', {
        backgroundImage:
          'linear-gradient(116deg, #ee8981, #e67474 17%, #de626c 36%, #d85565 56%, #cb4d7d 72%, #ab418b)',
        color: '#ffffff',
        duration: 0.2
      });
      tl.to('.decoration-border', { borderColor: '#ffffff', duration: 0.2 }, '<');
      tl.fromTo(splitPhrase3.chars, { visibility: 'hidden' }, { visibility: 'visible', stagger: { amount: 5 } });
    }
  }

  function carousel() {
    // Initiate swipers and default settings
    $('.slider-main_component').each(function (index) {
      let loopMode = false;
      if ($(this).attr('loop-mode') === 'true') {
        loopMode = true;
      }
      let sliderDuration = 300;
      if ($(this).attr('slider-duration') !== undefined) {
        sliderDuration = +$(this).attr('slider-duration');
      }
      const swiper = new Swiper($(this).find('.swiper')[0], {
        speed: sliderDuration,
        loop: loopMode,
        autoHeight: false,
        centeredSlides: loopMode,
        followFinger: true,
        freeMode: false,
        slideToClickedSlide: false,
        slidesPerView: 1.2,
        spaceBetween: 16,
        rewind: false,
        mousewheel: {
          forceToAxis: true
        },
        keyboard: false,
        breakpoints: {
          // mobile landscape
          480: {
            slidesPerView: 1.5,
            spaceBetween: 16
          },
          // tablet
          768: {
            slidesPerView: 2.2,
            spaceBetween: 16
          },
          // desktop
          992: {
            slidesPerView: 4,
            spaceBetween: 16
          }
        },
        pagination: false,
        navigation: {
          nextEl: $(this).find('.swiper-next')[0],
          prevEl: $(this).find('.swiper-prev')[0],
          disabledClass: 'is-disabled'
        },
        scrollbar: false,
        slideActiveClass: 'is-active',
        slideDuplicateActiveClass: 'is-active'
      });
    });
  }

  function articleImageParallax() {
    if (document.querySelector('.article-image-container')) {
      // Article image parallax effect
      $('.article-image-container').each(function (index) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        tl.to($(this).find('.article-image'), {
          yPercent: 16,
          ease: 'none'
        });
      });
    }
  }

  function articleInfiniteMarquee() {
    const marquee = document.querySelector('[data-kw="marquee"]');
    if (!marquee) {
      return;
    }
    const duration = parseInt(marquee.getAttribute('duration'), 10) || 5;
    const marqueeContent = marquee.firstChild;
    if (!marqueeContent) {
      return;
    }

    const marqueeContentClone = marqueeContent.cloneNode(true);
    marquee.append(marqueeContentClone);

    let tween;

    const playMarquee = () => {
      let progress = tween ? tween.progress() : 0;
      tween && tween.progress(0).kill();
      const width = parseInt(getComputedStyle(marqueeContent).getPropertyValue('width'), 10);
      const gap = parseInt(getComputedStyle(marquee).getPropertyValue('column-gap'), 10);
      const distanceToTranslate = -1 * (gap + width);

      tween = gsap.fromTo(marquee.children, { x: 0 }, { x: distanceToTranslate, duration, ease: 'none', repeat: -1 });
      tween.progress(progress);
      // console.log({ width });
    };
    playMarquee();

    function debounce(func) {
      var timer;
      return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(
          () => {
            func();
          },
          500,
          event
        );
      };
    }

    window.addEventListener('resize', debounce(playMarquee));
  }

  function inViewImageScale() {
    if (document.querySelector('.mission-section')) {
      gsap.to('.mission-hero-image', {
        scrollTrigger: {
          trigger: '.mission-hero-image-container',
          start: '10% bottom',
          end: 'bottom 10%',
          scrub: true
        },
        scale: 1.2,
        ease: 'none'
      });
    }
  }

  function inViewImageParallax() {
    if (document.querySelector('.mission-section')) {
      gsap.to('.mission-image', {
        scrollTrigger: {
          trigger: '.mission-image-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        yPercent: -30,
        ease: 'none'
      });
    }
  }

  function scrollArrow() {
    if (document.querySelector('.scroll-arrow')) {
      let tlScrollArrowBounce = gsap.timeline({
        repeat: -1,
        defaults: { duration: 0.5 }
      });

      tlScrollArrowBounce.to('.scroll-arrow', { y: 4 }).to('.scroll-arrow', { y: 0 });
    }
  }

  function showIntroAnimation() {
    if (document.querySelector('.show-section')) {
      gsap.set('.show-intro', { height: '170vh' });
      gsap.to('.show-intro-heading-inner', {
        scale: 0.5,
        ease: 'power1.out',
        duration: 1,
        scrollTrigger: {
          trigger: '.show-intro',
          start: 'top top',
          end: '100% top',
          scrub: true,
          pin: true,
          pinSpacing: false
        }
      });
    }
  }

  function showHeroAnimation() {
    if (document.querySelector('.show-section')) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.show-hero',
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          pin: false,
          pinSpacing: false
        }
      });

      tl.set('.show-hero-container', { scale: 0.6 });
      tl.to('.show-hero-container', {
        scale: 1,
        ease: 'power1.out'
      });
    }
  }

  function bgVideoPlaybackOriginal() {
    if (document.querySelector('.show-hero')) {
      let mm = gsap.matchMedia();

      mm.add('(max-width: 767px)', () => {
        // mobile setup code here...
        const video = document.getElementById('bgVideoMobile');

        function playVideo() {
          video.play();
          console.log('Play video');
        }

        function pauseVideo() {
          video.pause();
          console.log('Pause video');
        }

        ScrollTrigger.create({
          trigger: '.show-hero',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: playVideo,
          onLeave: pauseVideo,
          onEnterBack: playVideo,
          onLeaveBack: pauseVideo
        });
      });

      mm.add('(min-width: 768px)', () => {
        // desktop setup code here...
        const video = document.getElementById('bgVideo');

        function playVideo() {
          video.play();
          console.log('Play video');
        }

        function pauseVideo() {
          video.pause();
          console.log('Pause video');
        }

        ScrollTrigger.create({
          trigger: '.show-hero',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: playVideo,
          onLeave: pauseVideo,
          onEnterBack: playVideo,
          onLeaveBack: pauseVideo
        });
      });
    }
  }

  function headingInViewAnimation() {
    if (document.querySelector('.mission-heading')) {
      const heading = document.querySelector('.mission-heading');

      const splitHeading = new SplitType(heading, { types: 'lines' });

      // console.log({ splitHeading });

      let tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: '.mission-heading-container',
          start: 'top bottom',
          toggleActions: 'play none none reset'
        }
      });

      tl.from(splitHeading.lines, {
        opacity: 0,
        y: -48,
        ease: 'power1.out',
        duration: 1.2,
        stagger: { amount: 0.5 }
      });
    }
  }

  function carsouselInViewAnimation() {
    if (document.querySelector('.slider-main_component')) {
      const carouselElements = document.querySelectorAll('.swiper');

      carouselElements.forEach((carouselElement) => {
        const carouselItems = carouselElement.querySelectorAll('.swiper-slide');
        // console.log({ carouselItems });

        let tl = gsap.timeline({
          paused: true,
          scrollTrigger: {
            trigger: carouselElement,
            start: 'top bottom',
            toggleActions: 'play none none reset'
          }
        });

        tl.from(carouselItems, {
          opacity: 0,
          y: -48,
          ease: 'power1.out',
          duration: 1.2,
          stagger: { each: 0.2 }
        });
      });
    }
  }

  function getSydneyTime() {
    if (document.querySelector('#timeInSydney')) {
      var clock = setInterval(getTime, 1000);

      function getTime() {
        var d = new Date();
        var sydneyTime = d.toLocaleTimeString('en-US', { timeZone: 'Australia/Sydney' });
        document.getElementById('timeInSydney').innerHTML = sydneyTime;
      }
    }
  }

  function inViewImageGradientOverlay() {
    if (document.querySelector('.has-gradient-overlay')) {
      const imageOverlayElements = gsap.utils.toArray('.has-gradient-overlay');

      imageOverlayElements.forEach((imageOverlayElement) => {
        const gradientOverlay = imageOverlayElement.querySelector('.gradient-overlay');

        let tl = gsap.timeline({
          paused: true,
          scrollTrigger: {
            trigger: imageOverlayElement,
            start: '20% bottom',
            toggleActions: 'play none none none'
          }
        });

        // TODO: move out custom ease
        CustomEase.create('imageReveal', 'M0,0 C1,0 0.25,0.995 1,1 ');

        tl.to(gradientOverlay, {
          y: '98%',
          ease: 'imageReveal',
          duration: 1
        });
        tl.set(gradientOverlay, { autoAlpha: 0 });
      });
    }
  }

  function postImageGridParallax() {
    if (document.querySelector('.post-image-grid__parallax-wrapper')) {
      $('.post-image-grid__image-container--3by2, .post-image-grid__image-container--1by1').each(function (index) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
        tl.fromTo(
          $(this).find('.post-image-grid__parallax-wrapper'),
          { yPercent: -10 },
          { yPercent: 10, ease: 'none' }
        );
      });
    }
  }

  function millionQuestions() {
    var rectangleData = [
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e3407634605830cf0b110_question-01.png',
        width: 366,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e3408c6cb4ae37a8c2668_question-02.png',
        width: 312,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340a5665c60c90870223_question-03.png',
        width: 316,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e34089a6a15235f43da25_question-04.png',
        width: 356,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e3408532c272ff41f4017_question-05.png',
        width: 146,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340a177a0e346ceea423_question-06.png',
        width: 344,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e3409df2f00e1ba2bf1f4_question-07.png',
        width: 242,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340ac2584cf0a115a646_question-08.png',
        width: 372,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e3409c2584cf0a115a5cc_question-09.png',
        width: 358,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340a859f7ef17cd2e904_question-10.png',
        width: 236,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e3409b1ba3e6fb1d869e8_question-11.png',
        width: 272,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340af83764e0d73cf179_question-12.png',
        width: 360,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340a29ef510647761b13_question-13.png',
        width: 280,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340adf2f00e1ba2bf267_question-14.png',
        width: 326,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340aec0aa957abec7380_question-15.png',
        width: 486,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340b29ef510647761bbd_question-16.png',
        width: 436,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340be0d72d521ae60002_question-17.png',
        width: 418,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340b1e95df1c73fb6c84_question-18.png',
        width: 344,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340b172747b22453bc57_question-19.png',
        width: 228,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340bfff61bfa43c900d3_question-20.png',
        width: 426,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340b172747b22453bdfa_question-21.png',
        width: 278,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340b621cc586473fc55a_question-22.png',
        width: 360,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340cda9971e1c3e80bbb_question-23.png',
        width: 430,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340b08d71e9b0a053cdb_question-24.png',
        width: 224,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340c6fc80825a1a47c97_question-25.png',
        width: 404,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340cb1ba3e6fb1d86ca1_question-26.png',
        width: 502,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340bcc51dbe5e0063a61_question-27.png',
        width: 446,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340c634605830cf0b871_question-28.png',
        width: 494,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340ce0d72d521ae60195_question-29.png',
        width: 464,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340cc81e99686b8f982c_question-30.png',
        width: 336,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340c547361b498a7c7ff_question-31.png',
        width: 342,
        height: 76
      },
      {
        texture: 'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/652e340cda9971e1c3e80c07_question-32.png',
        width: 290,
        height: 76
      }
    ];

    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composites = Matter.Composites,
      Common = Matter.Common,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies;

    // Create engine
    var engine = Engine.create(),
      world = engine.world;

    // Get the "questionsContainer" element
    var questionsContainer = document.getElementById('questionsContainer');

    // Function to set canvas dimensions based on "questionsContainer"
    function setCanvasDimensions() {
      var width = questionsContainer.clientWidth;
      var height = questionsContainer.clientHeight;

      render.options.width = width;
      render.options.height = height;

      // Calculate the number of rectangles based on the viewport width
      var numRectangles = Math.floor(width / 24); // Adjust the factor as needed
      generateRectangles(numRectangles);
    }

    // Function to generate rectangles
    function generateRectangles(numRectangles) {
      Composite.clear(world);
      var objects = [];
      var totalRectangles = 0;
      var dataIndex = 0;

      while (totalRectangles < numRectangles) {
        var x = Common.random(20, render.canvas.width - 20);
        var y = Common.random(50, render.canvas.height - 50);
        var data = rectangleData[dataIndex % rectangleData.length]; // Cycle through rectangleData
        var angle = Common.random(-0.4, 0.4);
        var friction = Common.random(0.0, 0.03); // Adjust the range as needed

        var rect = Bodies.rectangle(x, y, data.width, data.height, {
          chamfer: { radius: 32 }, // Border radius
          render: {
            sprite: {
              texture: data.texture
            }
          },
          angle: angle,
          frictionAir: friction
        });

        objects.push(rect);
        totalRectangles++;
        dataIndex++;
      }

      Composite.add(world, objects);
    }

    // Create renderer with dynamic width and height
    var render = Render.create({
      element: questionsContainer, // Use the "questionsContainer" div
      engine: engine,
      options: {
        width: questionsContainer.clientWidth, // Initial width
        height: questionsContainer.clientHeight, // Initial height
        pixelRatio: 2,
        background: 'rgba(0, 0, 0, 0)',
        // showAngleIndicator: true,
        wireframes: false
        // isStatic: true
      }
    });

    Render.run(render);

    // Create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // Set the runner to start in a paused state
    runner.enabled = false;

    // Set canvas dimensions initially
    setCanvasDimensions();

    Composite.add(world, [
      // walls
      Bodies.rectangle(render.canvas.width / 2, 0, render.canvas.width, 1, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent'
        }
      }),
      Bodies.rectangle(render.canvas.width / 2, render.canvas.height - 16, render.canvas.width, 1, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent'
        }
      }),
      Bodies.rectangle(render.canvas.width, render.canvas.height / 2, 1, render.canvas.height, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent'
        }
      }),
      Bodies.rectangle(0, render.canvas.height / 2, 1, render.canvas.height, {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent'
        }
      })
    ]);

    // Add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    mouseConstraint.mouse.element.removeEventListener('mousewheel', mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener('DOMMouseScroll', mouseConstraint.mouse.mousewheel);

    // Handle window resize events
    // window.addEventListener("resize", setCanvasDimensions);

    // Fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: render.canvas.width, y: render.canvas.height }
    });

    // let matterEnabled = false; // Flag to control Matter.js engine

    const enableMatter = () => {
      runner.enabled = true; // Enable the Matter.js engine
    };

    const disableMatter = () => {
      runner.enabled = false; // Disable the Matter.js engine
    };

    // Add scrollTrigger
    ScrollTrigger.create({
      trigger: '#questionsContainer', // Element that triggers the animation
      start: 'top 80%',
      end: 'bottom top',
      onEnter: enableMatter,
      onLeave: disableMatter,
      onEnterBack: enableMatter
    });
  }

  function showVideoAnimation() {
    if (document.querySelector('.show-hero__kw')) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.show-hero__kw',
          start: 'top 115%',
          end: 'top 8%',
          scrub: 1.5,
          pin: false,
          pinSpacing: false
        }
      });

      tl.set('.show-hero-container__kw', {
        scale: 0.4,
        transformOrigin: 'center center'
      });
      tl.to('.show-hero-container__kw', {
        scale: 1,
        ease: 'power1.out'
      });
    }
  }

  function bgVideoPlayback() {
    if (document.querySelector('.show-hero__kw')) {
      let mm = gsap.matchMedia();

      mm.add('(max-width: 767px)', () => {
        // mobile setup code here...
        const video = document.getElementById('bgVideoMobile');

        function playVideo() {
          video.play();
          console.log('Play video');
        }

        function pauseVideo() {
          video.pause();
          console.log('Pause video');
        }

        ScrollTrigger.create({
          trigger: '.show-hero__kw',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: playVideo,
          onLeave: pauseVideo,
          onEnterBack: playVideo,
          onLeaveBack: pauseVideo
        });
      });

      mm.add('(min-width: 768px)', () => {
        // desktop setup code here...
        const video = document.getElementById('bgVideo');

        function playVideo() {
          video.play();
          console.log('Play video');
        }

        function pauseVideo() {
          video.pause();
          console.log('Pause video');
        }

        ScrollTrigger.create({
          trigger: '.show-hero__kw',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: playVideo,
          onLeave: pauseVideo,
          onEnterBack: playVideo,
          onLeaveBack: pauseVideo
        });
      });
    }
  }

  function splitTextChars() {
    if (document.querySelector('[data-splitText="chars"]')) {
      const textEl = document.querySelector('[data-splitText="chars"]');
      const splitText = new SplitType(textEl, {
        types: 'words, chars',
        tagName: 'span'
      });

      let tl = gsap.timeline({
        // repeat: -1,
        // repeatDelay: 0.5,
        // paused: false
      });

      gsap.set(splitText.words, { overflow: 'hidden' });

      tl.from(splitText.chars, {
        yPercent: 100,
        autoAlpha: 0,
        duration: 0.25,
        // ease: "power1.in",
        stagger: {
          // each: 0.025,
          amount: 0.75, // total amount
          ease: 'power1.in'
        }
      });
      return tl;
    }
  }

  function splitTextLines() {
    if (document.querySelector('[data-splitText="lines"]')) {
      const textElements = document.querySelectorAll('[data-splitText="lines"]');
      const timelines = [];

      textElements.forEach((textEl) => {
        const splitText = new SplitType(textEl, {
          types: 'lines, words',
          tagName: 'span'
        });

        let tl = gsap.timeline({
          // repeat: -1,
          // repeatDelay: 0.5,
          // paused: false
        });

        gsap.set(splitText.lines, { overflow: 'hidden' });

        tl.from(splitText.lines, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.3,
          stagger: {
            each: 0.075,
            // amount: 0.7, // total amount
            ease: 'none'
          }
        });

        timelines.push(tl);
      });

      return timelines; // Return an array of timelines
    }
  }

  function masterTimeline() {
    // stitch them together in a master timeline...
    const individualTimelines = splitTextLines();

    var master = gsap.timeline({
      // repeat: -1,
      // repeatDelay: 3,
      paused: true
    });

    master.add(splitTextChars());
    individualTimelines.forEach((timeline) => {
      master.add(timeline, 0.5);
    });

    ScrollTrigger.create({
      trigger: '.whatwedo__heading',
      start: 'top 80%',
      onEnter: () => {
        // Play the master timeline when the trigger element is in view
        master.play();
      }
    });
  }

  function inspirationHeroCardHover() {
    let inspoCards = document.querySelectorAll('.inspiration-card__link');

    inspoCards.forEach((inspoCard) => {
      let anim = gsap.to(inspoCard.querySelector('.inspiration-card__content'), {
        paused: true,
        ease: 'power1.out',
        duration: 0.4,
        y: -128
      });

      inspoCard.addEventListener('mouseenter', () => anim.play());
      inspoCard.addEventListener('mouseleave', () => anim.reverse());
    });
  }

  function homeCardCarousel() {
    // Initiate swipers and default settings
    $('.slider-main_home').each(function (index) {
      let loopMode = false;
      if ($(this).attr('loop-mode') === 'true') {
        loopMode = true;
      }
      let sliderDuration = 260;
      if ($(this).attr('slider-duration') !== undefined) {
        sliderDuration = +$(this).attr('slider-duration');
      }
      const swiper = new Swiper($(this).find('.swiper')[0], {
        speed: sliderDuration,
        loop: loopMode,
        autoHeight: false,
        centeredSlides: loopMode,
        followFinger: true,
        freeMode: false,
        slideToClickedSlide: false,
        slidesPerView: 1.2,
        spaceBetween: 16,
        rewind: false,
        mousewheel: {
          forceToAxis: true
        },
        keyboard: false,
        breakpoints: {
          // mobile landscape
          480: {
            slidesPerView: 1.5,
            spaceBetween: 16
          },
          // tablet
          768: {
            slidesPerView: 2.2,
            spaceBetween: 16
          },
          // desktop
          992: {
            slidesPerView: 3.1,
            spaceBetween: 16
          },
          1280: {
            slidesPerView: 4.1,
            spaceBetween: 16
          }
        },
        pagination: false,
        navigation: {
          nextEl: $(this).find('.swiper-next')[0],
          prevEl: $(this).find('.swiper-prev')[0],
          disabledClass: 'is-disabled'
        },
        scrollbar: false,
        slideActiveClass: 'is-active',
        slideDuplicateActiveClass: 'is-active'
      });
    });
  }

  function growingmindsCarousel() {
    // Initiate swipers and default settings
    $('.slider-main__growingminds').each(function (index) {
      let loopMode = false;
      if ($(this).attr('loop-mode') === 'true') {
        loopMode = true;
      }
      let sliderDuration = 260;
      if ($(this).attr('slider-duration') !== undefined) {
        sliderDuration = +$(this).attr('slider-duration');
      }
      const swiper = new Swiper($(this).find('.swiper')[0], {
        speed: sliderDuration,
        loop: loopMode,
        autoHeight: false,
        centeredSlides: loopMode,
        followFinger: true,
        freeMode: false,
        slideToClickedSlide: false,
        slidesPerView: 1.5,
        spaceBetween: 8,
        rewind: false,
        mousewheel: {
          forceToAxis: true
        },
        keyboard: false,
        breakpoints: {
          // mobile landscape
          480: {
            slidesPerView: 2.5,
            spaceBetween: 8
          },
          // tablet
          768: {
            slidesPerView: 1.5,
            spaceBetween: 16
          },
          // desktop
          992: {
            slidesPerView: 2.5,
            spaceBetween: 16
          },
          1280: {
            slidesPerView: 2.5,
            spaceBetween: 16
          }
        },
        pagination: false,
        // navigation: {
        //   nextEl: $(this).find(".swiper-next")[0],
        //   prevEl: $(this).find(".swiper-prev")[0],
        //   disabledClass: "is-disabled"
        // },
        navigation: false,
        scrollbar: false,
        slideActiveClass: 'is-active',
        slideDuplicateActiveClass: 'is-active'
      });
    });
  }

  function scaleCardImageOnHover() {
    if (document.querySelector('.card')) {
      const cards = document.querySelectorAll('.card');

      cards.forEach((card) => {
        // Add event listener for mouseover
        card.addEventListener('mouseover', function () {
          const willScale = card.querySelector('.scale');
          willScale.classList.add('hover');
        });

        // Add event listener for mouseout
        card.addEventListener('mouseout', function () {
          const willScale = card.querySelector('.scale');
          willScale.classList.remove('hover');
        });
      });
    }
  }

  function removePreloader() {
    if (document.querySelector('#preloader')) {
      const preloader = document.getElementById('preloader');

      let tl = gsap.timeline({
        // paused: true
      });

      tl.to(preloader, {
        delay: 0.4,
        duration: 0.5,
        ease: 'power1.out',
        autoAlpha: 0
      });

      return tl;
    }
  }

  function splitTextCharacters() {
    if (document.querySelector('[data-splitText="chars"]')) {
      const textEl = document.querySelector('[data-splitText="chars"]');
      const splitText = new SplitType(textEl, {
        types: 'words, chars',
        tagName: 'span'
      });

      let tl = gsap.timeline({
        // repeat: -1,
        // repeatDelay: 0.5,
        // paused: false
      });

      gsap.set(splitText.words, { overflow: 'hidden' });

      tl.from(splitText.chars, {
        yPercent: 100,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power1.out',
        stagger: {
          // each: 0.025,
          amount: 0.25, // total amount
          ease: 'power1.in'
        }
      });
      return tl;
    }
  }

  function splitTextWords() {
    if (document.querySelector('[data-splitText="words"]')) {
      const textElements = document.querySelectorAll('[data-splitText="words"]');
      const timelines = [];

      textElements.forEach((textEl) => {
        const splitText = new SplitType(textEl, {
          types: 'lines, words',
          tagName: 'span'
        });

        let tl = gsap.timeline({});

        gsap.set(splitText.lines, { overflow: 'hidden' });

        tl.from(splitText.words, {
          yPercent: 100,
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power1.out',
          stagger: {
            each: 0.01,
            // amount: 0.7, // total amount
            ease: 'none'
          }
        });

        timelines.push(tl);
      });

      return timelines; // Return an array of timelines
    }
  }

  function setInViewGradientOverlay() {
    let tl = gsap.timeline({
      onComplete: inViewImageGradientOverlay
    });

    return tl;
  }

  function pageLoadAnimation() {
    const splitTextWordsTimelines = splitTextWords();

    var master = gsap.timeline({
      // onComplete: inViewImageGradientOverlay
    });

    master.add(removePreloader());
    master.add(splitTextCharacters(), '>-0.4');
    splitTextWordsTimelines.forEach((timeline) => {
      master.add(timeline, '<25%');
    });
    master.add(setInViewGradientOverlay(), '<');
  }

  function homePage() {
    // homePage
    setHeroIntroAnimation();
    heroOutroScrollAnimation();

    window.addEventListener('load', () => {
      console.log('loaded'); // TODO get rid when confident
      homeIntroAnimation();
    });

    // heroOutroAnimation();
    // scrollArrow();
    masterTimeline(); // get better name
    millionQuestions();

    // aboutAnimation();
    // headingInViewAnimation();
    // inViewImageScale();
    // inViewImageParallax();

    // showIntroAnimation();
    // showHeroAnimation();
    showVideoAnimation();

    phrasesAnimation();

    inspirationHeroCardHover();
    // carsouselInViewAnimation();

    // bgVideoPlaybackOriginal();

    // carousel();
    growingmindsCarousel();
    homeCardCarousel();
  }

  function contentPage() {
    // about, exhibitions, inspired,
    window.addEventListener('load', () => {
      pageLoadAnimation();
    });

    // aboutPage
    getSydneyTime();

    // aboutPage, partnerships & contact

    // inViewImageGradientOverlay();
  }

  function postPage() {
    // articlePage / postPage
    // articleImageParallax();
    // articleInfiniteMarquee();
    // fullScreenHero();

    postImageGridParallax();
  }

  function init() {
    // global
    navDrawer();
    bgVideoPlayback();
    scaleCardImageOnHover();

    // page specific
    if (document.body.classList.contains('homepage')) {
      homePage();
    } else if (document.body.classList.contains('content-page')) {
      contentPage(); // about, exhibitions, inspired, partnerships & contact
    } else if (document.body.classList.contains('post-page')) {
      postPage(); // articlePage/postPage
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    // Call the initialization function
    init();
  });
})();
