using Kardelen.Business.Framework.Core.DTO;

namespace Kardelen.UI.Model.GDPR
{
    public class DataAnonymizationRequest : DTOBase
    {
        public string CVId { get; set; }
        public string CVNameSurname { get; set; }
        public string EmployerNameSurname { get; set; }
        public string RequestDate { get; set; }
        public bool CanCanceled { get; set; }
    }
}