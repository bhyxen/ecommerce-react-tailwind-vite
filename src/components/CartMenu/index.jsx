import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon, BanknotesIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import OrderCard from "../OrderCard";
import { StoreContext } from "../../context";

export default function CartMenu() {
	const {
		isCartMenuOpen,
		cartProducts,
		closeCartMenu,
		cartTotal,
		setOrder,
		clearCart,
	} = useContext(StoreContext);

	const handleCheckoutButton = () => {
		const newOrder = {
			date: new Date(),
			products: cartProducts,
			totalProducts: cartProducts.length,
			totalPrice: cartTotal,
		};

		setOrder((prevState) => [...prevState, newOrder]);
		clearCart();
		closeCartMenu();
	};

	return (
		<div
			className={`${
				isCartMenuOpen ? "flex" : "hidden"
			} w-full lg:w-2/4 xl:w-1/4 fixed right-0 h-[calc(100%-5rem)] top-20 p-5 bg-black/50 lg:p-0 lg:bg-transparent justify-center items-center lg:shadow-2xl z-50`}
		>
			<aside className="flex w-full flex-col p-5 sm:w-1/2 lg:w-full bg-slate-50 border lg:border-b-0 lg:border-r-0 border-black rounded-md max-h-full lg:h-full lg:rounded-e-none lg:rounded-es-none shadow-xl overflow-auto overscroll-none">
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
				<div className="flex-1">
					<hr className="border-black mb-5" />
					{cartProducts.map((elem) => {
						const { id, images, price, title, description, quantity } = elem;

						return (
							<OrderCard
								id={id}
								images={images}
								price={price}
								title={title}
								description={description}
								quantity={quantity}
								key={id}
								orderConfirmed={false}
							/>
						);
					})}
				</div>
				<div>
					<div className="mb-5 text-right">
						<span className="text-lg">Subtotal: </span>
						<span className="text-xl font-bold">${cartTotal}</span>
					</div>
					<Link to="/my-orders/last">
						<Button
							type="button"
							className="w-full px-4 py-2"
							text={<BanknotesIcon className="h-6 w-6" />}
							onClick={handleCheckoutButton}
							purpose="success"
						/>
					</Link>
				</div>
			</aside>
		</div>
	);
}
