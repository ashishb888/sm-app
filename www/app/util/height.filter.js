/*(function() {
  angular.module('starter').filter('heightFilter', heightFilter);

   function heightFilter(input) {
     return input.replace('ft', '\'').replace('in', '\"').replace(/ /g, "");
  }
})();*/

angular.module('starter').filter('heightFilter', function() {
  return function(input) {
    var height = input.feet + input.inches;
    return input.replace('ft', '\'').replace('in', '\"').replace(/ /g, "");;
  }
});
