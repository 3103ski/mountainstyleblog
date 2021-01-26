const express = require('express');
const Blog = require('../models/blog');
const auth = require('../authenticate');
const cors = require('./cors');

const blogsRouter = express.Router();

blogsRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
		Blog.find()
			.then((allBlogs) => {
				res.statusCode = 200;
				res.setHeader('Content-Header', 'application/json');
				res.json(allBlogs);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		Blog.create(req.body)
			.then((newBlog) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(newBlog);
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		Blog.deleteMany()
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, auth.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end('Method not supported at this endpoint');
	});

blogsRouter
	.route('/:blogID')
	.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
	.get(cors.cors, (req, res, next) => {
		Blog.findById(req.params.blogID)
			.then((blog) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(blog);
			})
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		Blog.findByIdAndUpdate(req.params.blogID, { $set: req.body }, { new: true })
			.then((updatedBlog) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(updatedBlog);
			})
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, auth.verifyUser, (req, res, next) => {
		Blog.findByIdAndDelete(req.params.blogID)
			.then((response) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(response);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, auth.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end('Method not supported at this endpoint');
	});

module.exports = blogsRouter;
