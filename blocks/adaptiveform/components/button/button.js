import { DefaultField } from "../defaultInput.js";
import { Click } from "../../afb-runtime.js";
import { getLabelValue, getTooltipValue, getViewId } from "../../lib-model.js";
import { subscribe } from "../../lib-interaction.js";
import { Constants } from "../../constants.js";

export class Button extends DefaultField {

    blockName = Constants.BUTTON;

    addListener() {
        this.element?.addEventListener("click", () => {
            this.model.dispatch(new Click())
        });
    }

    renderField = () => {
        let state = this.model.getState();
        let button = document.createElement("button");
        button.type = "button"
        button.id = getViewId(state, this.blockName);
        button.className = this.blockName;
        button.title = getTooltipValue(state);
        button.dataset.cmpVisible = (state?.visible === true) + "";
        button.dataset.cmpEnabled = (state?.enabled === true) + "";
        button.dataset.cmpIs = this.blockName;
        button.setAttribute("aria-label", getLabelValue(state));

        let span = document.createElement("span");
        span.className = `${this.blockName}__text`;
        span.textContent = getLabelValue(state);

        button.appendChild(span);
        return button;
    }

    render() {
        this.element = this.renderField()
        this.block.appendChild(this.element);
        this.addListener();
        subscribe(this.model, this.element);
    }
}

export default async function decorate(block, model) {
    let button = new Button(block, model);
    button.render();
}
