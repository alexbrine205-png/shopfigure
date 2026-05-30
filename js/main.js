// ── KHỞI TẠO TRANG CHỦ ──
document.addEventListener('DOMContentLoaded', () => {
  updateNavUser();
  updateCartBadge();
  renderFilterTabs();
  renderGames(games);
  setupSearch();
});

// ── CẬP NHẬT NAV (đã đăng nhập / chưa) ──
function updateNavUser() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;

  if (user) {
    document.getElementById('navAuth').innerHTML = `
      <span style="color:var(--accent2); font-size:0.9rem">👤 ${user.username}</span>
      <button onclick="logout()" style="background:transparent;border:1px solid var(--text2);color:var(--text2);padding:5px 12px;border-radius:4px;cursor:pointer;font-size:0.82rem;">Đăng xuất</button>
    `;
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  showToast('Đã đăng xuất!');
  setTimeout(() => location.reload(), 800);
}

// ── BADGE GIỎ HÀNG ──
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cart.length;
}

// ── FILTER TABS ──
function renderFilterTabs() {
  const container = document.getElementById('filterTabs');
  if (!container) return;

  const genres = ['Tất cả', ...getAllGenres()];
  container.innerHTML = genres.map((g, i) =>
    `<button class="tab ${i === 0 ? 'active' : ''}" onclick="filterByGenre('${g}', this)">${g}</button>`
  ).join('');
}

function filterByGenre(genre, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const filtered = genre === 'Tất cả' ? games : games.filter(g => g.genre === genre);
  renderGames(filtered);
}

// ── RENDER DANH SÁCH GAME ──
function renderGames(list) {
  const grid = document.getElementById('gameGrid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = `<p style="color:var(--text2);grid-column:1/-1;text-align:center;padding:40px">Không tìm thấy game nào.</p>`;
    return;
  }

  grid.innerHTML = list.map(game => {
    const finalPrice = getFinalPrice(game);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const inCart = cart.some(c => c.id === game.id);

    return `
      <div class="game-card" onclick="goToDetail(${game.id})">
        <img src="${game.image}" alt="${game.title}" onerror="this.src='https://picsum.photos/seed/fallback/400/200'">
        <div class="game-card-body">
          <div class="game-card-title">${game.title}</div>
          <div class="game-card-genre">${game.genre}</div>
          <div class="game-card-footer">
            <div>
              ${game.discount > 0 ? `<span class="discount-badge">-${game.discount}%</span> ` : ''}
              <span class="price ${game.price === 0 ? 'free' : ''}">${formatPrice(finalPrice)}</span>
            </div>
            <button class="btn-add ${inCart ? 'added' : ''}"
              onclick="addToCart(event, ${game.id})">
              ${inCart ? '✓' : '+ Thêm'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── CHUYỂN TRANG CHI TIẾT ──
function goToDetail(id) {
  window.location.href = `game-detail.html?id=${id}`;
}

// ── THÊM VÀO GIỎ HÀNG ──
function addToCart(e, id) {
  e.stopPropagation();
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    showToast('Vui lòng đăng nhập để thêm vào giỏ hàng!');
    setTimeout(() => window.location.href = 'login.html', 1200);
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const game = getGameById(id);
  if (!game) return;

  if (cart.some(c => c.id === id)) {
    showToast('Game đã có trong giỏ hàng!');
    return;
  }

  cart.push({ id: game.id, title: game.title, price: getFinalPrice(game), image: game.image, genre: game.genre });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  renderGames(games);
  showToast(`✅ Đã thêm "${game.title}" vào giỏ hàng!`);
}

// ── TÌM KIẾM ──
function setupSearch() {
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  if (!input || !btn) return;

  const doSearch = () => {
    const q = input.value.trim().toLowerCase();
    const filtered = q ? games.filter(g => g.title.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q)) : games;
    renderGames(filtered);
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.tab')?.classList.add('active');
  };

  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
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
