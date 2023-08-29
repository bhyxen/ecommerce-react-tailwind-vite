import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const StoreContext = createContext();
export default function StoreContextProvider({ children }) {
	const [cartCount, setCartCount] = useState(0);
	const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
	const [productDetailsShown, setProductDetailsShown] = useState({});
	const [cartProducts, setCartProducts] = useState([]);
	const [order, setOrder] = useState([]);
	const [isCartMenuOpen, setIsCartMenuOpen] = useState(false);
	const [cartTotal, setCartTotal] = useState(0);
	const [productsData, setProductsData] = useState(null);
	const [productsOffset, setProductsOffset] = useState({
		offset: 0,
		fetched: false,
	});
	const [moreProductsAvailable, setMoreProductsAvailable] = useState(true);

	// Here we are manually adding the overflow-* class to the body to prevent it from scrolling when using
	// product details as a modal on smaller devices
	const openProductDetails = () => {
		setIsProductDetailsOpen(true);

		// Large mobile dimensions
		if (window.innerWidth < 1024) {
			document.body.classList.add("overflow-hidden");
		}
	};
	const closeProductDetails = () => {
		setIsProductDetailsOpen(false);
		document.body.classList.remove("overflow-hidden");
	};

	const addProductToCart = ({ id, images, price, title, description }) => {
		setCartCount((prevState) => prevState + 1);
		setCartTotal((prevState) => prevState + price);
		setCartProducts((prevState) => {
			const existingProductIndex = prevState.findIndex(
				(elem) => elem.id === id,
			);
			// Validate if the product already exists in the cart
			if (existingProductIndex !== -1) {
				const newState = [...prevState];

				const existingProduct = newState[existingProductIndex];

				newState.splice(existingProductIndex, 1, {
					...existingProduct,
					quantity: existingProduct.quantity + 1,
				});

				return newState;
			}
			return [
				...prevState,
				{ id, images, price, title, description, quantity: 1 },
			];
		});
	};

	const openCartMenu = () => {
		// Make sure that Product Details is closed
		setIsProductDetailsOpen(false);

		setIsCartMenuOpen(true);

		// Large mobile dimensions
		if (window.innerWidth < 1024) {
			document.body.classList.add("overflow-hidden");
		}
	};

	const closeCartMenu = () => {
		setIsCartMenuOpen(false);
		document.body.classList.remove("overflow-hidden");
	};

	const removeProductFromCartById = ({ id, price }) => {
		setCartCount((prevState) => (prevState > 0 ? prevState - 1 : prevState));
		setCartTotal((prevState) =>
			prevState > 0 ? prevState - price : prevState,
		);

		setCartProducts((prevState) => {
			const existingProductIndex = prevState.findIndex(
				(elem) => elem.id === id,
			);
			// Validate if the product already exists in the cart
			if (existingProductIndex !== -1) {
				const newState = [...prevState];

				const existingProduct = newState[existingProductIndex];
				// Validate if the product has been added more than 1 time
				if (existingProduct.quantity > 1) {
					newState.splice(existingProductIndex, 1, {
						...existingProduct,
						quantity: existingProduct.quantity - 1,
					});
				} else {
					newState.splice(existingProductIndex, 1);
				}

				return newState;
			}
			return prevState;
		});
	};

	const removeAllProductsFromCartById = ({ id, price, quantity }) => {
		setCartCount((prevState) =>
			prevState > 0 ? prevState - quantity : prevState,
		);
		setCartTotal((prevState) =>
			prevState > 0 ? prevState - price * quantity : prevState,
		);

		setCartProducts((prevState) => {
			const existingProductIndex = prevState.findIndex(
				(elem) => elem.id === id,
			);
			// Validate if the product already exists in the cart
			if (existingProductIndex !== -1) {
				const newState = [...prevState];
				newState.splice(existingProductIndex, 1);
				return newState;
			}
			return prevState;
		});
	};

	const clearCart = () => {
		setCartCount(0);
		setCartTotal(0);
		setCartProducts([]);
	};

	// Here we are using useMemo() instead of just passing the object to prevent it from changing/recreating on every render
	const value = useMemo(
		() => ({
			cartCount,
			setCartCount,
			isProductDetailsOpen,
			openProductDetails,
			closeProductDetails,
			productDetailsShown,
			setProductDetailsShown,
			cartProducts,
			setCartProducts,
			isCartMenuOpen,
			openCartMenu,
			closeCartMenu,
			removeProductFromCartById,
			cartTotal,
			setCartTotal,
			addProductToCart,
			removeAllProductsFromCartById,
			order,
			setOrder,
			clearCart,
			productsData,
			setProductsData,
			productsOffset,
			setProductsOffset,
			moreProductsAvailable,
			setMoreProductsAvailable,
		}),
		[
			cartCount,
			isProductDetailsOpen,
			productDetailsShown,
			cartProducts,
			isCartMenuOpen,
			cartTotal,
			order,
			productsData,
			productsOffset,
			moreProductsAvailable,
		],
	);

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}

StoreContextProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};
