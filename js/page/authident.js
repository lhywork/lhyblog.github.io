/**
 * 身份认证页
 */
;
(function() {
	//验证JS
	$('.page-button').on('click',function(){
		var IdentityName = $('#IdentityName').val();
		var IdentityStatus = $('#IdentityStatus').html();
		var IdCard = $('#IdCard').val();
		if(!IdentityName){
			util.toast("请输入您的姓名");
			return false;
		}
		if(!IdentityStatus){
			util.toast("请输入您的有效期");
			return false;
		}
		if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IdCard))){
    	    util.toast("您输入身份证格式有错误！");
			return false;	 
    	}
	});
	
	var selectDateDom = $('#selectDate');
    var showDateDom = $('#IdentityStatus');
    // 初始化时间
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDate = now.getDate();
    showDateDom.attr('data-year', nowYear);
    showDateDom.attr('data-month', nowMonth);
    showDateDom.attr('data-date', nowDate);
    // 数据初始化
    function formatYear (nowYear) {
        var arr = [];
        for (var i = nowYear - 20; i <= nowYear + 20; i++) {
            arr.push({
                id: i + '',
                value: i + '年'
            });
        }
        return arr;
    }
    function formatMonth () {
        var arr = [];
        for (var i = 1; i <= 12; i++) {
            arr.push({
                id: i + '',
                value: i + '月'
            });
        }
        return arr;
    }
    function formatDate (count) {
        var arr = [];
        for (var i = 1; i <= count; i++) {
            arr.push({
                id: i + '',
                value: i + '日'
            });
        }
        return arr;
    }
    var yearData = function(callback) {
      /*  setTimeout(function() {*/
            callback(formatYear(nowYear))
     /*   }, 2000)*/
    }
    var monthData = function (year, callback) {
        /*setTimeout(function() {*/
            callback(formatMonth());
   /*     }, 2000);*/
    };
    var dateData = function (year, month, callback) {
            if (/^1|3|5|7|8|10|12$/.test(month)) {
                callback(formatDate(31));
            }
            else if (/^4|6|9|11$/.test(month)) {
                callback(formatDate(30));
            }
            else if (/^2$/.test(month)) {
                if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                    callback(formatDate(29));
                }
                else {
                    callback(formatDate(28));
                }
            }
            else {
                throw new Error('month is illegal');
            }
    };
    selectDateDom.bind('click', function () {
        var oneLevelId = showDateDom.attr('data-year');
        var twoLevelId = showDateDom.attr('data-month');
        var threeLevelId = showDateDom.attr('data-date');
        var iosSelect = new IosSelect(3, 
            [yearData, monthData, dateData],
            {
                title: '地址选择',
                itemHeight: 35,
                relation: [1, 1],
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                showLoading: true,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    showDateDom.attr('data-year', selectOneObj.id);
                    showDateDom.attr('data-month', selectTwoObj.id);
                    showDateDom.attr('data-date', selectThreeObj.id);
                    showDateDom.html(selectOneObj.id + '-' + selectTwoObj.id + '-' + selectThreeObj.id);
                }
        });
    });
})();