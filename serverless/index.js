const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const cors = require('cors');
const express = require('express')
const app = express();
const portExpress = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ganti dengan port Arduino kamu (lihat di bawah cara cek)
const port = new SerialPort({
  path: '/dev/ttyUSB0', // atau COM3 di Windows
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', (data) => {
    console.log(data);
});

app.get('/', (req, res) => {
    res.send('Hello root!')    
})
app.post('/', (req, res) => {
    console.log(req.body);
    try {
        if(req.body.q) {
            const body = req.body.q
            port.write(`${body}\n`);
            console.log(body);
        }        
        res.json({ 'succes' : true });
    } catch (error) {
        res.json({ 'succes' : false, message: error.message });
    }
})

app.listen(portExpress, '0.0.0.0', () => {
    console.log(`Example app listening on port ${portExpress}`)
})
