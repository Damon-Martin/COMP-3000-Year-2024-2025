import mongoose from "mongoose";

const AuthURI = String(process.env.REACT_APP_AUTH_SERVER_URI);

class AuthMiddleware {

    // Handles Disconect: Blocks all endpoints if the DB is down
    static restrictEndpointWithoutDB(req, res, next) {
        if (mongoose.connection.readyState === 0) {  // 0 means disconnected
        return res.status(500).json({ error: 'Lost Connection with MongoDB, please try again later' });
        }
        next();
    }

    static async checkIfAdmin(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: "Missing JWT from client for this endpoint"
            });
        }

        let token = req.headers.authorization;
        if (token.startsWith("Bearer ")) {
            token = token.replace("Bearer ", ""); // Remove 'Bearer ' prefix
        }

        try {
            const response = await fetch(`${AuthURI}/v1/validateJWT`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "token": token })
            });

            if (!response.ok) {
                return res.status(response.status).json({
                    error: "Failed to authenticate with Auth Server",
                    status: response.status,
                    message: await response.error
                });
            }

            const data = await response.json();

            // Assuming Auth Server returns { admin: true/false }
            if (data.admin == false) {
                return res.status(403).json({
                    error: "Unauthorized: You are not an admin. You don't have the right to this endpoint."
                });
            }
            else {
                next();
            }
        } 
        catch (e) {
            return res.status(500).json({
                error: "Failed to check JWT with Auth Server",
                exactError: e.message,
                uri: `${AuthURI}/v1/validateJWT`,
                token: token
            });
        }
    }
}

export default AuthMiddleware;