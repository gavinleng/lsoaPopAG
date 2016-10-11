/*
 * Created by G on 26/07/2016.
 */


"use strict";

var _ = require("lodash");

module.exports = {
	popAgeGroup: function(dataArray, cb) {
		var i;
		
		var _dataArray = _.cloneDeep(dataArray);
		
		var ageBand = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90+", "All Ages"];
		var lenageBand = ageBand.length;
		
		var areaIds = _.map(_dataArray, 'area_id');
		areaIds = _.uniq(areaIds);
		var lenareaIds = areaIds.length;
		
		var dataAgeGroup = [];
		
		var ageband = function (gender, areaIdsg) {
			var j, k, _data, _dataA, _dataALen;
			var dataAgeGroupg = [];
			
			_data = _.filter(_dataArray, {'area_id': areaIdsg, 'gender': gender, 'year': _dataArray[0].year});
			
			for (j = 0; j < lenageBand; j++) {
				if ((ageBand[j] != '90+') && (ageBand[j] != 'All Ages')) {
					_dataA = _.filter(_data, function (item) {
						return ((+item.age_band >= +ageBand[j].split('-')[0]) && (+item.age_band <= +ageBand[j].split('-')[1]));
					});
					
					
					_dataALen = _dataA.length;
					_dataA[0].age_band = ageBand[j];
					for (k = 1; k < _dataALen; k++) {
						_dataA[0].persons += _dataA[k].persons;
					}
					
					_dataA[0].persons = +_dataA[0].persons.toFixed(2);
					
					dataAgeGroupg.push(_dataA[0]);
				} else {
					_dataA = _.filter(_data, function (item) {
						return (item.age_band == ageBand[j]);
					});
					
					dataAgeGroupg.push(_dataA[0]);
				}
			}
			
			return dataAgeGroupg;
		};
		
		for (i = 0; i < lenareaIds; i++) {
			// for male
			dataAgeGroup = dataAgeGroup.concat(ageband('male', areaIds[i]));
			
			// for female
			dataAgeGroup = dataAgeGroup.concat(ageband('female', areaIds[i]));
		}
		
		cb(dataAgeGroup);
	}
};
