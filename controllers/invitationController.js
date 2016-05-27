majr.controller('InvitationController', ['$scope', '$route', '$firebaseObject', '$firebaseArray', 'inviteInfo', function ($scope, $route, $firebaseObject, $firebaseArray, inviteInfo) {

    $scope.invitations = inviteInfo.invites;
    $scope.people = inviteInfo.people;
    $scope.addresses = inviteInfo.addresses;
    $scope.addressInfo = [];
    $scope.testArr = [];
    $scope.testArr[0] = "hello";

    $scope.vars = {
      confirmedCount: 0,
      deniedCount: 0
    }

     $scope.people.$loaded()
    .then(function(){
        angular.forEach($scope.people, function(user) {
            console.log(user);
        })
    });

    $scope.rsvp = function(answer, i) {
        console.log(i);
        var user = $scope.test.$getRecord(i);
        user.status = answer;
        user.replytime = Date.now();
        $scope.test.$save(user);
    }

    $scope.getGuest = function(i) {
      var user = $scope.people.$getRecord(i);
      //console.log(user);
      return user.first_name + " " + user.last_name;
    }
    $scope.getGuestStatus = function(g,i) {
      var user = $scope.people.$getRecord(g);
      if(user.status == 1) {
        return "Confirmed";
      }
      else if (user.status == 0) {
        //$scope.vars.deniedCount++;
        return "Denied";
      }

    }
    $scope.getRSVPDate = function(i) {
      var user = $scope.people.$getRecord(i);
      return user.rsvpTime || '';
    }
    $scope.getAddress = function(i) {
      var address = $scope.addresses.$getRecord(i);
      $scope.addressInfo[i] = address;
    }

    $scope.deleteInvitation = function(i) {
        var r = confirm("Are you sure?");
        if (r == true) {
          var a = $scope.invitations.$getRecord(i);
          $scope.invitations.$remove(a);
        }
    }

    $scope.updateNumbers2 = function() {
      var base = 100000;
      var x = 10000;
      var y = [1248, 2459, 1337, 6789, 3412, 4596, 4511, 567, 732, 134, 9821, 321, 4, 991, 5213];
      var y2 = [231, 1234, 8712, 1456, 3874, 2309, 1293,9222, 7222, 12, 661, 9012, 2, 182, 934];

      var numbersArray = [y,y2];
      var arrayPointer = 0;
      $scope.invitations.$loaded()
        .then(function(){
            angular.forEach($scope.invitations, function(invite) {
                var invite = $scope.invitations.$getRecord(invite.$id);
                var r = Math.floor(Math.random() * y.length);

                if(x > 870000) {
                  x = 10000;
                  arrayPointer = 1;
                }
                x = x + 10000;

                var number = base + x + numbersArray[arrayPointer][r];
                //invite.invitationID = number;
                console.log(invite.invitationID);
                //$scope.invitations.$save(invite);
            })
        });


      /*var invite = $scope.invitations.$getRecord(i);
      $scope.invitations.$save(invite);*/
    }

    $scope.numberCheck = function() {
      var idArr = {};
      console.log($scope.invitations.length);
      $scope.invitations.$loaded()
        .then(function(){
            angular.forEach($scope.invitations, function(invite) {
              var invite = $scope.invitations.$getRecord(invite.$id);
              if(!idArr[invite.invitationID]) {
                idArr[invite.invitationID] = 1;

              }
              else {

              }
            })
          })
    }

    $scope.repsonded = function(i) {
      var invite = $scope.invitations.$getRecord(i);
      invite.response = !invite.response;
      $scope.invitations.$save(invite);
    }



    $scope.updateInvitation = function(i) {
      var invite = $scope.invitations.$getRecord(i);
      invite.invitationID = parseInt(invite.invitationID) || invite.invitationID;
      $scope.invitations.$save(invite);
      //var copyMade = invite.copyMade;
      /*if(!copyMade) {
        invite.createNew = true;
      }
      $scope.invitations.$save(invite);
      if(!copyMade) {
        var newRef = new Firebase("https://marcandjennyromance.firebaseio.com/invitation/adam-kristina-2");
        var testInvite = $firebaseObject(newRef);
        testInvite.address = invite.address;
        testInvite.guests = invite.guests;
        testInvite.copyMade = true;
        testInvite.$save();
      }*/
    }

}]);
