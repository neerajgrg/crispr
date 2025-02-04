 export class Constants { 

    static NS= "cmp"
    static ERROR_MESSAGE= "errorMessage"

    static WIDGET= "widget"
    static LABEL= "label"
    static LONG_DESC = 'longdescription'
    static QM = 'questionmark'
    static SHORT_DESC = 'shortdescription'

    static ADAPTIVE_FORM = "cmp-adaptiveform"

    static TEXT_INPUT = "cmp-adaptiveform-textinput"
    static BUTTON = 'cmp-adaptiveform-button';
    static SELECT = 'cmp-adaptiveform-dropdown';
    static CHECKBOX = "cmp-adaptiveform-checkbox";
    static RADIO = "cmp-adaptiveform-radiobutton";
    static TEXT = "cmp-adaptiveform-text";

    static ADAPTIVE_FORM_LONG_DESC = "cmp-adaptiveform__longdescription"
    static ADAPTIVE_FORM_QM = "cmp-adaptiveform__questionmark"

    /**
     * data attribute to mark the dragged component valid or invalid.
     * value true for valid
     * value false for invalid
     */
     static DATA_ATTRIBUTE_VALID = "data-cmp-valid"

    /**
     * data attribute to mark the dragged component enabled or disabled.
     * value true for enabled
     * value false for disabled
     */
     static DATA_ATTRIBUTE_ENABLED = "data-cmp-enabled"

    /**
     * data attribute to mark the dragged component visible or invisible.
     * value true for visible
     * value false for invisible
     */
     static DATA_ATTRIBUTE_VISIBLE = "data-cmp-visible"

    /**
     * data attribute to mark the dragged component active or inactive.
     * value true for active
     * value false for inactive
     */
     static DATA_ATTRIBUTE_ACTIVE = "data-cmp-active"

    /**
     * aria attribute to mark the dragged component disabled.
     */
     static ARIA_DISABLED = "aria-disabled"

    /**
     * aria attribute to mark the dragged component hidden.
     */
     static ARIA_HIDDEN = "aria-hidden"

    /**
     * aria attribute to mark the dragged component invalid.
     */
     static ARIA_INVALID = "aria-invalid"

    /**
     * aria attribute to mark the dragged component checked.
     */
     static ARIA_CHECKED = "aria-checked"

    /**
     * aria attribute to mark component selected
     */
     static ARIA_SELECTED = "aria-selected"


     static HTML_ATTRS =  {
        /**
         * attribute to mark the dragged component disabled.
         */
        DISABLED : "disabled",

        /**
         * attribute to mark the dragged component checked.
         */
        CHECKED : "checked"
    }
}