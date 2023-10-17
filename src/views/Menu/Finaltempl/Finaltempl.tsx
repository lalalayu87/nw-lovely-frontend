import { injectReducer } from "@/store"
import FinaltemplCreate from "./FinaltemplCreate"
import reducer from "./store"
import FinaltemplList from "./FinaltemplList"

injectReducer('finaltemplList', reducer)

const Finaltempl = () => {
  return (
    <>
    {/* <FinaltemplCreate /> */}
    <FinaltemplList />
</>
  )
}

export default Finaltempl