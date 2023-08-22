import React from "react";
import PropTypes from "prop-types";

function Button({ type, text, className, title, onClick, purpose }) {
	const getButtonPurpose = (purposeType) => {
		switch (purposeType) {
			case "primary":
				return "bg-blue-500 hover:bg-blue-400";
			case "secondary":
				return "bg-gray-100 hover:bg-gray-50 text-black";
			case "error":
				return "bg-red-500 hover:bg-red-400 text-black";
			case "success":
				return "bg-green-500 hover:bg-green-400 text-black";
			default:
				return "";
		}
	};

	const buttonPurpose = getButtonPurpose(purpose);

	return (
		<button
			title={title}
			className={`${className} text-white border-solid border flex bg justify-center items-center border-black rounded-md ${buttonPurpose} bg cursor-pointer hover:scale-y-105 transition-transform origin-bottom text-center`}
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
	purpose: PropTypes.oneOf(["primary", "secondary", "error", "success"]),
};

Button.defaultProps = {
	className: "",
	onClick: () => null,
	title: "",
	purpose: "primary",
};

export default React.memo(Button);
