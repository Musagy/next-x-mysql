import axios from "axios"
import { useRouter } from "next/router"
import Btn from "../../components/common/Btn."
import toast from "react-hot-toast"
import { product } from "@prisma/client"
import { GetServerSideProps } from "next"

const deleteNotify = () =>
  toast.success("Removed successfully", {
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

const ProductEdit = ({ product }: { product: product }) => {
  const { push } = useRouter()

  const handlerDelete = async (id: string) => {
    await axios.delete(`http${window.location.host.includes("localhost") ? "" : "s"}://${window.location.host}/api/product/${id}`)
    push("/")
    deleteNotify()
  }
  return (
    <div className=" m-auto my-10 max-w-screen-md">
      <div
        className="rounded-lg p-4 custom-shadow flex bg-primary-custom justify-between"
        // key={p.id}
      >
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div>
          <p className="font-light">{product.description}</p>
          <p className="font-light">{`${product.price}`}</p>
          <div className="flex gap-3 justify-end  -mb-12 bottom-0 relative">
            <Btn
              bg={"bg-red-500 shadow-xl"}
              margin={"my-2"}
              className={"font-bold py-2 px-3 text-xl"}
              onClick={() => handlerDelete(`${product.id}`)}
            >
              Remove
            </Btn>
            <Btn
              bg={"bg-cyan-500 shadow-xl"}
              margin={"my-2"}
              className={"font-bold py-2 px-3 text-xl"}
              onClick={() => push(`/product/edit/${product.id}`)}
            >
              Edit
            </Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: product } = await axios.get(
    `http${window.location.host.includes("localhost") ? "" : "s"}://${window.location.host}/api/product/${context.query.id}`
  )

  return {
    props: {
      product,
    },
  }
}

export default ProductEdit
