using Kardelen.Business.Core.GDPR;
using Kardelen.Business.Core.GDPR.DTO;
using Kardelen.Business.Core.Parametre;
using Kardelen.Business.Core.Yetkilendirme;
using Kardelen.Core;
using Kardelen.UI.Core;
using Kardelen.UI.Model.GDPR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Kardelen.UI.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GDPRController : ApiController
    {
        [HttpGet("DataAnonymizationPolicyGet")]
        public IActionResult DataAnonymizationPolicyGet()
        {
            return this.Execute(() => this.BusinessService.DataAnonymizationPolicy_Get(this.SiteId).Cast(c => new DataAnonymizationPolicy
            {
                CVAnonymizationTime = (int)c.CV_ANONYMIZATION_TIME,
                StoreDataTemporarily = !c.DELETE_ALL_DATA
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("DataAnonymizationPolicySet")]
        public IActionResult DataAnonymizationPolicySet([FromBody] DataAnonymizationPolicy model)
        {
            return this.Execute(() => this.BusinessService.DataAnonymizationPolicy_Set(this.CurrentSite.Id, new DTO_DATA_ANONYMIZATION_POLICY
            {
                DELETE_ALL_DATA = !model.StoreDataTemporarily,
                CV_ANONYMIZATION_TIME = (DataAnonymizationTime)model.CVAnonymizationTime
            }), Yetki.SistemParametreYonet);
        }

        [HttpGet("DataAnonymizationRequestList")]
        public IActionResult DataAnonymizationRequestList(DateTime? startDate, DateTime? endDate, int startIndex, int dataCount)
        {
            return this.Execute(() => this.BusinessService.DataAnonymizationPolicy_AnonymizationRequestList(this.CurrentSite.Id, startDate, endDate, startIndex, dataCount, out int totalDataCount).ToArray(c => new DataAnonymizationRequest
            {
                CVId = c.CV_ID.Compress(),
                CVNameSurname = Helper.ToPascal(c.CV_AD_SOYAD),
                EmployerNameSurname = Helper.ToPascal(c.EMPLOYER_NAME),
                RequestDate = Helper.FormatDateTime(c.REQUESTED_DATE, true) + "<span class=Y> / " + Helper.TimeIntervalToString(c.REQUESTED_DATE, this.Language) + " " + (this.Language == Language.Turkish ? "önce" : "ago") + "</span>",
                CanCanceled = c.CAN_CANCALLED
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("DataAnonymizationCancel")]
        public IActionResult DataAnonymizationCancel(Guid cvId)
        {
            return this.Execute(() => this.BusinessService.DataAnonymizationPolicy_CancelDataAnonymizationRequest(this.SiteId, cvId), Yetki.SistemParametreYonet);
        }

        [HttpDelete("DataAnonymizationDelete")]
        public IActionResult DataAnonymizationDelete(Guid cvId)
        {
            return this.Execute(() => this.BusinessService.DataAnonymizationPolicy_AnonymizeData(this.SiteId, cvId), Yetki.SistemParametreYonet);
        }

        [HttpPost("DataTransferPolicySet")]
        public IActionResult DataTransferPolicySet([FromBody] DataTransferPolicy model)
        {
            return this.Execute(() => this.BusinessService.DataTransferPolicy_Set(this.CurrentSite.Id, new DTO_DATA_TRANSFER_POLICY
            {
                TRANSACTION_NUMBER = model.TransactionNumber,
                TRANSACTION_NUMBER_FOR_NOTIFICATION = model.TransactionNumberForNotification,
                EXCEL_DATA_LIMIT = model.ExcelDataLimit,
                EXCEL_DATA_LIMIT_FOR_NOTIFICATION = model.ExcelDataLimitForNotification
            }), Yetki.SistemParametreYonet);
        }

        [HttpGet("DataTransferPolicyGet")]
        public IActionResult DataTransferPolicyGet()
        {
            return this.Execute(() => this.BusinessService.DataTransferPolicy_Get(this.SiteId).Cast(c => new DataTransferPolicy
            {
                TransactionNumber = c.TRANSACTION_NUMBER,
                TransactionNumberForNotification = c.TRANSACTION_NUMBER_FOR_NOTIFICATION,
                ExcelDataLimit = c.EXCEL_DATA_LIMIT,
                ExcelDataLimitForNotification = c.EXCEL_DATA_LIMIT_FOR_NOTIFICATION
            }), Yetki.SistemParametreYonet);
        }

        [HttpGet("DataTransferReport")]
        public IActionResult DataTransferReport(Guid? employerId, Guid? processTypeId, DateTime? startDate, DateTime? endDate, int startIndex, int dataCount)
        {
            var prefixRecord = this.Language == Language.Turkish ? " satır" : " rows";
            var prefixCount = this.Language == Language.Turkish ? " kez" : " times";
            var language = this.Language;

            return this.Execute(() => this.BusinessService.DataTransferPolicy_TransferList(this.CurrentSite.Id, employerId, processTypeId, startDate, endDate, startIndex, dataCount, out int totalDataCount).ToArray(c => new DataTransferReport
            {
                EmployerNameSurname = Helper.ToPascal(c.EMPLOYER_NAME),
                TransferDate = Helper.FormatDateTime(c.TRANSFER_DATE, c.NUMBER_OF_RECORD.HasValue),
                ProcessName = Helper.GetPartByLanguge(language, c.PROCESS_NAME),
                NumberOfRecords = c.NUMBER_OF_RECORD.HasValue ? Helper.Format(c.NUMBER_OF_RECORD) + prefixRecord : Helper.Format(c.NUMBER_OF_ACTION) + prefixCount
            }), Yetki.SistemParametreYonet);
        }

        [HttpGet("DataRetentionPolicyGet")]
        public IActionResult DataRetentionPolicyGet()
        {
            return this.Execute(() => (int)(this.BusinessService.DataRetentionPolicy_Get(this.SiteId) ?? DataRetentionTime.FiveYears), Yetki.SistemParametreYonet);
        }

        [HttpPost("DataRetentionPolicySet")]
        public IActionResult DataRetentionPolicySet(int dataRetentionTime)
        {
            return this.Execute(() => this.BusinessService.DataRetentionPolicy_Set(this.SiteId, dataRetentionTime.To<DataRetentionTime>(true).Value), Yetki.SistemParametreYonet);
        }

        [HttpGet("DataRetentionReport")]
        public IActionResult DataRetentionReport()
        {
            return this.Execute(() =>
            {
                var list = this.BusinessService.DataRetentionPolicy_Report(this.CurrentSite.Id);

                if (list.IsEmpty())
                {
                    return Array.Empty<DataRetentionReport>();
                }

                var retentionTime = (int?)this.BusinessService.DataRetentionPolicy_Get(this.SiteId) ?? 5; // Policy olmayan sitelerde şimdilik 5 yıl olsun. Sistemin çalıştığından emin olunca 1 yıla düşürürüz.
                var retentionDate = retentionTime == 0 ? DateTime.Now.AddMonths(-6) : DateTime.Now.AddYears(-retentionTime);

                return list.ToArray(c => new DataRetentionReport
                {
                    CVId = c.CV_ID.Compress(),
                    NameSurname = Helper.ToPascal(c.NAME_SURNAME),
                    ActionDate = Helper.FormatDateTime(c.DATE, true, this.Language != Language.Turkish, this.Language),
                    DeleteDate = c.DATE.Subtract(retentionDate).TotalHours < 24 ? (this.Language == Language.Turkish ? "24 saat içerisinde" : "In 24 hours") : Helper.TimeIntervalToString(retentionDate, c.DATE, this.Language) + " " + (this.Language == Language.Turkish ? "sonra" : "later")
                });
            }, Yetki.SistemParametreYonet);
        }

        [HttpGet("TermsOfUseGet")]
        public IActionResult TermsOfUseGet(int language)
        {
            var param = language.To<Language>(true) == Language.Turkish ? ParametreListe.P_UYELIK_SOZLESME_METNI : ParametreListe.P_UYELIK_SOZLESME_METNI_EN;

            return this.Execute(() => this.FactoryService.ParametreDegerAlString(param), null);
        }

        [HttpPost("TermsOfUseSet")]
        public IActionResult TermsOfUseSet(Agreement model)
        {
            var param = model.Language.To<Language>(true) == Language.Turkish ? ParametreListe.P_UYELIK_SOZLESME_METNI : ParametreListe.P_UYELIK_SOZLESME_METNI_EN;

            return this.Execute(() => this.FactoryService.ParametreDegerGuncelle(param, model.Content), Yetki.SistemParametreYonet);
        }

        [HttpDelete("TermsOfUseReset")]
        public IActionResult TermsOfUseReset(int language)
        {
            var param = language.To<Language>(true) == Language.Turkish ? ParametreListe.P_UYELIK_SOZLESME_METNI : ParametreListe.P_UYELIK_SOZLESME_METNI_EN;

            return this.Execute(() => this.FactoryService.ParametreReset(param), Yetki.SistemParametreYonet);
        }

        [HttpGet("PrivacyPolicyGet")]
        public IActionResult PrivacyPolicyGet(int language)
        {
            var param = language.To<Language>(true) == Language.Turkish ? ParametreListe.P_UYELIK_AYDINLATMA_METNI : ParametreListe.P_UYELIK_AYDINLATMA_METNI_EN;

            return this.Execute(() => this.FactoryService.ParametreDegerAlString(param), null);
        }

        [HttpPost("PrivacyPolicySet")]
        public IActionResult PrivacyPolicySet(Agreement model)
        {
            var param = model.Language.To<Language>(true) == Language.Turkish ? ParametreListe.P_UYELIK_AYDINLATMA_METNI : ParametreListe.P_UYELIK_AYDINLATMA_METNI_EN;

            return this.Execute(() => this.FactoryService.ParametreDegerGuncelle(param, model.Content), Yetki.SistemParametreYonet);
        }
    }
}