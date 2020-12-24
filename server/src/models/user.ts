import postgresClient from "postgres";
import sequelize from "sequelize";

const User = postgresClient.define('user', {
    // attributes
    userName: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    }
}, {
    // options
});



export default User