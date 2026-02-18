/**
 * API client and utility functions
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface FetchOptions extends RequestInit {
    token?: string;
}

/**
 * Fetch wrapper for API calls
 */
export async function apiClient<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

/**
 * API methods
 */
export const api = {
    // Auth
    login: (email: string, password: string) =>
        apiClient("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        }),

    register: (name: string, email: string, password: string) =>
        apiClient("/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
        }),

    // Health check
    health: () => apiClient("/health"),
};
