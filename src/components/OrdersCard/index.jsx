import PropTypes from "prop-types";

export default function OrdersCard({ date, totalPrice, totalProducts }) {
	return (
		<>
			<div className="mb-5 flex justify-between">
				<div className="flex flex-col gap-y-4 py-5 h-fit">
					<div className="flex flex-wrap justify-between gap-y-5 items-center">
						<div className="flex justify-between w-full flex-wrap gap-y-4" />
						<div className="w-full">
							<span>Date: </span>
							<span className="font-bold">{date}</span>
						</div>
						<div className="w-full">
							<span>{`Item${totalProducts > 1 ? "s" : ""} Quantity: `}</span>
							<span className="font-bold">{totalProducts}</span>
						</div>
						<div className="w-full">
							<span>Total Price: </span>
							<span className="font-bold">${totalPrice}</span>
						</div>
					</div>
				</div>
			</div>
			<hr className="border-black mb-5" />
		</>
	);
}

OrdersCard.propTypes = {
	totalPrice: PropTypes.number.isRequired,
	totalProducts: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired,
};
