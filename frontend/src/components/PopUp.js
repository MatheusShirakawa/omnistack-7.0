import React, { Component } from 'react';

class PopUp extends Component{

    render(){

        const show = this.props.show;

        return(
            <>
                <div className={ show ? "popup-actions active": "popup-actions"}>
                    <ul>
                        <li><a href="">Editar</a></li>
                        <li><a href="">Deletar</a></li>
                        <li><a href="">Ir para publicação</a></li>
                    </ul>
                </div>
            </>
        )
    }
}

export default PopUp;