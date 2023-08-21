import { $ } from './utils/dom'

const bagIcon = $('#bag')
const slider = $('.slider')
const closeSlider = $('#close')

bagIcon.onclick = () => {
  slider.classList.add('active')
}

closeSlider.onclick = () => {
  slider.classList.remove('active')
}
