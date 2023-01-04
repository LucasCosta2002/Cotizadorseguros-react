import { useContext } from "react";
import CotizadorContext from "../context/CotizadorProvider";

const useCotizador = ()=>{

    return useContext(CotizadorContext)
}

export default useCotizador


// useCotizador es como un intermediario, en el provider hago disponibles las funciones, el provider esta enlazado al useCotizador que es el que importo en los componentes que voy a usar evitandome hacer muchos imports