 /**
  * 配置全局api
  */
 const site = '47.52.115.169';
 const base = `http://${site}:8080`;
//   const base = 'http://localhost:8080';
 export default {
     url: {
         book: `${base}/book`,
         booklist: `${base}/booklist`,
         bookitem:`${base}/book`,
         chapterlist:`${base}/chapter`
     }

 }