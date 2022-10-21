using Kardelen.Business.Framework.Core.DTO;

namespace Kardelen.UI.Model.GDPR
{
    public class DataTransferReport : DTOBase
    {
        public string EmployerNameSurname { get; set; }
        public string TransferDate { get; set; }
        public string ProcessName { get; set; }
        public string NumberOfRecords { get; set; }
    }
}