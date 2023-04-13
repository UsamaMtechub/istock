const userModel=require("../models/userModel")
const axios = require('axios');


function pushNotification(message){
const FCM_RESOURCE = 'https://fcm.googleapis.com/fcm/send';
const FCM_SERVER_KEY ="AAAA3ZQI2Qk:APA91bFv7HQuiJRWKtUWjUMJ3WucgFrDxxtOWNqWO-2xcbh5SAQfExzEZpI_EIcnIdi68lSFfQ-b0Wafmcq0z-P-PzPrzYzev48ook8G2reg5-zNzayEbzjcKD0VLwsVMF-axhP0oi14";
var userTokens=[];


userModel.find({},'fcmToken',function(err,result){
    if(result !== null || typeof result !== "undefined"){
      
      result.forEach(element => {
        userTokens.push(element.fcmToken)
      });
      
    
    var data = JSON.stringify({
        registration_ids: userTokens,
        collapse_key: 'type_a',
        notification: {
          title:"Notification received",
          body:message
        },
      });
      console.log(data)
      var config = {
        method: 'post',
        url: FCM_RESOURCE,
        headers: {
          Authorization: `key=${FCM_SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      
      axios(config)
      .then(function (response) {
        console.log(response.data)
        const d= new Date(Date.now())
        console.log("server time is " +  d.toLocaleString())
        
       
      })
      .catch(function (e) {
        console.log(
            e
        )
      });
    }
    else{
       console.log("userId or company is not defined")
    }
  
})


}

module.exports= pushNotification
