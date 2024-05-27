module.exports = (sequelize, DataTypes) =>{
    const user = sequelize.define("users",
       {
        userid : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
         }, 
        //  username: {
        //     type: DataTypes.STRING,
        //     allowNull : false,
        //     unique: true
        //  },
         name : DataTypes.STRING,
         
         passwordhash: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         // mobile : DataTypes.INTEGER,
         email: {
            type: DataTypes.STRING,
            defaultValue: "abc@gmail.com"
         },
     
       },

       {
        tableName: "users",
        timestamps: false
       }
       )
       return user;
}