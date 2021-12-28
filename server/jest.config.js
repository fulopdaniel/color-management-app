const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@services/*': ['services/*'],
      '@controllers/*': ['controllers/*'],
      '@routes/*': ['routes/*'],
      '@daos/*': ['db/*'],
      '@util': ['util'],
      '@types': ['types'],
      '@const': ['const'],
    },
    { prefix: '<rootDir>/src/' }
  ),
};
