const jFile = require('jsonfile');

//const directory=__dirname  -- replaced since any update to a file restarts node with node mon 
const directory="C:/Users/moshe/Documents/Code Yaniv Arad/React/moviessubcriptionmanagement/"
const  fileMap = new Map([["PERM","Permissions.JSON"],["USER","Users.JSON"]]);




const getData =  (file) =>
{

    return new Promise((resolve, reject) =>
    {
        jFile.readFile(`${directory}/${file}`, function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {              
                resolve(data)
            }
        })
    })
}

//replaces the entire file
const writeFile =  (file,obj) =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.writeFile(`${directory}/${file}`, obj,function(err)
        {
            if(err)
            {
                reject(err)
            }
        })
        resolve("write/update successfull") 
    })
}

//not used
const appendFile = async (file,obj) =>
{
    return new Promise((resolve, reject) =>
    {
        jFile.writeFile(`${directory}/${file}`, obj,{flag:'a'},function(err)
        {
            if(err)
            {
                reject(err)
            }
        })
        resolve("append successful") 
    })
}


module.exports = {getData,writeFile,fileMap}
    