// https://ncov.dxy.cn/ncovh5/view/pneumonia
// https://lab.isaaclin.cn/nCoV/zh
// https://lab.isaaclin.cn/nCoV/api/provinceName
// https://lab.isaaclin.cn/nCoV/api/overall
// https://lab.isaaclin.cn/nCoV/api/area
// https://lab.isaaclin.cn/nCoV/api/news
// https://lab.isaaclin.cn/nCoV/api/rumors

// 调用 获取概览 方法
getSummary();
// 调用 获取当前确诊 方法
getCurrentConfirmed();
// 调用 获取累计确诊 方法
getConfirmed();
// 调用 获取湖北当前确诊 方法
getHubeiCurrentConfirmed();
// 调用 获取湖北累计确诊 方法
getHubeiConfirmed();

function getSummary() {
    fetch('../overall.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById('compare_y_a').innerHTML = "较昨日<span class='color_a font_georgia'>" + myJson["results"][0]["currentConfirmedIncr"] + "</span>";
            document.getElementById('current_a').innerHTML = myJson["results"][0]["currentConfirmedCount"];
            document.getElementById('compare_y_b').innerHTML = "较昨日<span class='color_a font_georgia'>" + myJson["results"][0]["suspectedIncr"] + "</span>";
            document.getElementById('current_b').innerHTML = myJson["results"][0]["suspectedCount"];
            document.getElementById('compare_y_c').innerHTML = "较昨日<span class='color_a font_georgia'>" + myJson["results"][0]["seriousIncr"] + "</span>";
            document.getElementById('current_c').innerHTML = myJson["results"][0]["seriousCount"];
            document.getElementById('compare_y_d').innerHTML = "较昨日<span class='color_a font_georgia'>" + myJson["results"][0]["confirmedIncr"] + "</span>";
            document.getElementById('current_d').innerHTML = myJson["results"][0]["confirmedCount"];
            document.getElementById('compare_y_e').innerHTML = "较昨日<span class='color_a font_georgia'>" + myJson["results"][0]["deadIncr"] + "</span>";
            document.getElementById('current_e').innerHTML = myJson["results"][0]["deadCount"];
            document.getElementById('compare_y_f').innerHTML = "较昨日<span class='color_a font_georgia'>" + myJson["results"][0]["curedIncr"] + "</span>";
            document.getElementById('current_f').innerHTML = myJson["results"][0]["curedCount"];
            document.getElementById('updatetime').innerHTML = timeStampToDate(myJson["results"][0]["updateTime"]);
        });
}

// Unix时间戳转换成年月日
function timeStampToDate(unix_ts) {
    let unix_timestamp = unix_ts.toString().slice(0, 10);
    var temp_tm = new Date(unix_timestamp * 1000);
    var year = temp_tm.getFullYear();
    var month = ("0" + (temp_tm.getMonth() + 1)).slice(-2);
    var day = ("0" + temp_tm.getDate()).slice(-2);
    var hours = temp_tm.getHours();
    var minutes = "0" + temp_tm.getMinutes();
    var seconds = "0" + temp_tm.getSeconds();
    var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

function getCurrentConfirmed() {
    var jsonObj = [];
    fetch('../area.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            for (let i = 0; i < myJson["results"].length; i++) {
                jsonObj.push({ "name": myJson["results"][i]["provinceShortName"], "value": parseInt(myJson["results"][i]["currentConfirmedCount"]) > 0 ? myJson["results"][i]["currentConfirmedCount"] : 0 });
            }
            let dataList = jsonObj;
            let dom = document.getElementById('china_container');
            drawChinaMap(dom, dataList);
        });
}

function getConfirmed() {
    var jsonObj = [];
    fetch('../area.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            for (let i = 0; i < myJson["results"].length; i++) {
                jsonObj.push({ "name": myJson["results"][i]["provinceShortName"], "value": parseInt(myJson["results"][i]["confirmedCount"]) > 0 ? myJson["results"][i]["confirmedCount"] : 0 });
            }
            let dataList = jsonObj;
            let dom = document.getElementById('china_container1');
            drawChinaMap(dom, dataList);
        });
}

function drawChinaMap(dom, datas) {
    var myChart = echarts.init(dom);
    option = {
        tooltip: {
            backgroundColor: '#404a59',
            formatter: function (params, ticket, callback) {
                return '省份：' + params.name + '<br /> 现存确诊：' + params.value
            }//数据格式化
        },
        visualMap: {
            type: 'piecewise',
            pieces: [
                { min: 10000, label: '万人之上' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { min: 1000, max: 9999, label: '盈千累万' },
                { min: 100, max: 999, label: '成百上千' },
                { min: 10, max: 99, label: '成群结队' },
                { min: 1, max: 9, label: '寥寥无几' },
                { min: 0, max: 0, label: '风平浪静' }     // 不指定 min，表示 min 为无限大（-Infinity）。
            ],
            color: ['#62191d', '#b30000', '#d92626', '#ff8080', '#ffb3b3', '#ffffff']//取值范围的颜色
        },
        geo: {
            map: 'china',
            roam: false,//不开启缩放和平移
            zoom: 1.23,//视角缩放比例
            label: {
                normal: {
                    show: true,
                    fontSize: '12',
                    color: 'rgba(0,0,0,0.7)'
                }
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                    areaColor: '#ffff00',//鼠标选择区域颜色
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: [
            {
                name: '标题',
                type: 'map',
                geoIndex: 0,
                data: datas
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click', function (params) {
        alert(params.name);
    });

}

function getHubeiCurrentConfirmed() {
    var jsonObj = [];
    fetch('../area.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            for (let i = 0; i < myJson["results"].length; i++) {
                if (myJson["results"][i]["provinceName"] === '湖北省') {
                    temp = myJson["results"][i]["cities"];
                    for (let j = 0; j < temp.length; j++) {
                        if (temp[j]["cityName"] === '恩施州') {
                            jsonObj.push({ "name": '恩施土家族苗族自治州', "value": temp[j]["currentConfirmedCount"] });
                        } else if (temp[j]["cityName"] === '神农架林区') {
                            jsonObj.push({ "name": temp[j]["cityName"], "value": temp[j]["currentConfirmedCount"] });

                        }
                        else {
                            jsonObj.push({ "name": temp[j]["cityName"] + '市', "value": temp[j]["currentConfirmedCount"] });
                        }
                    }
                }
            }
            let dataList = jsonObj;
            let dom = document.getElementById('hubei1');
            drawHubeiMap(dom, dataList);
        });
}

function getHubeiConfirmed() {
    var jsonObj = [];
    fetch('../area.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            for (let i = 0; i < myJson["results"].length; i++) {
                if (myJson["results"][i]["provinceName"] === '湖北省') {
                    temp = myJson["results"][i]["cities"];
                    for (let j = 0; j < temp.length; j++) {
                        if (temp[j]["cityName"] === '恩施州') {
                            jsonObj.push({ "name": '恩施土家族苗族自治州', "value": temp[j]["confirmedCount"] });
                        } else if (temp[j]["cityName"] === '神农架林区') {
                            jsonObj.push({ "name": temp[j]["cityName"], "value": temp[j]["confirmedCount"] });

                        }
                        else {
                            jsonObj.push({ "name": temp[j]["cityName"] + '市', "value": temp[j]["confirmedCount"] });
                        }
                    }
                }
            }
            let dataList = jsonObj;
            let dom = document.getElementById('hubei');
            drawHubeiMap(dom, dataList);
        });
}

function drawHubeiMap(dom, datas) {
    var myChart = echarts.init(dom);
    option = {
        tooltip: {
            backgroundColor: '#404a59',
            formatter: function (params, ticket, callback) {
                return '省份：' + params.name + '<br /> 现存确诊：' + params.value
            }//数据格式化
        },
        visualMap: {
            orient: 'horizontal',
            top: 'bottom',
            left: 'left',
            type: 'piecewise',
            pieces: [
                { min: 10000, label: '万人之上' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { min: 1000, max: 9999, label: '盈千累万' },
                { min: 100, max: 999, label: '成百上千' },
                { min: 10, max: 99, label: '成群结队' },
                { min: 1, max: 9, label: '寥寥无几' },
                { min: 0, max: 0, label: '风平浪静' }     // 不指定 min，表示 min 为无限大（-Infinity）。
            ],
            color: ['#62191d', '#b30000', '#d92626', '#ff8080', '#ffb3b3', '#ffffff']//取值范围的颜色
        },
        geo: {
            map: '湖北',
            roam: false,//不开启缩放和平移
            zoom: 1.23,//视角缩放比例
            label: {
                normal: {
                    show: true,
                    fontSize: '12',
                    color: 'rgba(0,0,0,0.7)'
                }
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                    areaColor: '#ffff00',//鼠标选择区域颜色
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: [
            {
                name: '标题',
                type: 'map',
                geoIndex: 0,
                data: datas
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click', function (params) {
        alert(params.name);
    });

}
