// Initialize Firebase
var config = {
    apiKey: "AIzaSyBqfv6xi0BqNptob4wuUvWJFj2pPIAN6TM",
    authDomain: "vuetify-app-b22b8.firebaseapp.com",
    databaseURL: "https://vuetify-app-b22b8.firebaseio.com",
    projectId: "vuetify-app-b22b8",
    storageBucket: "vuetify-app-b22b8.appspot.com",
    messagingSenderId: "203988991333"
};
firebase.initializeApp(config);

var githubProvider = new firebase.auth.GithubAuthProvider();
githubProvider.setCustomParameters({
    'allow_signup': 'true'
});
githubProvider.addScope('user');

fibAuth = firebase.auth()

// Initialize Cloud Functions through Firebase
var fibFunc = firebase.functions();
