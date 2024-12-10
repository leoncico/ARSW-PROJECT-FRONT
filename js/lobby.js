var lobbyApp = (function () {
    var username;
    var stompClient;
    var tanksElem;
    var tankList;
    var tankNumber;
    const api = "https://leotankcicos-cpeaeeh0d0hjfvef.eastus2-01.azurewebsites.net";
	// var accessToken;
	
    var getUsernameFromSession = function() {
		return $.get(api + "/api/tanks/username")
            .done(function(data) {
                username = data;
                console.log("User:", username);
            })
            .fail(function() {
                console.error("Username not found in session");
            });
	};

    var loadTanks = function() {
        return new Promise((resolve, reject) => {
            $.get(api + "/api/tanks")
                .done(function(tanks) {
                    tankList = tanks;
                    displayTanks(tanks);
                    tankNumber = $('#playerNumber');
                    tankNumber.text(tankList.length);
                    
                    resolve(tanks); // Resuelve la promesa con los tanques cargados
                })
                .fail(function() {
                    console.error("Error fetching tanks");
                    reject("Error fetching tanks"); // Rechaza la promesa en caso de error
                });
        });
    };

    var subscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS(api + '/stompendpoint');
        stompClient = Stomp.over(socket);
        
        return new Promise((resolve, reject) => {
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);
                stompClient.subscribe(`/topic/lobby/1`, function (eventbody) {
                    loadTanks().then((tanks) => {
                        // Este código se ejecuta una vez que loadTanks se complete
                        if (tankList.length >= 3) {
                            alert("Starting match");
                            window.location.href = "board.html";
                        }
                    }).catch((error) => {
                        console.error(error); // Manejo de errores si loadTanks falla
                    });
                });
                resolve();
            }, function(error) {
                reject(error);
            });
        });
    };

    var displayTanks = function(tanks) {
        tanksElem = $('#tanksList');
        tanksElem.empty();
        tankNumber = 
			tanks.forEach(function(tank) {
				tanksElem.append(`<li>${tank.name}</li>`);
			});

    };

    var connect = function() {
        stompClient.send("/topic/lobby/1", {}, JSON.stringify(username));
    }

    return {
        init: function() {
			// accessToken = sessionStorage.getItem("access_token");
			username = sessionStorage.getItem("username");
			// console.log(accessToken);
			console.log(username);
			
            //getUsernameFromSession()
			loadTanks()
                .then(() => subscribe())
                .then(() => connect())
                .catch((error) => console.error("Error in initialization:", error));
        }
    };
})();