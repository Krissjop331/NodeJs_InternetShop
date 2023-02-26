module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("role", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            // defaultValue: "USER",
            unique: true
        }
    })

    return Role;
}