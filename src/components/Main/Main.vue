<template src='./Main.html'></template>

<script>
    import $ from 'jquery'

    import 'uikit/dist/js/uikit.min.js'
    import 'uikit/dist/css/uikit.min.css'

    import 'font-awesome/css/font-awesome.min.css'

    import Writing from '@/components/Main/Writing/Writing'
    import Sidebar from '@/components/Main/Sidebar/Sidebar'
    import { select_root } from '@/global.js'
    import Modal from '@/components/Modal'
    import store from '@/store'

    export default {
        components: {
            "Sidebar": Sidebar,
            "Writing": Writing,
            "Modal": Modal
        },
        data() {
            return {
                store,
                folder: store.state.General.folder
            }
        },
        methods: {
            select_root
        },
        mounted () {
            console.log(this.$route)
        }
    }
</script>

<style>
    #main {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        display: flex;
        height: 100vh;
        overflow: auto;
        text-align: center;
        width: 100vw;
        max-width: 100vw;
    }
    #select_folder {
        align-items: center;
        background-color: lightblue;
        display: flex;
        font-size: 2.5em;
        justify-content: center;
        height: 100%;
        width: 100%;
    }

    aside {
        background-color: lightblue;
        resize: horizontal;
        width: 250px;
    }

    main {
        flex-grow: 1;
    }
</style>
