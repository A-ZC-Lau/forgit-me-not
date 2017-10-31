<template src='./CollectionList.html'></template>

<script>
    import store from '@/store'

    export default {
        name: "CollectionList",
        data() {
            return {
                store,
                type: null
            }
        },
        methods: {
            change_type(type) {
                this.type = type
            }
        },
        mounted() {
            console.log(store.state.General.folder)
        }
    }
</script>

<style>
    fieldset:before {
        content: attr(title);
    }

    fieldset {
        border: none;
        font-weight: bold;
        margin: 0;
    }

    fieldset > article {
        font-weight: normal;
        margin-left: 1em;
    }
</style>
