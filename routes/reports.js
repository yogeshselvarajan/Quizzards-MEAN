var express = require('express');
var router = express.Router();
var viewReports = require('../controllers/reports/viewReports');
var downloadReports = require('../controllers/reports/downloadReports');


router.get('/viewReport', viewReports.viewAllReport);
router.get('/viewReport/student', viewReports.viewAllReportStudent);
router.get('/viewReport/:id', viewReports.viewReportByIdSummary);
router.get('/viewReport/:id/players', viewReports.viewReportByIdPlayers);
router.get('/viewReport/:id/player', viewReports.viewReportById);
router.get('/downloadReport/:id/excel', downloadReports.genExcelReportByChallengeId);


module.exports = router
