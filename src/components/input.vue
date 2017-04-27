<template>
  <div>
    <commonHeader :title='title'></commonHeader>
    <div class="container">
        <div class="header">
            付款信息
        </div>
        <div class="content">
            <input type="text" v-model="payAmount">
            <button type="button" @click="pay">支付</button>
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
                payAmount: ''
            }
        },
        components: {
            commonHeader
        },
        methods: {
            pay() {
                this.$router.push({path:'/aggregatePayment',query:{payAmount:this.payAmount}})
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
