import PropTypes from "prop-types";
import Button from "../Button";
import { debounce } from "../../util";
import { DEBOUNCE_TIME } from "../../constants";

export default function Search({ onSubmit, onKeyUp }) {
	const onKeyUpDebounced = debounce({
		func: onKeyUp,
		time: DEBOUNCE_TIME,
	});

	return (
		<form
			onSubmit={onSubmit}
			className="w-full flex gap-x-5 mb-5 items-center justify-center"
		>
			<input
				onKeyUp={onKeyUpDebounced}
				className="py-3 px-5"
				placeholder="laptops, smartphones..."
				type="text"
				name="search-term"
				id="search-term"
			/>
			<Button type="submit" text="Search" className="my-5 px-4 py-2" />
		</form>
	);
}

Search.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onKeyUp: PropTypes.func.isRequired,
};
