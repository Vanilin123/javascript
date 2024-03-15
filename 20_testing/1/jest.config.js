/* eslint-disable no-undef */
module.exports = {
    transform: {
      '\\.js$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom-global',
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
  };