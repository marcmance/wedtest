majr.controller('AddressController', ['$scope', '$route', '$firebaseObject', '$firebaseArray', function ($scope, $route, $firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://marcandjennyromance.firebaseio.com/address");
    $scope.address = $firebaseArray(ref);

    $scope.delete = function(i) {
        var r = confirm("Are you sure?");
        if (r == true) {
           var a = $scope.address.$getRecord(i);
            $scope.address.$remove(a);
        }
    }

}]);