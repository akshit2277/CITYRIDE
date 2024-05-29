const User = require("./user");
module.exports = (sequelize, DataTypes) => {
    const location = sequelize.define("locations", {
    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        //   userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //   },
        //   email: {
        //     type: DataTypes.STRING,
        //     defaultValue: "abc@gmail.com"
        //  },
          pickupAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "abc@gmail.com"
          },
          
          dropoffAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "abc@gmail.com"
          },
          distance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: "abc@gmail.com"
          },
          duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: "abc@gmail.com"
          },
        }, {
            tableName: "locations",

          timestamps: true, // Automatically adds createdAt and updatedAt fields
        });
    
    return location ;
};

// module.exports = Location;