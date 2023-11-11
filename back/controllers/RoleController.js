const Role = require('../models/Role');

exports.getAllRoles = async (req, res) => {

    try {
        const allRoles = await Role.find();
        res.status(200).json({
            message: "All roles fetched successfully",
            allRoles
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

exports.addRole = async (req, res) => {
    try {
        const { name } = req.body;
        const newRole = new Role({
            name
        });
        const newRoleData = await newRole.save();
        res.status(200).json({
            message: "New role added successfully",
            newRoleData
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

exports.updateRole = async (req, res) => {

    try {
        const roleId = req.params.id;
        const { name } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(roleId, {name});
        res.status(200).json({
            message: "Role updated successfully",
            updatedRole
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }

}

exports.deleteRole = async (req, res) => {

    try {
        const roleId = req.params.id;
        const deletedRole = await Role.findByIdAndDelete(roleId);
        res.status(200).json({
            message: "Role deleted successfully",
            deletedRole
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });      
    }

}