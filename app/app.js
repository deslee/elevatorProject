'use strict';

angular.module('elevatorproject', [ 'ngRoute','elevatorproject-main','templates' ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });