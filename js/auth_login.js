
// Вызов локализации после загрузки страницы
window.addEventListener("load", function () {
  if (typeof applyLocales === "function") {
    applyLocales(currLocale || 'ru');
  }
});

// Firebase и вход
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

// Обработка входа по кнопке
document.getElementById("btn_login")?.addEventListener("click", async () => {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;
  const infoMsg = document.getElementById("info_msg");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "cabinet/index.html";
  } catch (error) {
    if (infoMsg) {
      infoMsg.textContent = "Ошибка: " + error.message;
      infoMsg.classList.remove("hide_block");
      infoMsg.classList.add("alert", "alert-danger");
    }
  }
});
