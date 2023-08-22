import { useEffect, useState, useCallback } from "react";

import Card from "../../components/Card/index";
import Button from "../../components/Button";
import ProductDetail from "../../components/ProductDetails";
import CartMenu from "../../components/CartMenu";

// This should be in an environment variable on a real world app if private
const API_ENDPOINT = "https://api.escuelajs.co/api/v1/products/";
const RESULTS_LIMIT = 12;
const ERROR_MESSAGE =
	"No products found or there has been an error, please again try later.";
const LOADING_MESSAGE = "Loading products...";

export default function Home() {
	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);
	const [productsOffset, setProductsOffset] = useState(0);
	const [moreProductsAvailable, setMoreProductsAvailable] = useState(true);

	const fetchData = () => {
		fetch(`${API_ENDPOINT}?offset=${productsOffset}&limit=${RESULTS_LIMIT}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(ERROR_MESSAGE);
				}
				return res.json();
			})
			.then((data) => {
				setProducts((prevState) =>
					// If offset !== 0 means that we are already paginating the results
					productsOffset !== 0 ? [...prevState, ...data] : data,
				);
				if (data.length === 0) {
					setMoreProductsAvailable(false);
				}
			})
			// eslint-disable-next-line no-console
			.catch((error) => console.error(error))
			.finally(() => {
				setLoading(false);
			});
	};

	// Using useCallback() to always send the same function as callback to the Button component,
	// in this way we prevent creating a new loadMoreItems() function on each render
	const loadMoreItems = useCallback(() => {
		// By updating the state, we are triggering the useEffect callback
		setProductsOffset((prevState) => prevState + RESULTS_LIMIT);
	}, []);

	useEffect(fetchData, [productsOffset]);

	return (
		<>
			<div className="w-full max-w-screen-lg grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{products ? (
					products.map(
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
					)
				) : (
					<p className="text-md font-light text-center col-span-full">
						{loading ? LOADING_MESSAGE : ERROR_MESSAGE}
					</p>
				)}
			</div>
			{moreProductsAvailable && (
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
