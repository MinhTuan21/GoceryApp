const API_URL_ACCESSORIES = "http://192.168.1.6:4000/api/accessories";

export async function getAccessories() {
    try {
        const response = await fetch(API_URL_ACCESSORIES);
        if (!response.ok) throw new Error("Không thể lấy danh sách phụ kiện");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách phụ kiện:", error);
        return [];
    }
}

export async function getAccessoryById(id) {
    try {
        const response = await fetch(`${API_URL_ACCESSORIES}/${id}`);
        if (!response.ok) throw new Error("Không tìm thấy phụ kiện");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy phụ kiện:", error);
        return null;
    }
}

export async function addAccessory(accessory) {
    try {
        const response = await fetch(API_URL_ACCESSORIES, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(accessory)
        });
        if (!response.ok) throw new Error("Không thể thêm phụ kiện");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi thêm phụ kiện:", error);
        return null;
    }
}
