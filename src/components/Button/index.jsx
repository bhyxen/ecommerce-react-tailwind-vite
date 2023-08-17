import React from "react";
import PropTypes from "prop-types";

function Button({ type, text, className, title, onClick }) {
	return (
		<button
			title={title}
			className={`text-white border-solid border flex justify-center border-black rounded-md px-4 md:px-5 py-2 md:py-3 bg-blue-500 hover:bg-blue-400 cursor-pointer hover:scale-y-105 transition-transform origin-bottom text-center ${className}`}
			// eslint-disable-next-line react/button-has-type
			type={type}
			onClick={onClick}
		>
			{text}
		</button>
	);
}

Button.propTypes = {
	type: PropTypes.oneOf(["submit", "button", "reset"]).isRequired,
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
	title: PropTypes.string,
};

Button.defaultProps = {
	className: "",
	onClick: () => null,
	title: "",
};

export default React.memo(Button);
