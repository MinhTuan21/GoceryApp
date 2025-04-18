const API_URL = "http://192.168.1.6:4000/api/products/list";

export async function getProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Không thể lấy danh sách sản phẩm");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        return [];
    }
}

export async function getProductById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Không tìm thấy sản phẩm");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        return null;
    }
}

export async function addProduct(product) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        if (!response.ok) throw new Error("Không thể thêm sản phẩm");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        return null;
    }
}
