import { useEffect, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Card from "../../components/Card/index";
import Button from "../../components/Button";
import ProductDetail from "../../components/ProductDetails";
import CartMenu from "../../components/CartMenu";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../../context";
import {
	RESULTS_LIMIT,
	API_ENDPOINT,
	ERROR_MESSAGE,
	LOADING_MESSAGE,
} from "../../constants";

export default function Home() {
	const {
		productsData,
		setProductsData,
		moreProductsAvailable,
		setMoreProductsAvailable,
		productsOffset,
		setProductsOffset,
	} = useContext(StoreContext);

	// Using useCallback() to always send the same function as callback to the Button component,
	// in this way we prevent creating a new loadMoreItems() function on each render
	const loadMoreItems = useCallback(() => {
		// By updating the state, we are triggering the useEffect callback
		setProductsOffset((prevState) => ({
			offset: prevState.offset + RESULTS_LIMIT,
			fetched: false,
		}));
	}, [setProductsOffset]);

	useEffect(() => {
		// With this validation we prevent calling this effect in an infinite loop
		if (moreProductsAvailable && !productsOffset.fetched) {
			toast.promise(
				fetch(
					`${API_ENDPOINT}?skip=${productsOffset.offset}&limit=${RESULTS_LIMIT}`,
				)
					.then((res) => {
						if (!res.ok) {
							throw new Error(ERROR_MESSAGE);
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
						return { data };
					})
					.catch((error) => {
						throw new Error(`${error}`);
					}),
				{
					pending: {
						render() {
							return LOADING_MESSAGE;
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
					// 	icon: <CheckIcon />,
					// },
					error: {
						render({ data }) {
							return data.message;
						},
						icon: <ExclamationTriangleIcon />,
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
	]);

	return (
		<>
			<div className="w-full max-w-screen-lg grid gap-6 md:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{!!productsData &&
					productsData?.products?.map(
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
		</>
	);
}
