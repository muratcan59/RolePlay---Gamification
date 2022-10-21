using Kardelen.Core;
using Kardelen.WCF.Contracts;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Concurrent;
using System.Linq;

namespace Kardelen.UI.Core
{
    public static class HttpContext
    {
        private static readonly ConcurrentDictionary<String, DateTime> TokenValidations = new ConcurrentDictionary<String, DateTime>();
        private static readonly int TokenValidationInterval = 60; // sn

        public static string GetUserName(HttpRequest request, bool validateToken)
        {
            if (request == null)
            {
                return null;
            }

            var header = request.Headers.GetValue("Authorization").FirstOrDefault();

            if (header == null)
            {
                return null;
            }

            var value = default(string);

            try
            {
                value = Cipher.Decrypt(header, "React");
            }
            catch
            {
                return null;
            }

            if (value.Length < 27)
            {
                return null;
            }

            var token = value.Substring(0, 26).ToGuid();

            if (token == null)
            {
                return null;
            }

            var userName = value.Substring(26);

            if (validateToken)
            {
                // Son kontrol üzerinden çok az bir süre geçmişse tekrar kontrol etmeyelim (Performans)
                if (HttpContext.TokenValidations.GetValue(userName) < DateTime.UtcNow.AddSeconds(-HttpContext.TokenValidationInterval))
                {
                    try
                    {
                        if (!ApiController.InvokeService<IYetkilendirmeService, Boolean>(request, c => c.KullaniciTokenDogrula(token.Value, userName, true)))
                        {
                            return null;
                        }

                        HttpContext.TokenValidations[userName] = DateTime.UtcNow;
                    }
                    catch { }
                }
            }

            return userName;
        }

        public static string GetBaseUrl(HttpRequest request)
        {
            if (request == null)
            {
                return null;
            }

            var baseUrl = request.Headers["origin"].FirstOrDefault()?.Replace("http://", "").Replace("https://", "").Replace("www.", "");

            if (baseUrl == null)
            {
                return null;
            }

            if (baseUrl == "localhost:3000")
            {
                baseUrl = "localhost:51385";
            }
            else if (baseUrl.Contains(".w"))
            {
                foreach (var server in new[] { 1, 9 })
                {
                    // Load Balancer
                    return baseUrl.Replace("." + "w" + server + ".", ".");
                }
            }

            return baseUrl;
        }

        public static string GetIPAddress(HttpRequest request)
        {
            if (request == null)
            {
                return null;
            }

            return request.HttpContext.Connection.RemoteIpAddress.ToString();
        }

        public static Language GetLanguage(HttpRequest request)
        {
            if (request == null)
            {
                return Language.English;
            }

            return request.Headers["language"].To(Language.English);
        }
    }
}