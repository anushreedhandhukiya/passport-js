const express = require("express");
const cookie = require("cookie-parser")
const session = require("express-session")
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express()
app.use(express.json())
app.use(cookie())
app.use(session({ secret: "private-key" }))
app.use(express.urlencoded({ extended: true }))
// app.use(passport.initialize())
// app.use(passport.session())

passport.use(new GoogleStrategy({
    clientID: "273316288691-u6bir0vhnuee1p2g9ng1c5a3cie9n9us.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8090/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile',"email"] })
);

app.get('/auth/google/callback',
    passport.authenticate('google'),
    function (req, res) {
        res.send("sucessfully");
    });

passport.serializeUser((user, done) => {
    return done(null, user)
})

passport.deserializeUser((user, done) => {
    return done(null, user)
})

app.listen(8090, () => {
    console.log("listing port 8090");
})