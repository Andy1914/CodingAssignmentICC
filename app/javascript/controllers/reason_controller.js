import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["icon", "label", "reasonInput", "list"];
  static values = {
    checked: Number
  }

  connect() {
    this.loadCheckbox()
    this.reasonInputTarget.addEventListener("input", this.updateList.bind(this));
  }

  updateList(event) {
    const selectedReasonId = event.currentTarget.dataset.reason;
    const updatedValue = this.reasonInputTarget.value;
    const listItem = this.findListItem(selectedReasonId);

    if (listItem) {
      listItem.querySelector('p.list_item_text').textContent = updatedValue;
    }
  }

  toggleIcon(event) {
    const selectedReasonId = event.currentTarget.dataset.reasonCheckedValue;
    this.checkedValue = !this.checkedValue
    const isChecked = this.element.querySelector(`#icon-reason-${selectedReasonId}`).checked;

    const listItem = this.findListItem(selectedReasonId)
    this.updateLabelAndIcon(isChecked)
  
    if (listItem) {
      listItem.querySelector('.reason-icon').innerHTML = this.getSvg(isChecked);
    }
  }

  loadCheckbox() {
    const isChecked = this.element.querySelector('.boolean.optional.storefront_reasons_active input[type="checkbox"]').checked
    this.updateLabelAndIcon(isChecked)
  }

  findListItem(reasonId) {
    return document.getElementById("reasons_list").querySelector(`[data-reason-ordering="${reasonId}"]`);
  }

  updateLabelAndIcon(isChecked) {
    this.labelTarget.innerHTML = this.getLabelContent(isChecked);
    this.iconTarget.innerHTML = this.getSvg(isChecked);
  }

  getSvg(isChecked) {
    const iconName = isChecked ? "eye" : "eye-off";
    return `<img src="/assets/icons/${iconName}.svg" alt="${iconName}.svg">`;
  }

  getLabelContent(isChecked) {
    return isChecked ? 'Reason is visible to customers' : 'Reason is not visible to customers';
  }

}