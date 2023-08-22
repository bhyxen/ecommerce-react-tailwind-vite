import { useContext, useId } from "react";
import {
	XMarkIcon,
	TagIcon,
	TrashIcon,
	BanknotesIcon,
	PlusIcon,
	MinusIcon,
} from "@heroicons/react/24/solid";
import Button from "../Button";
import { StoreContext } from "../../context";

export default function CartMenu() {
	const {
		isCartMenuOpen,
		cartProducts,
		closeCartMenu,
		removeProductFromCartById,
		cartTotal,
		addProductToCart,
		removeAllProductsFromCartById,
	} = useContext(StoreContext);

	const quantityInputId = useId();

	return (
		<aside
			className={`${
				isCartMenuOpen ? "flex" : "hidden"
			} w-full lg:w-1/4 fixed right-0 h-[calc(100%-5rem)] top-20 p-5 lg:p-0 bg-black/20 lg:bg-transparent justify-center items-center lg:shadow-xl z-50`}
		>
			<div className="p-5 w-full sm:w-1/2 lg:w-full justify-center bg-slate-50 border lg:border-b-0 lg:border-r-0 border-black rounded-md h-full lg:rounded-e-none lg:rounded-es-none shadow-xl lg:shadow-none overflow-auto overscroll-none">
				<div className="flex justify-between items-center mb-5">
					<h2 className="text-xl">Cart Overview</h2>
					<Button
						type="button"
						className="px-4 py-2"
						onClick={closeCartMenu}
						title="Close Cart Menu"
						text={<XMarkIcon className="h-6 w-6" />}
					/>
				</div>
				{cartProducts.map((elem) => {
					const { id, category, images, price, title, description, quantity } =
						elem;

					return (
						<figure key={id} className="min-h-fit mb-5">
							<img
								className="h-1/2 w-full object-cover object-top"
								src={images && images[0]}
								alt={title && title}
							/>
							<div className="flex flex-col gap-y-4 py-5 h-fit">
								<span className="text-lg font-bold">${price && price}</span>
								<span>{title && title}</span>
								<span className="font-light">{description && description}</span>
								<span className="flex">
									<TagIcon className="h-6 w-6 mr-2 text-blue-500" />
									{category && category.name}
								</span>
								<div className="flex flex-wrap justify-between gap-y-5 items-center">
									<div className="flex justify-between w-full">
										<label htmlFor={quantityInputId} className="flex items-end">
											<span className="mr-3">Quantity</span>
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
												className="border text-center h-8 w-10 lg:w-10 lg:h-10 border-l-0 border-r-0 bg-gray-100"
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
										</label>
										<Button
											className="h-8 w-8 lg:w-10 lg:h-10 ml-3"
											onClick={() =>
												removeAllProductsFromCartById({ id, price, quantity })
											}
											purpose="error"
											type="button"
											text={<TrashIcon className="h-4 w-4" />}
										/>
									</div>
									<div className="text-right">
										<span>{`Item${quantity > 1 ? "s" : ""}  Total: `}</span>
										<span className="font-bold">${quantity * price}</span>
									</div>
								</div>
							</div>
							<hr className="border-black" />
						</figure>
					);
				})}
				<div className="mb-5 text-right">
					<span className="text-lg">Subtotal: </span>
					<span className="text-xl font-bold">${cartTotal}</span>
				</div>
				<Button
					type="button"
					className="w-full px-4 py-2"
					text={<BanknotesIcon className="h-6 w-6" />}
					purpose="success"
				/>
			</div>
		</aside>
	);
}
