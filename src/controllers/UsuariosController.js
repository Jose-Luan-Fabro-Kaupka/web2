const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');


module.exports = passport => {
    //config passport
    function findUser(username) {
        return users.find(user => username === username);
    }
    function findUserById(id) {
        return users.find(user => user._id === id);
    }


    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, null);
        }
    });

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        },
        (username, password, done) => {
            try {
                const user = findUser(username);
                if (!user) {
                    return done(null, false, { message: 'Usuário não encontrado' });
                }

                bcrypt.compare(password, user.password, (err, isValid) => {
                    if (err) {
                        return done(err);
                    }
                    if (!isValid) {
                        return done(null, false, { message: 'Senha incorreta' });
                    }
                    return done(null, user);
                });
            } catch (err) {
                console.log(err);
                return done(err);
            }
        }));

}