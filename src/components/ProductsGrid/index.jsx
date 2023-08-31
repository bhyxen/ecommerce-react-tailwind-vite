import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "../Card/index";
import Button from "../Button";
import "react-toastify/dist/ReactToastify.css";
import { RESULTS_LIMIT } from "../../constants";

export default function ProductsGrid({ filteredProducts, productsInfo }) {
	const navigate = useNavigate();

	const { productsData, errorOcurred, moreProductsAvailable, loadMoreItems } =
		productsInfo;

	return (
		<>
			<div className="w-full grid gap-6 md:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
				{filteredProducts
					? filteredProducts?.products?.map(
							({ id, category, images, price, title, description }) => (
								<Card
									key={id}
									id={id}
									images={images}
									price={price}
									category={category}
									title={title}
									description={description}
								/>
							),
					  )
					: productsData?.products?.map(
							({ id, category, images, price, title, description }) => (
								<Card
									key={id}
									id={id}
									images={images}
									price={price}
									category={category}
									title={title}
									description={description}
								/>
							),
					  )}
			</div>
			{productsData?.products.length >= RESULTS_LIMIT &&
				!!moreProductsAvailable &&
				!filteredProducts && (
					<Button
						text="Load More Products"
						type="button"
						className="my-5 px-4 py-2"
						onClick={loadMoreItems}
					/>
				)}
			{!!errorOcurred && (
				<>
					<p>Please try again later...</p>
					<Button
						type="button"
						text="Reload"
						className="my-5 px-4 py-2"
						onClick={() => navigate(0)}
					/>
				</>
			)}
		</>
	);
}

ProductsGrid.propTypes = {
	filteredProducts: PropTypes.shape({
		products: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				category: PropTypes.string,
				images: PropTypes.arrayOf(PropTypes.string),
				price: PropTypes.number,
				title: PropTypes.string,
				description: PropTypes.string,
			}),
		),
	}),
	productsInfo: PropTypes.shape({
		errorOcurred: PropTypes.bool,
		moreProductsAvailable: PropTypes.bool,
		loadMoreItems: PropTypes.func,
		productsData: PropTypes.shape({
			products: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number,
					category: PropTypes.string,
					images: PropTypes.arrayOf(PropTypes.string),
					price: PropTypes.number,
					title: PropTypes.string,
					description: PropTypes.string,
				}),
			),
		}),
		setProductsOffset: PropTypes.func,
	}).isRequired,
};

ProductsGrid.defaultProps = {
	filteredProducts: null,
};
