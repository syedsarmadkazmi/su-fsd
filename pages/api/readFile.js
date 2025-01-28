import { rejects } from 'assert'
import { resolve } from 'path'

const fs = require('fs.promises');


// Regex to remove leading zeros from the string

function removeLeadingZeros(input) {
    return input.replace(/^0*(\d+)/, '$1'); 
}

export default async function handler(req, res) {

    var dataArray = []

        const result = await fs.readFile(process.cwd() + '/public/data.csv', 'utf8')

        dataArray = result.split(/\r?\n/);  //Be careful if you are in a \r\n world...

        //created at
        const sortByCreatedAtASC = [...dataArray]
        sortByCreatedAtASC.sort((a,b) => {
            const aDate = a.split(';')[0]
            const bDate = b.split(';')[0]
    
            if(aDate > bDate) {
                return 1
            }
            else {
                return -1
            }
        })

        const sortByFileNameASC = [...dataArray]
        sortByFileNameASC.sort((a,b) => {
            
            const param1 = removeLeadingZeros(a.split(';')[1])
            const param2 = removeLeadingZeros(b.split(';')[1])

            console.log('param1 ', param1, param2)

            if(param1 > param2) {
                return 1
            }
            else {
                return -1
            }
        })

        const sortByFileNameDESC = [...dataArray]
        sortByFileNameDESC.sort((a,b) => {
            const param1 = removeLeadingZeros(a.split(';')[1])
            const param2 = removeLeadingZeros(b.split(';')[1])
    
            if(param1 > param2) {
                return -1
            }
            else {
                return +1
            }
        })

    res.status(200).json({ sortByCreatedAtASC, sortByFileNameASC, sortByFileNameDESC });
}