import React, { useContext } from "react";
import { TagIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import Button from "../Button/index";
import { StoreContext } from "../../context";

function Card({ id, category, images, price, title, description }) {
	const {
		openProductDetails,
		setProductDetailsShown,
		openCartMenu,
		addProductToCart,
		closeCartMenu,
		closeProductDetails,
	} = useContext(StoreContext);

	const handleShowDetailsClick = () => {
		setProductDetailsShown({ id, category, images, price, title, description });
		closeCartMenu();
		openProductDetails();
	};

	const handleAddButtonClick = () => {
		addProductToCart({ id, category, images, price, title, description });
		closeProductDetails();
		openCartMenu();
	};

	return (
		<div className="p-5">
			<div className="h-full">
				<figure className="flex h-full flex-col border-solid border border-black rounded-md relative hover:outline-8 outline-black outline-8 transition-transform box-border hover:shadow-2xl overflow-hidden">
					<span className=" absolute left-1 top-1 bg-white/60 py-2 px-3 rounded-md z-10">
						<TagIcon className="h-6 w-6 text-blue-500 inline mr-1" />
						{category || "Others"}
					</span>
					{/* // Added this semantically interactive div wrapper to preserve accessibility */}
					<div
						className="cursor-pointer"
						title="Open Product Card Details"
						onClick={handleShowDetailsClick}
						onKeyDown={(event) =>
							event.key === "Enter" && handleShowDetailsClick
						}
						tabIndex="0"
						aria-label="Open Product Card Details"
						role="button"
					>
						<img
							className="object-top object-cover aspect-square w-full flex-1 hover:scale-105 hover:rotate-1 transition-all"
							src={images && images[0]}
							alt="Headphones"
						/>
					</div>
					<div className="relative flex-1">
						<figcaption className="sr-only">{title || "NO TITLE"}</figcaption>
						<div className="h-full text-md px-3 pt-3 flex flex-col gap-y-4 justify-between">
							<span className="block font-light" title={title || "NO TITLE"}>
								{title || "NO TITLE"}
							</span>
							<div className="flex justify-between">
								<span className="block text-neutral-700 text-lg font-semibold">
									${price || "000"}
								</span>
								<Button
									type="button"
									text="+"
									className="text-xl px-0 py-2 rounded-tl-2xl rounded-tr-none rounded-bl-none rounded-br-none border-b-0 border-r-0 max-h-10 w-2/6 h-full -mx-3"
									title="Add to cart"
									onClick={handleAddButtonClick}
								/>
							</div>
						</div>
					</div>
				</figure>
			</div>
		</div>
	);
}

Card.propTypes = {
	category: PropTypes.string.isRequired,
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
	price: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
};

export default React.memo(Card);
