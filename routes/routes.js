majr.config(['$routeProvider',

    function ($routeProvider) {

        $routeProvider.when('/',
            {
                templateUrl: 'views/guestlist.html',
                controller: 'GuestListController'
            }
        ).when('/rsvp/:id', {
            templateUrl: 'views/rsvp.html',
            controller: 'RSVPController'
        }).when('/guest-add', {
            templateUrl: 'views/addGuest.html',
            controller: 'AddGuestController'
        }).when('/guest/:id', {
            templateUrl: 'views/editGuest.html',
            controller: 'EditGuestController'
        }).when('/address/add', {
            templateUrl: 'views/addAddress.html',
            controller: 'AddAddressController'
        }).when('/invitation/add', {
            templateUrl: 'views/addInvitation.html',
            controller: 'AddInvitationController'
        }).
        when('/invitations', {
            templateUrl: 'views/invitations.html',
            controller: 'InvitationController',
            resolve: {
                inviteInfo: function($firebaseArray){
                  var ref = new Firebase("https://marcandjennyromance.firebaseio.com/person");
                  var people = $firebaseArray(ref);
                  var ref2 = new Firebase("https://marcandjennyromance.firebaseio.com/address");
                  var addresses = $firebaseArray(ref2);
                  var ref3 = new Firebase("https://marcandjennyromance.firebaseio.com/invitation/");
                  var invites = $firebaseArray(ref3);
                  return {
                    people: people,
                    addresses: addresses,
                    invites: invites
                  };
                }
            }
        }).
        when('/invitations-nice', {
            templateUrl: 'views/invitations-nice.html',
            controller: 'InvitationController',
            resolve: {
                inviteInfo: function($firebaseArray){
                  var ref = new Firebase("https://marcandjennyromance.firebaseio.com/person");
                  var people = $firebaseArray(ref);
                  var ref2 = new Firebase("https://marcandjennyromance.firebaseio.com/address");
                  var addresses = $firebaseArray(ref2);
                  var ref3 = new Firebase("https://marcandjennyromance.firebaseio.com/invitation/");
                  var invites = $firebaseArray(ref3);
                  console.log(typeof(invites));
                  return {
                    people: people,
                    addresses: addresses,
                    invites: invites
                  };
                }
            }
        }).
        when('/addresses', {
            templateUrl: 'views/addresses.html',
            controller: 'AddressController'
        })
        .otherwise({ redirectTo: '/' });
    }
]);
