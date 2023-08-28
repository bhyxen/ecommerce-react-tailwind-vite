import { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
	// ArrowPathIcon,
	// CheckIcon,
	ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Card from "../../components/Card/index";
import Button from "../../components/Button";
import ProductDetail from "../../components/ProductDetails";
import CartMenu from "../../components/CartMenu";
import "react-toastify/dist/ReactToastify.css";

// This should be in an environment variable on a real world app if private
const API_ENDPOINT = "https://dummyjson.com/products";
const RESULTS_LIMIT = 12;
const ERROR_MESSAGE =
	"No products found or there has been an error, please again try later.";
const LOADING_MESSAGE = "Loading products...";
// const PRODUCTS_LOADED_MESSAGE = "Products loaded correctly!";

export default function Home() {
	const [storeData, setStoreData] = useState(null);
	const [productsOffset, setProductsOffset] = useState(0);
	const [moreProductsAvailable, setMoreProductsAvailable] = useState(true);

	const fetchData = () => {
		let loadingToast;
		if (moreProductsAvailable) {
			toast.promise(
				fetch(`${API_ENDPOINT}?skip=${productsOffset}&limit=${RESULTS_LIMIT}`)
					.then((res) => {
						loadingToast = toast.loading(LOADING_MESSAGE, {
							containerId: "loading-toast",
							toastId: "loading-toast",
							theme: "colored",
							position: "bottom-right",
						});

						if (!res.ok) {
							throw new Error(ERROR_MESSAGE);
						}

						return res.json();
					})
					.then((data) => {
						setStoreData((prevState) =>
							// If offset !== 0 means that we are already paginating the results
							productsOffset !== 0
								? {
										...prevState,
										products: [...prevState.products, ...data.products],
								  }
								: data,
						);
						if (data.products.length === 0) {
							setMoreProductsAvailable(false);
						}
						return { data };
					})
					.catch((error) => {
						throw new Error(error);
					})
					.finally(() => {
						toast.dismiss(loadingToast);
					}),
				{
					// pending: {
					// 	render() {
					// 		return LOADING_MESSAGE;
					// 	},
					// 	icon: <ArrowPathIcon />,
					// 	position: "bottom-center",
					// },
					// success: {
					// 	render() {
					// 		return PRODUCTS_LOADED_MESSAGE;
					// 	},
					// 	icon: <CheckIcon />,
					// },
					error: {
						render({ data }) {
							// When the promise reject, data will contains the error
							return `${data.message}`;
						},
						icon: <ExclamationTriangleIcon />,
						autoClose: false,
						containerId: "products-status-toast",
						toastId: "products-status-toast",
						position: "bottom-right",
					},
				},
				{ theme: "colored" },
			);
		}
	};

	// Using useCallback() to always send the same function as callback to the Button component,
	// in this way we prevent creating a new loadMoreItems() function on each render
	const loadMoreItems = useCallback(() => {
		// By updating the state, we are triggering the useEffect callback
		setProductsOffset((prevState) => prevState + RESULTS_LIMIT);
	}, []);

	useEffect(fetchData, [productsOffset, moreProductsAvailable]);

	return (
		<>
			<div className="w-full max-w-screen-lg grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{!!storeData &&
					storeData?.products?.map(
						({ id, category, images, price, title, description }) => (
							<Card
								key={id}
								id={id}
								images={images}
								price={price}
								category={category}
								title={title}
								description={description}
							/>
						),
					)}
			</div>
			{!!moreProductsAvailable && (
				<Button
					text="Load More Products"
					type="button"
					className="my-5 px-4 py-2"
					onClick={loadMoreItems}
				/>
			)}
			<ProductDetail />
			<CartMenu />
			<ToastContainer
				enableMultiContainer
				containerId="products-status-toast"
			/>
			<ToastContainer enableMultiContainer containerId="loading-toast" />
		</>
	);
}
