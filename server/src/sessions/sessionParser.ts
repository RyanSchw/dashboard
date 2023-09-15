import session from 'express-session';

// sessionParser is shared by both the express and WebSocket server
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
});

export default sessionParser;
