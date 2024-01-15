import { Controller } from "@hotwired/stimulus";
import Sortable from 'sortablejs';

export default class extends Controller {
  connect() {
    this.sortable = Sortable.create(this.element, {
      onEnd: this.end.bind(this),
      draggable: ".sortable-item"
    });
  }

  end() {
    const formList = document.querySelector('.return-reasons-container');
    const lists = document.getElementById("reasons_list").querySelectorAll('.sortable-item');

    lists.forEach((element, i) => {
      const oldIndex = element.getAttribute('data-reason-ordering');
      const orderingInput = formList.querySelector(`[data-reason-ordering="${oldIndex}"]`)
      orderingInput.querySelector('.storefront_reasons_ordering input').value = i + 1;
    });
  }
}