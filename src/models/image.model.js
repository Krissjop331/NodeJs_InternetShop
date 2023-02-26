module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        destination: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB("long"),
        },
    });

    return Image;
};