import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./secret"

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

window.signIn = function() {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}
  
window.signOut = function() {
    auth.onAuthStateChanged(user => {
        auth.signOut()
        .then(() => {
            console.log('ログアウトしました');
            location.reload();
        })
        .catch((error) => {
            console.log(`ログアウト時にエラーが発生しました (${error})`);
        });
    });
}
  
auth.onAuthStateChanged(user => {
    if (user) {
        const signOutMessage = `
        <p>Hello, ${user.displayName}!! (${user.uid}) ${user.email}<\/p>
        <img src="${user.photoURL}" alt="アバターの画像" width="32" height="32">
        <button class="btn btn-primary" type="submit"  onClick="signOut()">サインアウト<\/button>
        `;
        document.getElementById('auth').innerHTML =  signOutMessage;
        console.log('ログインしています');
    
    } else {
        const signInMessage = `
        <button class="btn btn-primary" type="submit"  onClick="signIn()">サインイン<\/button>
        `;
        document.getElementById('auth').innerHTML = signInMessage;       
    }
});
  