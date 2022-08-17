import React from "react";
import Cookies from "universal-cookie";


const cookies = new Cookies();

class GuiaRemision extends React.Component {

    componentDidMount() {
        // if(!cookies.get('id')){
        //     window.location.href = '/';
        // }
    }


    render() {
        return (
            <>
                <h1 className="tit_general">Guía de Remisión</h1>

            </>
        );
    }

}


export default GuiaRemision;