module.exports = (req, res, next) => { //next is the next function we call after this middleware has run its course
    if (req.user.credits < 1) { //If you have less than one credit
        return res.status(403).send({ error : 'Not enough credits!'});
    }

    next();
};