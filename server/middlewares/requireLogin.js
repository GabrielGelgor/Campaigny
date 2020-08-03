module.exports = (req, res, next) => { //next is the next function we call after this middleware has run its course
    if (!req.user) { //If NOBODY is logged in
        return res.status(401).send({ error : 'You must be logged in to do that.'});
    }

    next();
};