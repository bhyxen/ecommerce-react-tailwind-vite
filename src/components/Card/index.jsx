import { TagIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
import Button from "../Button/index";

export default function Card({ category, images, price, title }) {
	return (
		<div className="p-5">
			<figure className="flex flex-col h-full border-solid border border-black rounded-md relative hover:outline-8 outline-black outline-8 transition-transform box-border hover:shadow-2xl overflow-hidden">
				<span className=" absolute left-1 top-1 bg-white/60 py-2 px-3 rounded-md">
					<TagIcon className="h-6 w-6 text-blue-500 inline mr-1" />
					{category ? category.name : "Others"}
				</span>
				<img
					className="object-center object-cover aspect-square w-full flex-1"
					src={images && images[0]}
					alt="Headphones"
				/>
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
								className="text-xl px-0 rounded-tl-2xl rounded-tr-none rounded-bl-none rounded-br-none border-b-0 border-r-0 max-h-10 w-2/6 h-full -mx-3"
								title="Add to cart"
							/>
						</div>
					</div>
				</div>
			</figure>
		</div>
	);
}

Card.propTypes = {
	category: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		image: PropTypes.string,
	}).isRequired,
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
	price: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
};
