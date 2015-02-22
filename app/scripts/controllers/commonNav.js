'use strict';

/**
 * @ngdoc function
 * @name theNightThiefApp.controller:commonNavCtrl
 * @description
 * # commonNavCtrl
 * Controller of the theNightThiefApp
 */

 app.controller('commonNavCtrl', ['$scope', '$log', '$location', 'Auth',
 	function($scope, $log, $location, Auth) {
 		$log.debug(Auth);
	// $rootScope.loggedIn = currentAuth;


	Auth.auth.$onAuth(function(authData) {
		$scope.authData = authData;
	});


	$scope.logout = function () {
		Auth.logout();
		$location.path('/login');
	};

	$scope.isActive = function(route) {
		console.log($location.path());
		console.log(route === $location.path())
		return route === $location.path();
	}

}]);

