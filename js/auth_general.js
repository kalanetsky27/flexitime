
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

// Проверка входа
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Пользователь вошёл:", user.email);
    const emailDisplay = document.getElementById("user_email");
    if (emailDisplay) emailDisplay.textContent = user.email;
  } else {
    window.location.href = "../index.html";
  }
});

// Выход
const logoutBtn = document.getElementById("logout_btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "../index.html";
  });
}
