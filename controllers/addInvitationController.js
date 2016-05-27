majr.controller('AddInvitationController', ['$scope', '$rootScope', '$route', '$firebaseObject', '$firebaseArray', function ($scope, $rootScope, $route, $firebaseObject, $firebaseArray) {

  $scope.vars = {
    filters: {
        guest_name: '',
        address: ''
    },
    showFilter: false,
    showAddressFilter: false,
    showNames: false,
    showAddress: false,
    showBeginType: true,
    addAddressScreen: false,
    showSubmitPeople: true,
    showSubmitAddress: false,
    showBeginTypeAddresses: false,
    showSuccessMessage: false,
    addedNames: {},
    addedAddressId: ""
  }

  var ref = new Firebase("https://marcandjennyromance.firebaseio.com/person");
  $scope.people = $firebaseArray(ref);

  var ref2 = new Firebase("https://marcandjennyromance.firebaseio.com/invitation");
  $scope.invitations = $firebaseArray(ref2);

  var ref3 = new Firebase("https://marcandjennyromance.firebaseio.com/address");
  $scope.address = $firebaseArray(ref3);

  $rootScope.filterName = function($event) {
    $scope.vars.showBeginType = false;
    $scope.vars.showBeginTypeAddresses = false;
    if($event.keyCode === 8) {
      $event.preventDefault();
      if($scope.vars.addAddressScreen) {
        $scope.vars.showAddressFilter = true;
        $scope.vars.showAddress = true;
        $scope.vars.filters.address = $scope.vars.filters.address.substr(0,$scope.vars.filters.address.length - 1);

        if($scope.vars.filters.address === '') {
          $scope.vars.showAddressFilter = false;
          $scope.vars.showAddress = false;
        }
      }
      else {
        $scope.vars.showFilter = true;
        $scope.vars.showNames = true;
        $scope.vars.filters.guest_name = $scope.vars.filters.guest_name.substr(0,$scope.vars.filters.guest_name.length - 1);

        if($scope.vars.filters.guest_name === '') {
            $scope.vars.showFilter = false;
            $scope.vars.showNames = false;
        }
      }
    }

    else if(($event.keyCode >= 48 && $event.keyCode <= 57) || ($event.keyCode >= 65 && $event.keyCode <= 90)){
      if($scope.vars.addAddressScreen) {
        $scope.vars.showAddressFilter = true;
        $scope.vars.showAddress = true;
        $scope.vars.filters.address += String.fromCharCode($event.keyCode);
      }
      else {
        $scope.vars.showFilter = true;
        $scope.vars.showNames = true;
        $scope.vars.filters.guest_name += String.fromCharCode($event.keyCode);
      }
    }
    else if($event.keyCode == 13) {
      if($scope.vars.addAddressScreen) {
        $scope.vars.showAddressFilter = !$scope.vars.showAddressFilter;
      }
      else {
        $scope.vars.showFilter = !$scope.vars.showFilter;
      }
    }
  }

  $scope.closeModal = function() {
      if($scope.vars.addAddressScreen) {
        $scope.vars.showAddressFilter = false;
      }
      else {
        $scope.vars.showFilter = false;
      }
  }

  $scope.addPerson = function(i) {
      if($scope.vars.addedNames[i] === undefined) {
        $scope.vars.addedNames[i] = $scope.people.$getRecord(i);
      }
      else {
        delete $scope.vars.addedNames[i];
      }
  }

  $scope.addAddress = function(i) {
      $scope.vars.addedAddressId = i;
      $scope.vars.selectedAddress = $scope.address.$getRecord(i);
      $scope.vars.showAddress = false;
  }

  $scope.submitPeople = function() {
      $scope.vars.showFilter = false;
      $scope.vars.addAddressScreen = true;
      $scope.vars.showNames = false;
      $scope.vars.showSubmitPeople = false;
      $scope.vars.showSubmitAddress = true;
      $scope.vars.showBeginTypeAddresses = true;
  }

  $scope.submitInvitation  = function() {

    var keys = Object.keys($scope.vars.addedNames);
    $scope.invitations.$add({
        name: "test",
        guests: keys,
        address: $scope.vars.addedAddressId
    }).then(function(ref) {
      var inviteID = ref.key();

      for(k in keys) {
        var person = $scope.people.$getRecord(keys[k]);
        person.invitationID = inviteID;
        $scope.people.$save(person);
      }
    });

    $scope.vars.showSuccessMessage = true;
  }

}]);
