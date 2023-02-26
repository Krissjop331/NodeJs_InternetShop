module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
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
        },
        name: {
            type: DataTypes.STRING,
        },
        destination: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB('long')
        }
    });

    Image.hasMany(Product, {
         onDelete: "cascade",
         foreignKey: "imageId"
    });
    Product.belongsTo(Image);

    return Image, Product;
}