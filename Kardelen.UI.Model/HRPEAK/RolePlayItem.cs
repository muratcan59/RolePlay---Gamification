using Kardelen.Business.Framework.Core.DTO;

namespace Kardelen.UI.Model.HRPEAK
{
    public class RolePlayItem : DTOBase
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Scenario { get; set; }
        public string Summary { get; set; }
        public string Guide { get; set; }
        public string Question { get; set; }
        public int ReadingTime { get; set; }
        public int? RecordTime { get; set; }
        public string ExplanationCandidate { get; set; }
        public string Competency1 { get; set; }
        public string Competency2 { get; set; }
        public string Competency3 { get; set; }
        public string Competency4 { get; set; }
        public string Competency5 { get; set; }
        public string BehavioralIndicator1 { get; set; }
        public string BehavioralIndicator2 { get; set; }
        public string BehavioralIndicator3 { get; set; }
        public string BehavioralIndicator4 { get; set; }
        public string BehavioralIndicator5 { get; set; }
        public int Language { get; set; }
        public Criteria[] CriteriaList { get; set; }
        public string ReactionQuestion1 { get; set; }
        public string ReactionQuestion2 { get; set; }
        public string ReactionQuestion3 { get; set; }
        public string ReactionQuestion4 { get; set; }
        public string ReactionQuestion5 { get; set; }
        public RolePlayReaction[] ReactionQuestionList { get; set; }
    }
}