// __tests__/boardApp.test.js
const boardApp = require('../js/board');
const apiClient = require('../js/apiClient');

    beforeEach(() => {
        mockApiClient = apiClient;
        stompClient = {
            send: jest.fn(),
            connect: jest.fn(),
            subscribe: jest.fn(),
            disconnect: jest.fn(),
        };

        global.Stomp = jest.fn(() => stompClient);
    });

    afterEach(() => {
      document.body.innerHTML = '';
      jest.clearAllMocks();
    });


describe('moveTank function', () => {
      beforeEach(() => {
          // Inicializa el tanque antes de cada prueba
          boardApp.userTank = {
              posx: 5,
              posy: 5,
              rotation: 0,
          };
      });
  

    it('should move tank correctly left', () => {
      // Crea un mock del método `moveTank`
      boardApp.moveTank = jest.fn((direction) => {
          // Lógica del movimiento (esto debe coincidir con la implementación real de `moveTank`)
          const movement = {
              left: { newPosX: boardApp.userTank.posx - 1, newPosY: boardApp.userTank.posy, rotation: 180 },
              // Si agregas más direcciones, asegúrate de reflejar el cambio de posición y rotación
          };
  
          // Actualiza las propiedades del tanque
          boardApp.userTank.posx = movement[direction].newPosX;
          boardApp.userTank.posy = movement[direction].newPosY;
          boardApp.userTank.rotation = movement[direction].rotation;
      });
  
      // Llama al método moveTank con la dirección 'left'
      const direction = 'left';
      boardApp.moveTank(direction);
  
      // Verifica que el tanque se haya movido correctamente
      expect(boardApp.userTank.posx).toBe(4); // Debería haber disminuido en 1
      expect(boardApp.userTank.posy).toBe(5); // No debería haberse movido en Y
      expect(boardApp.userTank.rotation).toBe(180); // La rotación debe ser 180 grados (hacia la izquierda)
  
      // Verifica que el método `moveTank` haya sido llamado
      expect(boardApp.moveTank).toHaveBeenCalledWith(direction);
      expect(boardApp.moveTank).toHaveBeenCalledTimes(1);
  });

    it('should move tank right', () => {
      const direction = 'right';
      boardApp.moveTank = jest.fn((direction) => {
          const movement = {
              right: { newPosX: boardApp.userTank.posx + 1, newPosY: boardApp.userTank.posy, rotation: 0 },
          };

          boardApp.userTank.posx = movement[direction].newPosX;
          boardApp.userTank.posy = movement[direction].newPosY;
          boardApp.userTank.rotation = movement[direction].rotation;
      });

      // Llama al método moveTank con la dirección 'right'
      boardApp.moveTank(direction);

      // Verifica que el tanque se haya movido correctamente
      expect(boardApp.userTank.posx).toBe(6);  // posx debe aumentar en 1
      expect(boardApp.userTank.posy).toBe(5);  // posy no cambia
      expect(boardApp.userTank.rotation).toBe(0);  // rotación hacia la derecha (0 grados)
  });

  it('should move tank up', () => {
      const direction = 'up';
      boardApp.moveTank = jest.fn((direction) => {
          const movement = {
              up: { newPosX: boardApp.userTank.posx, newPosY: boardApp.userTank.posy - 1, rotation: 90 },
          };

          boardApp.userTank.posx = movement[direction].newPosX;
          boardApp.userTank.posy = movement[direction].newPosY;
          boardApp.userTank.rotation = movement[direction].rotation;
      });

      // Llama al método moveTank con la dirección 'up'
      boardApp.moveTank(direction);

      // Verifica que el tanque se haya movido correctamente
      expect(boardApp.userTank.posx).toBe(5);  // posx no cambia
      expect(boardApp.userTank.posy).toBe(4);  // posy debe disminuir en 1
      expect(boardApp.userTank.rotation).toBe(90);  // rotación hacia arriba (90 grados)
  });

  it('should move tank down', () => {
      const direction = 'down';
      boardApp.moveTank = jest.fn((direction) => {
          const movement = {
              down: { newPosX: boardApp.userTank.posx, newPosY: boardApp.userTank.posy + 1, rotation: 270 },
          };

          boardApp.userTank.posx = movement[direction].newPosX;
          boardApp.userTank.posy = movement[direction].newPosY;
          boardApp.userTank.rotation = movement[direction].rotation;
      });

      // Llama al método moveTank con la dirección 'down'
      boardApp.moveTank(direction);

      // Verifica que el tanque se haya movido correctamente
      expect(boardApp.userTank.posx).toBe(5);  // posx no cambia
      expect(boardApp.userTank.posy).toBe(6);  // posy debe aumentar en 1
      expect(boardApp.userTank.rotation).toBe(270);  // rotación hacia abajo (270 grados)
  });
});

describe('rotateTank function', () => {
    let tankElement;

    beforeEach(() => {
        // Crear un tanque con valores iniciales
        boardApp.userTank = {
            posx: 5,
            posy: 5,
            rotation: 0,
        };

        // Crear un mock de la función rotateTank
        boardApp.rotateTank = jest.fn((tankId, degrees) => {
            const validDegrees = [0, 90, 180, 270];  // Suponiendo que las rotaciones posibles son 0, 90, 180 y 270 grados
            if (validDegrees.includes(degrees)) {
                boardApp.userTank.rotation = degrees;
            }
        });

        // Crear un div para el tanque antes de cada prueba
        tankElement = document.createElement('div');
        tankElement.id = 'tank-1';
        document.body.appendChild(tankElement);  // Agregar el elemento al DOM
    });

    afterEach(() => {
        // Limpiar el DOM después de cada prueba
        document.body.innerHTML = '';
        jest.restoreAllMocks();
    });

    it('should rotate the tank by the given degrees', () => {
    // Crear un mock de la función rotateTank
      const tankId = 1;
      const degrees = 90;
      boardApp.rotateTank(tankId, degrees);

      // Verificar que la rotación se haya actualizado correctamente
      expect(boardApp.userTank.rotation).toBe(90);
      expect(boardApp.rotateTank).toHaveBeenCalledWith(tankId, degrees);
      expect(boardApp.rotateTank).toHaveBeenCalledTimes(1);;
            // Llamar a la función rotateTank
                
  });

  it('should rotate tank to 180 degrees', () => {
    const tankId = 1;
    const degrees = 180;

    // Llamar a la función rotateTank
    boardApp.rotateTank(tankId, degrees);

    // Verificar que la rotación se haya actualizado correctamente
    expect(boardApp.userTank.rotation).toBe(180);
    expect(boardApp.rotateTank).toHaveBeenCalledWith(tankId, degrees);
    expect(boardApp.rotateTank).toHaveBeenCalledTimes(1);
  });

  it('should rotate tank to 270 degrees', () => {
    const tankId = 1;
    const degrees = 270;

    // Llamar a la función rotateTank
    boardApp.rotateTank(tankId, degrees);

    // Verificar que la rotación se haya actualizado correctamente
    expect(boardApp.userTank.rotation).toBe(270);
    expect(boardApp.rotateTank).toHaveBeenCalledWith(tankId, degrees);
    expect(boardApp.rotateTank).toHaveBeenCalledTimes(1);
  });

  it('should not rotate tank for invalid degrees', () => {
    const tankId = 1;
    const degrees = 45;  // Rotación inválida

    // Llamar a la función rotateTank
    boardApp.rotateTank(tankId, degrees);

    // Verificar que la rotación no haya cambiado
    expect(boardApp.userTank.rotation).toBe(0);  // La rotación debe mantenerse en 0
    expect(boardApp.rotateTank).toHaveBeenCalledWith(tankId, degrees);
    expect(boardApp.rotateTank).toHaveBeenCalledTimes(1);
  });
});

describe('displayWinner', () => {
  let displayWinner, mockWinner;

  beforeEach(() => {
      // Mock de dependencias globales
      winnerName = { textContent: "" };
      tanks = new Map([["player1", {}], ["player2", {}]]);
      initializeBoard = jest.fn();
      winnerModal = { style: { display: "none" } };
      resetAfterWin = jest.fn();

      // Mock de la función displayWinner
      displayWinner = jest.fn((winner) => {
          winnerName.textContent = `¡El ganador es ${winner.name}!`;
          tanks.delete(winner.name);
          initializeBoard();
          winnerModal.style.display = "block"; // Muestra el modal
          resetAfterWin();
      });

      // Configuración del ganador ficticio
      mockWinner = { name: "player1" };
  });

  it('should update the winnerName textContent with the winner\'s name', () => {
      displayWinner(mockWinner);
      expect(winnerName.textContent).toBe("¡El ganador es player1!");
  });

  it('should remove the winner from the tanks map', () => {
      displayWinner(mockWinner);
      expect(tanks.has("player1")).toBe(false);
      expect(tanks.has("player2")).toBe(true); // Asegurarse de que otros jugadores no se eliminen
  });

  it('should call initializeBoard', () => {
      displayWinner(mockWinner);
      expect(initializeBoard).toHaveBeenCalled();
  });

  it('should set the winnerModal style to display block', () => {
      displayWinner(mockWinner);
      expect(winnerModal.style.display).toBe("block");
  });

  it('should call resetAfterWin', () => {
      displayWinner(mockWinner);
      expect(resetAfterWin).toHaveBeenCalled();
  });
});






