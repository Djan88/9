jQuery(function() {
    var Obj = {
      circle: new Array(40),
      radius: 200,
      noise: 25,
      speed: 0.3,
      size: 800,
      
      //color a = background color; color b = object color 
      color: {
        a: 'hsla(280, 95%, 5%, 1)',
        b: 'hsla(255, 255%, 255%, .8)'
      },
      //X & Y positions
      X: function(x) {
        return Obj.c.width / 2 + x;
      },

      Y: function(y) {
        return Obj.c.height / 2 - y;
      },
      //behavior
      Circle: function(i) {
        this.r = Obj.radius - i * Obj.radius / Obj.circle.length;
        this.e = i % 2 ? true : false;
        this.max = Math.random() * Obj.noise;
        this.min = -Math.random() * Obj.noise;
        this.val = Math.random() * (this.max - this.min) + this.min;
      },
      //clearing   
      Clear: function() {
        Obj.$.fillStyle = Obj.color.a;
        Obj.$.fillRect(0, 0, Obj.c.width, Obj.c.height);
      },
      //shape changing  
      Change: function(C) {
        for (var i = 0; i < Obj.size; i++) {
          var a = i * Math.PI * 2 / Obj.size;
          var x = Math.cos(a) * (C.r - C.val * Math.cos(i / 4));
          var y = Math.sin(a) * (C.r - C.val * Math.cos(i / 4));
          Obj.$.fillStyle = Obj.color.b;
          Obj.$.fillRect(Obj.X(x), Obj.Y(y), 1, 1);
        }
        Obj.Check(C);
      },
      //noise level checks
      Check: function(C) {
        C.val = C.e ? C.val + Obj.speed : C.val - Obj.speed;
        if (C.val < C.min) {
          C.e = true;
          C.max = Math.random() * Obj.noise;
        }
        if (C.val > C.max) {
          C.e = false;
          C.min = -Math.random() * Obj.noise;
        }
      },
      //update object
      Update: function() {
        Obj.Clear();
        for (var i = 0; i < Obj.circle.length; i++) {
          Obj.Change(Obj.circle[i]);
        }
      },
      //draw object
      Draw: function() {
        Obj.Update();
        window.requestAnimationFrame(Obj.Draw, Obj.c);
      },
      //set circles
      Set: function() {
        for (var i = 0; i < Obj.circle.length; i++) {
          Obj.circle[i] = new Obj.Circle(i);
        }
      },

      //size control
      Size: function() {
        Obj.c.width = window.innerWidth;
        Obj.c.height = window.innerHeight;
      },
      //get canvas
      Run: function() {
        Obj.c = document.querySelector('canvas');
        Obj.$ = Obj.c.getContext('2d');
        window.addEventListener('resize', Obj.size, false);
      },
      //start   
      Init: function() {
        Obj.Run();
        Obj.Size();
        Obj.Set();
        Obj.Draw();
      }

    };
    Obj.Init();
    var curTrY,
        times;
    var hideAll = function(){
      jQuery('.content-block').addClass('hidden');
    }
    jQuery('.menu-about').on('click', function(event) {
      hideAll();
      jQuery('.content-block_about').removeClass('hidden').addClass('animated fadeInDown');
    });
    jQuery('.menu-main').on('click', function(event) {
      hideAll();
      jQuery('.content-block_main').removeClass('hidden').addClass('animated fadeInDown');
    });
    jQuery('.menu-proto').on('click', function(event) {
      hideAll();
      jQuery('.content-block_proto').removeClass('hidden').addClass('animated fadeInDown');
    });
    jQuery('.menu-news').on('click', function(event) {
      hideAll();
      jQuery('.content-block_news').removeClass('hidden').addClass('animated fadeInDown');
    });

    var protocol = function(elem){
      times = Math.round(Math.random() * (9 - 0));
      curTrY = parseFloat(jQuery(elem).css('backgroundPositionY'));
      curTrY = curTrY-(212.5*times);
      jQuery(elem).css('backgroundPositionY', curTrY+'px');
    }

    jQuery('.marakata_sim').on('click', function(event) {
      setTimeout(protocol('.marakata_sim-1'), 2000);
      setTimeout(protocol('.marakata_sim-2'), 4000);
      setTimeout(protocol('.marakata_sim-3'), 6000);
      setTimeout(protocol('.marakata_sim-4'), 8000);
      setTimeout(protocol('.marakata_sim-5'), 10000);
    });
});
