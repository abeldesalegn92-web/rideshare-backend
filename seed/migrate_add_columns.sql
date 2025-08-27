-- Passengers: add email and emergencyContacts if missing
ALTER TABLE `passengers` ADD COLUMN IF NOT EXISTS `email` VARCHAR(255) NULL UNIQUE;
ALTER TABLE `passengers` ADD COLUMN IF NOT EXISTS `emergency_contacts` TEXT NULL;

-- Drivers: add new document and compliance fields if missing
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `email` VARCHAR(255) NULL UNIQUE;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `driving_license_file` VARCHAR(255) NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `document` VARCHAR(255) NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `national_id_file` VARCHAR(255) NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `vehicle_registration_file` VARCHAR(255) NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `insurance_file` VARCHAR(255) NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `insurance_expiry` DATETIME NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `emergency_contacts` TEXT NULL;
ALTER TABLE `drivers` ADD COLUMN IF NOT EXISTS `document_status` VARCHAR(50) NULL;


