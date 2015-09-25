app.factory('httpFactory', ['$http', function($http) {

  var obj = {};

  //1. get request
  obj.get = function(url) {
    return $http.get(url);
  };


  return obj;
}]);
