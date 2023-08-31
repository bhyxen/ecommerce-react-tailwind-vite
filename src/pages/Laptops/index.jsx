import { useCallback } from "react";
import ProductDetail from "../../components/ProductDetails";
import CartMenu from "../../components/CartMenu";
import "react-toastify/dist/ReactToastify.css";
import {
	API_PRODUCTS_ENDPOINT,
	PRODUCT_CATEGORIES,
	RESULTS_LIMIT,
} from "../../constants";
import ProductsGrid from "../../components/ProductsGrid";
import useGetProducts from "../../hooks/useGetProducts";
import ProductsHeader from "../../components/ProductsHeader";
import useFilterProducts from "../../hooks/useFilterProducts";

export default function Laptops() {
	const {
		productsData,
		moreProductsAvailable,
		setProductsOffset,
		errorOcurred,
	} = useGetProducts({
		url: API_PRODUCTS_ENDPOINT,
		category: PRODUCT_CATEGORIES.LAPTOPS,
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

	const { handleOnSearchSubmit, handleOnKeyUpSearch, filteredProducts } =
		useFilterProducts({ productsData });

	return (
		<>
			<ProductsHeader
				category="Laptops"
				searchSubmit={handleOnSearchSubmit}
				searchKeyUp={handleOnKeyUpSearch}
			/>
			<ProductsGrid
				filteredProducts={filteredProducts}
				productsInfo={{
					productsData,
					errorOcurred,
					loadMoreItems,
					moreProductsAvailable,
				}}
			/>
			<ProductDetail />
			<CartMenu />
		</>
	);
}
