// Generated by BUCKLESCRIPT VERSION 1.6.1, PLEASE EDIT WITH CARE
'use strict';

var List                    = require("bs-platform/lib/js/list");
var Curry                   = require("bs-platform/lib/js/curry");
var $$String                = require("bs-platform/lib/js/string");
var Pervasives              = require("bs-platform/lib/js/pervasives");
var Caml_string             = require("bs-platform/lib/js/caml_string");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions");

function peekch(param) {
  var i = param[1];
  var str = param[0];
  if (i < str.length) {
    return /* Some */[Caml_string.get(str, i)];
  } else {
    return /* None */0;
  }
}

function popch(param) {
  return /* tuple */[
          param[0],
          param[1] + 1 | 0
        ];
}

function peekn(param, len) {
  var i = param[1];
  var str = param[0];
  if ((i + len | 0) < str.length) {
    return /* Some */[$$String.sub(str, i, len)];
  } else {
    return /* None */0;
  }
}

function popn(param, len) {
  return /* tuple */[
          param[0],
          param[1] + len | 0
        ];
}

function $$switch(stream, matchstr) {
  var len = matchstr.length;
  var match = peekn(stream, len);
  if (match) {
    var peek = match[0];
    if (peek === matchstr) {
      return popn(stream, len);
    } else {
      return Pervasives.failwith("Could not match '" + (matchstr + ("', got '" + (peek + "' instead."))));
    }
  } else {
    return Pervasives.failwith("Could not match " + matchstr);
  }
}

function charsRemaining(param) {
  return param[0].length - param[1] | 0;
}

function create(str) {
  return /* tuple */[
          str,
          0
        ];
}

var Stream = /* module */[
  /* empty : [] */0,
  /* peekch */peekch,
  /* popch */popch,
  /* peekn */peekn,
  /* popn */popn,
  /* switch */$$switch,
  /* charsRemaining */charsRemaining,
  /* create */create
];

function read(name) {
  var ic = Pervasives.open_in(name);
  var try_read = function () {
    var exit = 0;
    var x;
    try {
      x = Pervasives.input_line(ic);
      exit = 1;
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.end_of_file) {
        return /* None */0;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      return /* Some */[x];
    }
    
  };
  var loop = function (_acc) {
    while(true) {
      var acc = _acc;
      var match = try_read(/* () */0);
      if (match) {
        _acc = /* :: */[
          $$String.make(1, /* "\n" */10),
          /* :: */[
            match[0],
            acc
          ]
        ];
        continue ;
        
      } else {
        Curry._1(Pervasives.close_in, ic);
        return List.rev(acc);
      }
    };
  };
  return $$String.concat("", loop(/* [] */0));
}

function append_char(s, c) {
  return s + $$String.make(1, c);
}

var Constants = 0;

var circularBufferSize = 60000;

var vertexSize = 8;

exports.Constants          = Constants;
exports.circularBufferSize = circularBufferSize;
exports.vertexSize         = vertexSize;
exports.Stream             = Stream;
exports.read               = read;
exports.append_char        = append_char;
/* No side effect */
