using Kardelen.UI.Core;
using Kardelen.UI.Model;
using Microsoft.AspNetCore.Mvc;

namespace Kardelen.UI.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiteController : ApiController
    {
        [HttpGet("GetSiteInfo")]
        public Layout GetSiteInfo()
        {
            var site = this.CurrentSite;

            return new Layout
            {
                Name = site.Name,
                Logo = site.Logo,
                Theme = site.Theme?.ToString().PadLeft(2, '0')
            };
        }
    }
}