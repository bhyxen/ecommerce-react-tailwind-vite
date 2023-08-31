import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RESULTS_LIMIT, MESSAGES } from "../constants";

export default function useGetProducts({ url, category }) {
	let urlConstructed = url;

	if (category) {
		urlConstructed = urlConstructed.concat(`/category/${category}`);
	}

	const [productsOffset, setProductsOffset] = useState({
		offset: 0,
		fetched: false,
	});

	const [moreProductsAvailable, setMoreProductsAvailable] = useState(true);

	const [productsData, setProductsData] = useState(null);

	const [errorOcurred, setErrorOcurred] = useState(false);

	useEffect(() => {
		// With this validation we prevent calling this effect in an infinite loop
		if (moreProductsAvailable && !productsOffset.fetched) {
			toast.promise(
				fetch(
					`${urlConstructed}?skip=${productsOffset.offset}&limit=${RESULTS_LIMIT}`,
				)
					.then((res) => {
						if (!res.ok) {
							throw new Error(MESSAGES.PRODUCTS_ERROR_MESSAGE);
						}

						return res.json();
					})
					.then((data) => {
						setProductsData((prevState) =>
							// If offset !== 0 means that we are already paginating the results
							productsOffset.offset !== 0
								? {
										...prevState,
										products: [
											...new Set([...prevState.products, ...data.products]),
										],
								  }
								: data,
						);
						setProductsOffset((prevState) => ({
							...prevState,
							fetched: true,
						}));
						if (data.products.length === 0) {
							setMoreProductsAvailable(false);
						}
						setErrorOcurred(false);
						return { data };
					})
					.catch((error) => {
						setErrorOcurred(true);
						throw new Error(`${error.message}`);
					}),
				{
					pending: {
						render() {
							return MESSAGES.PRODUCTS_LOADING_MESSAGE;
						},
						// These settings will also apply to 'success' and 'error' toasts
						toastId: "product-fetching-toast",
						position: "bottom-right",
						theme: "colored",
					},
					// success: {
					// 	render() {
					// 		return PRODUCTS_LOADED_MESSAGE;
					// 	},
					// },
					error: {
						render({ data }) {
							return data.message;
						},
						autoClose: false,
					},
				},
			);
		}
	}, [
		productsOffset,
		moreProductsAvailable,
		setMoreProductsAvailable,
		setProductsData,
		setProductsOffset,
		urlConstructed,
	]);

	return {
		productsData,
		moreProductsAvailable,
		setProductsOffset,
		errorOcurred,
	};
}
