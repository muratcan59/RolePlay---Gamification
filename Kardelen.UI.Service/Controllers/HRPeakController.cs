using Kardelen.Business.Core.CaseStudy.DTO;
using Kardelen.Business.Core.Dosya;
using Kardelen.Business.Core.RolePlay.DTO;
using Kardelen.Business.Core.Yetkilendirme;
using Kardelen.Core;
using Kardelen.UI.Core;
using Kardelen.UI.Model.HRPEAK;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Kardelen.UI.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HRPeakController : ApiController
    {
        public const string Global = "Global";

        #region Case Study

        [HttpGet("CaseStudyList")]
        public IActionResult CaseStudyList(int language, int startIndex, int dataCount)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.ListCaseStudies(itemLanguage, startIndex, dataCount, out int totalDataCount).ToArray(c => new
            {
                Id = c.Key.Compress(),
                Name = Helper.Encode(c.Value, new EncodeSettings { HtmlEncode = false, ConvertSpecialHtmlTags = true })
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("CreateCaseStudy")]
        public IActionResult CreateCaseStudy([FromBody] CaseStudyItem itemToBeCreated)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var evaluationCriteriaList = new List<string, string>();

            if (itemToBeCreated.Competency1.IsNotEmpty() && itemToBeCreated.BehavioralIndicator1.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency1, itemToBeCreated.BehavioralIndicator1);
            if (itemToBeCreated.Competency2.IsNotEmpty() && itemToBeCreated.BehavioralIndicator2.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency2, itemToBeCreated.BehavioralIndicator2);
            if (itemToBeCreated.Competency3.IsNotEmpty() && itemToBeCreated.BehavioralIndicator3.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency3, itemToBeCreated.BehavioralIndicator3);
            if (itemToBeCreated.Competency4.IsNotEmpty() && itemToBeCreated.BehavioralIndicator4.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency4, itemToBeCreated.BehavioralIndicator4);
            if (itemToBeCreated.Competency5.IsNotEmpty() && itemToBeCreated.BehavioralIndicator5.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency5, itemToBeCreated.BehavioralIndicator5);

            return this.Execute(() => this.EmpatikService.CreateCaseStudy(new DTO_CASE_STUDY_ITEM
            {
                NAME = itemToBeCreated.Name,
                TITLE = itemToBeCreated.Title,
                EXPLANATION_CANDIDATE = itemToBeCreated.ExplanationCandidate,
                SCENARIO = itemToBeCreated.Scenario,
                SUMMARY = itemToBeCreated.Summary,
                ASSESSMENT_GUIDE = itemToBeCreated.Guide,
                PREPARATION_TIME = (short)itemToBeCreated.PreparationTime,
                PRESENTATION_TIME = (short?)itemToBeCreated.PresentationTime,
                LANGUAGE = itemToBeCreated.Language.To<Language>(true) ?? Language.Turkish,
                EVALUATION_CRITERIA_LIST = evaluationCriteriaList.IsEmpty() ? new DTO_CASE_STUDY_EVALUATION_CRITERIA[0] : evaluationCriteriaList.Select(k => new DTO_CASE_STUDY_EVALUATION_CRITERIA
                {
                    COMPETENCY = k.X,
                    BEHAVIORAL_INDICATOR = k.Y
                }).ToArray()
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("UpdateCaseStudy")]
        public IActionResult UpdateCaseStudy(Guid caseStudyId, int language, [FromBody] CaseStudyItem itemToBeUpdated)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.UpdateCaseStudy(caseStudyId, new DTO_CASE_STUDY_ITEM
            {
                NAME = itemToBeUpdated.Name,
                TITLE = itemToBeUpdated.Title,
                EXPLANATION_CANDIDATE = itemToBeUpdated.ExplanationCandidate,
                SCENARIO = itemToBeUpdated.Scenario,
                SUMMARY = itemToBeUpdated.Summary,
                ASSESSMENT_GUIDE = itemToBeUpdated.Guide,
                PREPARATION_TIME = (short)itemToBeUpdated.PreparationTime,
                PRESENTATION_TIME = (short?)itemToBeUpdated.PresentationTime,
                LANGUAGE = language.To<Language>(true) ?? Language.Turkish
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("DeleteCaseStudy")]
        public IActionResult DeleteCaseStudy(Guid caseStudyId)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.DeleteAssessment(caseStudyId), Yetki.SistemParametreYonet);
        }

        [HttpGet("GetCaseStudy")]
        public IActionResult GetCaseStudy(Guid caseStudyId, int language)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.GetCaseStudy(caseStudyId, itemLanguage).Cast(c => new CaseStudyItem
            {
                Name = c.NAME,
                Title = c.TITLE,
                ExplanationCandidate = c.EXPLANATION_CANDIDATE,
                Scenario = c.SCENARIO,
                Guide = c.ASSESSMENT_GUIDE,
                Summary = c.SUMMARY,
                PreparationTime = c.PREPARATION_TIME,
                PresentationTime = c.PRESENTATION_TIME,
                Competency1 = c.EVALUATION_CRITERIA_LIST.FirstOrDefault()?.COMPETENCY,
                Competency2 = c.EVALUATION_CRITERIA_LIST.Skip(1)?.FirstOrDefault()?.COMPETENCY,
                Competency3 = c.EVALUATION_CRITERIA_LIST.Skip(2)?.FirstOrDefault()?.COMPETENCY,
                Competency4 = c.EVALUATION_CRITERIA_LIST.Skip(3)?.FirstOrDefault()?.COMPETENCY,
                Competency5 = c.EVALUATION_CRITERIA_LIST.Skip(4)?.FirstOrDefault()?.COMPETENCY,
                BehavioralIndicator1 = c.EVALUATION_CRITERIA_LIST.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                BehavioralIndicator2 = c.EVALUATION_CRITERIA_LIST.Skip(1)?.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                BehavioralIndicator3 = c.EVALUATION_CRITERIA_LIST.Skip(2)?.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                BehavioralIndicator4 = c.EVALUATION_CRITERIA_LIST.Skip(3)?.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                BehavioralIndicator5 = c.EVALUATION_CRITERIA_LIST.Skip(4)?.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                CriteriaList = c.EVALUATION_CRITERIA_LIST.Select(k => new Criteria
                {
                    Id = k.ID.Compress(),
                    Competency = k.COMPETENCY,
                    BehavioralIndicator = k.BEHAVIORAL_INDICATOR
                }).ToArray()
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("UploadScenarioFile")]
        public string UploadScenarioFile()
        {
            return this.UploadFile(DosyaTur.CaseStudyScenarioImg);
        }

        [HttpPost("UploadGuideFile")]
        public string UploadGuideFile()
        {
            return this.UploadFile(DosyaTur.CaseStudyGuideImg);
        }

        [HttpPost("CreateCriteria")]
        public IActionResult CreateCriteria(Guid caseStudyId, [FromBody] Criteria itemToBeCreated)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.AddEvaluationCriteria(caseStudyId, new DTO_CASE_STUDY_EVALUATION_CRITERIA
            {
                BEHAVIORAL_INDICATOR = itemToBeCreated.BehavioralIndicator,
                COMPETENCY = itemToBeCreated.Competency
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("UpdateCriteria")]
        public IActionResult UpdateCriteria(Guid criteriaId, int language, [FromBody] Criteria itemToBeUpdated)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.UpdateEvaluationCriteria(criteriaId, (byte)language, new DTO_CASE_STUDY_EVALUATION_CRITERIA
            {
                COMPETENCY = itemToBeUpdated.Competency,
                BEHAVIORAL_INDICATOR = itemToBeUpdated.BehavioralIndicator
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("DeleteEvaluationCriteria")]
        public IActionResult DeleteEvaluationCriteria(Guid criteriaId)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.SetStatusEvaluationCriteria(criteriaId), Yetki.SistemParametreYonet);
        }

        [HttpGet("GetCriteriaList")]
        public IActionResult GetCriteriaList(Guid caseStudyId, int language, int startIndex, int dataCount)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.ListCriteria(caseStudyId, itemLanguage, startIndex, dataCount, out int totalDataCount).ToArray(c => new Criteria
            {
                Id = c.ID.Compress(),
                Competency = Helper.Encode(c.COMPETENCY, new EncodeSettings { HtmlEncode = false, ConvertSpecialHtmlTags = true }),
                BehavioralIndicator = Helper.Encode(c.BEHAVIORAL_INDICATOR, new EncodeSettings { HtmlEncode = false, ConvertSpecialHtmlTags = true })
            }), Yetki.SistemParametreYonet);
        }

        [HttpGet("GetCriteria")]
        public IActionResult GetCriteria(Guid criteriaId, int language)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.GetCriteria(criteriaId, itemLanguage).Cast(c => new Criteria
            {
                Id = c.ID.Compress(),
                Competency = c.COMPETENCY,
                BehavioralIndicator = c.BEHAVIORAL_INDICATOR
            }), Yetki.SistemParametreYonet);
        }

        #endregion

        #region Role Play

        [HttpGet("RolePlayList")]
        public IActionResult RolePlayList(int language, int startIndex, int dataCount)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.GetRolePlayList(itemLanguage, startIndex, dataCount, out int totalDataCount).ToArray(c => new
            {
                Id = c.Key.Compress(),
                Name = Helper.Encode(c.Value, new EncodeSettings { HtmlEncode = false, ConvertSpecialHtmlTags = true })
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("CreateRolePlay")]
        public IActionResult CreateRolePlay([FromBody] RolePlayItem itemToBeCreated)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var evaluationCriteriaList = new List<string, string>();

            if (itemToBeCreated.Competency1.IsNotEmpty() && itemToBeCreated.BehavioralIndicator1.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency1, itemToBeCreated.BehavioralIndicator1);
            if (itemToBeCreated.Competency2.IsNotEmpty() && itemToBeCreated.BehavioralIndicator2.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency2, itemToBeCreated.BehavioralIndicator2);
            if (itemToBeCreated.Competency3.IsNotEmpty() && itemToBeCreated.BehavioralIndicator3.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency3, itemToBeCreated.BehavioralIndicator3);
            if (itemToBeCreated.Competency4.IsNotEmpty() && itemToBeCreated.BehavioralIndicator4.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency4, itemToBeCreated.BehavioralIndicator4);
            if (itemToBeCreated.Competency5.IsNotEmpty() && itemToBeCreated.BehavioralIndicator5.IsNotEmpty()) evaluationCriteriaList.Add(itemToBeCreated.Competency5, itemToBeCreated.BehavioralIndicator5);

            var reactionList = new List<string>();

            if (itemToBeCreated.ReactionQuestion1.IsNotEmpty()) reactionList.Add(itemToBeCreated.ReactionQuestion1);
            if (itemToBeCreated.ReactionQuestion2.IsNotEmpty()) reactionList.Add(itemToBeCreated.ReactionQuestion2);
            if (itemToBeCreated.ReactionQuestion3.IsNotEmpty()) reactionList.Add(itemToBeCreated.ReactionQuestion3);
            if (itemToBeCreated.ReactionQuestion4.IsNotEmpty()) reactionList.Add(itemToBeCreated.ReactionQuestion4);
            if (itemToBeCreated.ReactionQuestion5.IsNotEmpty()) reactionList.Add(itemToBeCreated.ReactionQuestion5);

            return this.Execute(() => this.EmpatikService.CreateRolePlay(new DTO_ROLE_PLAY_ITEM
            {
                NAME = itemToBeCreated.Name,
                TITLE = itemToBeCreated.Title,
                EXPLANATION_CANDIDATE = itemToBeCreated.ExplanationCandidate,
                SCENARIO = itemToBeCreated.Scenario,
                SUMMARY = itemToBeCreated.Summary,
                ASSESSMENT_GUIDE = itemToBeCreated.Guide,
                READING_TIME = (short)itemToBeCreated.ReadingTime,
                RECORD_TIME = (short?)itemToBeCreated.RecordTime,
                LANGUAGE = itemToBeCreated.Language.To<Language>(true) ?? Language.Turkish,
                QUESTION = itemToBeCreated.Question,
                REACTION_QUESTION_LIST = reactionList.IsEmpty() ? new DTO_ROLE_PLAY_REACTION[0] : reactionList.Select(k => new DTO_ROLE_PLAY_REACTION { QUESTION = k }).ToArray(),
                EVALUATION_CRITERIA_LIST = evaluationCriteriaList.IsEmpty() ? new DTO_CASE_STUDY_EVALUATION_CRITERIA[0] : evaluationCriteriaList.Select(k => new DTO_CASE_STUDY_EVALUATION_CRITERIA
                {
                    COMPETENCY = k.X,
                    BEHAVIORAL_INDICATOR = k.Y
                }).ToArray()
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("UpdateRolePlay")]
        public IActionResult UpdateRolePlay(Guid rolePlayId, int language, [FromBody] RolePlayItem itemToBeUpdated)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.UpdateRolePlay(rolePlayId, new DTO_ROLE_PLAY_ITEM
            {
                NAME = itemToBeUpdated.Name,
                TITLE = itemToBeUpdated.Title,
                EXPLANATION_CANDIDATE = itemToBeUpdated.ExplanationCandidate,
                SCENARIO = itemToBeUpdated.Scenario,
                SUMMARY = itemToBeUpdated.Summary,
                ASSESSMENT_GUIDE = itemToBeUpdated.Guide,
                READING_TIME = (short)itemToBeUpdated.ReadingTime,
                RECORD_TIME = (short?)itemToBeUpdated.RecordTime,
                LANGUAGE = language.To<Language>(true) ?? Language.Turkish,
                QUESTION = itemToBeUpdated.Question
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("DeleteRolePlay")]
        public IActionResult DeleteRolePlay(Guid rolePlayId)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.DeleteAssessment(rolePlayId), Yetki.SistemParametreYonet);
        }

        [HttpGet("GetRolePlay")]
        public IActionResult GetRolePlay(Guid rolePlayId, int language)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.GetRolePlay(rolePlayId, itemLanguage).Cast(c => new RolePlayItem
            {
                Name = c.NAME,
                Title = c.TITLE,
                ExplanationCandidate = c.EXPLANATION_CANDIDATE,
                Scenario = c.SCENARIO,
                Guide = c.ASSESSMENT_GUIDE,
                Summary = c.SUMMARY,
                Question = c.QUESTION,
                ReadingTime = c.READING_TIME,
                RecordTime = c.RECORD_TIME,
                Competency1 = c.EVALUATION_CRITERIA_LIST.FirstOrDefault()?.COMPETENCY,
                Competency2 = c.EVALUATION_CRITERIA_LIST.Skip(1)?.FirstOrDefault()?.COMPETENCY,
                Competency3 = c.EVALUATION_CRITERIA_LIST.Skip(2)?.FirstOrDefault()?.COMPETENCY,
                Competency4 = c.EVALUATION_CRITERIA_LIST.Skip(3)?.FirstOrDefault()?.COMPETENCY,
                Competency5 = c.EVALUATION_CRITERIA_LIST.Skip(4)?.FirstOrDefault()?.COMPETENCY,
                BehavioralIndicator1 = c.EVALUATION_CRITERIA_LIST.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                BehavioralIndicator2 = c.EVALUATION_CRITERIA_LIST.Skip(1)?.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                BehavioralIndicator3 = c.EVALUATION_CRITERIA_LIST.Skip(2)?.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                BehavioralIndicator4 = c.EVALUATION_CRITERIA_LIST.Skip(3)?.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                BehavioralIndicator5 = c.EVALUATION_CRITERIA_LIST.Skip(4)?.FirstOrDefault()?.BEHAVIORAL_INDICATOR,
                CriteriaList = c.EVALUATION_CRITERIA_LIST.Select(k => new Criteria
                {
                    Id = k.ID.Compress(),
                    Competency = k.COMPETENCY,
                    BehavioralIndicator = k.BEHAVIORAL_INDICATOR
                }).ToArray(),
                ReactionQuestion1 = c.REACTION_QUESTION_LIST.FirstOrDefault()?.QUESTION,
                ReactionQuestion2 = c.REACTION_QUESTION_LIST.Skip(1)?.FirstOrDefault()?.QUESTION,
                ReactionQuestion3 = c.REACTION_QUESTION_LIST.Skip(2)?.FirstOrDefault()?.QUESTION,
                ReactionQuestion4 = c.REACTION_QUESTION_LIST.Skip(3)?.FirstOrDefault()?.QUESTION,
                ReactionQuestion5 = c.REACTION_QUESTION_LIST.Skip(4)?.FirstOrDefault()?.QUESTION,
                ReactionQuestionList = c.REACTION_QUESTION_LIST.Select(k => new RolePlayReaction
                {
                    Id = k.ID.Compress(),
                    Question = Helper.Encode(k.QUESTION, new EncodeSettings { HtmlEncode = false, ConvertSpecialHtmlTags = true })
                }).ToArray()
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("UploadRolePlayScenarioFile")]
        public string UploadRolePlayScenarioFile()
        {
            return this.UploadFile(DosyaTur.RolePlayScenarioImg);
        }

        [HttpPost("UploadRolePlayGuideFile")]
        public string UploadRolePlayGuideFile()
        {
            return this.UploadFile(DosyaTur.RolePlayGuideImg);
        }

        [HttpGet("GetRolePlayCriteriaList")]
        public IActionResult GetRolePlayCriteriaList(Guid rolePlayId, int language, int startIndex, int dataCount)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.ListRolePlayCriteria(rolePlayId, itemLanguage, startIndex, dataCount, out int totalDataCount).ToArray(c => new Criteria
            {
                Id = c.ID.Compress(),
                Competency = Helper.Encode(c.COMPETENCY, new EncodeSettings { HtmlEncode = false, ConvertSpecialHtmlTags = true }),
                BehavioralIndicator = Helper.Encode(c.BEHAVIORAL_INDICATOR, new EncodeSettings { HtmlEncode = false, ConvertSpecialHtmlTags = true })
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("CreateRolePlayCriteria")]
        public IActionResult CreateRolePlayCriteria(Guid rolePlayId, [FromBody] Criteria itemToBeCreated)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.AddRolePlayEvaluationCriteria(rolePlayId, new DTO_CASE_STUDY_EVALUATION_CRITERIA
            {
                BEHAVIORAL_INDICATOR = itemToBeCreated.BehavioralIndicator,
                COMPETENCY = itemToBeCreated.Competency
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("UpdateRolePlayCriteria")]
        public IActionResult UpdateRolePlayCriteria(Guid criteriaId, int language, [FromBody] Criteria itemToBeUpdated)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.UpdateRolePlayEvaluationCriteria(criteriaId, (byte)language, new DTO_CASE_STUDY_EVALUATION_CRITERIA
            {
                COMPETENCY = itemToBeUpdated.Competency,
                BEHAVIORAL_INDICATOR = itemToBeUpdated.BehavioralIndicator
            }), Yetki.SistemParametreYonet);
        }

        [HttpGet("GetRolePlayCriteria")]
        public IActionResult GetRolePlayCriteria(Guid criteriaId, int language)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.GetRolePlayCriteria(criteriaId, itemLanguage).Cast(c => new Criteria
            {
                Id = c.ID.Compress(),
                Competency = c.COMPETENCY,
                BehavioralIndicator = c.BEHAVIORAL_INDICATOR
            }), Yetki.SistemParametreYonet);
        }

        [HttpPost("DeleteRolePlayEvaluationCriteria")]
        public IActionResult DeleteRolePlayEvaluationCriteria(Guid criteriaId)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.SetStatusRolePlayEvaluationCriteria(criteriaId), Yetki.SistemParametreYonet);
        }

        [HttpPost("CreateRolePlayReaction")]
        public IActionResult CreateRolePlayReaction(Guid rolePlayId, [FromBody] RolePlayReaction reaction)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.AddReaction(rolePlayId, reaction.Question), Yetki.SistemParametreYonet);
        }

        [HttpPost("UpdateRolePlayReaction")]
        public IActionResult UpdateRolePlayReaction(Guid reactionId, int language, [FromBody] RolePlayReaction reaction)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.UpdateReaction(reactionId, (byte)language, reaction.Question), Yetki.SistemParametreYonet);
        }

        [HttpGet("GetReaction")]
        public IActionResult GetReaction(Guid reactionId, int language)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var itemLanguage = language.To<Language>(true) ?? Language.Turkish;

            return this.Execute(() => this.EmpatikService.GetReaction(reactionId, itemLanguage), Yetki.SistemParametreYonet);
        }

        [HttpPost("DeleteReaction")]
        public IActionResult DeleteReaction(Guid reactionId)
        {
            if (!this.IsSiteEmpatik())
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            return this.Execute(() => this.EmpatikService.DeleteReaction(reactionId), Yetki.SistemParametreYonet);
        }

        #endregion

        private string UploadFile(byte fileType)
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

            var result = this.DosyaService.DosyaTransferEt(key, data, file.ContentType, file.FileName, new DosyaTransferSecenek { DB = HRPeakController.Global, Tur = fileType, ResimBoyutKontroluYapma = true });

            if (result == DosyaTransferSonuc.Successfull)
            {
                return key;
            }

            return null;
        }

        private bool IsSiteEmpatik()
        {
            // Empatik sitesinde mi
            if (this.CurrentSite.Code != "empatik")
            {
                return false;
            }

            return true;
        }
    }
}
