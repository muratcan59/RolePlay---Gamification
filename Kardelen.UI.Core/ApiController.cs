using Kardelen.C.Core.EMPATIK;
using Kardelen.Core;
using Kardelen.WCF.Contracts;
using Kardelen.WCF.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Kardelen.UI.Core
{
    abstract public class ApiController : ControllerBase
    {
        private Profile _user;
        private Site _site;
        private Language? _language;

        protected Profile CurrentUser
        {
            get
            {
                if (this._user == null)
                {
                    this._user = CurrentContext.GetProfile(this.Request);
                }

                return this._user;
            }
        }

        protected Site CurrentSite
        {
            get
            {
                if (this._site == null)
                {
                    this._site = CurrentContext.GetSite(this.Request);
                }

                return this._site;
            }
        }

        protected Guid SiteId
        {
            get
            {
                return this.CurrentSite.Id;
            }
        }

        protected Language Language
        {
            get
            {
                if (this._language == null)
                {
                    this._language = this.CurrentUser.Language ?? this.CurrentSite.Language ?? Language.English;
                }

                return this._language.Value;
            }
        }

        protected ISSPService SSPService
        {
            get
            {
                return ApiController.CreateChannel<ISSPService>(this.Request);
            }
        }

        protected ISinavService SinavService
        {
            get
            {
                return ApiController.CreateChannel<ISinavService>(this.Request);
            }
        }

        protected IMulakatService MulakatService
        {
            get
            {
                return ApiController.CreateChannel<IMulakatService>(this.Request);
            }
        }

        protected IRandevuService RandevuService
        {
            get
            {
                return ApiController.CreateChannel<IRandevuService>(this.Request);
            }
        }

        protected IFormService FormService
        {
            get
            {
                return ApiController.CreateChannel<IFormService>(this.Request);
            }
        }

        protected IOzgecmisService OzgecmisService
        {
            get
            {
                return ApiController.CreateChannel<IOzgecmisService>(this.Request);
            }
        }

        protected IUyelikService UyelikService
        {
            get
            {
                return ApiController.CreateChannel<IUyelikService>(this.Request);
            }
        }

        protected ILinkService LinkService
        {
            get
            {
                return ApiController.CreateChannel<ILinkService>(this.Request);
            }
        }

        protected IDosyaService DosyaService
        {
            get
            {
                return ApiController.CreateChannel<IDosyaService>(this.Request);
            }
        }

        protected IFactoryService FactoryService
        {
            get
            {
                return ApiController.CreateChannel<IFactoryService>(this.Request);
            }
        }

        protected IBusinessService BusinessService
        {
            get
            {
                return ApiController.CreateChannel<IBusinessService>(this.Request);
            }
        }

        protected IYetkilendirmeService YetkilendirmeService
        {
            get
            {
                return ApiController.CreateChannel<IYetkilendirmeService>(this.Request);
            }
        }

        protected IEmpatikService EmpatikService
        {
            get
            {
                return ApiController.CreateChannel<IEmpatikService>(this.Request);
            }
        }

        private static TChannel CreateChannel<TChannel>(HttpRequest request) where TChannel : class
        {
            return ChannelFactoryManager.Create<TChannel>(new ChannelConfiguration(request));
        }

        protected internal static TResult InvokeService<TChannel, TResult>(HttpRequest request, Func<TChannel, TResult> func) where TChannel : class
        {
            return Service<TChannel>.Invoke<TResult>(func, new ChannelConfiguration(request));
        }

        protected internal static void InvokeService<TChannel>(HttpRequest request, Action<TChannel> action) where TChannel : class
        {
            Service<TChannel>.Invoke(action, new ChannelConfiguration(request));
        }

        protected IActionResult Execute(Action action, string permission)
        {
            if (!this.CurrentUser.IsValid())
            {
                return Unauthorized();
            }

            if (permission != null && !this.CurrentUser.HasPermission(permission))
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            try
            {
                action();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        protected IActionResult Execute<TValue>(Func<TValue> func, string permission)
        {
            if (!this.CurrentUser.IsValid())
            {
                return Unauthorized();
            }

            if (permission != null && !this.CurrentUser.HasPermission(permission))
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            try
            {
                return Ok((TValue)func());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}