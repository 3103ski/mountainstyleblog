var express = require('express');
var adminRouter = express.Router();

const cors = require('./cors');
const authenticate = require('../authenticate');
const passport = require('passport');
const Admin = require('../models/admin');

adminRouter
	.route('/')
	.get(cors.corsWithOptions, authenticate.verifyUser, function (req, res, next) {
		Admin.find()
			.then((admins) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(admins);
			})
			.catch((err) => next(err));
	})
	.delete((req, res, next) => {
		Admin.deleteMany()
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	});

adminRouter.post('/signup', cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
	Admin.register(new Admin({ username: req.body.username }), req.body.password, (err, adminUser) => {
		if (err) {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({ err: err });
		} else {
			if (req.body.firstname) {
				adminUser.firstname = req.body.firstname;
			}
			if (req.body.lastname) {
				adminUser.lastname = req.body.lastname;
			}
			adminUser.save((err) => {
				if (err) {
					res.statusCode = 500;
					res.setHeader('Content-Type', 'application/json');
					res.json({ err: err });
					return;
				}
				passport.authenticate('local')(req, res, () => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({ success: true, status: 'Registration Successful!' });
				});
			});
		}
	});
});

adminRouter.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
	const token = authenticate.getToken({ _id: req.user._id });
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

module.exports = adminRouter;
