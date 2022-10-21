/** Layouts **/
import BusinessLayout from "../layouts/business-layout/BusinessLayout";
import EmptyLayout from "../layouts/empty-layout";
/** Components **/

/** Views **/
import DataAnonymizationPolicy from "../views/gdpr/data.anonymization.policy/layout";
import DataAnonymizationRequests from "../views/gdpr/data.anonymization.requests/layout";
import DataRetentionPolicy from "../views/gdpr/data.retention.policy/layout";
import DataRetentionReport from "../views/gdpr/data.retention.report/layout";
import DataTransferPolicy from "../views/gdpr/data.transfer.policy/layout";
import DataTransferReport from "../views/gdpr/data.transfer.report/layout";
import TermsOfUse from "../views/gdpr/terms.of.use/layout";
import PrivacyPolicy from "../views/gdpr/privacy.policy/layout";
import ListCaseStudy from "../views/w/hrpeak/dm/case.study.list/layout";
import ManageCaseStudy from "../views/w/hrpeak/dm/case.study.manage/layout";
import ListCaseStudyCriteria from "../views/w/hrpeak/dm/case.study.criteria.list/layout";
import ManageCaseStudyCriteria from "../views/w/hrpeak/dm/case.study.criteria.manage/layout";
import ManageRolePlay from "../views/w/hrpeak/dm/role.play.manage/layout";
import ListRolePlay from "../views/w/hrpeak/dm/role.play.list/layout";
import ManageRolePlayCriteria from "../views/w/hrpeak/dm/role.play.criteria.manage/layout";
import ManageRolePlayReaction from "../views/w/hrpeak/dm/role.play.reaction.manage/layout";

import Start from "../views/Start";

function createNode(path: any, component: any, layout: any) {
  return {
    key: path,
    path: path,
    component: component,
    layout: layout,
    alert: "",
  };
}
const routeTree = [
  createNode("/gdpr/data.anonymization.policy", DataAnonymizationPolicy, BusinessLayout),
  createNode("/gdpr/data.anonymization.requests", DataAnonymizationRequests, BusinessLayout),
  createNode("/gdpr/data.retention.policy", DataRetentionPolicy, BusinessLayout),
  createNode("/gdpr/data.retention.report", DataRetentionReport, BusinessLayout),
  createNode("/gdpr/data.transfer.policy", DataTransferPolicy, BusinessLayout),
  createNode("/gdpr/data.transfer.report", DataTransferReport, BusinessLayout),
  createNode("/gdpr/terms.of.use", TermsOfUse, BusinessLayout),
  createNode("/gdpr/privacy.policy", PrivacyPolicy, BusinessLayout),
  createNode("/w/hrpeak/dm/case.study.list", ListCaseStudy, BusinessLayout),
  createNode("/w/hrpeak/dm/case.study.manage", ManageCaseStudy, BusinessLayout),
  createNode("/w/hrpeak/dm/case.study.criteria.list", ListCaseStudyCriteria, BusinessLayout),
  createNode("/w/hrpeak/dm/case.study.criteria.manage", ManageCaseStudyCriteria, BusinessLayout),
  createNode("/w/hrpeak/dm/role.play.manage", ManageRolePlay, BusinessLayout),
  createNode("/w/hrpeak/dm/role.play.list", ListRolePlay, BusinessLayout),
  createNode("/w/hrpeak/dm/role.play.criteria.manage", ManageRolePlayCriteria, BusinessLayout),
  createNode("/w/hrpeak/dm/role.play.reaction.manage", ManageRolePlayReaction, BusinessLayout),
  createNode("/start", Start, EmptyLayout),
];
const routePathsConfig = [...routeTree];

export default routePathsConfig;