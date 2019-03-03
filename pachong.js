const cheerio = require('cheerio')
const superagent = require('superagent')
const fs = require('fs')

let next_url='https://www.zhipin.com/c101010100-p100901/?ka=sel-scale-0',job_array=[],lastpage=false
function getjoblist(){
    superagent.get(next_url).end((err,pres)=>{
        var $ = cheerio.load(pres.text);
        console.log(`正在爬取第${$('.page a.cur').text()}页`)
        if(!$('.next').hasClass('disabled')||!lastpage){
            if($('.next').hasClass('disabled')){
                lastpage=true
            }
            next_url = `https://www.zhipin.com${$('.next').attr('href')}&ka=page-next`
            let zc_array = [].slice.apply($('.job-list ul li'))
            zc_array.map(item=>{
                let name = $(item).find('.company-text .name a').text()
                let link = `https://www.zhipin.com${$(item).find('.info-primary .name a').attr('href')}`
                job_array.push({
                    name:name,
                    link:link
                })
            })
            console.log(`第${$('.page a.cur').text()}页爬取完毕`)
            let num = 500+Math.floor((Math.random())*500)
            if(!$('.next').hasClass('disabled')){
                setTimeout(()=>{
                    arguments.callee()
                },num)
            }else{
                console.log(`所有数据爬取完毕,共爬取职位信息${job_array.length}个`)
                outfile(job_array)
            }
        }
    })
}
function outfile(data){
    fs.writeFile('./data.json', JSON.stringify(data, null, 4), (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved suc! ");
        }
    });
}
getjoblist()
