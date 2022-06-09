/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Route from "next/dist/server/router";
import Link from "next/link";
import Btn from "../components/common/Btn.";
import useStore from "../hooks/useStore";

function Home({ product }) {
  const { store, setStore } = useStore();
  return (
    <div className="w-full flex justify-center ">
      <div className="display flex flex-col gap-6 flex-wrap justify-center w-full max-w-2xl m-3">
        {product.length !== 0 ? (
          product.map((p) => {
            const priceWithTwoDecimal = parseFloat(p.price).toFixed(2);
            return (
              <div
                className="rounded-lg p-4 h-60 overflow-hidden custom-shadow flex bg-primary-custom justify-between"
                key={p.id}
              >
                <div className="bg-white overflow-hidden rounded-xl">
                  <Link href={`/product/${p.id}`} passHref>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full aspect-square object-cover shrink-0"
                    />
                  </Link>
                </div>
                <div className="flex flex-col h-full relative grow px-3 py-1 flex-1">
                  <Link href={`/product/${p.id}`} passHref>
                  <h1 className="text-indigo-600 text-3xl font-bold ">
                    {p.name}
                  </h1>
                  </Link>
                  <p className="font-light">{p.description}</p>
                  <div className="absolute bottom-0 right-0 flex items-center gap-2">
                    <p className="font-semibold text-indigo-500">
                      S/.{priceWithTwoDecimal}
                    </p>
                    <Btn
                      className={"flex items-center gap-1"}
                      bg="bg-indigo-500"
                      onClick={() => {
                        setStore([...store, [p.name, priceWithTwoDecimal]]);
                      }}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"></path>
                      </svg>
                      Agregar a carrito
                    </Btn>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-7xl font-bold mt-10">
            No products
            <img
              src="https://i.pinimg.com/originals/c4/03/b8/c403b884f59a4047015ab7ac17bb2bff.jpg"
              className="w-96 mt-10 m-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  // const {} = Route()
  const { data: product } = await axios.get("https://pro-products.vercel.app/api/product");

  return {
    props: {
      product,
    },
  };
};

export default Home;
