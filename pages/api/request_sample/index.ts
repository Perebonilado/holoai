import type { NextApiRequest, NextApiResponse } from 'next'
import { getData } from '../../../apis/data';
import { alterData } from '../../../utils';

const Data = async (req: NextApiRequest, res: NextApiResponse) => {
 
    const result:any = await getData(['', {paginationNumber: 5}])
    if(result?.ok)res.status(200).json({
        data: alterData(result?.data?.results),
        error: null
    })
    if(!result?.ok)res.status(200).json({
        data: null,
        error: result?.originalError.name
    })

}

export default Data
