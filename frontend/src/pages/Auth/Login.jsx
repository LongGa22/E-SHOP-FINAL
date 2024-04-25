import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative items-center">
    <div className="absolute inset-0 z-0">
      <img
        className="object-cover w-full h-full"
        style={{ backgroundImage: `url(https://icdn.24h.com.vn/upload/2-2022/images/2022-05-06/1-1651832161-405-width650height867.jpg)` }}
      />
      <div className="absolute bg-black opacity-10 inset-0"></div>
    </div>
    <div className="max-w-md w-full space-y-8 p-10 bg-[#f5f5f0] rounded-xl z-10">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Welcome Back!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please sign in to your account
        </p>
      </div>
      <div className="flex flex-row justify-center items-center space-x-3">
        {/* Your icon spans here */}
        <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg text-white bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300">
             
        <FaFacebookF  />
          </span>
          <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg text-white bg-blue-400 hover:shadow-lg cursor-pointer transition ease-in duration-300">
          <FaTwitter  />
          </span>
          <span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg text-white bg-white hover:shadow-lg cursor-pointer transition ease-in duration-300">
          <FcGoogle  />
          </span>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <span className="h-px w-16 bg-gray-300"></span>
        <span className="text-gray-500 font-normal">OR</span>
        <span className="h-px w-16 bg-gray-300"></span>
      </div>
      <form className="mt-8 space-y-6" onSubmit={submitHandler} method="POST">
        <input type="hidden" name="remember" value="true" />
        <div className="relative">
          <div className="absolute right-0 mt-4"></div>
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Email
          </label>
          <input
            className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            value={email}
            placeholder="mail@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-8 content-center">
          <label className="text-sm font-bold text-gray-700 tracking-wide">
            Password
          </label>
          <input
            className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm"></div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide
  font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
          >
            {" "}
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Do not have an account?</span>
          <Link
            to="/register"
            className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  </div>
  );
};

export default Login;
