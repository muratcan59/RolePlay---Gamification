using System;

namespace Kardelen.UI.Core.Caching
{
    public interface ICacheProvider
    {
        string Get(string key);

        T Get<T>(string key) where T : new();

        void Remove(string key);

        void Set<T>(string key, T value) where T : new();

        void Set<T>(string key, T value, TimeSpan? duration) where T : new();

        void Set(string key, string value);

        void Set(string key, string value, TimeSpan? duration);
    }
}