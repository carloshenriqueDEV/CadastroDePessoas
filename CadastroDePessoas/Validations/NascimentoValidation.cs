using System;
using System.ComponentModel.DataAnnotations;

namespace CadastroDePessoas.Validations
{
    public class NascimentoValidation : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string data = value.ToString();            
            int dia = int.Parse(data.Substring(0, 2));
            int mes = int.Parse(data.Substring(3, 2));
            int ano = int.Parse(data.Substring(6, 4));

            if(!ValidateDia(dia) && !ValidateMes(mes) && !ValidateAno(ano))
            {
                return false;
            }

            return true;
        }

        private bool ValidateDia(int dd)
        {
            return (dd >= 1 || dd <= 31 ? true : false);
        }

        private bool ValidateMes(int mm)
        {
            return (mm >= 1 || mm <= 12 ? true : false);
        }

        private bool ValidateAno(int aaaa)
        {
            int anoAtual = DateTime.Now.Date.Year;
            return (aaaa >= 1900 || aaaa <= anoAtual ? true : false);
        }
    }
}
