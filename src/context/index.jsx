import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const StoreContext = createContext();

export default function StoreContextProvider({ children }) {
	const [cartCount, setCartCount] = useState(0);
	const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
	const [productDetailsShown, setProductDetailsShown] = useState([]);

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
		}),
		[cartCount, isProductDetailsOpen, productDetailsShown],
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
