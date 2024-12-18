// const User = require("./user");
// module.exports = (sequelize, DataTypes) => {
//     const location = sequelize.define("locations", {
//     id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//           },
//         //   userId: {
//         //     type: DataTypes.INTEGER,
//         //     allowNull: false,
//         //   },
//         //   email: {
//         //     type: DataTypes.STRING,
//         //     defaultValue: "abc@gmail.com"
//         //  },
//           pickupAddress: {
//             type: DataTypes.STRING,
//             allowNull: false,
//           },
          
//           dropoffAddress: {
//             type: DataTypes.STRING,
//             allowNull: false,
//           },
//           distance: {
//             type: DataTypes.STRING,
//             allowNull: false,
//           },
//           duration: {
//             type: DataTypes.STRING,
//             allowNull: false,
//           },
//         }, {
//             tableName: "locations",

//           timestamps: true, // Automatically adds createdAt and updatedAt fields
//         });
    
//     return location ;
// };

// // module.exports = Location;

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    pickupAddress: {
      type: String,
      required: true,
    },
    dropoffAddress: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
