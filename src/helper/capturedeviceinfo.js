
import useragent from "express-useragent";
const filterUserAgent = data => {

  // Filter string values
  const filteredData = Object.fromEntries(
    Object.entries(data)
      .filter(([key, value]) => typeof value !== 'boolean')
  );

// Get boolean properties that are true
  const trueBooleanProperties = Object.keys(data)
    .filter(key => typeof data[key] === 'boolean' && data[key]);

  return {...filteredData, ...Object.fromEntries(trueBooleanProperties.map(prop => [prop, true]))}
}

const captureDeviceInfo = async (req, res, next) => {
  try {
    const userAgent = useragent.parse(req.headers["user-agent"]);

    req.deviceInfo = filterUserAgent(userAgent)
    req.loginIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req._remoteAddress || req.ip || null;

    next();
  } catch (err) {
    next(err);
  }
};

export default captureDeviceInfo