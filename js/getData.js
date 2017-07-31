const apiUrl = 'https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json';
const DataPerPage = 10;//一頁暫定10筆

var app = new Vue({
    el: '#list',
    data: {
        disasterData: '',
        showinfo: '',
        page:0,
        pageNum:0
    },
    ready: function() {
        this.ajax()//執行
    },
    methods: {
        ajax: function() {
            this.$http.get(apiUrl)
                .then((response) => {
                    var data = response.data.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
                    console.log(data);
                    this.$set('data', data);
                    this.pageNum = Math.floor(data.length / DataPerPage);
                })
                .catch(function(response) {
                    console.log(response);
                })
        },
        setPage: function(n){
            // console.log(this.db.length-((this.page+n)*10+10))
            this.page = Number(this.page);
            if(this.page+n>=0&&n<0)
                this.page+=n;
            else if(this.db.length-((this.page+n)*DataPerPage+DataPerPage)>-DataPerPage&&n>0)
                this.page+=n;
            // this.getNewList();
            //console.log(this.page);
            //console.log(app.data);
        },
        resetPage: function(){
            this.page = 0;
        }
    },
    computed:{
        getlist:function getlist(){
            if(!this.data)return ["請稍後..."];
            var _this = this;
            var list = [];
            this.data.map(function(el){
                var loc = el.CaseLocationDistrict;
                if(list.indexOf(loc)==-1)
                    list.push(loc);
            })
            //console.log(list);
            return list;
        },
        search:function search(){
            if(this.keyword=='wait'){
                this.db = [];
                return ["請稍後..."];
            }
            else if(this.keyword=='全部'){
                this.db = this.data;
                this.pageNum = Math.floor(this.data.length / DataPerPage);
                console.log(this.data.length);
                return this.db.slice(this.page*DataPerPage, this.page*DataPerPage+DataPerPage);
            }
            var _this = this;
            var db = this.data.filter(function(val){
                return new RegExp(_this.keyword, 'g').test(val.CaseLocationDistrict);
            });
            this.db = db;
            //console.log(this.page);
            //console.log(db);
            this.pageNum = Math.floor(db.length / DataPerPage);
            return db.splice(this.page*DataPerPage, DataPerPage);
        }
    }
})