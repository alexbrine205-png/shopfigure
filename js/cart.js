// ── KHỞI TẠO GIỎ HÀNG ──
document.addEventListener('DOMContentLoaded', () => {
  updateNavUser();
  renderCart();
  updateCartBadge();
});

// ── CẬP NHẬT NAV ──
function updateNavUser() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  if (user) {
    document.querySelector('.btn-login').innerHTML = `
      <span style="color:var(--accent2);font-size:0.85rem">👤 ${user.username}</span>
      <button onclick="logout()" style="background:transparent;border:1px solid var(--text2);color:var(--text2);padding:3px 8px;border-radius:3px;cursor:pointer;font-size:0.75rem;margin-left:8px;">Đăng xuất</button>
    `;
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  showToast('Đã đăng xuất!');
  setTimeout(() => location.reload(), 800);
}

// ── RENDER GIỎ HÀNG ──
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cartItems');
    
    if (!container) return;

    let total = 0;
    container.innerHTML = cart.map((item, idx) => {
        // Ép kiểu giá về số, nếu lỗi thì mặc định là 0
        const price = Number(item.price) || 0;
        total += price;
        
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" style="width:100px;">
                <div>
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-genre">${item.genre || 'N/A'}</div>
                    <div class="cart-item-price">${formatPrice(price)}</div>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${idx})">✕</button>
            </div>
        `;
    }).join('');

    document.getElementById('cartTotal').textContent = formatPrice(total);
}
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product); // Thêm sản phẩm vào mảng
    localStorage.setItem('cart', JSON.stringify(cart)); // Lưu vào trình duyệt
    console.log("Đã lưu giỏ hàng:", cart); // Log ra để kiểm tra
    updateCartBadge(); // Cập nhật icon giỏ hàng
    showToast("Đã thêm thành công!");
}

// ── XÓA KHỎI GIỎ HÀNG ──
function removeFromCart(idx) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart[idx];
  cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
  showToast(`✅ Đã xóa "${item.title}" khỏi giỏ hàng!`);
}

// ── THANH TOÁN ──
function checkout() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    showToast('Vui lòng đăng nhập để thanh toán!');
    setTimeout(() => window.location.href = 'login.html', 1200);
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    showToast('Giỏ hàng trống!');
    return;
  }

  showToast('🎉 Thanh toán thành công!');
  localStorage.removeItem('cart');
  setTimeout(() => {
    location.href = 'index.html';
  }, 1500);
}

// ── BADGE GIỎ HÀNG ──
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cart.length;
}

// ── TOAST THÔNG BÁO ──
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Hàm hỗ trợ định dạng tiền tệ
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// ... Dán phần code logic giỏ hàng (renderCart, checkout, v.v.) của bạn vào đây ...