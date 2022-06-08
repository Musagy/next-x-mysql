import Link from "next/link";
import { useEffect, useState } from "react";
import useStore from "../hooks/useStore";
import Modal from "./modal";
// import LinkCtn from './common/LinkCpn'

const Nav = () => {
  const { store } = useStore();
  const [modalState, setModalState] = useState(false)
  useEffect(() => {}, [store]);
  return (
    <header className="text-indigo-500 px-2 py-3 shadow-md">
      <nav className="max-w-screen-lg flex m-auto justify-between items-center relative">
        <h1 className="text-lg md:text-4xl font-bold md:pb-1">Pro Products</h1>
        <div className="flex text-sm md:text-md font-extralight gap-4">
          <Link href={"/"}>
            <a className=" px-3 py-1 rounded-lg text-black ">Home</a>
          </Link>
          <Link href={"/new"}>
            <a className="bg-indigo-500 text-white px-3 py-1 rounded-lg">
              New product
            </a>
          </Link>
          <div
            className="bg-indigo-500 text-white w-8 grid place-content-center rounded-lg relative"
            onClick={() => {
              setModalState(!modalState);
            }}
          >
            {store.length === 0 ? (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1.4em"
                width="1.4em"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-[1px]"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
              </svg>
            ) : (
              <>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  height="1.4em"
                  width="1.4em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-[1px]"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                </svg>
                <h3 className="absolute grid w-full h-full place-content-center text-center text-indigo-500 font-bold text-[0.6rem] md:text-[0.7rem] pl-0.5 pb-[1px]">
                  {store.length}
                </h3>
              </>
            )}
          </div>
          {
            modalState && (
            <Modal products={store} />
            )
          }
        </div>
      </nav>
    </header>
  );
};

export default Nav;
