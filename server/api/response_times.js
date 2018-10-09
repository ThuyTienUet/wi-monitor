
const influx = require('./utils/influx');
const express = require('express');
const moment = require('moment-timezone');
const convertTime = require('./utils/time-convert');
let router = express.Router();

router.get('/response/all', function (req, res) { 
	let whereClause = "";
	let days = req.query.days || 1;
	whereClause += " AND time > now() - " + days + "d";
	let query = 'SELECT * FROM monitor_chat' + " WHERE 1=1 " + whereClause;
	console.log(query);
	influx.query(query).then(result => {
		convertTime(result).then(r => { 
			res.send(r);
		})
	}).catch(err => { 
		res.send(err);
	})
});

router.get('/response/socket/all', (req, res)=>{
	let whereClause = "";
	let days = req.query.days || 1;
	whereClause += " AND time > now() - " + days + "d";
	let query = 'SELECT * FROM monitor_socket_chat' + " WHERE 1=1 " + whereClause;
	influx.query(query).then(result => {
		convertTime(result).then(r => {
			res.send(r);
		})
	}).catch(err => {
		res.send(err);
	});
});

module.exports = router;