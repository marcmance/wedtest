
majr.controller('AddGuestController', ['$scope', '$route', '$firebaseObject', '$firebaseArray', function ($scope, $route, $firebaseObject, $firebaseArray) {
    $scope.guestlist = {
        newName: {
            first_name: '',
            last_name: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            relation: "Family Friend"
        },

        showAddress: []
    }

    var filledIn = false;
    $scope.filters = "asdfasdfasdfadsf";

    var ref = new Firebase("https://marcandjennyromance.firebaseio.com/person");
    $scope.people = $firebaseArray(ref);

    var ref2 = new Firebase("https://marcandjennyromance.firebaseio.com/address");
    $scope.address = $firebaseArray(ref2);

    $scope.addName = function() {
        if($scope.guestlist.newName.first_name !== '') {
            $scope.people.$add({
                first_name: $scope.guestlist.newName.first_name.trim(),
                last_name: $scope.guestlist.newName.last_name.trim(),
                street: $scope.guestlist.newName.street.trim(),
                city: $scope.guestlist.newName.city.trim(),
                state: $scope.guestlist.newName.state.trim(),
                zip: $scope.guestlist.newName.zip.trim(),
                status: 2,
                relation: $scope.guestlist.newName.relation
            });

            if(!filledIn) {
                $scope.address.$add({
                    street: $scope.guestlist.newName.street.trim(),
                    city: $scope.guestlist.newName.city.trim(),
                    state: $scope.guestlist.newName.state.trim(),
                    zip: $scope.guestlist.newName.zip.trim()
                });
            }


            $scope.guestlist.newName.first_name = '';
            $scope.guestlist.newName.last_name = '';
            $scope.guestlist.newName.street = '';
            $scope.guestlist.newName.city = '';
            $scope.guestlist.newName.state = '';
            $scope.guestlist.newName.zip = '';
            $scope.guestlist.newName.relation = 'Family Friend';
        }
    }

    $scope.fillAddress = function(id) {
        var address = $scope.address.$getRecord(id);
        $scope.guestlist.newName.street = address.street;
        $scope.guestlist.newName.city = address.city;
        $scope.guestlist.newName.state = address.state;
        $scope.guestlist.newName.zip = address.zip;

        filledIn = true;
    }

    $scope.filterStreet = function() {

        if($scope.guestlist.newName.street === '') {
            $scope.filters = "asdfddfeasdfeasdfacd";
        }
        else {
            $scope.filters = $scope.guestlist.newName.street;
        }

    };

    $scope.enter = function() {
        $scope.addName();
    }

}]);