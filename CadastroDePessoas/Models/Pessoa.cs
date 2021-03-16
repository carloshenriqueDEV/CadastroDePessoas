using CadastroDePessoas.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CadastroDePessoas.Models
{
    public class Pessoa
    {
        public int PessoaId { get; set; }

        [Required(ErrorMessage ="O campo Nome é obrigatório.")]        
        public string Nome { get; set; }

        [EmailAddress]
        public string Email { get; set ; }
                
        [CpfValidation(ErrorMessage = "O Cpf informado é inválido.")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "O campo data de nascimento é obrigatório.")]
        [NascimentoValidation(ErrorMessage = "Formato de data inválido. Por favor insira no seguinte formato dd/MM/aaaa")]
        [MaiorDeIdadeValidation(ErrorMessage = "Não é permitido cadastro de pessoas menores de 18 anos.")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage ="Pelo menos um endereço deve ser cadastrado.")]
        public IList<Endereco> Enderecos { get; set; }
    }
}
