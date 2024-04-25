
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Header from '../components/Header';
import Product from './Products/Product';
import {AiOutlineShoppingCart}  from "react-icons/ai";
const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  useEffect(() => {
    const loadScript = async () => {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[15rem] text-[3rem]">Special Products</h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-5 mr-[18rem] "
            >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AiOutlineShoppingCart style={{ marginRight: "0.5rem" }} />
                      <p>Shop Now !!!</p>
                    </div>

            </Link>
          </div>
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem] ml-[3rem]">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <df-messenger
        intent="WELCOME"
        chat-title="support_chatbot"
        agent-id="3202387e-bef4-4689-a5b2-7513ba4acc00"
        language-code="vi"
      ></df-messenger>
    </>
  );
};

export default Home;
