using Kardelen.WCF.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ServiceModel.Channels;

namespace Kardelen.UI.Core
{
    internal class ChannelConfiguration : IChannelConfiguration
    {
        private readonly HttpRequest Request;

        public ChannelConfiguration(HttpRequest request)
        {
            this.Request = request;
        }

        public AddressHeader[] AddressHeaders
        {
            get
            {
                var headers = new List<AddressHeader>
                {
                    AddressHeader.CreateAddressHeader("IpAddress", String.Empty, HttpContext.GetIPAddress(this.Request)),
                    AddressHeader.CreateAddressHeader("BaseUrl", String.Empty, HttpContext.GetBaseUrl(this.Request)),
                    AddressHeader.CreateAddressHeader("Language", String.Empty, (int)HttpContext.GetLanguage(this.Request)),
                    AddressHeader.CreateAddressHeader("Kurulum", String.Empty, "default")
                };

                var userName = HttpContext.GetUserName(this.Request, false);

                if (userName != null)
                {
                    headers.Add(AddressHeader.CreateAddressHeader("UserName", String.Empty, userName));
                }

                return headers.ToArray();
            }
        }

        public string EndpointBaseAddress => null;
    }
}