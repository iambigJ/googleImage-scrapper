const { DataTypes } = require('sequelize');

const Image = (sequelize) => {
    const model = sequelize.define('Image', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        imageUrl: { // Changed 'Image' to 'imageUrl' for better clarity
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        modelName: 'Image',
        tableName: 'Image',
        timestamps: true,
    });

    return model;
};

export default Image