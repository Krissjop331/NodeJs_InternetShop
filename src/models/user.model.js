module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            require: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            require: true
        }
    });

    const Image = sequelize.define("image", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: " "
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: " "
        },
        destination: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB('long'),
            defaultValue:null
        }
    });

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
    
    Role.hasMany(User, { onDelete: "cascade", foreignKey: "roleId" });
    Image.hasMany(User, {
        onDelete: "cascade",
        foreignKey: "imageId"
   });
   User.belongsTo(Image);
   User.belongsTo(Role);

    return User;
}