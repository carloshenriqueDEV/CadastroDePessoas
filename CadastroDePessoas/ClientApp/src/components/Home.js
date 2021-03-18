import React, { Component } from 'react';
import moment from 'moment';
import Cadastro from './Cadastro';
import { GetTabelaCadastro, DeleteCadastro } from '../repositories/CadastroRepository'
import $ from 'jquery';

export default class Home extends Component {
    
  constructor(props) {
    super(props);
      this.state = {
          cadastros: [],
          loading: true,  
          createCadastro: false,
          cadastroDetalhado: {}
      };
      
  }

    
 async componentDidMount() {
     const response = await GetTabelaCadastro();
     this.setState({ cadastros: response, loading: false });
  }

    renderCadastroTable() {        
        return (
            <div>
                <button className="btn btn-primary" onClick={this.mostrarCadastro.bind(this)} style={{ float: "right", marginBottom:"15px" }}> Novo Cadastro</button>
                
              <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Cpf</th>
                    <th>Data de Nascimento</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                  </tr>
                </thead>
                <tbody>
                       {this.state.cadastros.map((cadastro,key) =>
                        <tr key={cadastro.pessoaId}>
                        <td>{cadastro.nome}</td>
                        <td>{cadastro.cpf}</td>
                               <td>{moment(new Date(cadastro.dataNascimento)).format("DD/MM/YYYY")}</td>
                               <td><button className="btn btn-info fas fa-edit" value={key} onClick={this.detalharCadastro.bind(this)} style={{ width:"70%" }}></button></td>
                               <td><button className="btn btn-danger far fa-trash-alt " value={key} onClick={this.removeCadastro.bind(this)} style={{ width: "70%" }}></button></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
    );
  }

    render() {
        let contents = this.state.loading ? "loading..." : this.state.createCadastro
            ? <Cadastro cadastroDetalhado={this.state.cadastroDetalhado} ocultarCadastro={this.ocultarCadastro.bind(this)} ></Cadastro>
            : this.renderCadastroTable()
              

    return (
        <div>
            {contents}
      </div>
    );
    } 

    mostrarCadastro() {        
        this.setState({ createCadastro: true });
        
    }

    ocultarCadastro() {
        console.log(this.state)
        this.setState({ createCadastro: false });
        this.setState({ cadastroDetalhado: { pessoaId: null } });        
    }

     detalharCadastro(e) {
        const cad = this.state.cadastros[e.target.value];
         this.setState({ cadastroDetalhado: cad });
        this.setState({ createCadastro: true });
        
    }

    async removeCadastro(e) {
        const cad = this.state.cadastros[e.target.value];

        $(`#${cad.pessoaId}`).remove();
        await DeleteCadastro(cad.pessoaId);
        
        alert("Cadastro Removido com sucesso");
    }    

    async reaload() {
        const response = await GetTabelaCadastro();
        this.setState({ cadastros: response });
    }
}
