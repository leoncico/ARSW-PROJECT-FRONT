const apiClient = (function(){

    const api = "https://leotankcicos-cpeaeeh0d0hjfvef.eastus2-01.azurewebsites.net";

    function getUsername() {
        return new Promise((resolve, reject) => {
            $.get(api + "/api/tanks/username", function (data) {
                console.log("Player: " + data)
                resolve(data);
            }).fail(function () {
                alert("There is no user with that name");
                reject();
            });
        });
    }

    function getTank(username) {
        return new Promise((resolve, reject) => {
            $.get(api + `/api/tanks/${username}`, function (tank) {
                resolve(tank);
            }).fail(function () {
                alert("There is no user with that name");
                reject();
            });
        });
    }

    function getBoard() {
        return new Promise((resolve, reject) => {
            $.get(api + "/api/tanks/board", function (data) {
                resolve(data);
            }).fail(function () {
                alert("Failed to get board");
                reject();
            });
        });
    }

    function getTanks() {
        return new Promise((resolve, reject) => {
            $.get(api + "/api/tanks", function (data) {
                resolve(data);
            }).fail(function () {
                alert("There are no tanks");
                reject();
            });
        });
    }

    return{
        getUsername: getUsername,
        getTank: getTank,
        getBoard: getBoard,
        getTanks: getTanks
    }

})();