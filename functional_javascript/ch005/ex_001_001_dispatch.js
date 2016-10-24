/**
 * Created by YB on 2016-10-23.
 */
var fjs = require('../lib/functional_js.js');
var _ = require('underscore');

console.log('\n### 함수 조립의 핵심');

/**
 * 여러 invoker를 조립해서 다형적인 함수를 만들거나 인자에 따라 다른 동작을 수행하는 함수
 * @returns {Function}
 */
function dispatch(/* funs */) {
  var funs = _.toArray(arguments);
  var size = funs.length;

  return function(target /*, args */) {
    var ret = undefined;
    var args = _.rest(arguments);

    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, fjs.construct(target, args));

      if (fjs.existy(ret)) return ret;
    }

    return ret;
  };
}

var str = dispatch(fjs.invoker('toString', Array.prototype.toString),
  fjs.invoker('toString', String.prototype.toString));

console.log(`str('a') : ${str('a')}`);
console.log(`str(_.range(10)) : ${str(_.range(10))}`);