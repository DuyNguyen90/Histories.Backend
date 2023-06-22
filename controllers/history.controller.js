const History = require("../models/history.model")

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can't be empty"
        })
    }

    const {
        date,
        currency,
        pl,
        position,
        pnlLink,
        frequency,
        comments
    } = req.body;

    const analyzeImageURL = req.protocol + '://' + req.get('host') + '/uploads/' + req.files['analyzeImage'][0].filename;
    const resultImageURL = req.protocol + '://' + req.get('host') + '/uploads/' + req.files['resultImage'][0].filename;
    const history = new History({
        date: date,
        currency: currency,
        pl: pl,
        position: position,
        pnlLink: pnlLink,
        frequency: frequency,
        analyzeImageURL: analyzeImageURL,
        resultImageURL: resultImageURL,
        comments: comments
    });

    History.create(history, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message
            });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.get = (req, res) => {
    History.findById(req.param.id, (error, history) => {
        if (error) {
            res.status(400).send(error);
        } else res.status.send(history);
    });
}

exports.updating = (req, res) => {
    const { id } = req.params;
    const {
        date,
        currency,
        pl,
        position,
        pnlLink,
        frequency,
        comments
    } = req.body;
    console.log(req.body);
    const analyzeImage = req.files['analyzeImage'][0].filename;
    const resultImage = req.files['resultImage'][0].filename;
    History.update({ id,
                     date,
                    currency,
                    pl,
                    position,
                    pnlLink,
                    frequency,
                    analyzeImage,
                    resultImage,
                    comments
                    }, 
                    (error, updatedHistory) => 
    {
        if (error) {
            res.status(404).send(error);
        } else res.status(200).send(updatedHistory);
    });
}

exports.delete = (req, res) => {
    const historyId = req.body.historyId;
    History.delete(historyId)
    res.status(200)
}

exports.getAll = (req, res) => {
    History.getAll((error, data) => {
        res.status(200).send(data);
    });
};