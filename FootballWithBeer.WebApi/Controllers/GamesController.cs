using FootballWithBeer.WebApi.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using CsQuery;
using System;

namespace FootballWithBeer.WebApi.Controllers
{
    public class GamesController : ApiController
    {
        public IEnumerable<Game> GetAllGames()
        {
            return GetGames();
        }

        private IEnumerable<Game> GetGames()
        {
            var dom = CQ.CreateFromUrl("http://meuguia.tv/programacao/categoria/Esportes");

            var metadata = dom[".metadados"];

            foreach (var data in metadata)
            {
                var match = data.ParentNode.Attributes.GetAttribute("title");

                if (match.Contains(" x "))
                {
                    var channel = data.ChildNodes.Last().ToString();

                    var time = data.ChildNodes.First().InnerText;

                    yield return new Game
                    {
                        Id = Guid.NewGuid().ToString(),
                        Match = match,
                        Channel = channel.Substring(3, channel.Length - 3),
                        Time = time
                    };
                }
            }
        }
    }
}
