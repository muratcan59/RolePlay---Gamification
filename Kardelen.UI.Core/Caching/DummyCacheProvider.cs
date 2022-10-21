using System;

namespace Kardelen.UI.Core.Caching
{
    public class DummyCacheProvider : ICacheProvider
    {
        public string Get(string key)
        {
            return null;
        }

        public T Get<T>(string key) where T : new()
        {
            return default(T);
        }

        public void Remove(string key)
        {
        }

        public void Set<T>(string key, T value) where T : new()
        {
        }

        public void Set<T>(string key, T value, TimeSpan? duration) where T : new()
        {
        }

        public void Set(string key, string value)
        {
        }

        public void Set(string key, string value, TimeSpan? duration)
        {
        }
    }
}