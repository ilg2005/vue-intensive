import M from 'materialize-css';

export default {
    mounted(el, binding) {
        M.Tooltip.init(el, {html: binding.value});
    },
    unmounted(el) {
        const instance = M.Tooltip.getInstance(el);
        if (instance && instance.destroy) {
            instance.destroy();
        }
    }
}
