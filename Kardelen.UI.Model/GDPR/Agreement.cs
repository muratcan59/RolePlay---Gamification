using Kardelen.Business.Framework.Core.DTO;

namespace Kardelen.UI.Model.GDPR
{
    public class Agreement : DTOBase
    {
        public int Language { get; set; }
        public string Content { get; set; }
    }
}
