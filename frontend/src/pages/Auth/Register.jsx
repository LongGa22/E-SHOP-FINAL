import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div class="h-screen bg-indigo-100 flex justify-center items-center">
      <div class="lg:w-2/5 md:w-1/2 w-2/3">
        <form
          onSubmit={submitHandler}
          class="bg-white p-10 rounded-lg shadow-lg min-w-full"
        >
          <h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
            Please register an account
          </h1>
          <div>
            <label
              class="text-gray-800 font-semibold block my-3 text-md"
              for="username"
            >
              Username
            </label>
            <input
              class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              class="text-gray-800 font-semibold block my-3 text-md"
              for="email"
            >
              Email
            </label>
            <input
              class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="email"
              name="email"
              id="email"
              placeholder="@email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              class="text-gray-800 font-semibold block my-3 text-md"
              for="password"
            >
              Password
            </label>
            <input
              class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              class="text-gray-800 font-semibold block my-3 text-md"
              for="confirm"
            >
              Confirm password
            </label>
            <input
              class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            class="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
          >
            {" "}
            {isLoading ? "Registering..." : "Register"}{" "}
          </button>
          {isLoading && <Loader />}

          <p className="pt-[10px]">
            {" "}
            Already have an account?
            <Link
              to="/Login"
              className=" p-[10px] text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300 tracking-wide font-semibold font-sans relative"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
