const jwt = require('jsonwebtoken');

const verifyJwtAuth = (token) => {
    return new Promise((resolve, reject) => {
        const secret = 'QWER@#$^';
        jwt.verify(token, secret, function(err, decoded) { // step -5 verifying token
            if (err) {
              reject('Verification Failed');
            } else {
                console.log(decoded.user) // bar
                if (decoded.user === 'IoneTech') {
                    console.log('Token verified succesfully');
                    resolve('Verified Successfully');
                }
            }
        });
    })
}

exports.verifyJwtAuth = verifyJwtAuth;