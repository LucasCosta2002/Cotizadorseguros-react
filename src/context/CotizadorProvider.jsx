import { useState, createContext } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext()

// todo lo que esta dentro va a estar disponible en todos los hijos en el arbol principal 
const CotizadorProvider = ({children}) =>{
    
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = (e) =>{
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = ()=>{
        // base
        let resultado = 5000;

        //Diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)

        //restar 3% oir cada año
        resultado -= ((diferencia * 3) * resultado / 100)

        //americano 15%
        //europeo 30%
        //asiatioco 5%
        resultado *= calcularMarca(datos.marca)
    
        //basico 20%
        //completo 50%
        resultado *= calcularPlan(datos.plan)

        //formatear valor
        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setResultado(resultado);
            setCargando(false)
        }, 2500);
    }

    return (
        <CotizadorContext.Provider 
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext

