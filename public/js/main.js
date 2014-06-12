require(['jQuery', 'angular', 'routes', 'controllers/AppController', 'directives', 'bootstrap'], function ($, angular, mainRoutes) {
  $(function () { // using jQuery because it will run this even if DOM load already happened
    angular.bootstrap(document, ['mainApp']);
  });
});