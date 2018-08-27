const app = angular.module('wiMonitor', []);
app.controller('appController', async function ($scope, $http) {
    window.scope = $scope;
    $scope.list_monitor = 'chat';
    let db = {
        col: 'monitor_chat'
    }
    $scope.title = 'Monitor chat';

    $scope.change = function (str) {
        $scope.list_monitor = str;
        if ($scope.list_monitor == 'wi') {
            db.col = 'monitor_wi';
            $scope.title = 'Monitor WI';
        } else if ($scope.list_monitor == 'chat') {
            db.col = 'monitor_chat';
            $scope.title = 'Monitor chat'
        } else {
            db.col = 'monitor_api';
            $scope.title = 'Monitor Api'
        }
        $scope.totalReq = totalReq;
        $scope.getRequests = getRequests;
        $scope.getMeanRequests = getMeanRequests;
        totalReq();
        getRequests();
        getMeanRequests();
    }

    // const host = 'http://monitor.dev.i2g.cloud';
    const host = 'http://localhost:3001'

    const dt = $('#main-table').DataTable({
        fixedHeader: true,
        columns: [
            { data: 'index' },
            { data: 'username' },
            { data: 'time' },
            { data: 'content' }
            
        //     { data: 'path' },
        //     { data: 'time' },
        //     { data: 'duration' },
         ],
    });

    const mdt = $('#mean-table').DataTable({
        fixedHeader: true,
        columns: [
            { data: 'index' },
            { data: 'username' },
            { data: 'time' },
            { data: 'content' }
            // { data: 'path' },
            // { data: 'time' },
            // { data: 'duration' },
        ],
    });
    $scope.days = '1';
    $scope.hours = '1';

    async function totalReq() {
        const countRes = await $http.post(host + '/response/count', db);
        if (countRes.data.length == 0) {
            $scope.total = 0
        } else
            $scope.total = countRes.data[0].count_duration;
    }
    async function getRequests() {
        const allRes = await $http.post(`${host}/response/all?hours=${$scope.hours}`, db);
        $scope.all = allRes.data.map((item, index) => Object.assign(item, { index: index + 1 }));
        let str = $scope.all[0].content;

        dt.clear();
        dt.rows.add($scope.all);
        dt.draw();
    }
    async function getMeanRequests() {
        const allRes = await $http.post(`${host}/response/mean/all?days=${$scope.days}`, db);
        $scope.all = allRes.data.map((item, index) => Object.assign(item, { index: index + 1 }));
        mdt.clear();
        mdt.rows.add($scope.all);
        mdt.draw();
    }
    $scope.totalReq = totalReq;
    $scope.getRequests = getRequests;
    $scope.getMeanRequests = getMeanRequests;
    totalReq();
    getRequests();
    getMeanRequests();
    //  $scope.$apply();
});
