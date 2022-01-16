
const connection = require('./connection');
const moment = require('moment');

const exeQuery = (query) => {
    return new Promise((resolve,reject) =>{
        connection.query(query, (error, result) => {
            if (error) return reject(error);

            console.log('result of attendance:', result);
            return resolve(result);

          })
    })
}

exports.exeQuery = exeQuery;