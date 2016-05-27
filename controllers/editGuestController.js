majr.controller('EditGuestController', ['$scope', '$route', '$firebaseObject', '$firebaseArray', '$rootScope', 'dateHelpers', function ($scope, $route, $firebaseObject, $firebaseArray, $rootScope, dateHelpers) {

    var ref = new Firebase("https://marcandjennyromance.firebaseio.com/person/" + $route.current.params.id);
    $scope.person = $firebaseObject(ref);

    var ref2 = new Firebase("https://marcandjennyromance.firebaseio.com/address");
    $scope.address = $firebaseArray(ref2);

    var filledIn = false;
    if($scope.person.street === undefined || $scope.person.street === '') {
        filledIn = false;
    }
    else {
        filledIn = true;
    }
    $scope.filters = "asdfasdfasdfadsf";

    $scope.vars = {
        isGuestList: false, // whyyyyyyy
        success: false
    }

    console.log($scope.person.street);

    $scope.save = function() {
    	if(!filledIn) {
            $scope.address.$add({
                street: $scope.person.street.trim(),
                city: $scope.person.city.trim(),
                state: $scope.person.state.trim(),
                zip: $scope.person.zip.trim(),
                created_date: dateHelpers.getCurrentDate(),
                modified_date: dateHelpers.getCurrentDate()
            });
        }
        $scope.person.$save();
        $scope.vars.success = true;
    }

    $scope.fillAddress = function(id) {
        var address = $scope.address.$getRecord(id);
        $scope.person.street = address.street;
        $scope.person.city = address.city;
        $scope.person.state = address.state;
        $scope.person.zip = address.zip;

        filledIn = true;
    }

     $scope.filterStreet = function() {

        if($scope.person.street === '') {
            $scope.filters = "asdfddfeasdfeasdfacd";
        }
        else {
            $scope.filters = $scope.person.street;
        }

    };

    $scope.addAddressManual = function() {
        if($scope.person.street !== '') {
            $scope.address.$add({
                street: $scope.person.street.trim(),
                city: $scope.person.city.trim(),
                state: $scope.person.state.trim(),
                zip: $scope.person.zip.trim(),
                created_date: dateHelpers.getCurrentDate(),
                modified_date: dateHelpers.getCurrentDate()
            });
        }
    }

    $rootScope.filterName = function($event) {
        //do nothing
    }

}]);
