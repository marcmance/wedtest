var majr = angular.module('majr', ['ngResource', 'ngRoute', 'ngSanitize', 'firebase', 'ui.sortable'])
.run(['$rootScope',

    function ($rootScope) {
     	console.log("9/10/16");
      for (var key in window.localStorage) {
      if (key.indexOf('http://marcmance.com/mjr/css/main.less') === 0) {
          delete window.localStorage[key];
        }
      }
	}
]);
