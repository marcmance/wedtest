majr.controller('InvitationController', ['$scope', '$route', '$firebaseObject', '$firebaseArray', 'inviteInfo', function ($scope, $route, $firebaseObject, $firebaseArray, inviteInfo) {

    $scope.invitations = inviteInfo.invites;
    $scope.people = inviteInfo.people;
    $scope.addresses = inviteInfo.addresses;
    $scope.addressInfo = [];
    $scope.testArr = [];
    $scope.testArr[0] = "hello";

    $scope.vars = {
      confirmedCount: 0,
      confirmedBabies: 0,
      confirmedKids: 0,
      deniedCount: 0,
      noreplyCount: 0,
      cardCount: 0
    }

     $scope.people.$loaded().then(function(){
        angular.forEach($scope.people, function(guest) {
            if(guest.status == 1) {
              if(guest.baby) {
                $scope.vars.confirmedBabies++;
              }
              else if(guest.kid) {
                $scope.vars.confirmedKids++;
              }
              else {
                $scope.vars.confirmedCount++;
              }
            }
            else if(guest.status == 0) {
              $scope.vars.deniedCount++;
            }
            else if(guest.status == 2 && guest.last_name != 'Bisda') {
              $scope.vars.noreplyCount++;
            }
            if(guest.manualResponse) {
              $scope.vars.cardCount++;
            }
        });

        var graph = $(".graphs .totals");
        var graphWidth = graph.width();
        var percent = ($scope.vars.confirmedCount / 235) * graphWidth;
        graph.find(".confirmed").css("width", percent);
        var percent = ($scope.vars.deniedCount / 235) * graphWidth;

        var denied = graph.find(".denied").css("width", percent);
        if(percent == 0) {
          denied.hide();
        }

        var percent = ($scope.vars.noreplyCount / 235) * graphWidth;
        graph.find(".noreply").css("width", percent);

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

    $scope.getCurrentDate = function () {
      var d = new Date(Date.now());
      var humanDate =  (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();
      return humanDate;
    };

    $scope.updateInvitation = function(i) {
      var invite = $scope.invitations.$getRecord(i);
      invite.invitationID = parseInt(invite.invitationID) || invite.invitationID;
      $scope.invitations.$save(invite);
    }

    $scope.confirmInvitation = function(i) {
      var invite = $scope.invitations.$getRecord(i);
      var i =0;
      for(g in invite.guests) {
        var guest = $scope.people.$getRecord(invite.guests[g]);
        guest.status = 1;
        guest.rsvpTime = $scope.getCurrentDate();
        guest.rsvpTimestamp = Date.now();
        guest.manualResponse = true;
        $scope.people.$save(guest);
      }
      invite.response = true;
      invite.rsvpTime = $scope.getCurrentDate();
      invite.rsvpTimestamp = Date.now();
      invite.confirmedCount = invite.guests.length;
      invite.manualResponse = true;
      $scope.invitations.$save(invite);
    }

}]);
