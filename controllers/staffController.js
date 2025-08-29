const { models } = require('../models');
const { hashPassword } = require('../utils/password');

exports.create = async (req, res) => {
try {
const { roleId, department, status, ...data } = req.body;
if (data.password) data.password = await hashPassword(data.password);
data.department = department ?? data.department;
if (typeof status !== 'undefined') data.status = !!status;
const staff = await models.Staff.create(data);
if (roleId) {
  const role = await models.Role.findByPk(roleId);
  if (role) await staff.setRoles([role]);
}
const created = await models.Staff.findByPk(staff.id, { include: ['roles'] });
return res.status(201).json(created);
} catch (e) { return res.status(500).json({ message: e.message }); }
};
exports.list = async (req, res) => { try { const rows = await models.Staff.findAll({ include: ['roles'] }); return res.json(rows); } catch (e) { return res.status(500).json({ message: e.message }); } };
exports.get = async (req, res) => { try { const row = await models.Staff.findByPk(req.params.id, { include: ['roles'] }); if (!row) return res.status(404).json({ message: 'Not found' }); return res.json(row); } catch (e) { return res.status(500).json({ message: e.message }); } };
exports.update = async (req, res) => {
try {
const { roleId, ...data } = req.body;
if (data.password) data.password = await hashPassword(data.password);
const [count] = await models.Staff.update(data, { where: { id: req.params.id } });
if (!count) return res.status(404).json({ message: 'Not found' });
const staff = await models.Staff.findByPk(req.params.id);
if (roleId) {
  const role = await models.Role.findByPk(roleId);
  if (role) await staff.setRoles([role]);
}
const updated = await models.Staff.findByPk(req.params.id, { include: ['roles'] });
return res.json(updated);
} catch (e) { return res.status(500).json({ message: e.message }); }
};
exports.remove = async (req, res) => { try { const count = await models.Staff.destroy({ where: { id: req.params.id } }); if (!count) return res.status(404).json({ message: 'Not found' }); return res.status(204).send(); } catch (e) { return res.status(500).json({ message: e.message }); } };

exports.toggleStatus = async (req, res) => {
try {
const staff = await models.Staff.findByPk(req.params.id);
if (!staff) return res.status(404).json({ message: 'Not found' });
staff.status = !staff.status;
await staff.save();
return res.json({ id: staff.id, status: staff.status });
} catch (e) { return res.status(500).json({ message: e.message }); }
};
