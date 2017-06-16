open Reprocessing;

open P;

open PConstants;

open PUtils;

open Common;

let initialVelocity = 2.9;

let gravity = 0.09;

/* represents the spacing between pillars */
let pillarSpacing = 120.;

type imageTable = {
  flappyBase: imageT,
  bg: imageT,
  grass: imageT,
  upper: imageT,
  lower: imageT
};

type pillar = {
  startTime: float,
  posX: float,
  gap: float,
  posY: float
};

type state = {
  imageTable,
  flappyY: float,
  timeDelta: float,
  currentTime: float,
  jumpCount: float,
  jumpStart: float,
  pillars: list pillar,
  started: bool
};

let sineWave y timeDelta => y +. 0.5 *. sin (1.5 *. timeDelta /. 20.);

let setup env => {
  size 256 256 env;
  let flappyBase = loadImage env "./sprites/padded_lala2.png";
  let bg = loadImage env "./sprites/bg2.png";
  let grass = loadImage env "./sprites/grass2.png";
  let upper = loadImage env "./sprites/upper.png";
  let lower = loadImage env "./sprites/lower2.png";
  {
    imageTable: {flappyBase, bg, grass, upper, lower},
    currentTime: 0.0,
    flappyY: 100.,
    timeDelta: 0.,
    jumpCount: 0.,
    jumpStart: 0.,
    pillars: [],
    started: false
  }
};

let translate startPos vel time => floor (startPos +. time *. vel);

let updatePillars state =>
  state.started ?
    {
      let pillars =
        List.filter (fun {posX} => posX > (-20.)) state.pillars |>
        List.map (
          fun pillar => {
            let nexPos = translate pillar.posX (-0.005) (state.currentTime -. pillar.startTime);
            {...pillar, posX: nexPos}
          }
        );
      let newPillars =
        List.length state.pillars < 3 ?
          {
            let initialPosition =
              switch state.pillars {
              | [] => 300.
              | [x, ..._] => x.posX +. pillarSpacing
              };
            let gap = Random.float 15.;
            let posY = Random.float 40.;
            [{startTime: state.currentTime, posX: initialPosition, gap, posY}, ...pillars]
          } :
          pillars;
      {...state, pillars: newPillars}
    } :
    state;

let updateFlappy state => {
  let flappyY =
    state.jumpCount === 0. ?
      sineWave state.flappyY state.timeDelta :
      {
        let z = initialVelocity -. state.timeDelta *. gravity;
        let nextY = state.flappyY -. z;
        nextY
      };
  {...state, flappyY}
};

let updateTime state => {
  let timestamp = state.currentTime +. 1.;
  let timeDelta = timestamp -. state.jumpStart;
  {...state, timeDelta, currentTime: timestamp}
};

let flappy ::flappyBase ::flappyY env => {
  let y = flappyY > 188. ? 187 : int_of_float flappyY;
  image flappyBase 105 y env
};

let draw st env => {
  background white env;
  image st.imageTable.bg (-56) 0 env;
  image st.imageTable.bg 82 0 env;
  List.iter
    (
      fun pillar => {
        let pos = int_of_float pillar.posX;
        let g = int_of_float (pillar.gap /. 2.);
        let startY = int_of_float pillar.posY;
        image st.imageTable.upper pos ((-120) - startY - g) env;
        image st.imageTable.lower pos (100 - startY + g) env
      }
    )
    st.pillars;
  let movingGrass = int_of_float @@ mod_float (translate 12. (-1.) st.currentTime) 168.;
  image st.imageTable.grass ((-52) + movingGrass) 196 env;
  image st.imageTable.grass (116 + movingGrass) 196 env;
  image st.imageTable.grass (284 + movingGrass) 196 env;
  flappy st.imageTable.flappyBase st.flappyY env;
  st |> updateFlappy |> updateTime |> updatePillars
};

let keyPressed state env =>
  switch (keyCode env) {
  | Space =>
    print_endline "space!";
    {...state, jumpCount: state.jumpCount +. 1., jumpStart: state.currentTime, started: true}
  | _ => state
  };

ReProcessor.run ::setup ::keyPressed ::draw ();
