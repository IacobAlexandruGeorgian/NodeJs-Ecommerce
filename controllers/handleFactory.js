const catchAsync = require("../utils/catchAsync");
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model => catchAsync(async (res, req, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    next(new AppError('No document found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateOne = Model => catchAsync(async (req, res) => {

  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    next(new AppError('No document found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: newdoc
    }
  });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {

  const doc = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getOne = (Model, popOtions) => catchAsync(async (req, res) => {

  let query = Model.findById(req.params.id);
  if (popOtions) query = query.populate(popOtions);
  const doc = await query;

  if (!doc) {
    next(new AppError('No document found with that ID', 404))
  }

  req.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.getAll = Model => catchAsync(async (req, res) => {

  let filter = {};
  if (req.params.tourId) filter = {tour: req.params.tourId};
 
  const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();

  const doc = await features.query;

  req.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc
    }
  });

});