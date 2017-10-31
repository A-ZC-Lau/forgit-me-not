<template>
    <!-- This is the modal -->
    <div id="my-id" uk-modal class="uk-modal" style="margin: 0;">
        <div class="uk-modal-dialog uk-modal-body">
            <h2 class="uk-modal-title">Add {{ type }}</h2>
            <div class="uk-modal-body">
                <div>
                    Name:
                </div>
                <input type="text" ref="input" />
            </div>
            <div class="uk-modal-footer">
                <div class="uk-float-right">
                    <button class="uk-modal-close" @click="return_item" type="button">Ok</button>
                    <button class="uk-modal-close" type="button">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            "add_item",
            "type"
        ],
        methods: {
            return_item() {
                this.add_item(this.$refs.input.value)
            }
        }
    }
</script>

<style>
</style>
