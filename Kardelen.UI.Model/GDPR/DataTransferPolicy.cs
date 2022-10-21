using Kardelen.Business.Framework.Core.DTO;

namespace Kardelen.UI.Model.GDPR
{
    public class DataTransferPolicy : DTOBase
    {
        public short TransactionNumber { get; set; }
        public short? TransactionNumberForNotification { get; set; }
        public int ExcelDataLimit { get; set; }
        public int? ExcelDataLimitForNotification { get; set; }
    }
}