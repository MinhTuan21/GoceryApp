export function createProductCard(product) {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} VND</p>
        <button class="add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
    `;
    return div;
}
