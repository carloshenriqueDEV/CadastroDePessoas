using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Validations
{
    class MaiorDeIdadeValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            int dia = int.Parse(value.ToString().Substring(0, 2));
            int mes = int.Parse(value.ToString().Substring(3, 2));
            int ano = int.Parse(value.ToString().Substring(6, 4));

            var dataNascimento = new DateTime(ano, mes, dia).Year;
            var dataHoje = DateTime.Now.Year;

            var idade = dataHoje - dataNascimento;

            if (idade < 18)
            {
                return false;
            }

            return true;
        }
    }
}
