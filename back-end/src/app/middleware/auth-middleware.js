import mongoose from "mongoose";

class AuthMiddleware {
  // Handles Disconect: Blocks all endpoints if the DB is down
  static restrictEndpointWithoutDB(req, res, next) {
    if (mongoose.connection.readyState === 0) {  // 0 means disconnected
      return res.status(500).json({ error: 'Lost Connection with MongoDB, please try again later' });
    }
    next();
  }
}

export default AuthMiddleware;