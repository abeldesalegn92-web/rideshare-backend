﻿const { models } = require('../models');

module.exports = {
async create(req, res) {
try {
const role = await models.Role.create({ name: req.body.name });
if (Array.isArray(req.body.permissionIds)) {
const perms = await models.Permission.findAll({ where: { id: req.body.permissionIds } });
await role.setPermissions(perms);
}
return res.status(201).json(await models.Role.findByPk(role.id, { include: ['permissions'] }));
} catch (e) { return res.status(500).json({ message: e.message }); }
},
async list(req, res) { try { const rows = await models.Role.findAll({ include: ['permissions'] }); return res.json(rows); } catch (e) { return res.status(500).json({ message: e.message }); } },
async get(req, res) { try { const row = await models.Role.findByPk(req.params.id, { include: ['permissions'] }); if (!row) return res.status(404).json({ message: 'Not found' }); return res.json(row); } catch (e) { return res.status(500).json({ message: e.message }); } },
async update(req, res) {
try {
const [count] = await models.Role.update({ name: req.body.name }, { where: { id: req.params.id } });
if (!count) return res.status(404).json({ message: 'Not found' });
const role = await models.Role.findByPk(req.params.id);
if (Array.isArray(req.body.permissionIds)) {
const perms = await models.Permission.findAll({ where: { id: req.body.permissionIds } });
await role.setPermissions(perms);
}
return res.json(await models.Role.findByPk(req.params.id, { include: ['permissions'] }));
} catch (e) { return res.status(500).json({ message: e.message }); }
},
async remove(req, res) { try { const count = await models.Role.destroy({ where: { id: req.params.id } }); if (!count) return res.status(404).json({ message: 'Not found' }); return res.status(204).send(); } catch (e) { return res.status(500).json({ message: e.message }); } },
};
