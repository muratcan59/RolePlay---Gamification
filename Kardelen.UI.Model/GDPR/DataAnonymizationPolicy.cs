using Kardelen.Business.Framework.Core.DTO;

namespace Kardelen.UI.Model.GDPR
{
    public class DataAnonymizationPolicy : DTOBase
    {
        public int CVAnonymizationTime { get; set; }
        public bool StoreDataTemporarily { get; set; }
    }
}