<template>
    <div class="topbar">
        <div class="content">
            <span>您好，139****9832 </span> | 
            <span>帮助中心 </span> |
            <a href="javascript:;">退出</a>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    a {
        color: #fff;
    }
    .topbar {
        line-height: 2;
        font-size: 12px;
        color: #fff;
        background: rgba(0, 0, 0, .8);
        text-align: right;
    }
    .content {
        width: 1000px;
        margin: 0 auto;
    }
</style>