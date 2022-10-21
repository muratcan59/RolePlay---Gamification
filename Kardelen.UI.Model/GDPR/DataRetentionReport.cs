using Kardelen.Business.Framework.Core.DTO;

namespace Kardelen.UI.Model.GDPR
{
    public class DataRetentionReport : DTOBase
    {
        public string CVId { get; set; }
        public string NameSurname { get; set; }
        public string ActionDate { get; set; }
        public string DeleteDate { get; set; }
    }
}
