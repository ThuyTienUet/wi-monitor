angular
    .module('wiMonitor', ['ngRoute'])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'src/wiChat/wiChat.html',
                controller: 'wiChatCtrl'
            })
            .when('/wiApi', {
                templateUrl: 'src/wiAPi/wiApi.html',
                controller: 'wiApiCtrl'
            })
            .when('/apiAuth', {
                templateUrl: 'wi-api/apiAuth/apiAuth.template.html',
                controller: 'apiAuthCtrl'
            })
            .when('/apiCom', {
                templateUrl: 'wi-api/apiCommunication/apiCom.template.html',
                controller: 'apiChatCtrl'
            })
            .when('/wiOnline', {
                templateUrl: 'wi-api/wiOnl/wiOnl.template.html',
                controller: 'apiInventoryCtrl'
            })
            .when('/apiSOM', {
                templateUrl: 'wi-api/apiSOM/apiSOM.template.html',
                controller: 'apiSOMCtrl'
            })
            .when('/WIPM', {
                templateUrl: 'wi-api/WIPM/WIPM.template.html',
                controller: 'apiWIPMCtrl'
            })
            .when('/login', {
                templateUrl:''
            })
            .otherwise({ redirectTo: '/' });
    }])
