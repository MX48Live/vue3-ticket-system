import { computed } from "vue"

export const vConvertToNumber = {
    mounted: (el, binding) => {
        let price = binding.value.toString()
        let priceText = price.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")
        return el.innerText = '฿ '+ priceText
    }
}
