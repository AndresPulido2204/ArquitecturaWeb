using Microsoft.AspNetCore.Mvc;

namespace Catalog.Controllers
{
    [ApiController]
    public class FrasesController : ControllerBase
    {
        List<string> frases = new List<string> { "Fase1", "Frase2", "Frase3" };

        [HttpGet("frases")]
        public IEnumerable<string> GetFrases()
        {
            return frases;
        }

        [HttpGet("frases/random")]
        public string GetFraseRandom()
        {
            int index = new Random().Next(frases.Count);
            return frases[index];
        }

        [HttpGet("suma")]
        public string GetSuma(int n1, int n2)
        {
            return (n1 + n2).ToString();
        }
    }
}