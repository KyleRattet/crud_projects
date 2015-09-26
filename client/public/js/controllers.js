app.controller("ProjectController", function($scope, httpFactory) {

  $scope.project = {};
  $scope.edit = false;

  //1. Get Projects Function, using route
  getProjects = function (url) {
    httpFactory.get(url)
    .then(function(response){
      $scope.projects = response.data;
    });
  };

  getProjects('api/v1/projects');


  //2. Post Projects
  $scope.postProject = function (){

    var payload = $scope.project;

    httpFactory.post('api/v1/projects', payload)
    .then(function(response){
      $scope.projects.push(response.data);
      // getProjects('api/v1/projects');
    });
  };

  //3. Delete request
  $scope.deleteProject = function (id){
    projectURL = "api/v1/project/"+ id;
    httpFactory.delete(projectURL)
    .then(function(response) {

      getProjects('api/v1/projects');
    });
  };

  //4. Put request to edit (need edit button, and update button)
  $scope.editProject = function(id) {
    projectURL = "api/v1/project/"+ id;
    httpFactory.get(projectURL)
    .then(function(response) {
      $scope.project = response.data;
    });
    $scope.edit = true;
  };

  $scope.updateProject = function () {
    var update = $scope.project;
    httpFactory.put(projectURL, update)
    .then(function(response){

      $scope.edit = false;
      getProjects('api/v1/projects');
    });
  };

});
