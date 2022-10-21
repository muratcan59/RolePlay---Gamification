using Kardelen.Business.Core.DTO;
using Kardelen.Business.Core.Yetkilendirme.DTO;
using Kardelen.Core;
using Kardelen.Core.ExceptionHandling;
using Kardelen.UI.Core.Caching;
using Kardelen.WCF.Contracts;
using Kardelen.WCF.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.Globalization;
using System.ServiceModel;

namespace Kardelen.UI.Core
{
    public static class CurrentContext
    {
        public static Profile GetProfile(HttpRequest request)
        {
            var userName = HttpContext.GetUserName(request, true);

            if (userName == null)
            {
                return CurrentContext.ProfilDefault;
            }

            try
            {
                var baseUrl = HttpContext.GetBaseUrl(request);
                var cacheKey = CurrentContext.GetProfileCacheKey(baseUrl, userName);
                var item = default(DTO_KULLANICI_PROFIL);

                try
                {
                    item = CacheProvider.Cache.Get<DTO_KULLANICI_PROFIL>(cacheKey);
                }
                catch (Exception ex)
                {
                    Logger.LogException(ex);
                }

                if (item == null || !item.VALID)
                {
                    item = ApiController.InvokeService<IYetkilendirmeService, DTO_KULLANICI_PROFIL>(request, c => c.KullaniciProfilAl());

                    try
                    {
                        CacheProvider.Cache.Set(cacheKey, item);
                    }
                    catch (Exception ex)
                    {
                        Logger.LogException(ex);
                    }
                }

                return new Profile
                {
                    UserId = item.NUMARA,
                    NameSurname = item.AD_SOYAD,
                    CandidateId = item.CV_ID.ToNullable(),
                    EmployerId = item.ISVEREN_ID.ToNullable(),
                    CompanyId = item.KURUM_ID,
                    CompanyName = item.KURUM?.AD,
                    CompanyApps = item.KURUM?.UYGULAMALAR,
                    Language = item.DIL,
                    Photo = item.FOTO,
                    Permissions = item.YETKILER.ToArray(c => c.Key),
                    MultiRole = item.ROL_DIGER,
                    RoleName = item.ROL_AD,
                    RoleCode = item.ROL_KOD,
                    RoleId = item.ROL_ID,
                    HomePage = item.ANA_SAYFA,
                    Culture = CultureInfo.CurrentCulture,
                    UserNameLowered = userName
                };
            }
            catch (FaultException<ServiceFault> ex)
            {
                if (ex.Detail.Error == HataNo.DatabaseAccess)
                {
                    return CurrentContext.ProfilDefault;
                }

                throw;
            }
            // WCF is not running state
            catch (EndpointNotFoundException)
            {
                return CurrentContext.ProfilDefault;
            }
            catch (ProtocolException)
            {
                return CurrentContext.ProfilDefault;
            }
            catch (Exception ex) when (ex.InnerException is EndpointNotFoundException)
            {
                return CurrentContext.ProfilDefault;
            }
        }

        private static string GetProfileCacheKey(string baseUrl, string userName)
        {
            return "user_" + baseUrl + "_" + Cipher.Hash(userName) + "_" + CurrentContext.CACHE_SALT;
        }

        private static Profile ProfilDefault
        {
            get
            {
                return new Profile { };
            }
        }

        public static Site GetSite(HttpRequest request)
        {
            var baseUrl = HttpContext.GetBaseUrl(request);

            if (baseUrl == null)
            {
                return new Site();
            }

            var item = default(DTO_SITE);
            var cacheKey = CurrentContext.GetSiteCacheKey(baseUrl);

            try
            {
                try
                {
                    item = CacheProvider.Cache.Get<DTO_SITE>(cacheKey);
                }
                catch (Exception ex)
                {
                    Logger.LogException(ex);
                }

                if (item == null)
                {
                    item = ApiController.InvokeService<IYetkilendirmeService, DTO_SITE>(request, c => c.SiteAl());

                    try
                    {
                        CacheProvider.Cache.Set(cacheKey, item);
                    }
                    catch (Exception ex)
                    {
                        Logger.LogException(ex);
                    }
                }
            }
            // WCF is not running state
            catch (EndpointNotFoundException)
            {
            }
            catch (Exception ex) when (ex.InnerException is EndpointNotFoundException)
            {
            }

            if (item == null)
            {
                return new Site();
            }

            item = new DTO_SITE(item, HttpContext.GetLanguage(request));

            return new Site
            {
                Id = item.NUMARA,
                Name = item.AD,
                Logo = item.LOGO ? (item.LOGO_ANAHTAR ?? item.NUMARA.Zip()) : null,
                Theme = item.TEMA,
                Language = item.DIL,
                Code = item.KOD == "w/default" ? null : item.KOD_KISA,
                Apps = item.UYGULAMALAR,
                IsCompany = item.KURUMSAL
                // TODO: GOOGLE_ANALYTICS
            };
        }

        private static string GetSiteCacheKey(string baseUrl)
        {
            return "site_" + baseUrl + "_" + CurrentContext.CACHE_SALT;
        }

        internal static int CACHE_SALT = 0;
    }
}