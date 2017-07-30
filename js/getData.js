/*var data;

var xhr = new XMLHttpRequest();
xhr.open('get', 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json');
xhr.send(null);
xhr.onload = function() {
    var str = JSON.parse(xhr.responseText);
    data = str.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
    showList();
}

function showList() {
    var tr = document.createElement("tr");
    var len = data.length;
    for (var i = 0; len > i; i++) {
        tr.innerHTML = '<td>' + data[i].CaseTime + '</td>'
        document.querySelector('.list').appendChild(str);
    }
}*/

const apiUrl = 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json';

var app = new Vue({
    el: '#list',
    data: {
        area: '全部',
        disasterData: null,
        showinfo: null
    },
    created: function() {
        //執行
        this.callData()
    },
    filter: {
    },
    methods: {
        filterArea: function(item) {
            if (this.area == '全部') {
                return true
            } else if (item.CaseLocationDistrict == this.area) {
                return true
            }
        },
        callData: function() {
            // GET /someUrl
            this.$http.get(apiUrl).then(response => {
                // 獲取災害資訊
                this.disasterData = response.body.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
                this.showinfo = response.status;
            }, response => {
                this.showinfo = response.status;
            });
        }
    }
})