const User = require('../../models/User');
const Quiz = require('../../models/Quiz');
const Challenge = require('../../models/Challenge');
const xlsx = require('xlsx-populate');

module.exports.genExcelReportByChallengeId = async (req, res) => {
    try {
        const challenge = await Challenge.findOne({ _id: req.params.id });
        const quiz = await Quiz.findOne({ _id: challenge.quiz_id });
        const noOfPlayers = challenge.players.length;

        // Create a new workbook and set the default sheet
        const wb = await xlsx.fromBlankAsync();
        const sheet = wb.sheet(0);

        // Rename default sheet
        sheet.name(`Challenge Scores`);

        // Add header column names
        sheet.cell("A1").value("S.No.").style({ horizontalAlignment: "center", bold: true });
        sheet.cell("B1").value("Username").style({ horizontalAlignment: "center", bold: true });
        sheet.cell("C1").value("Email").style({ horizontalAlignment: "center", bold: true });
        sheet.cell("D1").value("# Correct Qns").style({ horizontalAlignment: "center", bold: true });
        sheet.cell("E1").value("# Incorrect Qns").style({ horizontalAlignment: "center", bold: true });
        sheet.cell("F1").value("Score").style({ horizontalAlignment: "center", bold: true });

        // Set the starting row for the player stats
        const START_ROW = 2;

        // Loop through players and add data rows to player stats worksheet
        for (let i = 0; i < noOfPlayers; i++) {
            const user = await User.findOne({ _id: challenge.players[i].userId });
            sheet.cell(`A${i + START_ROW}`).value(i + 1).style({ horizontalAlignment: "center" });
            sheet.cell(`B${i + START_ROW}`).value(user.username).style({ horizontalAlignment: "center" });
            sheet.cell(`C${i + START_ROW}`).value(user.email).style({ horizontalAlignment: "left" });
            sheet.cell(`D${i + START_ROW}`).value(challenge.players[i].noOfCorrectAns).style({ horizontalAlignment: "center" });
            sheet.cell(`E${i + START_ROW}`).value(challenge.players[i].noOfWrongAns).style({ horizontalAlignment: "center" });
            sheet.cell(`F${i + START_ROW}`).value(challenge.players[i].score).style({ horizontalAlignment: "center" });
        }

        // A new header row for rank
        sheet.cell("G1").value("Rank").style({ horizontalAlignment: "center", bold: true });

        // Here the rank is calculated based on the score of the player and the number of correct answers in case of a tie in score
        // The the rank is added to the player stats worksheet, in the rank column (G)
        for (let i = 0; i < noOfPlayers; i++) {
            let rank = 1;
            for (let j = 0; j < noOfPlayers; j++) {
                if (challenge.players[i].score < challenge.players[j].score) {
                    rank++;
                } else if (challenge.players[i].score === challenge.players[j].score) {
                    if (challenge.players[i].noOfCorrectAns < challenge.players[j].noOfCorrectAns) {
                        rank++;
                    }
                }
            }
            sheet.cell(`G${i + START_ROW}`).value(rank).style({ horizontalAlignment: "center" });
        }

        // Set the column width for the player stats worksheet
        sheet.column("A").width(10);
        sheet.column("B").width(20);
        sheet.column("C").width(30);
        sheet.column("D").width(20);
        sheet.column("E").width(20);
        sheet.column("F").width(20);
        sheet.column("G").width(20);


        // I want the player stats worksheet to be the first worksheet in the workbook
        wb.moveSheet(0, 0);

        // Get the buffer of the excel file and send it to the client
        const buffer = await wb.outputAsync();
        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': `attachment; filename=${quiz.title}.xlsx`,
        });
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
