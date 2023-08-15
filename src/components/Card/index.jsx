import { TagIcon } from "@heroicons/react/24/solid";
import Button from "../Button/index";

import HeadphonesImage from "../../img/headphones.jpg";

export default function Card() {
	return (
		<div className="w-1/2 md:w-1/3 xl:w-1/4 p-5">
			<figure className="border-solid border border-black rounded-md relative hover:outline-8 outline-black outline-8 transition-transform box-border hover:shadow-lg hover:translate-x-0.5 hover:-translate-y-0.5 overflow-hidden">
				<span className=" absolute left-1 top-1 bg-white/60 border py-2 px-3 rounded-md">
					<TagIcon className="h-6 w-6 text-blue-500 inline mr-1" />
					Elecronics
				</span>
				<img
					className="object-center object-cover aspect-square w-full h-full"
					src={HeadphonesImage}
					alt="Headphones"
				/>
				<div className="relative">
					<Button
						type="button"
						text="+"
						className="text-xl absolute right-0 bottom-0 rounded-tl-2xl rounded-tr-none rounded-bl-none border-b-0 border-r-0 h-1/2"
					/>
					<figcaption className="sr-only">Headphones</figcaption>
					<div className="text-md px-3 py-3 ">
						<span className="block text- font-light">Headphones</span>
						<span className="block text-neutral-700 text-lg font-semibold">
							$350
						</span>
					</div>
				</div>
			</figure>
		</div>
	);
}
