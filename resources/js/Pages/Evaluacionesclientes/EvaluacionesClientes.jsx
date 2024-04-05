import React from 'react'
import Menu_Item from '../panel/Menu_Item'
const EvaluacionesClientes = ({auth,razon_social,logo, Appname}) => {
  return (
    <>
        <Menu_Item  user={auth.user} razon_social={razon_social} logo={logo} AppName={Appname} >
        <div className="container">
            <div className="row">
            <div className="col-12">
                <h1>Evaluaciones de Clientes</h1>
            </div>
            </div>
        </div>
        </Menu_Item>
    </>
  )
}

export default EvaluacionesClientes
