import { useContext } from "react";
import { XMarkIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import OrderCard from "../OrderCard";
import { StoreContext } from "../../context";

export default function CartMenu() {
	const { isCartMenuOpen, cartProducts, closeCartMenu, cartTotal } =
		useContext(StoreContext);

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
						<OrderCard
							id={id}
							category={category}
							images={images}
							price={price}
							title={title}
							description={description}
							quantity={quantity}
							key={id}
						/>
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
