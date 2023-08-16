import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const StoreContext = createContext();

export default function StoreContextProvider({ children }) {
	const [cartCount, setCartCount] = useState(0);

	// Here we are using useMemo() instead of just passing the object to prevent it from changing on every render
	const value = useMemo(() => ({ cartCount, setCartCount }), [cartCount]);

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
