import React from "react"
import useStore from "../hooks/useStore"
import Btn from "./common/Btn."
import toast from "react-hot-toast"

const payNotify = () => {
  toast.success("Compra completa 😎", {
    style: {
      border: "1px solid #6366f1",
      padding: "16px",
      color: "#6366f1",
    },
    iconTheme: {
      primary: "#6366f1",
      secondary: "white",
    },
  })
}

type itemsCarInfo = [string, string]

const Modal = ({ products = [] }: { products: itemsCarInfo[] }) => {
  const { setStore } = useStore()
  let totalCost = 0
  products.forEach(product => {
    totalCost += parseFloat(product[1])
  })
  return (
    <div className="absolute right-0 top-12 bg-white text-indigo-500 rounded-xl min-w-56 z-10 shadow-lg">
      {products.length > 0 ? (
        <>
          {products.map((product, index) => (
            <div
              className={`border-b-[0.2px] flex justify-between ${
                index + 1 === products.length
                  ? "border-gray-400"
                  : "border-gray-200"
              }`}
              key={index}
            >
              <div className="py-2 px-3 grow">
                <h1 className=" font-medium">{product[0]}</h1>
                <p className="text-black">S/.{product[1]}</p>
              </div>
              <div
                onClick={() => {
                  const newStore = [...products]
                  newStore.splice(index, 1)
                  setStore(newStore)
                }}
                className="grid place-content-center w-16 hover:bg-indigo-200 rounded-xl"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                </svg>
              </div>
            </div>
          ))}
          <div className={`flex justify-between`}>
            <div className="py-2 px-3">
              <h1 className="font-bold">Total</h1>
              <p className="text-black font-normal">
                $/. {totalCost.toFixed(2)}
              </p>
            </div>
            <Btn
              className="flex justify-center items-center gap-2 mx-2 my-3"
              bg="bg-indigo-500"
              onClick={() => payNotify()}
            >
              Pagar
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"></path>
              </svg>
            </Btn>
          </div>
        </>
      ) : (
        <div className="grid place-content-center p-4 font-bold">
          No hay productos en el carrito 😭😭
        </div>
      )}
    </div>
  )
}

export default Modal
