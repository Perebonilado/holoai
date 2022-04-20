import type { NextApiRequest, NextApiResponse } from 'next'
// import { json } from 'stream/consumers';
// var fs = require('fs');


const Data = async (req: NextApiRequest, res: NextApiResponse) => {
 
    if(req.method === 'POST') {
        console.log(req.body)
    }

}

export default Data
