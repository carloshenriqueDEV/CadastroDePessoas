import React, { Component } from 'react';

export default class Endereco extends Component {    

    constructor(props) {
        super(props);        
        if (props.enderecos) {
            this.state = {
                enderecos: props.enderecos,
                logradouro: "",
                numero: "",
                bairro: "",
                cidade: "",
                uf: "",
                referencia: "",
                quantEnderecos: props.enderecos.length
            }
        } else {
            this.state = {
                enderecos: [],
                logradouro: "",
                numero: "",
                bairro: "",
                cidade: "",
                uf: "",
                referencia: "",
                quantEnderecos:0
            }
        }
    }

    adiciona() {
        this.state.enderecos.push({
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf,
            referencia: this.state.referencia
        })

        this.setState({
            logradouro: "",
            numero: "",
            bairro: "",
            cidade: "",
            uf: "",
            referencia: "",
            quantEnderecos: this.state.enderecos.length
        })

        this.props.insereEnderecos(this.state.enderecos);
    }    

    remove(e) {
        delete this.state.enderecos[e.target.value];
        this.setState({ quantEnderecos: this.state.enderecos.length })
    }

    renderEnderecosTable(enderecos) {
        
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Logradouro</th>
                        <th>Número</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>Uf</th>
                        <th>Referência</th>                        
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {enderecos.map((endereco, key) =>
                        <tr key={key}>
                            <td>{endereco.logradouro}</td>
                            <td>{endereco.numero}</td>
                            <td>{endereco.bairro}</td>
                            <td>{endereco.cidade}</td>
                            <td>{endereco.uf}</td>
                            <td>{endereco.referencia}</td>
                            <td><button className="btn btn-danger far fa-trash-alt" value={key} onClick={this.remove.bind(this)}></button></td>
                        </tr>
                    )}
                </tbody>
            </table> 
        );
    }

    render() {
        let content =  this.renderEnderecosTable(this.state.enderecos)
        return (
            <div>
                <h5>Dados de endereços</h5>
                {content}
                <div>
                    <div>
                        <span>
                            <div className="form-group" style={{ display: "inline-block", marginRight: "5%", width:"50%" }}>
                                <label htmlFor="log">Logradouro:</label>
                                <input id="log" className="form-control" type="text" placeholder="Logradouro" onChange={(e) => this.setState({ logradouro: e.target.value })}></input>
                            </div>
                            <div className="form-group" style={{ display: "inline-block" }}>
                                <label htmlFor="numero">Numero:</label>
                                <input id="numero" className="form-control" type="text" placeholder="Numero" onChange={(e) => this.setState({ numero: parseInt(e.target.value) })}></input>
                            </div>
                        </span>
                    </div>
                    <div>
                        <span>
                            <div className="form-group" style={{ display: "inline-block", width: "45%", marginRight:"5%" }}>
                                <label htmlFor="bairro">Bairro:</label>
                                <input id="bairro" className="form-control" type="text" placeholder="Bairro" onChange={(e) => this.setState({ bairro: e.target.value })}></input>
                            </div>
                    
                            <div className="form-group" style={{ display: "inline-block" }}>
                                <label htmlFor="cidade">Cidade:</label>
                                <input id="cidade" className="form-control" type="text" placeholder="Cidade" onChange={(e) => this.setState({ cidade: e.target.value })}></input>
                            </div> 
                         </span>
                    </div>
                    <div>
                        <span>
                            <div className="form-group" style={{ display: "inline-block", width: "20%", marginRight: "5%"}}>
                                <label htmlFor="uf">Uf:</label>
                                <input id="uf" className="form-control" type="text" placeholder="Uf" onChange={(e) => this.setState({ uf: e.target.value })}></input>
                            </div> 
                            <div className="form-group" style={{ display: "inline-block" }}>
                                <label htmlFor="referencia">Referência:</label>
                                <input id="referencia" className="form-control" type="text" placeholder="Referência" onChange={(e) => this.setState({ referencia: e.target.value })}></input>
                            </div>
                        </span>
                    </div>
                    <button className="btn btn-primary fas fa-plus-circle" onClick={this.adiciona.bind(this)} style={{ float: "right", width:"20%" }}></button>
                </div>


            </div>
        );
    }

}
