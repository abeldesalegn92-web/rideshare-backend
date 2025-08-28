const { models } = require('../models');
const { hashPassword } = require('../utils/password');

exports.create = async (req, res) => {
try {
const data = req.body;
if (data.password) data.password = await hashPassword(data.password);
const row = await models.Passenger.create(data);
return res.status(201).json(row);
} catch (e) { return res.status(500).json({ message: e.message }); }
};
exports.list = async (req, res) => { try { const rows = await models.Passenger.findAll({ include: ['roles'] }); return res.json(rows); } catch (e) { return res.status(500).json({ message: e.message }); } };
exports.get = async (req, res) => { try { const row = await models.Passenger.findByPk(req.params.id, { include: ['roles'] }); if (!row) return res.status(404).json({ message: 'Not found' }); return res.json(row); } catch (e) { return res.status(500).json({ message: e.message }); } };
exports.update = async (req, res) => {
try {
const data = req.body;
if (data.password) data.password = await hashPassword(data.password);
// allow updating emergencyContacts and email through regular update
const [count] = await models.Passenger.update(data, { where: { id: req.params.id } });
if (!count) return res.status(404).json({ message: 'Not found' });
const updated = await models.Passenger.findByPk(req.params.id);
return res.json(updated);
} catch (e) { return res.status(500).json({ message: e.message }); }
};
exports.remove = async (req, res) => { try { const count = await models.Passenger.destroy({ where: { id: req.params.id } }); if (!count) return res.status(404).json({ message: 'Not found' }); return res.status(204).send(); } catch (e) { return res.status(500).json({ message: e.message }); } };

// Passenger self-control methods
exports.getMyProfile = async (req, res) => {
try {
if (req.user.type !== 'passenger') return res.status(403).json({ message: 'Only passengers can access this endpoint' });
const passenger = await models.Passenger.findByPk(req.user.id, { include: ['roles'] });
if (!passenger) return res.status(404).json({ message: 'Passenger not found' });
return res.json(passenger);
} catch (e) { return res.status(500).json({ message: e.message }); }
};

exports.updateMyProfile = async (req, res) => {
try {
if (req.user.type !== 'passenger') return res.status(403).json({ message: 'Only passengers can access this endpoint' });
const data = req.body;
if (data.password) data.password = await hashPassword(data.password);
const [count] = await models.Passenger.update(data, { where: { id: req.user.id } });
if (!count) return res.status(404).json({ message: 'Passenger not found' });
const updated = await models.Passenger.findByPk(req.user.id);
return res.json(updated);
} catch (e) { return res.status(500).json({ message: e.message }); }
};

exports.deleteMyAccount = async (req, res) => {
try {
if (req.user.type !== 'passenger') return res.status(403).json({ message: 'Only passengers can delete their account' });
const count = await models.Passenger.destroy({ where: { id: req.user.id } });
if (!count) return res.status(404).json({ message: 'Passenger not found' });
return res.status(204).send();
} catch (e) { return res.status(500).json({ message: e.message }); }
};

// Passengers rate drivers
exports.rateDriver = async (req, res) => {
try {
if (req.user.type !== 'passenger') return res.status(403).json({ message: 'Only passengers can rate drivers' });
const { rating, comment } = req.body;
const driverId = req.params.driverId;

const driver = await models.Driver.findByPk(driverId);
if (!driver) return res.status(404).json({ message: 'Driver not found' });

const currentRating = driver.rating || 0;
const ratingCount = driver.ratingCount || 0;
const newRatingCount = ratingCount + 1;
const newRating = ((currentRating * ratingCount) + Number(rating)) / newRatingCount;

await models.Driver.update({ rating: newRating, ratingCount: newRatingCount }, { where: { id: driverId } });
const updatedDriver = await models.Driver.findByPk(driverId);
return res.json({ message: 'Driver rated successfully', driver: updatedDriver, rating, comment });
} catch (e) { return res.status(500).json({ message: e.message }); }
};
