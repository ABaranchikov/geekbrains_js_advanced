const fs = require('fs');

const stat = {
    action: '',
    name: '',
    date: '',
}

const log = (action, product) => {
    stat.action = action;
    stat.name = product;
    stat.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    fs.appendFile('./server/db/stats.json', JSON.stringify(stat) + '\r\n', (err) => {
        if (err) throw err;
    });
}

module.exports = {
    log,
};

