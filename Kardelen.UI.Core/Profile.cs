using Kardelen.Business.Core.Uygulama;
using Kardelen.Core;
using System;
using System.Globalization;
using System.Linq;
using System.Runtime.Serialization;

namespace Kardelen.UI.Core
{
    public class Profile
    {
        public Guid UserId { get; set; }
        public string NameSurname { get; set; }
        public Guid? CandidateId { get; set; }
        public Guid? EmployerId { get; set; }
        public Guid? CompanyId { get; set; }
        public string CompanyName { get; set; }
        public UygulamaKod[] CompanyApps { get; set; }
        public Language? Language { get; set; }
        public string Photo { get; set; }
        public string[] Permissions { get; set; }
        public bool MultiRole { get; set; }
        public string RoleName { get; set; }
        public string RoleCode { get; set; }
        public Guid? RoleId { get; set; }
        public string HomePage { get; set; }
        public CultureInfo Culture { get; set; }
        public string UserNameLowered { get; set; }

        public bool IsValid()
        {
            if (this.UserId == default)
            {
                return false;
            }

            return true;
        }

        public bool HasPermission(params string[] permissions)
        {
            if (permissions == null)
            {
                return false;
            }

            foreach (var permission in permissions)
            {
                if (this.HasPermission(permission))
                {
                    return true;
                }
            }

            return false;
        }

        public bool HasPermission(string permission)
        {
            if (permission == null || this.Permissions == null)
            {
                return false;
            }

            return this.Permissions.Contains(permission);
        }

        [IgnoreDataMember]
        public bool IsCandidate
        {
            get
            {
                return this.CandidateId.HasValue && this.CandidateId != default(Guid);
            }
        }

        [IgnoreDataMember]
        public bool IsEmployer
        {
            get
            {
                return this.EmployerId.HasValue && this.EmployerId != default(Guid) && this.CompanyId.HasValue && this.CompanyId != default(Guid) && this.CompanyName != null;
            }
        }

        public bool Active(UygulamaKod app)
        {
            return this.IsEmployer && this.CompanyApps.Contains(app);
        }
    }
}