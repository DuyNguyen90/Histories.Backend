const History = function(history) {
    this.date = history.date;
    this.currency = history.currency;
    this.pl = history.pl;
    this.position = history.position;
    this.pnlLink = history.pnlLink;
    this.frequency = history.frequency;
    this.analyzeImageURL = history.analyzeImageURL;
    this.resultImageURL = history.resultImageURL;
    this.comments = history.comments;
};

var histories = [];
var idFakeGenerator = 0;

History.create = (newHistory, result) => {
    // TODO: Add database logic 
    idFakeGenerator += 1
    const storedHistory = { id: idFakeGenerator, ...newHistory }
    console.log("History successfully created!")
    histories.push(storedHistory);
    result(null, storedHistory);
};

History.findById = (id, result) => {
    // TODO: Add database logic
    const history = histories.find((history) => history.id = id);
    if (!history) {
        console.log('History not found');
        result({ message: 'Not found' }, null);
    } else {
        result(null, history);
    }
};

History.update = (props, result) => {
    const { id,
            date,
            currency,
            pl,
            position,
            pnlLink,
            frequency,
            analyzeImage,
            resultImage,
            comments
    } = props
    console.log("id =", id);
    
    const index = histories.findIndex((history) => history.id = id);
    console.log("IndexId = ", index);

    if (!index) {
        result({ message: 'Not found' }, null);
    } else {
        var history = histories[index];
        if (date) {
            history.date = date;
        }

        if (currency) {
            history.currency = currency;
        }

        if (pl) {
            history.pl = pl;
        }

        if (position) {
            history.position = position;
        }
        
        if (pnlLink) {
            history.pnlLink = pnlLink;
        }

        if (frequency) {
            history.frequency = frequency;
        }

        if (analyzeImage) {
            history.analyzeImageURL = req.protocol + '://' + req.get('host') + '/uploads/' + analyzeImage;
        }

        if (resultImage) {
            history.resultImageURL = req.protocol + '://' + req.get('host') + '/uploads/' + resultImage;
        }
        if (comments) {
            history.comments = comments;
        }
        histories[index] = history
        result(null, history);
    }
};

History.delete = (id) => {
    const newHistories = histories.filter(history => history.id != id);
    histories = newHistories
}

History.getAll = (result) => {
    // TODO: Add database logic
    // TODO: Make pagination
    result(null, histories)
};

module.exports = History