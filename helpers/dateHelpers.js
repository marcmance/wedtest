majr.factory('dateHelpers', ['$resource',
  function ($resource) {
    return {
      getCurrentDate: function () {
        var d = new Date(Date.now());
        var humanDate =  (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();
        return humanDate;
      }
    }
  }
]);
