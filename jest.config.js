export default {
    collectCoverage: true,              // Habilita la recolección de cobertura
    coverageDirectory: 'coverage',      // Carpeta donde se almacenará el informe
    coverageReporters: ['lcov', 'text'], // Formato lcov es necesario para SonarCloud
    coveragePathIgnorePatterns: [       // Ignorar directorios como node_modules y test/
      '/node_modules/',
      '/test/'
    ],
    testResultsProcessor: 'jest-sonar-reporter',  // Procesador de resultados para enviar a SonarCloud
  };
  
  