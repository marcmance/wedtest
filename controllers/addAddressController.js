majr.controller('AddAddressController', ['$scope', '$route', '$firebaseObject', '$firebaseArray', function ($scope, $route, $firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://marcandjennyromance.firebaseio.com/address");
    $scope.address = $firebaseArray(ref);


    $scope.streets = [];
    $scope.filters = "asdfasdfasdfadsf";


    $scope.address.$loaded().then(function(data) {
    	for(var x = 0; x < $scope.address.length; x++) {
    		$scope.streets.push($scope.address[x].street);
    	}
	  })
	  .catch(function(error) {
	    console.error("Error:", error);
	});

    $scope.newAddress = {
    	street: '',
    	city: '',
    	state: '',
    	zip: ''
    }

    $scope.save = function() {
    	 $scope.address.$add({
            street: $scope.newAddress.street.trim(),
            city: $scope.newAddress.city.trim(),
            state: $scope.newAddress.state.trim(),
            zip: $scope.newAddress.zip.trim()
        });
    }


    $scope.filterStreet = function() {

    	if($scope.newAddress.street === '') {
    		$scope.filters = "asdfddfeasdfeasdfacd";
    	}
    	else {
    		$scope.filters = $scope.newAddress.street;
    	}

    };

}]);