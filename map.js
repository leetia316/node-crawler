const fs = require('fs')
const path = require('path')
const superagent = require('superagent')
const cheerio = require('cheerio')
const request = require('request')

let num = 1 , sucnum = 0 , address_array = []
function getjson_mes(){
    fs.readFile(path.join(__dirname,'data.json'),'utf-8',(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(JSON.parse(data).length)
            data = JSON.parse(data)
            async function loop(){
                for(let item of data){
                    console.log(`正在处理第${num}个职位，共${data.length}个职位`)
                    num++
                    await get_address(item)
                }
            }
            loop().then(()=>{
                console.log(address_array)
                fs.writeFile('./data.json', JSON.stringify(address_array, null, 4), (err) => {
                    if(err) {
                      console.log(err);
                    } else {
                      console.log("JSON saved suc! ");
                    }
                });
            })
        }
    })
}
function get_address(data){
    return new Promise((resolve,reject)=>{
        try{
            superagent.get(data.link).end((err,pres)=>{
                var $ = cheerio.load(pres.text)
                data.address = $('.location-address').text()
                sucnum+=1
                // console.log(data.address)
                request.get(`http://api.map.baidu.com/geocoder/v2/?address=${encodeURI(data.address)}&output=json&ak=Wdua4y6HFRCLD11uBnmCcBT5NLHdYhHv`,(err,res,body)=>{
                    if(err){
                        console.log(err)
                    }else{
                        // console.log(data)
                        body = JSON.parse(body)
                        data.lng = body.result.location.lng
                        data.lat = body.result.location.lat
                        address_array.push(data)
                        resolve('end')
                    }
                })
                
            })
        }catch(err){
            console.log(err)
            resolve('faild')
        }
    })
}
getjson_mes()