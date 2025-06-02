
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuPfvm9OEvt1GCU_eNq7J3ZG2vU49oK1A",
  authDomain: "flexitime-972a5.firebaseapp.com",
  projectId: "flexitime-972a5",
  storageBucket: "flexitime-972a5.appspot.com",
  messagingSenderId: "943265429234",
  appId: "1:943265429234:web:51fe84b509ddd96c79026b",
  measurementId: "G-3RRH8JF0EJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../index.html";
  }
});

document.getElementById("menuLogout")?.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "../index.html";
});
