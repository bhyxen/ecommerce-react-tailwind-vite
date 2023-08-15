import { useEffect, useState } from "react";

import Card from "../../components/Card/index";
import Button from "../../components/Button";

// This should be in an environment variable on a real world app
const API_ENDPOINT =
	"https://api.escuelajs.co/api/v1/products/?offset=0&limit=12";

export default function Home() {
	const [products, setProducts] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(API_ENDPOINT)
			.then((res) => {
				if (res.status === 404) {
					setErrorMessage("No products found.");
					throw new Error(errorMessage);
				}
				if (!res.ok) {
					setErrorMessage("There has been an error, please again try later.");
					throw new Error(errorMessage);
				}
				return res.json();
			})
			.then((data) => setProducts(data))
			// eslint-disable-next-line no-console
			.catch((error) => console.log({ error }))
			.finally(() => {
				setLoading(false);
			});
	}, [errorMessage]);

	return (
		<>
			<div className="w-full max-w-screen-lg grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{products ? (
					products.map(({ id, category, images, price, title }) => (
						<Card
							key={id}
							images={images}
							price={price}
							category={category}
							title={title}
						/>
					))
				) : (
					<p className="text-md font-light text-center col-span-full">
						{loading ? "Loading..." : errorMessage}
					</p>
				)}
			</div>
			<Button text="Load More Items" type="button" className="my-5" />
		</>
	);
}
