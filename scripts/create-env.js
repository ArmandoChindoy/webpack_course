const fs = require('fs');
fs.writeFileSync('./.env',
`API=${process.env.API}\n
ENV=${process.env.ENV}\n
PORT=${process.env.PORT}`);
