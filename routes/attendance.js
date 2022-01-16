const express = require('express');
const connection = require('../util/connection');
const router = express.Router();
const jwt = require("jsonwebtoken");
const exeQuery = require('../util/exeQuery').exeQuery;
const verifyjwt = require("../util/verifyJwtToken");
const moment = require('moment');

router.get('/attendance', async (req, res, next) => {
    const verifyResult = await verifyjwt.verifyJwtAuth(req.cookies.info.code);
    if (verifyResult === 'Verified Successfully') {
        const email = req.cookies.info.email;
        res.render('attendance', { Email: email, msg: '' })
    }

})

router.post('/attendance', async (req, res, next) => {

    try {
        const verifyResult = await verifyjwt.verifyJwtAuth(req.cookies.info.code);
        if (verifyResult === 'Verified Successfully') {
            const email = req.cookies.info.email;
            let query = `select * from attendance where email = '${email}'`;
            let result = await exeQuery(query);
            const dateTimeFormatUpdate = 'YYYY-MM-DD HH:mm:ss';
            const time = moment.utc().format(dateTimeFormatUpdate);
            const date = moment(time);
            const currentDay = date.format('D');
            //07-12-2021
            const dateFrmTable = moment(result[0].lastUpdatedTime);
            const dayFrmTable = dateFrmTable.format('D');
            //console.log(dayFrmTable);
            if (dayFrmTable < currentDay || result[0].attendanceCount === 0) {

                const attendance = (result[0].attendanceCount) + 1;
                const presentDates = JSON.parse(result[0].presentDates);
                const attendanceArray = presentDates.dates;
                attendanceArray.push(time);
                presentDates.dates = attendanceArray;
                let query = `update  attendance set attendanceCount =
                                ${attendance} , lastUpdatedTime = '${time}' ,presentDates ='${JSON.stringify(presentDates)
                    }' where email = '${email}'`;
                result = await exeQuery(query);
                console.log('attendace updated!');
                res.render('attendance', { msg: 'success' })

            } else {
                res.render('attendance', { msg: 'failure' })
            }
        }

    } catch (error) {
    console.log(error);
    res.render('school');
}
})

module.exports = router;