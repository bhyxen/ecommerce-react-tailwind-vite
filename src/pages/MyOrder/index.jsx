// Here the user will be able to see the most recent order

import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CheckIcon } from "@heroicons/react/24/solid";
import { StoreContext } from "../../context";
import OrderCard from "../../components/OrderCard";

import "react-toastify/dist/ReactToastify.css";

const ORDER_CONFIRMED = "Order confirmed!";

export default function MyOrder() {
	const { order } = useContext(StoreContext);

	const notifyOrder = () =>
		toast.success(ORDER_CONFIRMED, {
			theme: "colored",
			icon: <CheckIcon />,
		});

	useEffect(() => {
		if (order.length > 0) notifyOrder();
	}, [order]);

	const { date, totalProducts, totalPrice } = order?.slice(-1)[0] || {};

	return (
		<div>
			{order
				?.slice(-1)[0]
				?.products // Products inside the order
				?.map(({ id, images, price, title, description, quantity }) => (
					<OrderCard
						id={id}
						key={id}
						images={images}
						price={price}
						title={title}
						description={description}
						quantity={quantity}
						orderConfirmed
					/>
				))}
			<div className="text-right">
				<p>
					Date: &nbsp;
					<span className="font-bold">{`${
						date
							? `${date.toDateString()}, ${date.toLocaleTimeString()}`
							: "NO DATA"
					}`}</span>
				</p>
				<p>
					Total Products: <span className="font-bold">{totalProducts}</span>
				</p>
				<p>
					Total Price: <span className="font-bold">{totalPrice}</span>
				</p>
			</div>
			<ToastContainer />
		</div>
	);
}
