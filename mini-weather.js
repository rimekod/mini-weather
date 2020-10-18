window.onload = function(){
    var city;
    axios.get("http://api.ipify.org/").then(function(ip){
        axios.get("https://api.ipgeolocation.io/ipgeo?apiKey=9a924fb4e49340fa8e944bb17dd454bf&ip="+ip.data+"").then(function(data){
            city = data.data.city;
            axios.get("http://dataservice.accuweather.com/locations/v1/cities/search?apikey=npL7F5X3Cg1cJvT67ABK8pKoVBMpY4Pv&q="+data.data.city).then(function(key){
                axios.get("http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/"+key.data[0].Key+"?apikey=npL7F5X3Cg1cJvT67ABK8pKoVBMpY4Pv").then(function(weatherData){
                    var weather = weatherData.data[0];
                    var icon;
                    console.log(weather)
                    if(String(weather.WeatherIcon).length == 1){
                        icon = "0" + weather.WeatherIcon;
                    }else{
                        icon = weather.WeatherIcon
                    }

                    var f_degree = weather.Temperature.Value;
                    var c_degree = parseInt((parseInt(f_degree)-32)/1.8000).toFixed(0);

                    document.body.innerHTML = document.body.innerHTML + 
                    `
                    <div id="mini-weather">
                        <a id="mw-close" class="close"><img width="15px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/OOjs_UI_icon_close-ltr-destructive.svg/480px-OOjs_UI_icon_close-ltr-destructive.svg.png"></a>
                        <div class="left">
                            <img src="https://developer.accuweather.com/sites/default/files/`+icon+`-s.png">
                        </div>
                        <div class="right">
                            <span class="temp"> <span class="num">`+c_degree+`</span> °C</span>
                            <div class="location"> <div class="live"></div> <span class="loc-name">`+city+`</span></div>
                        </div>
                    </div>
                    <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                    #mini-weather {
                        font-family: Poppins;
                        position: fixed;
                        bottom: 30px;
                        left: 30px;
                        width: 180px;
                        height: 70px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 5px 10px;
                    }
                    #mini-weather .left {
                        width: 40%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }
                    #mini-weather .left img {
                        width: 100%;
                        transform: scale(1.3);
                    }
                    #mini-weather .right {
                        width: 50%;
                        height: 100%;
                        box-sizing: border-box;
                        padding: 10px 0px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    }
                    #mini-weather .right .temp {
                        display: flex;
                        align-items: flex-start;
                    }
                    #mini-weather .right .temp .num {
                        font-size: 23px;
                        font-weight: 400;
                        margin-right: 3px;
                        color: #505050;
                    }
                    #mini-weather .right .location {
                        font-size: 13px;
                        color: #aaa;
                        display: flex;
                        align-items: center;
                    }
                    #mini-weather .live {
                        width: 5px;
                        height: 5px;
                        background: green;
                        margin-right: 4px;
                        border-radius: 50%;
                    }
                    #mini-weather .loc-name {
                        width: 100px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    #mini-weather .close {
                        position: absolute;
                        top: 3px;
                        right: 5px;
                        cursor: pointer;
                    }
                    </style>
                    `;
                    document.getElementById("mw-close").addEventListener('click', function(){
                        document.getElementById("mini-weather").style.display = "none";
                    })
                })
            })
        })
    })
}
