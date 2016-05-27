
majr.controller('GuestListController', ['$scope', '$rootScope', '$route', '$firebaseObject', '$firebaseArray', function ($scope, $rootScope, $route, $firebaseObject, $firebaseArray) {
    $scope.vars = {
        newName: {
            first_name: '',
            last_name: '',
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        filters: {
            guest_name: '',
            guestType: '',
            needsAddress: false
        },

        showAddress: [],
        showFilter: false,
        guestlistSize: null,
        isGuestList: true //fitler check so it doenst fuck with other pages
    }

    var ref = new Firebase("https://marcandjennyromance.firebaseio.com/person");
    $scope.people = $firebaseArray(ref);

    $scope.people.$loaded().then(function() {
        $scope.vars.guestlistSize = $scope.people.length;
    });


    $scope.addName = function() {
        if($scope.guestlist.newName.first_name !== '') {
            $scope.people.$add({
                first_name: $scope.vars.newName.first_name.trim(),
                last_name: $scope.vars.newName.last_name.trim(),
                street: $scope.vars.newName.street.trim(),
                city: $scope.vars.newName.city.trim(),
                state: $scope.vars.newName.state.trim(),
                zip: $scope.vars.newName.zip.trim(),
                status: 2
            });
            $scope.vars.newName.first_name = '';
            $scope.vars.newName.last_name = '';
            $scope.vars.newName.street = '';
            $scope.vars.newName.city = '';
            $scope.vars.newName.state = '';
            $scope.vars.newName.zip = '';
        }
    }

    $scope.showAddress = function(i) {
        if($scope.vars.showAddress[i]) {
            $scope.vars.showAddress[i] = false;
        }
        else {
            $scope.vars.showAddress[i] = true;
        }
    }

    $scope.rsvp = function(answer, i) {
        var user = $scope.people.$getRecord(i);
        user.status = answer;
        if(answer == "2") {
            user.rsvpTime = '';
            user.rsvpEdit = '';
            user.manualResponse = false;
        }
        else {
            user.rsvpTime = Date.now();
            user.manualResponse = true;
        }

        $scope.people.$save(user);
    }

    $scope.setRelation = function(answer, i) {
        var user = $scope.people.$getRecord(i);
        user.relation = answer;
        $scope.people.$save(user);
    }

    $scope.delete = function(i) {
        var r = confirm("Are you sure?");
        if (r == true) {
           var user = $scope.people.$getRecord(i);
            $scope.people.$remove(user);
        }
    }

    $scope.addFilter = function(f) {
        if(f === "Address") {
            console.log($scope.vars.filters.needsAddress);
            $scope.vars.filters.needsAddress = !$scope.vars.filters.needsAddress;
        }
        else {
            if(f === $scope.vars.filters.guestType) {
                $scope.vars.filters.guestType = "";
            }
            else {
                $scope.vars.filters.guestType = f;
            }
        }
    }

    $scope.closeModal = function() {
        $scope.vars.showFilter = false;
    }

    $rootScope.filterName = function($event) {
        console.log($event.keyCode + " + " + $scope.vars.isGuestList);
        if($event.keyCode === 8 && $scope.vars.isGuestList) {
            console.log('cancel');
            $scope.vars.showFilter = true;
            $event.preventDefault();
            $scope.vars.filters.guest_name = $scope.vars.filters.guest_name.substr(0,$scope.vars.filters.guest_name.length - 1);

            if($scope.vars.filters.guest_name === '') {
                $scope.vars.showFilter = false;
            }
        }
        else if(($event.keyCode >= 48 && $event.keyCode <= 57) || ($event.keyCode >= 65 && $event.keyCode <= 90)){
            $scope.vars.showFilter = true;
            $scope.vars.filters.guest_name += String.fromCharCode($event.keyCode);
        }
        else if($event.keyCode == 13) {
            $scope.vars.showFilter = false;
        }
    }

}]);
