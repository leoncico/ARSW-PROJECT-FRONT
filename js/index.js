let indexApp = (function () {
    let tank;
    const api = "https://leotankcicos-cpeaeeh0d0hjfvef.eastus2-01.azurewebsites.net";  // Cambia esto según la URL de tu backend

    const pageModal = document.getElementById("modal-overlay");

    // Configuración de MSAL
    // const msalConfig = {
    //     auth: {
    //         clientId: "47c6a63b-2699-4c84-bd3e-e761c37671fd",  // Reemplaza con tu clientId de la aplicación cliente
    //         authority: "https://login.microsoftonline.com/db7dde3f-69fc-4e7b-9d6e-0e5a535c77c5",  // Reemplaza con tu tenantId
    //         redirectUri: "https://frontarsw.z22.web.core.windows.net/"  // Cambia según tu entorno
    //     },
    //     cache: {
    //         cacheLocation: "localStorage", 
    //         storeAuthStateInCookie: true
    //     }
    // };

    //const msalInstance = new msal.PublicClientApplication(msalConfig);

    // Función para mostrar el modal
    function displayPage() {
        pageModal.style.display = "block";
    }

    // // Función para ocultar el modal
    function hidePage() {
        pageModal.style.display = "none";
    }

    // Función de inicio de sesión con MSAL
    // async function login() {
    //     try {
    //         // Iniciar sesión con los scopes adecuados
    //         const loginResponse = await msalInstance.loginPopup({
    //             scopes: ["api://47c6a63b-2699-4c84-bd3e-e761c37671fd/access_as_user"]  // Asegúrate de que este scope coincide con el configurado en Azure AD
    //         });
    //         console.log("Usuario autenticado:", loginResponse);

	// 		sessionStorage.setItem('access_token', loginResponse.accessToken);
	// 		search(loginResponse.accessToken);

    //     } catch (error) {
    //         console.error("Error en el inicio de sesión:", error);
    //     }
    // }

    // Función de búsqueda y creación del tanque
    function search() {
        var username = $('#nameInput').val();
        if (!username) {
            alert("Write a valid name");
        } else {
            alert("Searching match ...");

            // Hacer la petición al backend con el token de acceso
            $.ajax({
                url: api + `/api/tanks/loginTank?username=${username}`,
                method: "POST",
                // headers: {
                //     "Authorization": `Bearer ${accessToken}`,  // Incluir el token en la cabecera
                //     "Content-Type": "application/json"
                // },
                success: function(response) {
                    tank = response;
                    window.location.href = "lobby.html";  // Redirigir después de un login exitoso
					sessionStorage.setItem('username', username);
                },
                error: function() {
                    alert("Error al buscar el tanque.");
                }
            });
        }
    }

    return {
        init: function () {
            // Mostrar el modal cuando se hace clic en el botón
            $('#findMatch').click(function () {
                displayPage();
            });

            // Iniciar sesión y ocultar el modal cuando se hace clic en el botón de confirmación
            $('#confirm').click(function () {
                search();  // Inicia el proceso de login
                hidePage();  // Oculta el modal después de la búsqueda
            });

            // Cerrar el modal al hacer clic fuera de él
            $('#modal-overlay').click(function (e) {
                if (e.target === pageModal) {
                    hidePage();
                }
            });
        }
    };
})();
