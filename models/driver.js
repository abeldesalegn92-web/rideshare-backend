module.exports = (sequelize, DataTypes) => {
const Driver = sequelize.define('Driver', {
id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
name: { type: DataTypes.STRING, allowNull: false },
phone: { type: DataTypes.STRING, allowNull: false, unique: true },
password: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: true, unique: true },
wallet: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
rating: { type: DataTypes.FLOAT, defaultValue: 5.0 },
ratingCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
drivingLicenseFile: { type: DataTypes.STRING },
document: { type: DataTypes.STRING },
nationalIdFile: { type: DataTypes.STRING },
vehicleRegistrationFile: { type: DataTypes.STRING },
insuranceFile: { type: DataTypes.STRING },
carPlate: { type: DataTypes.STRING },
carModel: { type: DataTypes.STRING },
carColor: { type: DataTypes.STRING },
availability: { type: DataTypes.BOOLEAN, defaultValue: false },
bankAccountNo: { type: DataTypes.STRING },
status: { type: DataTypes.ENUM('pending','approved','rejected','suspended'), allowNull: false, defaultValue: 'pending' },
carServiceDate: { type: DataTypes.DATE, allowNull: true },
bolloRenewalDate: { type: DataTypes.DATE, allowNull: true },
insuranceExpiry: { type: DataTypes.DATE, allowNull: true },
emergencyContacts: { type: DataTypes.TEXT, allowNull: true },
}, { tableName: 'drivers', underscored: true, defaultScope: { attributes: { exclude: ['password'] } } });
return Driver;
};
