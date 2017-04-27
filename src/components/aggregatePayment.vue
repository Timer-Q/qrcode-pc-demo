<template>
  <div class="aggregatePayment">
    <commonHeader :title='title'></commonHeader>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <h3 class="font-middle">订单提交成功，请您尽快付款！</h3>
          <p>请您再24小时内完成付款，否则订单会自动取消</p>
        </div>
        <div class="header-right">
          <p>应付金额<span class="font-large color-warning"> {{payAmount | monyParser}} </span>元</p>
          <a href="javascript:;" class="font-small">订单详情</a>
        </div>
      </div>
      <div class="content">
        <p class="content-header">
          二维码支付
        </p>
        <div class="form-content">
          <div class="form-list">
            <div class="row">
              <a href="javascript:;" class="item" :class="{'active': payType === '10'}" selfType="10" @click="choosePayType($event)">
                <img src="../assets/imgs/wechat.svg" alt=""> 微信支付
              </a>
              <a href="javascript:;" class="item" :class="{'active': payType === '20'}" selfType="20" @click="choosePayType($event)">
                <img src="../assets/imgs/alipay.svg" alt=""> 支付宝
              </a>
            </div>
            <div class="row">
              <p>应付金额<span class="font-large color-warning"> {{payAmount | monyParser}} </span>元</p>
            </div>
            <div class="row">
              <button @click="paySubmit" class="btn btn-info">立即支付</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pop" v-show="popFlag">
      <div class="qrcode-content">
        <div class="pop-container">
          <p class="pop-container-header">
            <span>支付{{payAmount | monyParser}}元</span>
            <a href="javascript:;" @click="payCancle"> &times; </a>
          </p>
          <p class="info">{{payType | paytypeFilter}}扫码支付</p>
          <qrcode :background="background" :size="size" :cls="qrCls" :value="qrText"></qrcode>
          <img src="../assets/imgs/wechat.svg" alt="" v-show="payType === '10'" class="selectedLogo">
          <img src="../assets/imgs/alipay.svg" alt="" v-show="payType === '20'" class="selectedLogo">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonHeader from './util/commonHeader'
  import qrcode from 'v-qrcode'
  export default {
    name: 'aggregatePayment',
    data() {
      return {
        title: '收银台',
        payType: '10',
        payAmount: '4896',
        popFlag: false,
        qrCls: 'qrcode',
        qrText: 'Read VueJS Feed',
        size: 300,
        background: '#fff',
        orderNo: '',
        timer: null,
        timeOut: 120000
      }
    },
    components: {
      commonHeader,
      qrcode
    },
    methods: {
      // 获取支付类型
      choosePayType(e) {
        if (e) {
          console.log(e.target.getAttribute('selfType'))
          this.payType = e.target.getAttribute('selfType')
        }
        // var formData = this.$qs.stringify({
        //   "data": {
        //     "head": {
        //       "apiVersion": "1.0",
        //       "channelDate": "20170227",
        //       "channelNo": "10",
        //       "channelSerial": "1111111",
        //       "channelTime": "103335",
        //       "channelVersion": "111111",
        //       "tranCode": "PP1017",
        //       "userId": "107"
        //     },
        //     "remark": 'Test',
        //     "orderAmount": '0.01',
        //     // "payType": this.payType,
        //     "payType": "21",
        //     "productInfos": [{
        //       "productInfo": {
        //         "productNumbers": "1",
        //         "productPrice": "0.01",
        //         "productName": "test"
        //       }
        //     }, {
        //       "productInfo": {
        //         "productNumbers": "1",
        //         "productPrice": "0.01",
        //         "productName": "test"
        //       }
        //     }]
        //   }
        // })
        var  data= {
            "head": {
              "apiVersion": "1.0",
              "channelDate": "20170227",
              "channelNo": "10",
              "channelSerial": "1111111",
              "channelTime": "103335",
              "channelVersion": "111111",
              "tranCode": "PP1017",
              "userId": "107"
            }
            ,
            "remark": 'Test',
            "orderAmount": '0.01',
            // "payType": this.payType,
            "payType": "21",
            "productInfos": [{
              "productInfo": {
                "productNumbers": "1",
                "productPrice": "0.01",
                "productName": "test"
              }
            }, {
              "productInfo": {
                "productNumbers": "1",
                "productPrice": "0.01",
                "productName": "test"
              }
            }]
          }
        console.info( data);

        var s = JSON.stringify(data);
        this.fetch.post(this.$api+'/createQrcode',{ pros: s})
        // this.fetch.post('/api',data)
          .then(res => {
            // 二维码信息
            console.info( res.data);

            this.qrText = res.data.qrCodeStr;
            // 订单号
            this.orderNo = res.data.orderNo
            console.log(res)
          })
      },
      // 轮询检查支付状态
      loopFetch() {
        var formData = {
          "data": {
            "head": {
              "apiVersion": "1.0",
              "channelDate": "20170227",
              "channelNo": "10",
              "channelSerial": "1111111",
              "channelTime": "103335",
              "channelVersion": "111111",
              "tranCode": "PP1024",
              "userId": "107"
            },
            "orderNo": this.orderNo
          }
        }
        var data = JSON.stringify(formData);
        this.fetch.post(this.$api+'/queryRes', { pros: data}).then(res => {
             console.log('-------------------');
             console.log(res);
          if (res.data.orderStatus === "1") {
            this.$router.push({
              path: '/success',
              query:{
                orderInfo: res.data
              }
            })
          }
        }).catch(error => console.error(error))
      },
      // 立即支付按钮事件 触发轮询
      paySubmit() {
        var _this = this;
        this.popFlag = true;
        this.timer = setInterval(function () {
          if (_this.timeOut >= 0) {
            _this.timeOut -= 2000;
            _this.loopFetch()
          } else {
            clearInterval(this.timer);
            _this.timeOut = 120000;
          }
        }, 2000);
      },
      // 关闭二维码弹窗按钮 停止轮询
      payCancle() {
        this.popFlag = false
        clearInterval(this.timer);
      }
    },
    filters: {
      monyParser(val) {
        if (val) {
          return parseFloat(val).toFixed(2)
        }
      },
      paytypeFilter(val) {
        if (val) {
          switch (val) {
            // case '00':
            //   return '现金'
            // case '10':
            //   return '微信被扫'
            // case '11':
            //   return '微信主扫'
            // case '12':
            //   return '微信公众号支付'
            // case '20':
            //   return '支付宝被扫'
            // case '21':
            //   return '支付宝主扫'
            // case '30':
            //   return '银联被扫'
            // case '31':
            //   return '银联主扫'
            // case '99':
            //   return '聚合支付'
            case '00':
              return '现金'
            case '10':
            case '11':
            case '12':
              return '微信'
            case '20':
            case '21':
              return '支付宝'
            case '30':
            case '31':
              return '银联'
            case '99':
              return '聚合支付'
          }
        }
      }
    },
    mounted() {
      this.choosePayType();
      this.payAmount = this.$route.query.payAmount
    },
    destroyed() {
      // 页面跳转后 清除计时器
      clearInterval(this.timer);
    }
  }

</script>

<style lang='scss' scoped>
  .font-small {
    font-size: 12px;
  }

  .font-middle {
    font-size: 18px;
  }

  .font-large {
    font-size: 20px;
  }

  .color-warning {
    color: #c30;
  }

  a {
    text-decoration: none;
  }

  .container {
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    @at-root #{&}-left {
      font-size: 14px;
      line-height: 1.5;
    }
    @at-root #{&}-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: right;
    }
  }

  .content {
    border-top: 4px solid #eee;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
    @at-root #{&}-header {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
  }

  .form-content {
    padding: 10px 20px;
  }

  .row {
    line-height: 2;
    font-size: 14px;
  }

  .item {
    padding: 5px 10px;
    color: #333;
    text-decoration: none;
    img {
      width: 20px;
      vertical-align: middle;
    }
  }

  .active {
    border: 1px solid #c30;
  }

  .pop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, .8);
  }

  .qrcode-content {
    position: relative;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .pop-container {
    position: relative;
    border: 3px solid #ccc;
    width: 400px;
    min-height: 400px;
    text-align: center;
    .pop-container-header {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      color: #fff;
      background: #39f;
    }
    .info {
      font-size: 20px;
      line-height: 2;
    }
  }

  .btn {
    display: inline-block;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .btn-info {
    background: #09f;
    color: #fff;
    box-shadow: 5px 5px 10px #aadafb;
  }

  .selectedLogo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    background: #fff;
    border-radius: 3px;
    padding: 5px;
  }

</style>
