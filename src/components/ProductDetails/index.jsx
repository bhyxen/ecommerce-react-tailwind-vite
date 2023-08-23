import { useContext } from "react";
import { XMarkIcon, TagIcon, PlusIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import { StoreContext } from "../../context";

export default function ProductDetail() {
	const {
		isProductDetailsOpen,
		closeProductDetails,
		productDetailsShown,
		addProductToCart,
	} = useContext(StoreContext);

	const { id, category, images, price, title, description } =
		productDetailsShown;

	const handleAddButtonClick = () => {
		addProductToCart({ id, category, images, price, title, description });
	};

	return (
		<aside
			className={`${
				isProductDetailsOpen ? "flex" : "hidden"
			} w-full lg:w-1/2 xl:w-1/4 fixed right-0 h-[calc(100%-5rem)] top-20 p-5 lg:p-0 bg-black/20 lg:bg-transparent justify-center items-center lg:shadow-xl z-50`}
		>
			<div className="flex flex-col p-5 w-full sm:w-1/2 lg:w-full justify-start bg-slate-50 border lg:border-b-0 lg:border-r-0 border-black rounded-md h-fit max-h-full lg:h-full lg:rounded-e-none lg:rounded-es-none shadow-xl lg:shadow-none overflow-auto overscroll-none">
				<div className="flex justify-between items-center mb-5">
					<h2 className="text-xl">Details</h2>
					<Button
						type="button"
						className="px-4 py-2"
						title="Close Product Details"
						onClick={closeProductDetails}
						text={<XMarkIcon className="h-6 w-6" />}
					/>
				</div>
				<figure>
					<img
						className="w-full h-auto object-cover object-top"
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
						<Button
							className="px-4 py-2"
							onClick={() =>
								handleAddButtonClick({
									id,
									category,
									images,
									price,
									title,
									description,
								})
							}
							type="button"
							text={<PlusIcon className="h-6 w-6" />}
						/>
					</div>
				</figure>
			</div>
		</aside>
	);
}
