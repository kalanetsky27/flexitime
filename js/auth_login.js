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
