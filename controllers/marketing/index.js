const pgp = require('pg-promise')({ promiseLib: Promise });
const config = require('../../config').DB;
const db = pgp(config);

function updateMarketing(req, res, next) {
  const custId = req.body.id;
  const sms = req.body.sms;
  const email = req.body.email;
  const telephone = req.body.telephone;
  const post = req.body.post;
  const checkNum = Number(custId);
  if (isNaN(checkNum)) {
    return res.status(400).json({ 'message': 'Please ensure a valid ID number is used' });
  } else {
    return db.many('UPDATE customer_info SET sms = $1, email = $2, telephone  = $3, post = $4 WHERE customer_id = $5 RETURNING *;', [sms, email, telephone, post, custId])
      .then(info => {
        res.status(200)
          .send({ info });
      })
      .catch(err => next(err));
  }


}

module.exports = updateMarketing;