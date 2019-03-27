// public/core.js
var ListeaFaire = angular.module('ListeaFaire', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/getTaskSet')
        .success(function(res) {
            $scope.laliste = res;
            console.log(res);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        var task = {
            name: $scope.formData.text,
            done: $scope.formData.done
        }
        $http.post('/api/addTask', task)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.laliste = data;console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTask = function(id) {
        $http.delete('/api/deleteTask/' + id)
            .success(function(data) {
                $scope.laliste = data;
                //$scope.laliste.splice(data);
               // console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}
