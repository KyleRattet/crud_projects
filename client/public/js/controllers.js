app.controller("ProjectController", function($scope, httpFactory) {

  $scope.test = "test this controller";
  //1. Get Projects Function, using route
  getProjects = function (url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.projects = response.data;
    });
  };

  getProjects('api/v1/projects');

  $scope.postProject = function (){
    console.log('test project post');
  };

});
