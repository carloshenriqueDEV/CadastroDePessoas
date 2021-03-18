using Domain.Models;
using Infrastructure.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.Repositories
{
    public class CadastroRepository : ICadastroRepository
    {
        private CadastroContext _context;

        public CadastroRepository(CadastroContext context)
        {
            _context = context;
        }

        public Pessoa AdicionarCadastro(Pessoa pessoa)
        {
            Pessoa dataPessoa = new Pessoa() { Cpf = pessoa.Cpf, Nome = pessoa.Nome, DataNascimento = pessoa.DataNascimento };

            try
            {

                using (var transaction = _context.Database.BeginTransaction())
                {
                    _context.Pessoas.Add(dataPessoa);
                    _context.SaveChanges();

                    foreach (var end in pessoa.Enderecos)
                    {
                        _context.Enderecos.Add(new Endereco()
                        {
                            Logradouro = end.Logradouro,
                            Numero = end.Numero,
                            Bairro = end.Bairro,
                            Cidade = end.Cidade,
                            Uf = end.Uf,
                            PessoaId = dataPessoa.PessoaId
                        });
                        _context.SaveChanges();
                    }

                    transaction.Commit();
                }

            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return dataPessoa;
        }

        public string AtualizarCadastro(Pessoa pessoa)
        {
            try
            {
                using (var transaction = _context.Database.BeginTransaction())
                {
                    Pessoa pessoaDb = _context.Pessoas.Find(pessoa.PessoaId);

                    if (pessoaDb != null)
                    {
                        _context.Entry(pessoaDb).CurrentValues.SetValues(pessoa);
                    }
                    else
                    {
                        _context.Update(pessoa);
                    }

                    foreach (var end in pessoa.Enderecos)
                    {
                        Endereco enderecoDb = _context.Enderecos.Find(end.EnderecoId);

                        if (enderecoDb != null)
                        {
                            _context.Entry(enderecoDb).CurrentValues.SetValues(end);
                        }
                        else
                        {
                            _context.Update(end);
                        }
                    }

                    _context.SaveChanges();
                    transaction.Commit();

                    RemoverEnderecos(pessoa);

                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return $"Cadastro Atualizado com sucesso.";

        }

        public IList<Pessoa> ListarCadastros(int page)
        {
            int nElemento = 5;
            int menor = page == 1 ? 1 : nElemento * page / 2;
            int maior = nElemento * page;

            IList<Pessoa> list;

            try
            {
                using (var conn = _context)
                {
                    list =  conn.Pessoas.Take(100).ToList();
                        //conn.Pessoas.Where(p => p.PessoaId >= menor && p.PessoaId <= maior).Select(s => s).ToList<Pessoa>();

                    foreach (var pessoa in list)
                    {
                        pessoa.Enderecos = conn.Enderecos.Where(e => e.PessoaId == pessoa.PessoaId).Select(e => e).ToList<Endereco>();
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return list;
        }

        public string RemoverCadastro(int id)
        {
            try
            {
                using (var conn = _context)
                {
                    var pessoa = conn.Pessoas.Find(id);
                    _context.Pessoas.Remove(pessoa);
                    _context.SaveChanges();
                }



            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return $"Id {id} removido com sucesso.";
        }

        private void RemoverEnderecos(Pessoa pessoa)
        {
            //Remove os enderecos do banco que não estão na lista atualizada
            IList<int> IdsAtualizados = pessoa.Enderecos.Select(s => s.EnderecoId).ToList();
            IList<int> IdsBD = _context.Enderecos.Where(e => e.PessoaId == pessoa.PessoaId).Select(e => e.EnderecoId).ToList();
            IList<int> dif = IdsAtualizados.Except(IdsBD).ToList();

            if (dif.Count() > 0)
            {
                IList<Endereco> removeEnd = new List<Endereco>();
                foreach (var id in dif)
                {
                    removeEnd.Add(_context.Enderecos.Find(id));
                }

                _context.Enderecos.RemoveRange(removeEnd);
                _context.SaveChanges();
            }
        }
    
    }
}
