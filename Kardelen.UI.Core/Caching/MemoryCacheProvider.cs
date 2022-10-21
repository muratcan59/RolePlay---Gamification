using Microsoft.Extensions.Caching.Memory;
using System;

namespace Kardelen.UI.Core.Caching
{
    public class MemoryCacheProvider : ICacheProvider
    {
        public string Get(string key)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }

            if (Cache.TryGetValue(key, out object value))
            {
                return value.ToString();
            }

            return null;
        }

        public T Get<T>(string key) where T : new()
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }

            if (Cache.TryGetValue<T>(key, out T value))
            {
                return value;
            }

            return default;
        }

        public void Remove(string key)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }

            Cache.Remove(key);
        }

        public void Set<T>(string key, T value) where T : new()
        {
            this.Set(key, value, null);
        }

        public void Set<T>(string key, T value, TimeSpan? duration) where T : new()
        {
            if (value == null)
            {
                this.Remove(key);

                return;
            }

            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }

            if (duration == null)
            {
                Cache.Set(key, value);
            }
            else
            {
                Cache.Set(key, value, new MemoryCacheEntryOptions { SlidingExpiration = duration });
            }
        }

        public void Set(string key, string value)
        {
            this.Set(key, value, null);
        }

        public void Set(string key, string value, TimeSpan? duration)
        {
            if (value == null)
            {
                this.Remove(key);

                return;
            }

            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }

            if (duration == null)
            {
                Cache.Set(key, value);
            }
            else
            {
                Cache.Set(key, value, new MemoryCacheEntryOptions { SlidingExpiration = duration });
            }
        }

        private static IMemoryCache Cache
        {
            get
            {
                return new MemoryCache(new MemoryCacheOptions());
            }
        }
    }
}