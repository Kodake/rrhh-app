import { observer } from "mobx-react";
import List from "./components/List"

function App() {

  return (
    <>
      <div className="container">
        <div className='text-center m-3'>
          <h3>Gestor de RRHH</h3>
        </div>
      </div>
      <List />
    </>
  )
}

export default observer(App);
