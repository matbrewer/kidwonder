(function () {
  // Menu & sign up dialog
  function navDrawer() {
    var dialogEl = document.getElementById('dialog');
    var dialog = new A11yDialog(dialogEl);

    const hideDrawerBtn = document.querySelector('.close-btn');
    // const drawerContainer = document.querySelector('.drawer-container');
    const overlay = document.querySelector('.dialog-overlay');
    const drawer = document.querySelector('.drawer');
    const menu = document.querySelector('.drawer .menu');
    const signup = document.querySelector('.drawer .signup');

    const showMenuBtn = document.querySelector('.menu-btn');
    const showSignupBtns = document.querySelectorAll('.signup-btn');
    const toggleSignupBtn = document.querySelector('.toggle-signup');

    showMenuBtn.addEventListener('click', function (e) {
      dialog.show();
      gsap.set(menu, { display: 'flex' });
      gsap.set(signup, { display: 'none' });
      showDrawerAnimation.restart();
      e.preventDefault();
    });

    showSignupBtns.forEach((showSignupBtn) => {
      showSignupBtn.addEventListener('click', function (e) {
        dialog.show();
        gsap.set(signup, { display: 'flex' });
        gsap.set(menu, { display: 'none' });
        showDrawerAnimation.restart();
        e.preventDefault();
      });
    });

    toggleSignupBtn.addEventListener('click', function (e) {
      swapDrawerAnimation.restart();
      e.preventDefault();
    });

    hideDrawerBtn.addEventListener('click', function (e) {
      hideDrawerAnimation.restart();
      e.preventDefault();
    });

    overlay.addEventListener('click', function (e) {
      hideDrawerAnimation.restart();
      e.preventDefault();
    });

    const showDrawerAnimation = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: 'power1.out'
        }
      })
      .set(drawer, { xPercent: 100, x: 0 })
      .to(overlay, { duration: 0.5, opacity: 1 })
      .to(drawer, { duration: 0.2, xPercent: 0 }, '<0.2');

    function dialogHide() {
      dialog.hide();
    }

    const hideDrawerAnimation = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: 'power1.out'
        },
        onComplete: dialogHide
      })
      .to(drawer, { delay: 0.2, duration: 0.2, xPercent: 100 })
      .to(overlay, { duration: 0.5, opacity: 0 }, '<0.2');

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

  CustomEase.create('imageReveal', 'M0,0 C1,0 0.25,0.995 1,1 ');

  function setHeroIntroAnimation() {
    // Get the element with the ID 'heroIntro'
    const heroIntro = document.getElementById('heroIntro');

    // Specify the path to your Lottie animation JSON file
    const animationPath =
      'https://uploads-ssl.webflow.com/64b36a0c61b7437799a31357/65c30bda185964d6965e68ca_kw-hero-intro.json';

    // Configure the Lottie options (you can adjust these based on your needs)
    const animationOptions = {
      container: heroIntro,
      renderer: 'svg',
      loop: false, // Set to true if you want the animation to loop
      autoplay: false, // Set to true if you want the animation to play automatically
      path: animationPath,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        // title: 'Kidwonder logo animation',
        // description: 'Letters of the Kidwonder logo fall from above.'
      }
    };

    // Create the Lottie animation
    heroIntroAnimation = lottie.loadAnimation(animationOptions);
  }

  function playHeroIntroAnimation() {
    // Check if the 'anim' object is defined
    if (heroIntroAnimation) {
      // Control the animation using the 'heroIntroAnimation' object
      heroIntroAnimation.play();
    } else {
      console.error('Hero intro animation not initialized.');
    }
  }

  function homeIntroAnimation() {
    const body = document.body;
    // const aoc = document.getElementById('aoc');
    const introWrapper = document.getElementById('heroIntro');
    const heroBullets = document.querySelectorAll('.hero-bullet');
    const heroScroll = document.querySelector('.scroll');

    // Add attributes to the SVG intro element
    let svgElement = heroIntro.querySelector('svg');
    svgElement.setAttribute('aria-hidden', 'true');

    // Timeline
    let tl = gsap.timeline({
      // paused: true
    });

    tl.set(body, {
      overflow: 'hidden',
      width: '100vw',
      position: 'fixed'
    });
    // tl.to(aoc, {
    //   duration: 0.5,
    //   ease: 'power1.out',
    //   delay: 3,
    //   autoAlpha: 0,
    //   onComplete: playHeroIntroAnimation
    // });
    tl.to({}, { duration: 0.9 }); // empty tween for overlay to close
    tl.set(body, {
      position: 'relative'
    });
    tl.to(
      {},
      {
        duration: 3.5,
        onStart: playHeroIntroAnimation
      }
    ); // empty tween for lottie animation
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
    tl.add(actionBtnAnimateIn(), '<');

    return tl;
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
              // title: 'Kidwonder logo animates out',
              // description: 'Letters of the Kidwonder logo animate upwards on scroll.'
            }
          });

        animation.addEventListener('DOMLoaded', function () {
          let svgElement = target.querySelector('svg');
          svgElement.setAttribute('aria-hidden', 'true');
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

    // Get the canvas element
    var canvasElement = render.canvas;

    // Add attributes
    canvasElement.setAttribute('role', 'img');
    canvasElement.setAttribute(
      'aria-label',
      'A pile of stacked short questions such as "Can you see sound?" and "Is the moon following me?"'
    );

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

  function inViewShowHeroTransition() {
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
        const controls = document.getElementById('playPauseBtn');
        let userInteracted = false; // Flag to track user interaction

        function playVideo() {
          if (!userInteracted) {
            video.play();
            controls.setAttribute('aria-label', 'Pause video');
            controls.classList.remove('paused');
            console.log('Play video');
          }
        }

        function pauseVideo() {
          if (!userInteracted) {
            video.pause();
            controls.setAttribute('aria-label', 'Play video');
            controls.classList.add('paused');
            console.log('Pause video');
          }
        }

        function toggleVideoPlayback() {
          userInteracted = true; // Set the flag to true on user interaction
          if (video.paused) {
            video.play();
            controls.setAttribute('aria-label', 'Pause video');
            controls.classList.remove('paused');
            console.log('Play btn');
          } else {
            video.pause();
            controls.setAttribute('aria-label', 'Play video');
            controls.classList.add('paused');
            console.log('Pause btn');
          }
        }

        // Add event listener for manual play and pause
        controls.addEventListener('click', toggleVideoPlayback);

        ScrollTrigger.create({
          trigger: '.show-hero__kw',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: playVideo,
          onLeave: pauseVideo,
          onEnterBack: playVideo,
          onLeaveBack: pauseVideo
        });

        return () => {
          // optional
          controls.removeEventListener('click', toggleVideoPlayback);
        };
      });

      mm.add('(min-width: 768px)', () => {
        // desktop setup code here...
        const video = document.getElementById('bgVideo');
        const controls = document.getElementById('playPauseBtn');
        let userInteracted = false; // Flag to track user interaction

        function playVideo() {
          if (!userInteracted) {
            // setTimeout fix for Safari autoplay
            setTimeout(function () {
              video.play();
              controls.setAttribute('aria-label', 'Pause video');
              controls.classList.remove('paused');
              console.log('Play video');
            }, 50);
          }
        }

        function pauseVideo() {
          if (!userInteracted) {
            video.pause();
            controls.setAttribute('aria-label', 'Play video');
            controls.classList.add('paused');
            console.log('Pause video');
          }
        }

        function toggleVideoPlayback() {
          userInteracted = true; // Set the flag to true on user interaction
          if (video.paused) {
            video.play();
            controls.setAttribute('aria-label', 'Pause video');
            controls.classList.remove('paused');
            console.log('Play btn');
          } else {
            video.pause();
            controls.setAttribute('aria-label', 'Play video');
            controls.classList.add('paused');
            console.log('Pause btn');
          }
        }

        // Add event listener for manual play and pause
        controls.addEventListener('click', toggleVideoPlayback);

        ScrollTrigger.create({
          trigger: '.show-hero__kw',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: playVideo,
          onLeave: pauseVideo,
          onEnterBack: playVideo,
          onLeaveBack: pauseVideo
        });

        return () => {
          // optional
          controls.removeEventListener('click', toggleVideoPlayback);
        };
      });
    }
  }

  function homeWhatWeDoAnimation() {
    const splitTextWordsTimelines = splitTextWords();

    var master = gsap.timeline({
      paused: true
    });

    master.add(splitTextCharacters(0.75));
    if (splitTextWordsTimelines && splitTextWordsTimelines.length > 0) {
      splitTextWordsTimelines.forEach((timeline) => {
        master.add(timeline, '<25%');
      });
    }
    // master.add(setInViewGradientOverlay(), '<');

    ScrollTrigger.create({
      trigger: '.whatwedo__heading',
      start: 'top 70%',
      onEnter: () => {
        // Play the timeline when the trigger element is in view
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
        slideDuplicateActiveClass: 'is-active',
        a11y: {
          slideRole: 'listitem'
        }
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
      let sliderDuration = 500;
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
        slideDuplicateActiveClass: 'is-active',
        slidesOffsetAfter: 16
      });
    });
  }

  function scaleCardImageOnHover() {
    if (document.querySelector('.card')) {
      const cards = document.querySelectorAll('.card');

      cards.forEach((card) => {
        card.addEventListener('mouseover', function () {
          const willScale = card.querySelector('.scale');
          willScale.classList.add('hover');
        });

        card.addEventListener('mouseout', function () {
          const willScale = card.querySelector('.scale');
          willScale.classList.remove('hover');
        });
      });
    }
  }

  function batchInViewGradientReveal() {
    if (document.querySelector('.has-gradient-overlay')) {
      ScrollTrigger.batch('.gradient-overlay', {
        // batchMax: 5,   // maximum batch size (targets)
        start: '20% bottom',
        once: true,
        onEnter: (batch) => {
          let tl = gsap.timeline({});
          tl.to(batch, {
            y: '98%',
            ease: 'imageReveal',
            duration: 1,
            stagger: 0.15
          }).set(batch, { autoAlpha: 0 });
        }
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

  function splitTextCharacters(staggerAmount) {
    if (document.querySelector('[data-splitText="chars"]')) {
      const textEl = document.querySelector('[data-splitText="chars"]');
      const splitText = new SplitType(textEl, {
        types: 'words, chars',
        tagName: 'span'
      });

      splitText.words.forEach((word) => {
        /* If the parent element includes `aria-label`, set `aria-hidden="true"` */
        if (word.parentElement.getAttribute('aria-label')) {
          word.setAttribute('aria-hidden', true);
        }
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
          amount: staggerAmount,
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

        splitText.lines.forEach((line) => {
          /* If the parent element includes `aria-label`, set `aria-hidden="true"` */
          if (line.parentElement.getAttribute('aria-label')) {
            line.setAttribute('aria-hidden', true);
          }
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

  function rotateActionBtnOnScroll() {
    if (document.querySelector('.action-btn')) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.site-wrap',
          pin: false,
          scrub: 1,
          start: 'top top',
          end: '+=10000'
        }
      });

      tl.to('.action-btn', {
        rotation: 360 * 3,
        duration: 1,
        ease: 'none'
      });
    }
  }

  function actionBtnAnimateIn() {
    if (document.querySelector('.action-btn')) {
      gsap.set('.action-btn', {
        scale: 0
      });

      let tl = gsap.to('.action-btn', {
        duration: 1,
        // delay: 2,
        scale: 1,
        ease: 'imageReveal'
      });
      return tl;
    }
  }

  function getCopyrightYear() {
    if (document.querySelector('.year')) {
      const d = new Date();
      let year = d.getFullYear();
      document.getElementsByClassName('year')[0].innerHTML = year;
    }
  }

  function accordion() {
    if (document.querySelector('.accordion')) {
      class Accordion {
        constructor(domNode) {
          this.rootEl = domNode;
          this.buttonEl = this.rootEl.querySelector('.accordion-trigger[aria-expanded]');

          const controlsId = this.buttonEl.getAttribute('aria-controls');
          this.contentEl = document.getElementById(controlsId);

          this.open = this.buttonEl.getAttribute('aria-expanded') === 'true';

          // add event listeners
          this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
        }

        onButtonClick() {
          this.toggle(!this.open);
        }

        toggle(open) {
          // don't do anything if the open state doesn't change
          if (open === this.open) {
            return;
          }

          // update the internal state
          this.open = open;

          // handle DOM updates
          this.buttonEl.setAttribute('aria-expanded', `${open}`);
          if (open) {
            this.contentEl.removeAttribute('hidden');
            this.contentEl.classList.add('open');
          } else {
            this.contentEl.setAttribute('hidden', '');
            this.contentEl.classList.remove('open');
          }
        }

        // Add public open and close methods for convenience
        open() {
          this.toggle(true);
        }

        close() {
          this.toggle(false);
        }
      }

      // init accordions
      const accordions = document.querySelectorAll('.accordion .accordion-item');
      accordions.forEach((accordionEl) => {
        new Accordion(accordionEl);
      });
    }
  }

  function pageLoadAnimation() {
    const splitTextWordsTimelines = splitTextWords();

    var master = gsap.timeline({});

    master.add(removePreloader());
    master.add(splitTextCharacters(0.25), '>-0.4');
    if (splitTextWordsTimelines && splitTextWordsTimelines.length > 0) {
      splitTextWordsTimelines.forEach((timeline) => {
        master.add(timeline, '<25%');
      });
    }
    master.add(setInViewGradientOverlay(), '<');
    master.add(actionBtnAnimateIn(), '<');
  }

  function homePageLoadAnimation() {
    var master = gsap.timeline({});

    master.add(removePreloader());
    master.add(homeIntroAnimation(), '<');
  }

  function ack() {
    let ack_container;
    let ack_dialog;
    let ack_close;

    function handle_click() {
      ack_inner.removeEventListener('click', handle_click);
      ack_close.removeEventListener('click', handle_click);

      function dialogDestroy() {
        ack_container.remove();
        ack_dialog.destroy();
      }

      function anim_out() {
        let tl = gsap.timeline();
        tl.to(ack_container, {
          delay: 0.4,
          duration: 0.5,
          ease: 'power1.out',
          autoAlpha: 0,
          onComplete: dialogDestroy
        });
        return tl;
      }

      var master = gsap.timeline({});

      master.add(anim_out());
      if (document.body.classList.contains('homepage')) {
        master.add(homeIntroAnimation(), '<');
      } else {
        // master.add(pageLoadAnimation(), '<');
      }

      master.play();

      setLocalStorage();
      ack_dialog.hide();
      console.log('Handle Click');
    }

    // Function to check if the localStorage item is set and not expired
    function checkLocalStorage() {
      var itemString = localStorage.getItem('ack');
      if (itemString !== null) {
        var item = JSON.parse(itemString);
        var currentTime = new Date().getTime();
        return currentTime < item.expires; // Check if the current time is before the expiration time
      } else {
        return false; // If the item is not set, return false
      }
    }

    // Function to do something if the localStorage item is set to false
    function render_ack() {
      // Your code here
      ack_container = document.createElement('div');
      ack_container.id = 'ack';
      ack_container.className = 'ack';
      ack_container.setAttribute('role', 'alertdialog');
      ack_container.setAttribute('aria-modal', 'true');
      ack_container.setAttribute('aria-label', 'Acknowledgement of Country');
      ack_container.setAttribute('tabindex', '-1');
      document.body.appendChild(ack_container);

      ack_inner = document.createElement('div');
      ack_inner.className = 'ack__inner';
      ack_inner.setAttribute('role', 'document');
      ack_container.appendChild(ack_inner);

      ack_inner.addEventListener('click', handle_click);

      const ack_text = document.createElement('p');
      ack_text.className = 'ack__text';
      ack_text.innerHTML =
        "Kidwonder acknowledges the Gadigal and other Traditional Custodians of the lands on which we live and work. We pay respect to their Elders' past, present and emerging. We extend that respect to all First Nations people as knowledge holders with continuing connections to land, place, waters and community.";
      ack_inner.appendChild(ack_text);

      ack_close = document.createElement('button');
      ack_close.className = 'btn ack__btn';
      ack_close.innerHTML = 'Continue';
      ack_close.setAttribute('type', 'button');
      ack_close.setAttribute('label', 'Close dialog and continue');
      ack_inner.appendChild(ack_close);

      ack_close.addEventListener('click', handle_click);

      ack_dialog = new A11yDialog(ack_container);
      ack_dialog.show();

      const site_preloader = document.getElementById('preloader');
      let anim_in = gsap.timeline({});

      anim_in
        .to(ack_container, {
          // paused: true,
          ease: 'power1.out',
          duration: 0.5,
          opacity: 1
        })
        .set(site_preloader, {
          autoAlpha: 0
        });

      anim_in.play();
      console.log('localStorage item is not set.');
    }

    // Function to set the localStorage item with expiration
    function setLocalStorage() {
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration date to 7 days from now
      var item = {
        value: 'true',
        expires: expirationDate.getTime() // Convert expiration date to milliseconds since Unix epoch
      };
      localStorage.setItem('ack', JSON.stringify(item));
    }

    // Check if the localStorage item is set and perform actions accordingly
    if (checkLocalStorage()) {
      if (document.body.classList.contains('homepage')) {
        homePageLoadAnimation();
        console.log('home localStorage item is set.');
      } else {
        pageLoadAnimation();
        console.log('page localStorage item is set.');
      }
    } else {
      render_ack();
    }
  }

  function homePage() {
    // homePage
    setHeroIntroAnimation();
    heroOutroScrollAnimation();

    // window.addEventListener('load', () => {
    //   console.log('loaded'); // TODO get rid when confident
    //   homePageLoadAnimation();
    // });

    homeWhatWeDoAnimation();
    millionQuestions();
    batchInViewGradientReveal();
    inViewShowHeroTransition();
    inspirationHeroCardHover();
    growingmindsCarousel();
    homeCardCarousel();

    // phrasesAnimation();
  }

  function contentPage() {
    // about, exhibitions, inspired, partners, contact, terms & privacy
    // window.addEventListener('load', () => {
    //   pageLoadAnimation();
    // });

    // aboutPage
    getSydneyTime();

    // terms & privacy
    accordion();
  }

  function postPage() {
    // articlePage / postPage
    // window.addEventListener('load', () => {
    //   pageLoadAnimation();
    // });
    postImageGridParallax();
  }

  function init() {
    // global
    navDrawer();
    bgVideoPlayback();
    scaleCardImageOnHover();
    rotateActionBtnOnScroll();
    getCopyrightYear();

    window.addEventListener('load', () => {
      console.log('loaded ack'); // TODO get rid when confident
      ack();
    });

    // page specific
    if (document.body.classList.contains('homepage')) {
      homePage();
    } else if (document.body.classList.contains('content-page')) {
      contentPage(); // about, exhibitions, inspired, collabs, partnerships, contact, terms, privacy
    } else if (document.body.classList.contains('post-page')) {
      postPage(); // articlePage/postPage
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    init();
  });
})();
