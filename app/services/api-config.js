/**
 * API Configuration for Backend Integration
 * Centralized configuration for backend API calls
 */

import { redirect } from "next/navigation";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:6060/api";

export { API_BASE_URL };

/**
 * Fetch wrapper with error handling
 * @param {string} endpoint - API endpoint path (e.g., '/cabins')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} - Parsed response data
 * @throws {Error} - API error with status and message
 */
export async function apiCall(endpoint, options = {}) {
	const url = `${API_BASE_URL}${endpoint}`;
	const headers = {
		"Content-Type": "application/json",
		...options.headers,
	};

	try {
		const response = await fetch(url, {
			...options,
			headers,
		});

		// Handle non-JSON responses (like 204 No Content)
		if (response.status === 204) {
			return null;
		}

		const data = await response.json().catch(() => null);

		if (!response.ok) {
			// console.log("redirect", response.status);
			// Redirect to login on 401 Unauthorized
			if (response.status === 401) {
				window.location.href = "/login";
				return;
			}

			const errorMessage = data?.error || `HTTP ${response.status}`;
			const error = new Error(errorMessage);
			error.statusCode = response.status;
			error.data = data;
			throw error;
		}

		return data;
	} catch (error) {
		// Re-throw or enhance network errors
		if (error instanceof TypeError) {
			throw new Error(
				`Network error: ${error.message}. Is backend running at ${API_BASE_URL}?`,
			);
		}
		throw error;
	}
}

/**
 * Authenticated API call with NextAuth session token
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options
 * @param {string} token - NextAuth session access token
 * @returns {Promise<any>} - Parsed response data
 */
export async function authApiCall(endpoint, options = {}, token) {
	if (!token) {
		throw new Error("Authentication token required");
	}

	return apiCall(endpoint, {
		...options,
		headers: {
			Authorization: `Bearer ${token}`,
			...options.headers,
		},
	});
}
