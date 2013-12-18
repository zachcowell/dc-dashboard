var Nationals = require('../models/nationals.js');

exports.list = function(req, res) {
	Nationals.find({ name_lower: req.params.name.toLowerCase() }, function (err, data) {
	  if (err) return handleError(err);
	  res.send(data);
	})
}