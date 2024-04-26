// import { useState, useEffect } from "react";
// import AdminMenu from "./AdminMenu";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useGetProductByIdQuery,
//   useUploadProductImageMutation,
// } from "../../redux/api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";

// const AdminProductUpdate = () => {
//   const params = useParams();

//   const { data: productData } = useGetProductByIdQuery(params._id);

//   console.log(productData);

//   const [image, setImage] = useState(productData?.image || "");
//   const [name, setName] = useState(productData?.name || "");
//   const [description, setDescription] = useState(
//     productData?.description || ""
//   );
//   const [price, setPrice] = useState(productData?.price || "");
//   const [category, setCategory] = useState(productData?.category?._id || ""); // Set category ID
//   const [quantity, setQuantity] = useState(productData?.quantity || "");
//   const [brand, setBrand] = useState(productData?.brand || "");
//   const [stock, setStock] = useState(productData?.countInStock || ""); // Set stock

//   // hook
//   const navigate = useNavigate();

//   // Fetch categories using RTK Query
//   const { data: categories = [] } = useFetchCategoriesQuery();

//   const [uploadProductImage] = useUploadProductImageMutation();

//   // Define the update product mutation
//   const [updateProduct] = useUpdateProductMutation();

//   // Define the delete product mutation
//   const [deleteProduct] = useDeleteProductMutation();

//   useEffect(() => {
//     if (productData && productData._id) {
//       setName(productData.name);
//       setDescription(productData.description);
//       setPrice(productData.price);
//       setCategory(productData.category?._id);
//       setQuantity(productData.quantity);
//       setBrand(productData.brand);
//       setImage(productData.image);
//       setStock(productData.countInStock); // Set stock
//     }
//   }, [productData]);

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append("image", e.target.files[0]);
//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success("Item added successfully", {
//         // position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       setImage(res.image);
//     } catch (err) {
//       toast.success("Item added successfully", {
//         // position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("quantity", quantity);
//       formData.append("brand", brand);
//       formData.append("countInStock", stock);

//       // Update product using the RTK Query mutation
//       const data = await updateProduct({ productId: params._id, formData });

//       if (data?.error) {
//         toast.error(data.error, {
//           // position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//       } else {
//         toast.success(`Product successfully updated`, {
//           // position: toast.POSITION.TOP_RIGHT,
//           autoClose: 2000,
//         });
//         navigate("/admin/allproductslist");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Product update failed. Try again.", {
//         // position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       let answer = window.confirm(
//         "Are you sure you want to delete this product?"
//       );
//       if (!answer) return;

//       const { data } = await deleteProduct(params._id);
//       toast.success(`"${data.name}" is deleted`, {
//         // position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//       navigate("/admin/allproductslist");
//     } catch (err) {
//       console.log(err);
//       toast.error("Delete failed. Try again.", {
//         // position: toast.POSITION.TOP_RIGHT,
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <div className="container xl:mx-[9rem] sm:mx-[0]">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="md:w-3/4 p-3">
//           <h1 className="text-2xl font-bold mb-4">Update / Delete Product</h1>
//           {image && (
//             <div className="text-center">
//               <img
//                 src={image}
//                 alt="product"
//                 className="block mx-auto max-h-[200px]"
//               ></img>
//             </div>
//           )}

//           <div className="mb-3">
//             <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
//               {image ? image.name : "Upload Image"}

//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={uploadFileHandler}
//                 className={!image ? "hidden" : "text-white"}
//               />
//             </label>
//           </div>

//           <div className="p-3">
//             <div className="flex flex-wrap mb-4">
//               <div className="w-full md:w-1/2 pr-0 md:pr-2">
//                 <label htmlFor="name" className="block">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   className="p-4 w-full border rounded-lg bg-[#101011] text-white"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="w-full md:w-1/2 pl-0 md:pl-2 mt-4 md:mt-0">
//                 <label htmlFor="price" className="block">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   className="p-4 w-full border rounded-lg bg-[#101011] text-white"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-wrap mb-4">
//               <div className="w-full md:w-1/2 pr-0 md:pr-2">
//                 <label htmlFor="quantity" className="block">
//                   Quantity
//                 </label>
//                 <input
//                   type="number"
//                   className="p-4 w-full border rounded-lg bg-[#101011] text-white"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </div>
//               <div className="w-full md:w-1/2 pl-0 md:pl-2 mt-4 md:mt-0">
//                 <label htmlFor="brand" className="block">
//                   Brand
//                 </label>
//                 <input
//                   type="text"
//                   className="p-4 w-full border rounded-lg bg-[#101011] text-white"
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                 />
//               </div>
//             </div>
//             <label htmlFor="description" className="block my-4">
//               Description
//             </label>
//             <textarea
//               type="text"
//               className="p-2 w-full border rounded-lg bg-[#101011] text-white"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>

//             <div className="flex flex-wrap mb-4">
//               <div className="w-full md:w-1/2 pr-0 md:pr-2">
//                 <label htmlFor="stock" className="block">
//                   Count In Stock
//                 </label>
//                 <input
//                   type="text"
//                   className="p-4 w-full border rounded-lg bg-[#101011] text-white"
//                   value={stock}
//                   onChange={(e) => setStock(e.target.value)}
//                 />
//               </div>
//               <div className="w-full md:w-1/2 pl-0 md:pl-2 mt-4 md:mt-0">
//                 <label htmlFor="category" className="block">
//                   Category
//                 </label>
//                 <select
//                   className="p-4 w-full border rounded-lg bg-[#101011] text-white"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   <option disabled hidden>Choose Category</option>
//                   {categories.map((c) => (
//                     <option key={c._id} value={c._id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
//             >
//               Update
//             </button>
//             <button
//               onClick={handleDelete}
//               className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProductUpdate;


import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category?._id || null); // Updated initialization
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.success("Item added successfully", {
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          autoClose: 2000,
        });
      } else {
        toast.success(`Product successfully updated`, {
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.", {
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h1 className="text-2xl font-bold mb-4">Update / Delete Product</h1>
          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              ></img>
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2 pr-0 md:pr-2">
                <label htmlFor="name" className="block">
                  Name
                </label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-2 mt-4 md:mt-0">
                <label htmlFor="price" className="block">
                  Price
                </label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2 pr-0 md:pr-2">
                <label htmlFor="quantity" className="block">
                  Quantity
                </label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-2 mt-4 md:mt-0">
                <label htmlFor="brand" className="block">
                  Brand
                </label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e
                    .target.value)}
                    />
                  </div>
                </div>
                <label htmlFor="description" className="block my-4">
                  Description
                </label>
                <textarea
                  type="text"
                  className="p-2 w-full border rounded-lg bg-[#101011] text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
    
                <div className="flex flex-wrap mb-4">
                  <div className="w-full md:w-1/2 pr-0 md:pr-2">
                    <label htmlFor="stock" className="block">
                      Count In Stock
                    </label>
                    <input
                      type="text"
                      className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-0 md:pl-2 mt-4 md:mt-0">
                    <label htmlFor="category" className="block">
                      Category
                    </label>
                    <select
                      className="p-4 w-full border rounded-lg bg-[#101011] text-white"
                      value={category || ""}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option disabled value="">Choose Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
    
                <button
                  onClick={handleSubmit}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default AdminProductUpdate;
    