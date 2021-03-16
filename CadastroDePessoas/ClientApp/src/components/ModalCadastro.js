import React, { Component } from 'react';

import moment from 'moment';
import $ from 'jquery';

export default class ModalCadastro extends Component {
    static displayName = ModalCadastro.name;

    constructor(props) {
        super(props);
        this.state = {
            cadastro: {}
        };
        console.log(props)
    }


    async componentDidMount() {
        
    }


    render() {
     

        return (
            <div class="modal">
                <h1> create cadastro</h1>
            </div>
        );
    }    

}
