import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import OrdersCard from "../../components/OrdersCard";
import { StoreContext } from "../../context";

export default function MyOrders() {
	const { order } = useContext(StoreContext);

	return (
		<div className="w-full flex justify-between flex-col">
			<div className="flex justify-between">
				<Link to="..">
					<ChevronLeftIcon className="h-6 w-6" />
				</Link>
				<h1>My Orders</h1>
			</div>
			{order?.map(({ date, totalPrice, totalProducts, id }) => (
				<Link key={id} to={`/my-orders/${id}`}>
					<OrdersCard
						date={date}
						totalPrice={totalPrice}
						totalProducts={totalProducts}
					/>
				</Link>
			))}
			<Outlet />
		</div>
	);
}
