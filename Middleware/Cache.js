const memoryCache = require('memory-cache');
const cache = new memoryCache.Cache();

const cacheMiddleware = duration => {
    return (req, res, next) => {
        const key = `__express__${req.originalUrl || req.url}`;
        const cacheContent = cache.get(key);
        
        if (cacheContent) {
            res.send(cacheContent);
            return;
        } else {
            res.sendResponse = res.send;
            res.send = body => {
                cache.put(key, body, duration*1000);
                res.sendResponse(body);
            }
            next();
        }
    }
}

module.exports = cacheMiddleware;