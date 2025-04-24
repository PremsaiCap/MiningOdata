sap.ui.define([
    
    "sap/m/MessageBox"
], function( MessageBox) {
    "use strict";

    return ( {
       

        validateFields: function(fields) {
            let isValid = true;
            fields.forEach(field => {
                let value = field.getValue();
                if (!value) {
                    field.setValueState("Error");
                    isValid = false;
                } else {
                    field.setValueState("None");
                }
            });
            return isValid;
        },

        validatePrimaryKey: function(field) {
            let value = field.getValue();
            if (!value) {
                field.setValueState("Error");
                MessageBox.error("Location ID is required and cannot be empty.");
                return false;
            } else {
                field.setValueState("None");
                return true;
            }
        },

        isUniqueLocationId: function(locationId, existingRecords) {
            return !existingRecords.some(record => record.LocId === locationId);
        },

        validateForm: function(fields, primaryKeyField, existingRecords) {
            let isPrimaryKeyValid = this.validatePrimaryKey(primaryKeyField);
            let areFieldsValid = this.validateFields(fields);
            let isUnique = this.isUniqueLocationId(primaryKeyField.getValue(), existingRecords);

            if (!isPrimaryKeyValid || !areFieldsValid) {
                MessageBox.error("All fields must be filled out before creating a record.");
                return false;
            }

            if (!isUnique) {
                primaryKeyField.setValueState("Error");
                MessageBox.error("Location ID must be unique");
                return false;
            }

            return true;
        }
    });
});
