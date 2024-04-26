import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container flex justify-around items-start flex wrap mx-auto mt-8 ">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[60%] bg-[#eeeeee] rounded">
              <h1 className="text-3xl font-semibold mb-4">Shopping Cart </h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-enter mb-[1rem] ml-[2rem] mr-[2rem]  bg-white rounded"
                >
                  <div className="w-[8rem] h-[8rem] p-3 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 pt-[1.5rem] ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-black text-xl font-semibold"
                    >
                      {item.name}
                    </Link>
         

                  <div className="mt-1 text-gray-500 flex">
                    <span className="mr-2">Brand:</span>
                    <span className="text-black font-semibold">
                      {item.brand}
                    </span>
                  </div>
                  <div className="text-gray-500 flex">
                    <span className="mr-2">Price:</span>
                    <span className="mt-1 text-green-500 font-bold">
                      ${item.price}
                    </span>
                  </div>
                  </div>
                  <div className="w-24 m-[2.5rem]">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[3rem] text-xl" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Total Items (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="bg-[#e4a11b] ml-12 mt-4 py-2 px-4 rounded-full text-lg w-full  "
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Pay
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* <section className="vh-100" style={{ backgroundColor: "#fdccbc" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <p>
              <span className="h2">Shopping Cart </span>
              <span className="h4">(1 item in your cart)</span>
            </p>

            <div className="card mb-4">
              <div className="card-body p-4">

                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                      className="img-fluid"
                      alt="Generic placeholder image"
                    />
                  </div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <div>
                      <p className="small text-muted mb-4 pb-2">Name</p>
                      <p className="lead fw-normal mb-0">iPad Air</p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <div>
                      <p className="small text-muted mb-4 pb-2">Color</p>
                      <p className="lead fw-normal mb-0">
                        <i className="fas fa-circle me-2" style={{ color: "#fdd8d2" }}></i>
                        pink rose
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <div>
                      <p className="small text-muted mb-4 pb-2">Quantity</p>
                      <p className="lead fw-normal mb-0">1</p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <div>
                      <p className="small text-muted mb-4 pb-2">Price</p>
                      <p className="lead fw-normal mb-0">$799</p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <div>
                      <p className="small text-muted mb-4 pb-2">Total</p>
                      <p className="lead fw-normal mb-0">$799</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="card mb-5">
              <div className="card-body p-4">

                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">$799</span>
                  </p>
                </div>

              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg me-2">Continue shopping</button>
              <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Add to cart</button>
            </div>

          </div>
        </div>
      </div>
    </section> */}
    </>
  );
};

export default Cart;
