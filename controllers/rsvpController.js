majr.controller('RSVPController', ['$scope', '$route', '$firebaseObject', '$firebaseArray', function ($scope, $route, $firebaseObject, $firebaseArray) {


    /*$scope.guestlist = {
    	test: "sup",
        newName: {
            first_name: '',
            last_name: '',
            street: '',
            state: '',
            zip: ''
        }
    } */

    var ref = new Firebase("https://marcandjennyromance.firebaseio.com/person/" + $route.current.params.id);
    $scope.person = $firebaseObject(ref);
    console.log($scope.person);

    $scope.rsvp = function(answer, i) {
        console.log(i);
        var user = $scope.test.$getRecord(i);
        user.status = answer;
        user.replytime = Date.now();
        $scope.test.$save(user);
    }

}]);