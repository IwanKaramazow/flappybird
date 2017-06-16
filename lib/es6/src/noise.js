// Generated by BUCKLESCRIPT VERSION 1.6.1, PLEASE EDIT WITH CARE
'use strict';

import * as Curry         from "bs-platform/lib/es6/curry";
import * as Utils         from "./utils";
import * as Reprocessing  from "./reprocessing";
import * as Drawfunctions from "./drawfunctions";

function setup(env) {
  Curry._3(Drawfunctions.P[/* size */17], 640, 360, env);
  Curry._2(Drawfunctions.P[/* fill */8], Curry._3(Utils.PUtils[/* color */1], 255, 0, 0), env);
  return 0.01;
}

function draw(z, env) {
  Curry._2(Drawfunctions.P[/* background */39], Curry._3(Utils.PUtils[/* color */1], 230, 230, 250), env);
  var w = Curry._1(Drawfunctions.P[/* width */0], env) / 50;
  var h = Curry._1(Drawfunctions.P[/* height */1], env) / 50;
  for(var i = 0; i <= 49; ++i){
    for(var j = 0; j <= 49; ++j){
      Curry._2(Drawfunctions.P[/* fill */8], Curry._3(Utils.PUtils[/* lerpColor */25], Utils.PConstants[/* white */0], Utils.PConstants[/* black */1], Curry._3(Utils.PUtils[/* noise */35], 0.03 * i, 0.03 * j, z)), env);
      Curry._5(Drawfunctions.P[/* rectf */28], i * w, j * h, w, h, env);
    }
  }
  return z + 0.05;
}

Curry.app(Reprocessing.ReProcessor[/* run */0], [
      setup,
      /* Some */[draw],
      /* None */0,
      /* None */0,
      /* None */0,
      /* None */0,
      /* None */0,
      /* None */0,
      /* None */0,
      /* () */0
    ]);

export {
  setup ,
  draw  ,
  
}
/*  Not a pure module */