var flappy = require("../lib/js/src/flappy.js");
var Reprocessing = require("../lib/js/src/reprocessing.js");
var Curry         = require("bs-platform/lib/js/curry");

var atom;
atom = flappy.setup();

function getAtom() {
 return atom;
};

function render(impl) {
  Curry.app(Reprocessing.ReProcessor[/* run */0], [
      getAtom,
      /* Some */[impl.draw],
      /* None */0,
      /* None */0,
      /* None */0,
      /* None */0,
      /* None */0,
      /* None */0,
      /* None */0,
      /* () */0
    ]);
}

render(flappy);

if (module.hot) {
  module.hot.accept("../lib/js/src/flappy.js", () => {
    document.getElementsByTagName("body")[0].removeChild(document.getElementsByTagName("canvas")[0])
    render(require("../lib/js/src/flappy.js"));
  });
}


