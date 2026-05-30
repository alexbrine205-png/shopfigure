// ── ĐĂNG NHẬP ──
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errEl = document.getElementById("errorMsg");

  if (!username || !password) {
    errEl.textContent = "Vui lòng điền đầy đủ thông tin!";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    errEl.textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify({ username: user.username, email: user.email }));
  showToast("✅ Đăng nhập thành công!");
  setTimeout(() => window.location.href = "index.html", 800);
}

// ── ĐĂNG KÝ ──
function handleRegister(e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const errEl = document.getElementById("errorMsg");
  const successEl = document.getElementById("successMsg");

  errEl.textContent = "";
  successEl.textContent = "";

  if (!username || !email || !password || !confirm) {
    errEl.textContent = "Vui lòng điền đầy đủ thông tin!";
    return;
  }
  if (username.length < 3) {
    errEl.textContent = "Tên đăng nhập phải có ít nhất 3 ký tự!";
    return;
  }
  if (password.length < 6) {
    errEl.textContent = "Mật khẩu phải có ít nhất 6 ký tự!";
    return;
  }
  if (password !== confirm) {
    errEl.textContent = "Mật khẩu xác nhận không khớp!";
    return;
  }
  if (!email.includes("@")) {
    errEl.textContent = "Email không hợp lệ!";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(u => u.username === username)) {
    errEl.textContent = "Tên đăng nhập đã tồn tại!";
    return;
  }
  if (users.some(u => u.email === email)) {
    errEl.textContent = "Email đã được sử dụng!";
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  successEl.textContent = "🎉 Đăng ký thành công! Đang chuyển hướng...";
  setTimeout(() => window.location.href = "login.html", 1200);
}

function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}
