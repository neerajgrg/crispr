import {  getLayoutProperties, getTooltipValue, getViewId } from "../../libs/afb-model.js";
import { getWidget, subscribe } from "../../libs/afb-interaction.js";
import { Constants } from "../../libs/constants.js";
import { defaultInputRender, renderField, setDisabledAttribute } from "../../libs/afb-builder.js";
import { DefaultField } from "../defaultInput.js";

export class Radio extends DefaultField {

    blockName = Constants.RADIO;

    addListener() {
        let widget =  this.element?.querySelectorAll(`[class$='${Constants.WIDGET}']`);
        widget?.forEach(widget => {
            widget.addEventListener('change', (e) => {
                this.model.value =  e.target.value;
            });
        });
    }

    createInputHTML = (state) => {
        const fragments = document.createDocumentFragment();
        state?.enum?.forEach((enumVal, index) => {
            fragments.appendChild(this.createRadioButton(state, enumVal, state?.enumNames?.[index], index))
        })
        return fragments;
    }

    createRadioButton = (state, enumValue, enumDisplayName, index) => {
        let div = document.createElement("div");
        div.className = "cmp-adaptiveform-radiobutton__option " + getLayoutProperties(state)?.orientation;
        
        let label = document.createElement("label");
        label.className = "cmp-adaptiveform-radiobutton__option__label";
        label.title = getTooltipValue(state);
        label.setAttribute("aria-label", enumDisplayName || enumValue);
        label.setAttribute("aria-describedby", "_desc");

        let input = document.createElement("input");
        input.type = "radio"
        input.name = state.name;
        input.className = this.blockName + "__option__widget";
        input.id = getViewId(state, this.blockName) + "_" + index + "__widget";
        input.value = enumValue;
        input.placeholder = state?.placeholder;
        input.required = state?.required;
        input.checked = enumValue == state.value;
        input.setAttribute("aria-describedby", "_desc");
        setDisabledAttribute(state, input);

        let span = document.createElement("span");
        span.textContent = enumDisplayName || enumValue;

        label.appendChild(input);
        label.appendChild(span);
        div.appendChild(label);

        return div;
    }

    updateValue = (element, value) => {
        if(value != null) {
            let widget =  element.querySelectorAll(`[class$='${Constants.WIDGET}']`);
            widget?.forEach((widget) => {
                if (widget.value != null && value?.toString() == widget.value.toString()) {
                    widget.checked = true;
                    widget.setAttribute(Constants.HTML_ATTRS.CHECKED, Constants.HTML_ATTRS.CHECKED);
                    widget.setAttribute(Constants.ARIA_CHECKED, true + "");
                } else {
                    widget.checked = false;
                    widget.removeAttribute(Constants.HTML_ATTRS.CHECKED);
                    widget.setAttribute(Constants.ARIA_CHECKED, false + "");
                }
            }, this)
        }
    } 

    render() {
        this.element = renderField(this.model, this.blockName, this.createInputHTML)
        this.block.appendChild(this.element);
        this.addListener();
        subscribe(this.model, this.element, {value : this.updateValue});
    }
}

export default async function decorate(block, model) {
    let radio = new Radio(block, model);
    radio.render();
}
