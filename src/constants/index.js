export const RESULTS_LIMIT = 12;

export const MESSAGES = {
	PRODUCTS_ERROR_MESSAGE:
		"No products found or there has been an error, please again try later.",
	PRODUCTS_LOADING_MESSAGE: "Loading products...",
	PRODUCTS_LOADED_MESSAGE: "Products loaded correctly!",
};

// This should be in an environment variable on a real world app if private
export const API_PRODUCTS_ENDPOINT = "https://dummyjson.com/products";

export const PRODUCT_CATEGORIES = {
	SMARTPHONES: "smartphones",
	LAPTOPS: "laptops",
	HOME_DECORATION: "home-decoration",
	FURNITURE: "furniture",
	LIGHTING: "lighting",
};

// Default debounce time in milliseconds
export const DEBOUNCE_TIME = 300;
