import { useState } from "react";

export default function useFilterProducts({ productsData }) {
	const [filteredProducts, setFilteredProducts] = useState(null);

	/**
	 * Searches for products in the provided products data based on a search term.
	 *
	 * @param {Object} options - Options to configure the search operation.
	 * @param {string} options.searchTerm - The search term to match against product titles.
	 * @param {Object} options.productsData - The object containing products data to search within.
	 * @returns {Object|null} - An object containing filtered products based on the search term, or null if searchTerm is falsy.
	 */
	const searchProducts = ({ searchTerm, productsCurrentData }) => {
		if (!searchTerm) return null;

		return {
			...productsCurrentData,
			products: productsCurrentData.products.filter((elem) =>
				elem.title.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		};
	};

	const handleOnSearchSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const searchTerm = formData.get("search-term");
		const filteredProductsResults = searchProducts({
			searchTerm,
			productsData,
		});
		setFilteredProducts(filteredProductsResults);
	};

	const handleOnKeyUpSearch = (event) => {
		event.preventDefault();
		const searchTerm = event.target.value;
		const filteredProductsResults = searchProducts({
			searchTerm,
			productsData,
		});
		setFilteredProducts(filteredProductsResults);
	};

	return {
		handleOnSearchSubmit,
		handleOnKeyUpSearch,
		filteredProducts,
	};
}
