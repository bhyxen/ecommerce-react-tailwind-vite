import PropTypes from "prop-types";

export default function Button({ type, text, className, onClick }) {
	return (
		<button
			className={`border-solid border border-black rounded-md px-5 bg-blue-500 hover:bg-blue-400 cursor-pointer hover:scale-y-105 transition-transform origin-bottom ${className}`}
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
	text: PropTypes.string.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	className: "",
	onClick: () => null,
};
