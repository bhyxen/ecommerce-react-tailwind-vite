/**
 * Creates a debounce function that delays the execution of another function
 * until a specific time period has passed without additional invocations.
 *
 * @param {Object} options - Options to configure the debounce function.
 * @param {Function} options.func - The function to be debounced.
 * @param {number} options.time - The time in milliseconds to delay the function execution.
 * @returns {Function} - A function that implements the debounce behavior.
 */
export const debounce = ({ func, time }) => {
	let timeout;
	/**
	 * Debounce function that encapsulates the execution delay logic.
	 *
	 * @param {...*} args - Arguments passed to the original function.
	 */
	return (...args) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, time);
	};
};

/**
 * Searches for products in the provided products data based on a search term.
 *
 * @param {Object} options - Options to configure the search operation.
 * @param {string} options.searchTerm - The search term to match against product titles.
 * @param {Object} options.productsData - The object containing products data to search within.
 * @returns {Object|null} - An object containing filtered products based on the search term, or null if searchTerm is falsy.
 */
export const searchProducts = ({ searchTerm, productsData }) => {
	if (!searchTerm) return null;

	return {
		...productsData,
		products: productsData.products.filter((elem) =>
			elem.title.toLowerCase().includes(searchTerm.toLowerCase()),
		),
	};
};
