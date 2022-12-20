import { setActive, subscribe } from "../lib-interaction.js";
import { getWidget, renderField } from "../lib-builder.js";

export class DefaultField {
    blockName = 'cmp-adaptiveform-textinput'

    block;
    element;
    model;

    constructor(block, model) {
        this.block = block;
        this.model = model;
    }

    addListener() {
        if(this.element) {
            let widget = getWidget(this.block);
            widget?.addEventListener('blur', (e) => {
                this.model.value = e.target.value;
                if(this.element)
                    setActive(this.element, false);
            });
            widget?.addEventListener('focus', (e) => {
                if(this.element)
                    setActive(this.element, true);
            });
        }
    }

    render() {
        this.element = renderField(this.model, this.blockName)
        this.block.appendChild(this.element);
        this.addListener();
        subscribe(this.model, this.element);
    }
}

export default async function decorate(block, model) {
    let textinput = new DefaultField(block, model);
    textinput.render();
}
