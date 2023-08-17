import { useContext } from "react";
import PropTypes from "prop-types";
import { StoreContext } from "../../context";

function Layout({ children }) {
	const { isProductDetailsOpen } = useContext(StoreContext);

	return (
		<main
			className={`${
				isProductDetailsOpen ? "overflow-hidden" : "overflow-auto"
			} flex mt-20 flex-col items-center`}
		>
			{children}
		</main>
	);
}

Layout.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

export default Layout;
