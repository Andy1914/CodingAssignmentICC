import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['modal']

  show(e) {
    e.preventDefault();
    
    this.modalTarget.open = true
    this.modalTarget.classList.remove('hidden');
    const selectedReasonId = e.currentTarget.dataset.reasonId;
    this.modalTarget.querySelector('.return-reasons-container').querySelectorAll('.nested-form-wrapper')[selectedReasonId-1].classList.remove('hidden');
  }

  hide(e) {
    e.preventDefault()
    this.modalTarget.open = false
    this.modalTarget.classList.add('hidden');
    const selectedReasonId = e.currentTarget.dataset.reasonId;
    const elements = this.modalTarget.querySelector('.return-reasons-container').querySelectorAll('.nested-form-wrapper')

    elements.forEach(function(element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    });
  }

  showEmptyForm(e) {
    e.preventDefault();
    this.modalTarget.open = true
    this.modalTarget.classList.remove('hidden');
    document.getElementById('empty_form').children[0].classList.remove('hidden')

  }
}
