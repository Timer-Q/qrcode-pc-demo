<template>
  <div>
    <commonHeader :title='title'></commonHeader>
    <div class="container">
        <div class="header">
            付款结果
        </div>
        <div class="content">
            <img src="../assets/imgs/correct.svg" alt="" class="result-img">
            <span class="result-info">
                <p>您已成功付款{{orderAmount}}元</p>
                <p>订单编号：{{orderNo}}</p>
            </span>
        </div>
    </div>
  </div>
</template>
<script>
    import commonHeader from "./util/commonHeader.vue"
    export default {
        data() {
            return {
                title: "支付成功",
                orderAmount: '',
                orderNo: ''
            }
        },
        components: {
            commonHeader
        },
        mounted() {
            if(this.$route.query.orderInfo) {
                this.orderAmount = this.$route.query.orderInfo.orderAmount
                this.orderNo = this.$route.query.orderInfo.orderNo
            }
        }
    }
</script>
<style lang="scss" scoped>
    body {
        background: #f8f8f8;
    }
    .container {
        background: #fff;
        width: 1000px;
        margin: 20px auto;
        border: 1px solid #ccc;
    }
    .header {
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        min-height: 100px;
    }
    .result-img {
        width: 50px;
        vertical-align: middle;
        margin-right: 10px;
    }
</style>
