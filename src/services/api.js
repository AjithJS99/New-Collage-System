export const API_URL = "YOUR_GAS_WEB_APP_URL_HERE";

const api = {
    post: async (action, data = {}) => {
        try {
            // Always use POST to avoid CORS with GET
            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({ action, ...data }),
            });
            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            return { status: "error", message: "Network Error" };
        }
    },
};

export default api;
