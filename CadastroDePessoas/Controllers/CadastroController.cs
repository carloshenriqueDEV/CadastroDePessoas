using System;
using Domain.Models;
using Infrastructure.Repositories;
using Infrastructure.Contexts;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CadastroDePessoas.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CadastroController : ControllerBase
    {
        private ICadastroRepository _cadastroRepository;

        public CadastroController()
        {            
            _cadastroRepository = new CadastroRepository(new CadastroContext());
        }
        

        // GET: <CadastroController>
        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                var listCadastro = _cadastroRepository.ListarCadastros(1);

                return new JsonResult(new { Status = 200, Payload = listCadastro });

            }
            catch (Exception e)
            {
                return new JsonResult( new {Status = 500, Payload = $"Erro interno do servidor \n {e.Message}" });
            }
            
        }

        // GET <CadastroController>/5
        [HttpGet("{id}")]
        public JsonResult Get(int page)
        {
            try
            {
                var listCadastro = _cadastroRepository.ListarCadastros(page);

                return new JsonResult(new { Status = 200, Payload = listCadastro });
            }
            catch (Exception e)
            {
                return new JsonResult(new { Status = 500, Payload = $"Erro interno do servidor \n {e.Message}" });
            }            
        }

        // POST <CadastroController>
        [HttpPost]
        public JsonResult Post([FromBody] Pessoa pessoa)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new JsonResult(new { Status = 400, Payload = ModelState.Values });
                }

                _cadastroRepository.AdicionarCadastro(pessoa);

                return new JsonResult(new { Status = 200, Payload = pessoa });
            }
            catch (Exception e)
            {
                return new JsonResult(new { Status = 500, Payload = $"Erro interno do servidor \n {e.Message}" });
            }
            
        }

        // PUT <CadastroController>/5
        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody] Pessoa pessoa)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return new JsonResult(new { Status = 400, PayLoad = ModelState.Values });
                }

                _cadastroRepository.AtualizarCadastro(pessoa);

                return new JsonResult(new { Status = 200, Payload = pessoa });
            }
            catch (Exception e)
            {
                return new JsonResult(new { Status = 500, Payload = $"Erro interno do servidor \n {e.Message}" });
            }

            
        }

        // DELETE <CadastroController>/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                _cadastroRepository.RemoverCadastro(id);

                return new JsonResult(new { Status = 200, Payload = "Removido com Sucesso" });
            }
            catch (Exception e)
            {
                return new JsonResult(new { Status = 500, Payload = $"Erro interno do servidor \n {e.Message}" });
            }
            
        }
    }
}
