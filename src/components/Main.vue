<template src="./templates/Main.html">
</template>

<script>
    const electron = window.require('electron')
    const fs = window.require('fs')
    import store from '@/store'

    export default {
        data() {
            return {
                store
            }
        },
        methods: {
        }
    }
</script>

<style>

</style>
