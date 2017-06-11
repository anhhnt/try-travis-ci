'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _TryTravis = require('./components/TryTravis');

var _TryTravis2 = _interopRequireDefault(_TryTravis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  apiKey: 'AIzaSyBkfRlsHQSIHQVOKFIVbUV-63ebHx_8LUk',
  authDomain: 'try-travis-ci.firebaseapp.com',
  databaseURL: 'https://try-travis-ci.firebaseio.com',
  projectId: 'try-travis-ci',
  storageBucket: 'try-travis-ci.appspot.com',
  messagingSenderId: '941476104817'
};
_firebase2.default.initializeApp(config);
var provider = new _firebase2.default.auth.GoogleAuthProvider();
_firebase2.default.auth().signInWithPopup(provider).then(function () {
  // This gives you a Google Access Token. You can use it to access the Google API.
  // var token = result.credential.accessToken
  // // The signed-in user info.
  // var user = result.user
  // ...
  (0, _reactDom.render)(_react2.default.createElement(_TryTravis2.default, null), document.querySelector('#app-root'));
}).catch(function () /*error */{
  // Handle Errors here.
  // var errorCode = error.code
  // var errorMessage = error.message
  // // The email of the user's account used.
  // var email = error.email
  // // The firebase.auth.AuthCredential type that was used.
  // var credential = error.credential
  // ...
});