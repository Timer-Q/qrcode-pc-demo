<template>
    <div class="common-header">
        <div class="container">
            <img src="../../assets/logo.png" alt="logo" class="common-header-logo"> | 
            {{title}}
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style lang="scss" scoped>
    .common-header {
        line-height: 3;
        background: #eee;
        border-bottom: 1px solid #09f;
    }
    .container {
        width: 1000px;
        margin: 0 auto;
    }
    .common-header-logo {
        width: 25px;
        vertical-align: middle;
    }
</style>