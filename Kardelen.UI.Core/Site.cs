using Kardelen.Business.Core.Uygulama;
using Kardelen.Core;
using System;
using System.Linq;

namespace Kardelen.UI.Core
{
    public class Site
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public Language? Language { get; set; }
        public byte? Theme { get; set; }
        public string Code { get; set; }
        public bool IsCompany { get; set; }
        public UygulamaKod[] Apps { get; set; } = Array.Empty<UygulamaKod>();

        public bool IsFiT()
        {
            return this.Id == Site.FIT_ID;
        }

        public bool Active(UygulamaKod app)
        {
            if (this.IsFiT())
            {
                return false;
            }

            if (this.Apps.IsEmpty())
            {
                return false;
            }

            return this.Apps.Contains(app);
        }

        public static readonly Guid FIT_ID = new Guid("6F10D28B-C353-4C3D-B8AA-5291AA58DBE7");
    }
}