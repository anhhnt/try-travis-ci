import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'
import TryTravis from './components/TryTravis'

const config = {
  apiKey: 'AIzaSyBkfRlsHQSIHQVOKFIVbUV-63ebHx_8LUk',
  authDomain: 'try-travis-ci.firebaseapp.com',
  databaseURL: 'https://try-travis-ci.firebaseio.com',
  projectId: 'try-travis-ci',
  storageBucket: 'try-travis-ci.appspot.com',
  messagingSenderId: '941476104817'
}
firebase.initializeApp(config)
const provider = new firebase.auth.GoogleAuthProvider()
firebase.auth().signInWithPopup(provider).then(function() {
  // This gives you a Google Access Token. You can use it to access the Google API.
  // var token = result.credential.accessToken
  // // The signed-in user info.
  // var user = result.user
  // ...
  render(
    <TryTravis />,
    document.querySelector('#app-root')
  )
}).catch(function(/*error */) {
  // Handle Errors here.
  // var errorCode = error.code
  // var errorMessage = error.message
  // // The email of the user's account used.
  // var email = error.email
  // // The firebase.auth.AuthCredential type that was used.
  // var credential = error.credential
  // ...
})
