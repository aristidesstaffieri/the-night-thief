'use strict';

/**
 * @ngdoc function
 * @name theNightThiefApp.controller:Auth
 * @description
 * # Auth
 * Controller of the theNightThiefApp
 */
 // angular.module('theNightThiefApp')
 app.factory('Auth', [ 'FIREBASE_URL', '$firebaseAuth', '$log', '$location',
 	function (FIREBASE_URL, $firebaseAuth, $log, $location) {
 		var ref = new Firebase(FIREBASE_URL);

 		var Auth = {
 			register: function (email, password) {
 				ref.createUser({
 					email: email,
 					password: password
 				}, function(error) {
 					if (error === null) {
 						$log.debug('User created');
 						ref.authWithPassword({
							email : email,
							password : password
						}, function(error, authData) {
							if (error) {
								switch (error.code) {
									case 'INVALID_EMAIL':
									$log.debug('The specified user account email is invalid.');
									break;
									case 'INVALID_PASSWORD':
									$log.debug('The specified user account password is incorrect.');
									break;
									case 'INVALID_USER':
									$log.debug('The specified user account does not exist.');
									break;
									default:
									$log.debug('Error logging user in:', error);
								}
							} else {
								$log.debug('Authenticated successfully with payload:', authData);
								return authData;
							}
						});
							} else {
								$log.debug(error);
							}
						});
 			},
 			login:  function (email, password) {
 				ref.authWithPassword({
 					email : email,
 					password : password
 				}, function(error, authData) {
 					if (error) {
 						switch (error.code) {
 							case 'INVALID_EMAIL':
 							$log.debug('The specified user account email is invalid.');
 							break;
 							case 'INVALID_PASSWORD':
 							$log.debug('The specified user account password is incorrect.');
 							break;
 							case 'INVALID_USER':
 							$log.debug('The specified user account does not exist.');
 							break;
 							default:
 							$log.debug('Error logging user in:', error);
 						}
 					} else {
 						$log.debug('Authenticated successfully with payload:', authData);


 						$location.path('/');

 						return authData;
 					}
 				});
 			},
 			logout: function () {
 				ref.unauth();
 			},
 			newEmail: function (oldEmail, newEmail, password) {
 				ref.changeEmail({
 					oldEmail : oldEmail,
 					newEmail : newEmail,
 					password : password
 				}, function(error) {
 					if (error === null) {
 						$log.debug('Email changed successfully');
 					} else {
 						$log.debug('Error changing email:', error);
 					}
 				});
 			},
 			newPassword: function (email, oldPassword, newPassword) {
 				ref.changePassword({
 					email       : email,
 					oldPassword : oldPassword,
 					newPassword : newPassword
 				}, function(error) {
 					if (error === null) {
 						$log.debug('Password changed successfully');
 					} else {
 						$log.debug('Error changing password:', error);
 					}
 				});
 			},
 			sendPasswordResetEmail: function (email) {
 				ref.resetPassword({
 					email : email
 				}, function(error) {
 					if (error === null) {
 						$log.debug('Password reset email sent successfully');
 					} else {
 						$log.debug('Error sending password reset email:', error);
 					}
 				});
 			},
 			removeUser: function (email, password) {
 				ref.removeUser({
 					email    : email,
 					password : password
 				}, function(error) {
 					if (error === null) {
 						$log.debug('User removed successfully');
 					} else {
 						$log.debug('Error removing user:', error);
 					}
 				});
 			},
 			monitorAuth: function () {
 				function authDataCallback(authData) {
 					if (authData) {
 						var userLoggedin = true;
 						$log.debug('User ' + authData.password.email + ' is logged in with ' + authData.provider, userLoggedin);
 						return userLoggedIn;
 					} else {
 						var userLoggedIn = false;
 						$log.debug('User is logged out', userLoggedIn);
 						return userLoggedIn;
 					}
 				}
 				ref.onAuth(authDataCallback);
 			},
 			auth: $firebaseAuth(ref)
 		};
 		return Auth;
 	}]);