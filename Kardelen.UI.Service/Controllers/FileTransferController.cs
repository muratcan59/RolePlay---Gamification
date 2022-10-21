using Kardelen.Business.Core.Dosya;
using Kardelen.Core;
using Kardelen.UI.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;

namespace Kardelen.UI.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileTransferController : ApiController
    {
        [HttpPost("TransferFile")]
        public string TransferFile(string db)
        {
            var form = this.Request.Form;

            if (form == null)
            {
                return null;
            }

            if (form.Files.Count == 0)
            {
                return null;
            }

            var key = Guid.NewGuid().Zip();
            var file = form.Files[0];
            var ms = new MemoryStream();

            file.CopyTo(ms);

            var data = ms.ToArray();

            var result = this.DosyaService.DosyaTransferEt(key, data, file.ContentType, file.FileName, new DosyaTransferSecenek { DB = db });

            if (result == DosyaTransferSonuc.Successfull)
            {
                return key;
            }

            return null;
        }
    }
}