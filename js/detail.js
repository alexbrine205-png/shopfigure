// ── KHỞI TẠO CHI TIẾT MÔ HÌNH ──
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // Giả định bạn có hàm getFigureById lấy dữ liệu mô hình từ data.js
    const figure = getFigureById(id); 

    if (!figure) {
        document.body.innerHTML = `<p style="text-align:center;padding:80px;color:#804060">Mô hình không tồn tại! 🌸</p>`;
        return;
    }

    updateCartBadge();
    renderDetail(figure);
});

// ── RENDER CHI TIẾT ──
function renderDetail(figure) {
    document.title = `${figure.title} — AnimeFigure Shop`;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const inCart = cart.some(c => c.id === figure.id);

    const detailContent = document.getElementById("detailContent");
    if (!detailContent) return;

    detailContent.innerHTML = `
        <div class="detail-container" style="display:flex; gap:30px; padding:20px; flex-wrap:wrap;">
            <img src="${figure.image}" alt="${figure.title}" style="max-width:400px; border-radius:20px; box-shadow:0 4px 15px rgba(255,102,178,0.2)">
            
            <div class="detail-info" style="flex:1; min-width:300px;">
                <h1 style="color:#ff66b2;">${figure.title}</h1>
                <p style="font-size:1.2rem; color:#804060;">Thể loại: <strong>${figure.genre}</strong></p>
                <p style="font-size:1.5rem; font-weight:bold; color:#ff66b2; margin:20px 0;">${formatPrice(figure.price)}</p>
                
                <p style="margin:20px 0; line-height:1.6; color:#555;">${figure.description || "Mô hình figure chất lượng cao, thiết kế tỉ mỉ, rất đáng sưu tầm! 🌸"}</p>
                
                <button class="btn-add ${inCart ? "disabled" : ""}" 
                        id="addBtn" 
                        onclick="handleAddToCart(${figure.id})"
                        style="padding:15px 30px; font-size:1rem; cursor:pointer;">
                    ${inCart ? "✓ Đã có trong giỏ" : "🛒 Thêm vào giỏ hàng"}
                </button>
            </div>
        </div>
    `;
}

// ── XỬ LÝ THÊM VÀO GIỎ ──
function handleAddToCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const figure = getFigureById(id);
    
    if (cart.some(c => c.id === id)) {
        showToast("🌸 Sản phẩm này đã có trong giỏ hàng rồi!");
        return;
    }

    cart.push({ 
        id: figure.id, 
        title: figure.title, 
        price: figure.price, 
        image: figure.image, 
        genre: figure.genre 
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    const btn = document.getElementById("addBtn");
    btn.textContent = "✓ Đã thêm vào giỏ";
    btn.style.backgroundColor = "#ccc";
    
    updateCartBadge();
    showToast(`🌸 Đã thêm "${figure.title}" vào giỏ hàng!`);
}

// ── HÀM HỖ TRỢ ──
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const badge = document.getElementById("cartBadge");
    if (badge) badge.textContent = cart.length;
}

function showToast(msg) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.style.cssText = "position:fixed; bottom:20px; right:20px; background:#ff66b2; color:white; padding:15px 25px; border-radius:20px; z-index:9999;";
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}