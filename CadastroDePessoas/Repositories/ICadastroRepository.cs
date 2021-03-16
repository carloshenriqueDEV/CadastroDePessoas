using CadastroDePessoas.Models;
using System.Collections.Generic;

namespace CadastroDePessoas.Repositories
{
    public interface ICadastroRepository
    {
        public IList<Pessoa> ListarCadastros(int page);

        public Pessoa AdicionarCadastro(Pessoa pessoa);        

        public string AtualizarCadastro(Pessoa pessoa);

        public string RemoverCadastro(int id);
    }
}
