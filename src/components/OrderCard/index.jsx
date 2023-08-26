import { useContext, useId } from "react";
import PropTypes from "prop-types";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import { StoreContext } from "../../context";

export default function OrderCard({
	id,
	category,
	images,
	price,
	title,
	description,
	quantity,
}) {
	const {
		removeProductFromCartById,
		addProductToCart,
		removeAllProductsFromCartById,
	} = useContext(StoreContext);

	const quantityInputId = useId();

	return (
		<>
			<figure key={id} className="mb-5 flex justify-between">
				<img
					className="h-auto w-1/3 object-cover object-top mr-5"
					src={images && images[0]}
					alt={title && title}
				/>
				<div className="flex flex-col gap-y-4 py-5 h-fit w-[calc(66.666667%-2.5rem)]">
					<span className="text-lg font-bold">${price && price}</span>
					<span>{title && title}</span>

					<div className="flex flex-wrap justify-between gap-y-5 items-center">
						<div className="flex justify-between w-full flex-wrap gap-y-4">
							<label
								htmlFor={quantityInputId}
								className="flex items-end flex-wrap gap-y-2"
							>
								<span className="mr-3">Quantity: </span>
								<div className="flex items-end">
									<Button
										type="button"
										purpose="secondary"
										className="border-r-0 h-8 w-8 lg:w-10 lg:h-10 rounded-e-none border-gray-200"
										title="Remove one item"
										onClick={() => removeProductFromCartById({ id, price })}
										text={<MinusIcon className="h-4 w-4 text-black" />}
									/>
									<input
										type="text"
										id={quantityInputId}
										name="quantity"
										inputMode="numeric"
										className="border text-center h-8 w-10 lg:h-10 border-l-0 border-r-0 bg-gray-100"
										value={quantity}
										readOnly
									/>
									<Button
										type="button"
										purpose="secondary"
										className="border-l-0 h-8 w-8 lg:w-10 lg:h-10 rounded-s-none border-gray-200 text-black"
										title="Add one item"
										onClick={() =>
											addProductToCart({
												id,
												category,
												images,
												price,
												title,
												description,
											})
										}
										text={<PlusIcon className="h-4 w-4 text-black" />}
									/>
								</div>
							</label>
						</div>
						<div className="w-full">
							<span>{`Item${quantity > 1 ? "s" : ""}  Total: `}</span>
							<span className="font-bold">${quantity * price}</span>
						</div>
					</div>
				</div>
				<Button
					className="h-8 w-8 lg:w-10 lg:h-10"
					onClick={() => removeAllProductsFromCartById({ id, price, quantity })}
					purpose="error"
					type="button"
					text={<TrashIcon className="h-4 w-4" />}
				/>
			</figure>
			<hr className="border-black mb-5" />
		</>
	);
}

OrderCard.propTypes = {
	category: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		image: PropTypes.string,
	}).isRequired,
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
	price: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	quantity: PropTypes.number.isRequired,
};
