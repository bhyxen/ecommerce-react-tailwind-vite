import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/index";
import Button from "../../components/Button";
import ProductDetail from "../../components/ProductDetails";
import CartMenu from "../../components/CartMenu";
import "react-toastify/dist/ReactToastify.css";
import { RESULTS_LIMIT, API_PRODUCTS_ENDPOINT } from "../../constants";
import useGetProducts from "../../hooks/useGetProducts";

export default function Home() {
	const navigate = useNavigate();

	const {
		productsData,
		moreProductsAvailable,
		setProductsOffset,
		errorOcurred,
	} = useGetProducts({
		url: API_PRODUCTS_ENDPOINT,
	});

	// Using useCallback() to always send the same function as callback to the Button component,
	// in this way we prevent creating a new loadMoreItems() function on each render
	const loadMoreItems = useCallback(() => {
		// By updating the state, we are triggering the useEffect callback on the useGetProducts hook
		setProductsOffset((prevState) => ({
			offset: prevState.offset + RESULTS_LIMIT,
			fetched: false,
		}));
	}, [setProductsOffset]);

	return (
		<>
			<div className="w-full max-w-screen-lg grid gap-6 md:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{productsData?.products?.map(
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
			{!!productsData && !!moreProductsAvailable && (
				<Button
					text="Load More Products"
					type="button"
					className="my-5 px-4 py-2"
					onClick={loadMoreItems}
				/>
			)}
			{!!errorOcurred && (
				<>
					<p>Please try again later...</p>
					<Button
						type="button"
						text="Reload"
						className="my-5 px-4 py-2"
						onClick={() => navigate(0)}
					/>
				</>
			)}
			<ProductDetail />
			<CartMenu />
		</>
	);
}
