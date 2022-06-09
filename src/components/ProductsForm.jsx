import Btn from "./common/Btn.";
import Input from "./common/Input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const editedNotify = () =>
  toast.success("Edited correctly", {
    style: {
      border: "1px solid #06b6d4",
      padding: "16px",
      color: "#06b6d4",
    },
    iconTheme: {
      primary: "#06b6d4",
      secondary: "white",
    },
  });

const createdNotify = () =>
  toast.success("Created correctly", {
    style: {
      border: "1px solid #4ade80",
      padding: "16px",
      color: "#4ade80",
    },
    iconTheme: {
      primary: "#4ade80",
      secondary: "white",
    },
  });

const errorNotify = (msg) =>
  toast.error(msg, {
    style: {
      border: "1px solid #EF4444",
      padding: "16px",
      color: "#EF4444",
    },
    iconTheme: {
      primary: "#EF4444",
      secondary: "white",
    },
  });

const getProduct = async (url, setState) => {
  const { data } = await axios.get(url);
  console.log(data);
  setState(data);
};
const ProductsForm = () => {
  const { push, query } = useRouter();

  useEffect(() => {
    if (query.id) {
      getProduct(`https://pro-products.vercel.app/api/product/${query.id}`, setProduct);
    }
  }, [query]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
  });

  const handlerChange = ({ target: { id, value } }) =>
    setProduct({ ...product, [id.toLowerCase()]: value });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (query.id) {
        await axios.put(`/api/product/${query.id}`, product);
        editedNotify();
      } else {
        await axios.post("/api/product", product);
        createdNotify();
      }
      push("/");
    } catch (error) {
      console.log(error.response);
      // errorNotify(error.response)
      errorNotify(error.response.data.message);
    }
  };
  return (
    <div className="p-2 mx-2 flex justify-center h-[calc(100vh-68px)] items-center">
      <form onSubmit={handlerSubmit} className="w-full max-w-sm custom-shadow p-4 rounded-xl">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900">
          {!query.id ? "Crear nuevo producto" : "Editar producto"}
        </h1>
        <Input
          type={"text"}
          name={"Name"}
          label
          onChange={handlerChange}
          value={product.name}
        />
        <Input
          type={"textarea"}
          name={"Description"}
          label
          onChange={handlerChange}
          value={product.description}
        />
        <Input
          type={"text"}
          name={"Image"}
          label
          onChange={handlerChange}
          value={product.image}
        />
        <Input
          type={"text"}
          name={"Price"}
          label
          onChange={handlerChange}
          value={product.price}
        />
        <Btn text={"Save product"} bg={"bg-indigo-500 text-xl font-bold mt-6 "}>
          {query.id ? "Edit product" : "Create product"}
        </Btn>
      </form>
    </div>
  );
};

export default ProductsForm;
