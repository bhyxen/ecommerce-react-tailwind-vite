import PropTypes from "prop-types";
import React from "react";
import Search from "../Search";

export default function ProductsHeader({
	category,
	searchSubmit,
	searchKeyUp,
}) {
	return (
		<div className="w-full flex justify-between items-center flex-wrap">
			<h1>
				<span className="text-3xl text-blue-500">{category} </span>
				<span className="text-2xl">Products</span>
			</h1>
			<Search onSubmit={searchSubmit} onKeyUp={searchKeyUp} />
		</div>
	);
}

ProductsHeader.propTypes = {
	category: PropTypes.string.isRequired,
	searchSubmit: PropTypes.func.isRequired,
	searchKeyUp: PropTypes.func.isRequired,
};
