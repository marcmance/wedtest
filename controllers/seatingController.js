majr.controller('SeatingController', ['$scope', '$route', '$firebaseObject', '$firebaseArray', 'inviteInfo',function ($scope, $route, $firebaseObject, $firebaseArray, inviteInfo) {
  console.log("seating?");
  $scope.items = ['test', 'test2'];
  $scope.items2 = ['hello', 'from', 'the', 'other', 'side'];

  $scope.sortableOptions = {
    placeholder: "app",
    connectWith: ".tables",
  };

  $scope.people = inviteInfo.people;
  $scope.tables = inviteInfo.table;
  $scope.numberstuff = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  $scope.vars = {
    filters: {
      guest_name: ""
    },
    tabled: 0,
    notTabled: 0
  }


  $scope.people.$loaded().then(function(){
    angular.forEach($scope.people, function(guest) {
      if(guest.status == 1) {
        if(guest.table != undefined && guest.table > 0) {
          $scope.vars.tabled++;
        }
        else {
          $scope.vars.notTabled++;
        }
      }
    });
  });

  var table = 1;
  $scope.addTable = function() {
    $scope.tables.$add({
      tableName: "Test table",
      tableNumber: table,
      guests: []
    });
    table++;
  }

  $scope.addGuest = function(tId) {
    var t = $scope.tables.$getRecord(tId);
    t.showFilter = true;
    //t.guests.push()
  }

  $scope.toTable = function(t, p) {
    var t = $scope.tables.$getRecord($scope.tables.$keyAt(t));
    var oldTableNumber = p.table;

    if(t.guests === undefined) {
      t.guests = [];
    }

    var oldTable = $scope.tables.$getRecord($scope.tables.$keyAt(oldTableNumber - 1));

    if(oldTable != undefined && oldTable.guests != undefined) {
      for(var i = oldTable.guests.length -1; i >= 0 ; i--){
        console.log("id", oldTable.guests[i].id);
        if(oldTable.guests[i].gid == p.$id){
          oldTable.guests.splice(i, 1);
        }
      }
    }

    for(var i = t.guests.length -1; i >= 0 ; i--){
      if(t.guests[i].gid == p.$id){
        t.guests.splice(i, 1);
      }
    }

    p.table = t.tableNumber;
    var guest = {
      first_name: p.first_name,
      last_name: p.last_name,
      gid: p.$id
    }

    if(t.guests === undefined) {
      t.guests = [];
    }
    //t.guests = [];
    t.guests.push(guest);
    //t.guests = [];

    $scope.people.$save(p);
    $scope.tables.$save(oldTable);
    $scope.tables.$save(t);
  }

  $scope.removeGuest = function(t, p) {
    var t = $scope.tables.$getRecord(t);
    for(var i = t.guests.length -1; i >= 0 ; i--){
      if(t.guests[i].gid == p.gid){
        t.guests.splice(i, 1);
      }
    }
    var p = $scope.people.$getRecord(p.gid);
    p.table = 0;
    $scope.people.$save(p);
    $scope.tables.$save(t);
  }

  $scope.deleteTable = function(t) {
    var r = confirm("Are you sure?");
    if (r == true) {
      var a = $scope.tables.$getRecord(t);
      $scope.tables.$remove(a);
    }
  }
}]);

