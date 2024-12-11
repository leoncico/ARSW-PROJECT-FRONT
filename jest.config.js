module.exports = {
    collectCoverage: true,            // Habilita la recolección de cobertura
    coverageDirectory: 'coverage',    // Carpeta donde se almacenará el informe
    coverageReporters: ['lcov', 'text'],  // Formato lcov es necesario para SonarCloud
  };
  