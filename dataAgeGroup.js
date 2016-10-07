/*
 * Created by G on 25/07/2016.
 */


"use strict";

var popAgeGroup = require('./lib/popAgeGroup.js');

module.exports = exports =  function(dataArray, cb) {
	popAgeGroup.popAgeGroup(dataArray, function (data) {
		cb(data);
	});
};
