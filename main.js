// Menu & sign up

function toggleDrawer() {
  const hideDrawerBtn = document.querySelector('.close-btn');
  const drawerContainer = document.querySelector('.drawer-container');
  const overlay = document.querySelector('.dialog-overlay');
  const drawer = document.querySelector('.drawer');
  const menu = document.querySelector('.drawer .menu');
  const signup = document.querySelector('.drawer .signup');

  const showMenuBtn = document.querySelector('.menu-btn');
  const showSignupBtns = document.querySelectorAll('.signup-btn');

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
}

// Animations

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
      backgroundImage: 'linear-gradient(116deg, #ee8981, #e67474 17%, #de626c 36%, #d85565 56%, #cb4d7d 72%, #ab418b)',
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

function bgVideoPlayback() {
  if (document.querySelector('#bgVideo')) {
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
  if (document.querySelector('.swiper')) {
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
    const imageOverlayElements = document.querySelectorAll('.has-gradient-overlay');

    imageOverlayElements.forEach((imageOverlayElement) => {
      const gradientOverlay = imageOverlayElement.querySelector('.gradient-overlay');

      let tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: imageOverlayElement,
          start: '10% bottom',
          toggleActions: 'play none none none'
        }
      });

      // TODO: move out custom ease
      CustomEase.create('imageReveal', 'M0,0 C1,0 0.25,0.995 1,1 ');

      tl.from(gradientOverlay, {
        y: '0%',
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
          scrub: true
        }
      });
      tl.fromTo($(this).find('.post-image-grid__parallax-wrapper'), { yPercent: -10 }, { yPercent: 10, ease: 'none' });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  toggleDrawer();
  aboutAnimation();
  phrasesAnimation();
  heroOutroAnimation();
  carousel();
  articleImageParallax();
  articleInfiniteMarquee();
  fullScreenHero();
  inViewImageScale();
  inViewImageParallax();
  // scrollArrow();
  showIntroAnimation();
  showHeroAnimation();
  bgVideoPlayback();
  headingInViewAnimation();
  carsouselInViewAnimation();
  getSydneyTime();
  inViewImageGradientOverlay();
  postImageGridParallax();
});
