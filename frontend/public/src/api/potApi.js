const API_URL_POTS = "http://192.168.1.6:4000/api/pots";

export async function getPots() {
    try {
        const response = await fetch(API_URL_POTS);
        if (!response.ok) throw new Error("Không thể lấy danh sách chậu cây");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách chậu cây:", error);
        return [];
    }
}

export async function getPotById(id) {
    try {
        const response = await fetch(`${API_URL_POTS}/${id}`);
        if (!response.ok) throw new Error("Không tìm thấy chậu cây");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi lấy chậu cây:", error);
        return null;
    }
}

export async function addPot(pot) {
    try {
        const response = await fetch(API_URL_POTS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pot)
        });
        if (!response.ok) throw new Error("Không thể thêm chậu cây");
        return await response.json();
    } catch (error) {
        console.error("Lỗi khi thêm chậu cây:", error);
        return null;
    }
}
