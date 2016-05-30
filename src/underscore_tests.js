/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (!n){
      return array[0];
    }
    return array.splice(0, n);
  };


  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (!n){
      return array[array.length - 1];
    } else if (n > array.length) {
      return array;
    }
    return array.splice(array.length - n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (collection instanceof Array) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
        }
      } else if (collection instanceof Object){
        for (var key in collection){
        iterator(collection[key], key, collection)
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
     var answer = [];
        for (var i = 0; i < collection.length; i++) {
          if (iterator(collection[i]) === true){
            answer.push(collection[i]);
          }
        }
      return answer;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var answer = [];
        for (var i = 0; i < collection.length; i++) {
          if (iterator(collection[i]) !== true){
            answer.push(collection[i]);
          }
        }
      return answer;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
     var arr = [];
     for (var i = 0; i < array.length; i++) {
       if (arr.indexOf(array[i]) === -1){
        arr.push(array[i]);
       }
     }
     return arr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
      arr.push( new iterator(array[i]));
    }
    return arr;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var answer = [];
    for (var i = 0; i < array.length; i++) {
      answer.push(array[i][propertyName]);
    }
    return answer;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var answer = [];
    list[args] = methodName;
      for (var i = 0; i < list.length; i++) {
        answer.push(list[i][methodName]());
      }
    return answer;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
      if(!initialValue){
        var initialValue = 0;
      }
      for (var i = 0; i < collection.length; i++) {
        initialValue = iterator(initialValue, collection[i]);
      }
      return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var answer = false;
    if (collection instanceof Array) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i] === target) {
          answer = true;
        };
      }
    } else if (collection instanceof Object){
      for (var key in collection){
        if (collection[key] === target){
          answer = true;
        }
      }
    }
    return answer;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (!iterator){
      return true;
    } else {
      var answer = false;
      var check = [];
      for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i])){
          check.push(collection[i]);
        }
      }
      return (check.length === collection.length);
    }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if(!iterator){
      for (var i = 0; i < collection.length; i++) {
        if (collection[i]){
            return true;
          }
        }
      } else {
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])){
        return true;
      }
    }
  }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    if(obj){
      var target = [];
      for (var i = 0; i < arguments.length; i++) {
        for (var key in arguments[i]){
            target[key] = arguments[i][key];
          }
        }
      return target;
    }
  };



  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if (obj){
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (arguments[i][key] && !arguments[0].hasOwnProperty(key)){
          arguments[0][key] = arguments[i][key];
        }
      }
    }
    return arguments[0];
  }
  };



  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var ran = false;
    var answer;
    var run = function(){
      if (ran === false){
        answer = func();
        ran = true;
      } else {
        return answer;
      }
    }
    return run;
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // var answers = [];
    // var result;
    return function(ans){
      var result = func(ans);
      // if(answers.indexOf(result) !== -1){
      //   answers.push(result);
      // }
      return result;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, arg1, arg2) {
    var action = func;
    setTimeout(function(){
      return action(arg1, arg2);
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var order = [];
    var randArr = [];
    for (var i = 0; i < array.length; i++) {
      order.push(Math.floor(Math.random() * array.length));
    }
    for (var j = 0; j < array.length; j++) {
      randArr.push(array[order[j]]);
    }
    return randArr;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    var sortedList = []
    for (var i = 0; i < collection.length; i++) {
        sortedList.push(collection);
    }
    return ;
    // var newList = [];
    // var sortedList = [];
    // function compare(list){
    //   for (var i = 0; i < list.length; i++) {
    //     if (list[i] > list[i-1]){
    //       return list[i];
    //     } else if (Boolean(list[i-1]) === false){
    //       return list[i];
    //     } else {
    //       return list[i-1];
    //     }
    //   }
    // if (iterator instanceof String){
    //   for (var j = 0; j < collection.length; j++) {
    //     newList.push(compare(collection[j][iterator]));
    //   }
    // }
    // }
    // return newList;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(arr1, arr2, arr3) {
      var zipped = [];
      for (var i = 0; i < arr1.length; i++) {
        var first = arr1[i];
        var sec = arr2[i];
        var third = arr3[i];
        zipped.push([first, sec, third]);
      }
      return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
      for (var i = 0; i < nestedArray.length; i++) {
        if (nestedArray[i] instanceof Array){
          nestedArray[i] = nestedArray[i].join(', ');
        }
      }
      return nestedArray.join(', ').split(', ');
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(arr1, arr2) {
    var inCommon = [];
    for (var i = 0; i < arr1.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr2[j] === arr1[i]){
          inCommon.push(arr2[j]);
        }
      }
    }
    return inCommon;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(target, arr1, arr2) {
    var check = function(target, toCheck){
      var unique = [];
      var hasIt = false;
      for (var i = 0; i < target.length; i++) {
        for (var j = 0; j < toCheck.length; j++) {
          if (target[i] === toCheck[j]){
            hasIt = true;
          }
        }
        if(hasIt === false){
          unique.push(target[i]);
        } else {
          hasIt = false;
        }
      }
      return unique;
    }
    if(!arr2){
      return check(target, arr1);
    } else{
      var first = check(target, arr1);
      var answer = check(first, arr2);
      return answer;
    }
  };

}).call(this);
