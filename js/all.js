Physics(function(world){

  var viewWidth = window.innerWidth;
  var viewHeight = window.innerHeight;

 


  var renderer = Physics.renderer('canvas', {
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: false, // don't display meta data
    styles: {
        // set colors for the circle bodies
        'circle' : {
            strokeStyle: '#351024',
            lineWidth: 1,
            fillStyle: '#d33682',
            angleIndicator: '#351024'
        }
    }
  });


world.add( Physics.body('convex-polygon', {
    x: 250,
    y: 50,
    vx: 0.15,
    vy: 0.15,
    vertices: [
        {x: 0, y: 80},
        {x: 60, y: 40},
        {x: 60, y: -40},
        {x: 0, y: -80}
    ]
}) );

world.add( Physics.body('convex-polygon', {
    x: 400,
    y: 200,
    vx: -0.12,
    vy: -0.12,
    vertices: [
        {x: 0, y: 80},
        {x: 80, y: 0},
        {x: 0, y: -80},
        {x: -30, y: -30},
        {x: -30, y: 30}
    ]
}) );


  // add the renderer
  world.add( renderer );
  // render on each step
  world.on('step', function(){
    world.render();
  });

  // bounds of the window
  // var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

  // constrain objects to these bounds
  // world.add(Physics.behavior('edge-collision-detection', {
  //     aabb: viewportBounds,
  //     restitution: 0.99,
  //     cof: 0.99
  // }));

  // add a circle
  world.add(
      Physics.body('circle', {
        x: 500, // x-coordinate
        y: viewHeight-60, // y-coordinate
        vx: 0.91, // velocity in x-direction
        vy: -2.57, // velocity in y-direction
        radius: 20
      }) 


      // Physics.transform(transform)
  );

  // ensure objects bounce when edge collision is detected
  // world.add( Physics.behavior('body-impulse-response') );

  // add some gravity


var accData = { x: 0.0001, y: 0.004 };
world.add( Physics.behavior('constant-acceleration').setAcceleration(accData) );


  // subscribe to ticker to advance the simulation
  Physics.util.ticker.on(function( time, dt ){

      world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

});