var app = angular.module('membraneCollector', ['ui.router']);

app.factory('membranes', [
	'$http',
	function($http){
	
	//service body
	var o = {
		membranes: []
	};
	o.getAll = function(){
		return $http.get('/membranes').success(function(data){
			angular.copy(data, o.membranes);
		});
	};
	return o;
}])

app.controller('MainCtrl', [
	'$scope',
	'$stateParams',
	'membranes',
	function($scope, membranes){
		$scope.membranes = membranes.membranes;
		$scope.addMembrane = function(){
			$scope.membranes.push({membrane_id:$scope.membrane_id,cast_date:$scope.cast_date});
			$scope.membrane_id='';
			$scope.cast_date='';
		};
}])
app.controller('PostsCtrl',[
	'$scope',
	'$stateParams',
	'membranes',
	function($scope, $stateParams, membranes){

}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
      	membranePromise: ['membranes',function(membranes){
      		var o = membranes.getAll();
      		console.log("found "+o.membranes);
      		return o;
      	}]
      }
    });
    /*
    .state('membranes', {
      url: '/membranes/{id}'
      templateUrl: '/membranes.html',
      controller: 'MembraneCtrl'
    });
	*/
  $urlRouterProvider.otherwise('home');
}]);