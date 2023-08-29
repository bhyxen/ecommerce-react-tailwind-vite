// Here the user will be able to see the most recent order

import { useContext, useEffect, useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { StoreContext } from "../../context";
import OrderCard from "../../components/OrderCard";

export default function MyOrder() {
	const { order } = useContext(StoreContext);
	const [displayedOrder, setDisplayedOrder] = useState({});

	const { orderId: orderIdParam } = useParams();

	useEffect(() => {
		if (order.length) {
			if (orderIdParam) {
				setDisplayedOrder(
					order?.find((currentOrder) => currentOrder.id === orderIdParam),
				);
			} else {
				setDisplayedOrder(order?.slice(-1)[0]);
			}
		}
	}, [order, orderIdParam, displayedOrder]);

	const { date, totalProducts, totalPrice, id: orderId } = displayedOrder;

	return (
		<div className="w-full max-w-2xl">
			<div className="flex justify-between mb-5">
				<Link to="/my-orders">
					<ChevronLeftIcon className="h-6 w-6" />
				</Link>
				<h1>
					My Order ID&nbsp;
					<span className="font-bold text-blue-500">&quot;{orderId}&quot;</span>
				</h1>
			</div>
			{displayedOrder?.products // Products inside the order
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
					<span className="font-bold">{date || "NO DATA"}</span>
				</p>
				<p>
					Total Products:{" "}
					<span className="font-bold">{totalProducts || "NO DATA"}</span>
				</p>
				<p>
					Total Price: $
					<span className="font-bold">{totalPrice || "NO DATA"}</span>
				</p>
			</div>
		</div>
	);
}
