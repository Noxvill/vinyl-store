const loggerManager = (req, res, next) => {
    const startTime = Date.now();
  
    res.on("finish", () => {
      const duration = Date.now() - startTime;
      const logEntry = `${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duration}ms\n`;
      
      console.log(`${logEntry}\n`);
      console.table(req.query);
      console.table(req.params);
    });
  
    next();
  };
  
  module.exports = loggerManager;
  