const app = angular.module('wiMonitor', []);
app.controller('appController', async function ($scope, $http) {
     window.scope = $scope;

    const dt = $('#main-table').DataTable({
        fixedHeader: true,
        columns: [
            { data: 'index' },
            { data: 'username' },
            { data: 'path' },
            { data: 'time' }
        ],
    });

    const mdt = $('#mean-table').DataTable({
        fixedHeader: true,
        columns: [
            { data: 'index' },
            { data: 'socketId' },
            { data: 'num' },
            { data: 'status' },
            { data: 'time' }
        ],
    });
    const host = 'http://localhost:3002';
    $scope.days_socket = '1';
    $scope.days = '1';
    async function getRequests () {
        const allRes = await $http.get(`${host}/response/all?days=${$scope.days}`);
        $scope.all = allRes.data.map((item, index) => Object.assign(item, { index: index + 1 }));
        dt.clear();
        dt.rows.add($scope.all);
        dt.draw();
    }
    async function getMeanRequests () {
        const allRes = await $http.get(`${host}/response/socket/all?days=${$scope.days_socket}`);
        $scope.all = allRes.data.map((item, index) => Object.assign(item, { index: index + 1 }));
        mdt.clear();
        mdt.rows.add($scope.all);
        mdt.draw();
    }
    $scope.getRequests = getRequests;
    $scope.getMeanRequests = getMeanRequests;
    getRequests();
    getMeanRequests();
    $scope.$apply();
});
