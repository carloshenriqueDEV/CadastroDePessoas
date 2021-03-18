import React, { Component } from 'react';
import Endereco from "./Endereco";
import { CreateCadastro, UpdateCadastro } from '../repositories/CadastroRepository'

export default class Cadastro extends Component {
    
    constructor(props) {
        super(props);
        
        if (props.cadastroDetalhado.pessoaId) {
            this.state = {
                pessoaId: props.cadastroDetalhado.pessoaId,
                nome: props.cadastroDetalhado.nome,
                cpf: props.cadastroDetalhado.cpf,
                email: props.cadastroDetalhado.email,
                dataNascimento: props.cadastroDetalhado.dataNascimento,
                enderecos: props.cadastroDetalhado.enderecos,
            }
        } else {
            this.state = {
                pessoaId: null,
                nome: "",
                cpf: "",
                email:"",
                dataNascimento: "",
                enderecos: "",
            }
        }

    }
    
   async salvar() {
       if (this.ValidaEstadoCadastro()) {            
           await this.salvarBD(this.state);
           this.props.ocultarCadastro();
        }
    }
   
    ValidaEstadoCadastro() {
        if (!this.state.nome || !this.state.email || !this.state.cpf || !this.state.dataNascimento || !this.state.enderecos) {
            alert("Os campos nome, cpf, e-mail ,data de nascimento e de endereço devem ser preenchidos.")
            return false;
        }

        return true;
    }

    insereEnderecos(newEnderecos) {
        this.setState({ enderecos: newEnderecos });
    }

    async salvarBD(cadastro) {        
        if (!cadastro.pessoaId) {
            const res = await CreateCadastro(cadastro);
            if (res) {
                this.voltarParaHome();
                alert("Cadastro criado com sucesso.");                
            }          
        } else {
            const res = await UpdateCadastro(cadastro);
            if (res) {
                this.voltarParaHome();
                alert("Cadastro atualizado com sucesso.");                
            }
        }
    }

    voltarParaHome() {
        this.props.ocultarCadastro();
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.voltarParaHome.bind(this)} style={{ float: "right", marginBottom: "15px" }}> Voltar</button>

                <h5>Dados pessoais</h5>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "30%", marginRight:"5%" }}>
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input id="nome" className="form-control" type="text" value={this.state.nome} placeholder="Nome" onChange={(e) => this.setState({ nome: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf">Cpf:</label>
                            <input id="cpf" className="form-control" type="text" value={this.state.cpf } placeholder="Cpf" onChange={(e) => this.setState({ cpf: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input id="email" className="form-control" type="email" value={this.state.email ? this.state.email : "" } placeholder="E-mail" onChange={(e) => this.setState({ email: e.target.value })}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nascimento">Data de Nascimento:</label>
                            <input id="nascimento" className="form-control" type="date"  onChange={(e) => this.setState({ dataNascimento: new Date(`${e.target.value}t00:00:00` )})}></input>
                        </div>
                    </div>
                    <Endereco enderecos={this.state.enderecos} insereEnderecos={this.insereEnderecos.bind(this)}></Endereco>
                </div>
                <button className="btn btn-success" onClick={this.salvar.bind(this)} style={{ width: "30%" }}>{this.state.pessoaId ? "Atualizar" : "Cadastradar"}</button>
            </div>
        );
    }    

}
