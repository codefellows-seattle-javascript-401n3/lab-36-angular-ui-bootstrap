'use strict';

module.exports = function() {
  return function(galleries, str){
    if(!str) return galleries;

    let pattern = `.*${str.toUpperCase().split('').join('.*')}.*`;
    let regExp = new RegExp(pattern);

    return galleries.filter(gallery => regExp.test(gallery.name.toUpperCase()));
  };
};
