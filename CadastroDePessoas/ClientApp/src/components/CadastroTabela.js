import React, { Component } from 'react';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import ModalCadastro from './ModalCadastro';
import { GetTabelaCadastro, DeleteCadastro } from '../repositories/CadastroRepository'
import $ from 'jquery';

export class CadastroTabela extends Component {
   static displayName = CadastroTabela.name;
  
  constructor(props) {
    super(props);
      this.state = {
          cadastros: [],
          loading: true,  
          showModalCadastro: false,
      };
      
  }

    
 async componentDidMount() {
     const response = await GetTabelaCadastro();
      this.setState({ cadastros: response.payload, loading: false, showModalCadastro:false });
  }

  renderCadastroTable(cadastros) {
    return (
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
               {cadastros.map((cadastro) =>
                <tr key={cadastro.pessoaId} id={cadastro.pessoaId}>
                <td>{cadastro.nome}</td>
                <td>{cadastro.cpf}</td>
               <td>{moment(new Date(cadastro.dataNascimento)).format("DD/MM/YYYY")}</td>
               <td><button value={cadastro.pessoaId} onClick={(e) => console.log(cadastros[e.target.value])}>Editar</button></td>
               <td><button value={cadastro.pessoaId} onClick={this.removerCad}>Excluir</button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
          : this.renderCadastroTable(this.state.cadastros);

    return (
        <div>
            <button onClick={this.auteraShowModalCadastro.bind(this)}>Novo Cadastro</button>
            {this.state.showModalCadastro && <Modal>
                <Modal.Header>
                    <Modal.Title>Cadastro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <button> Cadastrar</button>
                </Modal.Footer>
            </Modal>}
            {contents}

      </div>
    );
    } 

    auteraShowModalCadastro() {        
        this.setState({ showModalCadastro: true });
        
    }
    async removerCad(e) {
        $(`#${e.target.value}`).remove();
        const r = await DeleteCadastro(e.target.value);
        alert(r);
    }

}
