export function createHeader() {
    const header = document.createElement("header");
    header.innerHTML = `
        <nav>
            <h1>Shop Bán Cây</h1>
            <a href="#">Trang chủ</a>
            <a href="#">Giỏ hàng (<span id="cart-count">0</span>)</a>
        </nav>
    `;
    return header;
}
