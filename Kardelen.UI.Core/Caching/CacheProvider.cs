namespace Kardelen.UI.Core.Caching
{
    public class CacheProvider
    {
        public static ICacheProvider Cache
        {
            get
            {
                return new DummyCacheProvider();
            }
        }
    }
}