import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div
      className={`w-[15rem] h-[20rem] ml-[1rem] p-1 mb-3 relative bg-white rounded shadow-md hover:shadow-3xl transition duration-800 ease-in-out transform hover:translate-y-[-5px] hover:shadow-blue-300`}
    >
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-[15rem] h-[12rem] rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-1">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              $ {product.price}
            </span>
          </h2>
          <span>{product.description.substring(0, 60)}...</span>
        </Link>
      </div>
    </div>
  );
};

export default Product;


