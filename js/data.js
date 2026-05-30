const products = [
  {
    id: 1,
    title: "Yuna - Kuma Kuma Kuma Bear",
    genre: "Nendoroid",
    price: 1250000,
    discount: 10,
    image: "images/yuna_kuma.jpg"
  },
  {
    id: 2,
    title: "Rem - Re:Zero",
    genre: "Scale Figure",
    price: 950000,
    discount: 5,
    image: "images/rem.jpg"
  },
  {
    id: 3,
    title: "Mikasa Ackerman - Attack on Titan",
    genre: "Action Figure",
    price: 1500000,
    discount: 0,
    image: "images/mikasa.jpg"
  },
  {
    id: 4,
    title: "Chika Fujiwara - Kaguya-sama",
    genre: "Nendoroid",
    price: 890000,
    discount: 15,
    image: "images/chika.jpg"
  },
  {
    id: 5,
    title: "Frieren - Frieren",
    genre: "Scale Figure",
    price: 1300000,
    discount: 0,
    image: "images/frieren.jpg"
  }
];

// Các hàm hỗ trợ
function getFinalPrice(product) {
  return Math.round(product.price * (1 - (product.discount || 0) / 100));
}

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + " ₫";
}

function getAllGenres() {
  return [...new Set(products.map(p => p.genre))];
}   
function addToCart(productName) {
    // 1. Tạo phần tử thông báo
    const toast = document.createElement("div");
    toast.textContent = `Đã thêm ${productName} vào giỏ hàng! 🌸`;
    
    // 2. Style cho thông báo (CSS trực tiếp)
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "#ff66b2";
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "20px";
    toast.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    toast.style.zIndex = "1000";
    toast.style.transition = "opacity 0.5s";

    // 3. Thêm vào body và tự xóa sau 2 giây
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 2000);
    
    // Cập nhật số lượng trên badge (giả định bạn đã có hàm update giỏ hàng)
    // updateCartBadge(); 
}