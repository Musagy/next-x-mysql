import { createContext, Dispatch, SetStateAction, useState } from "react"
import { product } from "@prisma/client"

type itemsCarInfo = [string, string]

export const StoreContext = createContext<{
  store: itemsCarInfo[] | null
  setStore: Dispatch<SetStateAction<itemsCarInfo[] | null>>
}>({ store: null, setStore: () => {} })

interface props {
  children: JSX.Element | JSX.Element[]
}

export const StoreProvider = ({ children }: props) => {
  const [store, setStore] = useState<itemsCarInfo[] | null>(null)

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  )
}
