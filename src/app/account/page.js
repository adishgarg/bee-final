"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import UploadButton from "@/components/uploadbutton";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", cart: [], role: "" });
  const [loading, setLoading] = useState(true);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "male",
  });
  const [formLoading, setFormLoading] = useState(false);
  const imageRef = useRef("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    async function fetchAccountData() {
      try {
        const res = await fetch("/api/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.name, cart: data.cart, role: data.role });
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchAccountData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // Seller: fetch products list
  async function fetchSellerProducts() {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSellerProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const toggleProductList = () => {
    setShowProducts((prev) => !prev);
    if (!showProducts) {
      fetchSellerProducts();
    }
  };

  // Handle changes for text fields on the form
  const handleInputChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // Seller: Add product function
  const addProduct = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    if (!productForm.image) {
      alert("Please upload an image before submitting the product.");
      return;
    }
    const token = localStorage.getItem("token");
    console.log("Image ref:", imageRef.current);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productForm),
      });
  
      if (res.ok) {
        setProductForm({ name: "", price: "", description: "", image: "", category: "male" });
        imageRef.current = "";
        fetchSellerProducts();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  // Seller: Remove product function
  const removeProduct = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchSellerProducts();
      } else {
        console.error("Error removing product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-12 space-y-8">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-white mb-4 text-center">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-400 text-center mb-6">
          This is your account dashboard.
        </p>

        {/* Other sections (e.g., Cart) ... */}

        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-black border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-black transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Seller Options */}
        {user.role === "seller" && (
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <button
                onClick={toggleProductList}
                className="w-full px-6 py-3 bg-black border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-black transition duration-300"
              >
                {showProducts ? "Hide My Listed Products" : "View My Listed Products"}
              </button>
              <button
                onClick={() => setShowAddForm((prev) => !prev)}
                className="w-full px-6 py-3 bg-black border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-black transition duration-300"
              >
                {showAddForm ? "Hide Add New Product" : "Add New Product"}
              </button>
            </div>

            {/* Seller Product List */}
            {showProducts && (
              <div className="bg-gray-800 rounded-lg p-5">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Products</h2>
                {sellerProducts && sellerProducts.length > 0 ? (
                  <ul className="space-y-4">
                    {sellerProducts.map((product) => (
                      <li
                        key={product._id}
                        className="flex justify-between items-center bg-gray-700 p-4 rounded"
                      >
                        <div>
                          <h3 className="font-bold text-white">{product.name}</h3>
                          <p className="text-gray-300">${product.price}</p>
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-20 h-20 object-cover mt-2 rounded"
                            />
                          )}
                        </div>
                        <button
                          onClick={() => removeProduct(product._id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">You have no products listed.</p>
                )}
              </div>
            )}

            {/* Add New Product Form */}
            {showAddForm && (
              <form onSubmit={addProduct} className="space-y-4 bg-gray-800 rounded-lg p-5">
                <h2 className="text-2xl font-semibold text-white mb-4">Add New Product</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={productForm.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={productForm.price}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
                />
                <select
                  name="category"
                  value={productForm.category}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white"
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
                <UploadButton
                  onBase64Upload={(base64String) => {
                    console.log("Received base64 string:", base64String);
                    setProductForm((prev) => ({ ...prev, image: base64String }));
                  }}
                />
                {productForm.image && (
                  <div className="mt-2">
                    <p className="text-gray-300">Image uploaded! Preview:</p>
                    <img
                      src={productForm.image}
                      alt="Product"
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded transition duration-300"
                >
                  {formLoading ? "Adding..." : "Add Product"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}