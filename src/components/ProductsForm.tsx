import Btn from "./common/Btn."
import Input from "./common/Input"
import axios from "axios"
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { product } from "@prisma/client"

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
  })

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
  })

const errorNotify = (msg: string) =>
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
  })

const getProduct = async (
  url: string,
  setState: Dispatch<SetStateAction<product>>
) => {
  const { data } = await axios.get(url)
  console.log(data)
  setState(data)
}
const ProductsForm = () => {
  const { push, query } = useRouter()

  useEffect(() => {
    if (query.id) {
      getProduct(
        `http${window.location.host.includes("localhost") ? "" : "s"}://${
          window.location.host
        }/api/product/${query.id}`,
        setProduct
      )
    }
    console.log(
      `http${window.location.host.includes("localhost") ? "" : "s"}://${
        window.location.host
      }/api/product`,
      process.env.MYSQL_HOST
    )
  }, [query])

  const [product, setProduct] = useState<product>({
    name: "",
    description: "",
    image: "",
    price: null,
    id: 0,
    createdAT: new Date(),
  })
  interface HandlerChange {
    target: { id: string; value: string }
  }

  const handlerChange = ({ target: { id, value } }: HandlerChange) =>
    setProduct({ ...product, [id.toLowerCase()]: value })

  const handlerSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      if (query.id) {
        await axios.put(
          `http${window.location.host.includes("localhost") ? "" : "s"}://${
            window.location.host
          }/api/product/${query.id}`,
          product
        )
        editedNotify()
      } else {
        await axios.post(
          `http${window.location.host.includes("localhost") ? "" : "s"}://${
            window.location.host
          }/api/product`,
          product
        )
        createdNotify()
      }
      push("/")
    } catch (error: any) {
      console.log(error.response)
      // errorNotify(error.response)
      errorNotify(error.response.data.message)
    }
  }
  return (
    <div className="p-2 mx-2 flex justify-center h-[calc(100vh-68px)] items-center">
      <form
        onSubmit={handlerSubmit}
        className="w-full max-w-sm custom-shadow p-4 rounded-xl"
      >
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
          value={product.image ? product.image : ""}
        />
        <Input
          type={"text"}
          name={"Price"}
          label
          onChange={handlerChange}
          value={product.price ? product.price.toString() : undefined}
        />
        <Btn bg={"bg-indigo-500 text-xl font-bold mt-6 "}>
          {query.id ? "Edit product" : "Create product"}
        </Btn>
      </form>
    </div>
  )
}

export default ProductsForm
