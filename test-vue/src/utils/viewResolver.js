import { ref, onMounted, onUnmounted } from 'vue';

export default function getViewport() {

    const viewport = ref({
        width: Number,
        height: Number
    });

    function getProperties() {
        viewport.value.width = window.innerWidth;
        viewport.value.height = window.innerHeight;
    }

    onMounted(() => {
        getProperties()
        window.addEventListener("resize", getProperties);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", getProperties);
    });

    return viewport;
};