const firebaseConfig = {
  apiKey: "AIzaSyBuPfvm9OEvt1GCU_eNq7J3ZG2vU49oK1A",
  authDomain: "flexitime-972a5.firebaseapp.com",
  projectId: "flexitime-972a5",
  storageBucket: "flexitime-972a5.appspot.com",
  messagingSenderId: "943265429234",
  appId: "1:943265429234:web:51fe84b509ddd96c79026b"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

window.onload = function () {
  if (typeof applyLocales === "function") {
    applyLocales(currLocale || 'ru');
  }

  const loginBtn = document.getElementById("btn_login");
  if (!loginBtn) return;

  loginBtn.addEventListener("click", function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const infoMsg = document.getElementById("info_msg");

    if (infoMsg) {
      infoMsg.classList.add("hide_block");
      infoMsg.textContent = "";
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "cabinet/index.html";
      })
      .catch(error => {
        if (infoMsg) {
          infoMsg.textContent = "Ошибка: " + error.message;
          infoMsg.classList.remove("hide_block");
          infoMsg.classList.add("alert", "alert-danger");
        }
      });
  });
};
