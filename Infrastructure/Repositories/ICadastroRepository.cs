﻿using System.Collections.Generic;
using Domain.Models;

namespace Infrastructure.Repositories
{
   public interface ICadastroRepository
    {
        public IList<Pessoa> ListarCadastros(int page);

        public Pessoa AdicionarCadastro(Pessoa pessoa);

        public string AtualizarCadastro(Pessoa pessoa);

        public string RemoverCadastro(int id);
    }
}
