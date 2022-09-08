import { useContext } from "react";
import { StoreContext } from "../context/storeContext";

const useStore = () => {
  const {store, setStore} = useContext(StoreContext);
  return {store, setStore};
}
export default useStore;