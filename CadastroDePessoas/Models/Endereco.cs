namespace CadastroDePessoas.Models
{
    public class Endereco
    {
        public int EnderecoId { get; set; }

        public string Logradouro { get; set; }

        public int Numero { get; set; }

        public string Bairro { get; set; }

        public string Cidade { get; set; }

        public string Uf { get; set; }

        public string Referencia { get; set; }

        public int PessoaId { get; set; }
    }
}
