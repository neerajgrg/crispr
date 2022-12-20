function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var id = 0;
function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}
function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}

/**
 * @param {Object|Array} any check whether the passed object or array is empty or not
 * @returns {boolean} true for null, undefined, empty string, empty object, empty array and empty object inside array
 */
function isEmpty(any) {
  if (!any) {
    return true;
  }
  if (Array.isArray(any)) {
    return any.length === 0 || isEmpty(any[0]);
  }
  if (Object.keys(any).length === 0) {
    return true;
  }
  return false;
}

/**
 * 
 * @param {Object} obj remove empty key-value pair from object. 
 * This does not mutate passed object.
 * @returns {Object} return object with non-empty key-values.
 */
function removeEmpty(obj) {
  return Object.keys(obj).filter(function (k) {
    return obj[k] != null && obj[k] != "";
  }).reduce(function (acc, k) {
    acc[k] = obj[k];
    return acc;
  }, {});
}

var FieldMapping = new Map([["text-input", "text"], ["number-input", "number"], ["date-input", "datetime-local"], ["file-input", "file"], ["drop-down", "select"], ["radio-group", ""], ["checkbox-group", ""], ["plain-text", "plain-text"], ["checkbox", "checkbox"], ["multiline-input", "text-area"], ["panel", "panel"], ["submit", "button"], ["button", "button"]]);

var FieldPropertyMapping = {
  "Default": "default",
  "MaxLength": "maxLength",
  "MinLength": "minLength",
  "Maximum": "maximum",
  "Minimum": "minimum",
  "Step": "step",
  "Pattern": "pattern",
  "Value": "value",
  "Placeholder": "placeholder",
  "Field": "name",
  "ReadOnly": "readOnly",
  "Description": "description",
  "Type": "fieldType",
  "Label": "label.value",
  "Mandatory": "required",
  "Options": "enum"
};

const PROPERTY = "property";
const PROPERTY_RULES = "rules.properties";
var _isProperty = /*#__PURE__*/_classPrivateFieldLooseKey("isProperty");
var _initFormDef = /*#__PURE__*/_classPrivateFieldLooseKey("initFormDef");
var _initField = /*#__PURE__*/_classPrivateFieldLooseKey("initField");
var _transformField = /*#__PURE__*/_classPrivateFieldLooseKey("transformField");
var _transformFieldNames = /*#__PURE__*/_classPrivateFieldLooseKey("transformFieldNames");
var _transformFieldType = /*#__PURE__*/_classPrivateFieldLooseKey("transformFieldType");
var _transformFlatToHierarchy = /*#__PURE__*/_classPrivateFieldLooseKey("transformFlatToHierarchy");
var _handleMultiValues = /*#__PURE__*/_classPrivateFieldLooseKey("handleMultiValues");
var _handleSpecialCases = /*#__PURE__*/_classPrivateFieldLooseKey("handleSpecialCases");
var _transformProperty = /*#__PURE__*/_classPrivateFieldLooseKey("transformProperty");
var _createModelGraph = /*#__PURE__*/_classPrivateFieldLooseKey("createModelGraph");
var _createModelTree = /*#__PURE__*/_classPrivateFieldLooseKey("createModelTree");
var _tranformHierarichalFields = /*#__PURE__*/_classPrivateFieldLooseKey("tranformHierarichalFields");
var _transformRulesProperties = /*#__PURE__*/_classPrivateFieldLooseKey("transformRulesProperties");
class ExcelToFormModel {
  constructor() {
    Object.defineProperty(this, _transformRulesProperties, {
      value: _transformRulesProperties2
    });
    Object.defineProperty(this, _tranformHierarichalFields, {
      value: _tranformHierarichalFields2
    });
    Object.defineProperty(this, _createModelTree, {
      value: _createModelTree2
    });
    Object.defineProperty(this, _createModelGraph, {
      value: _createModelGraph2
    });
    Object.defineProperty(this, _transformProperty, {
      value: _transformProperty2
    });
    Object.defineProperty(this, _handleSpecialCases, {
      value: _handleSpecialCases2
    });
    Object.defineProperty(this, _handleMultiValues, {
      value: _handleMultiValues2
    });
    Object.defineProperty(this, _transformFlatToHierarchy, {
      value: _transformFlatToHierarchy2
    });
    Object.defineProperty(this, _transformFieldType, {
      value: _transformFieldType2
    });
    Object.defineProperty(this, _transformFieldNames, {
      value: _transformFieldNames2
    });
    Object.defineProperty(this, _transformField, {
      value: _transformField2
    });
    Object.defineProperty(this, _initField, {
      value: _initField2
    });
    Object.defineProperty(this, _initFormDef, {
      value: _initFormDef2
    });
    Object.defineProperty(this, _isProperty, {
      value: _isProperty2
    });
  }
  /**
   * tranform the excel model json to adaptive form json.
   * @param {JSON} excelModel 
   * @param {URL} formPath
   * @returns {Object}
   * @public
   */
  transform(excelModel = {}, formPath) {
    if (isEmpty(excelModel)) {
      console.error("Cannot transform empty excel model");
    }

    // if its adaptive form json just return it.
    if (excelModel.adaptiveform) {
      return excelModel;
    }
    if (isEmpty(excelModel.data)) {
      throw new Error("unable to tranform empty excel model data");
    }
    const formDef = _classPrivateFieldLooseBase(this, _initFormDef)[_initFormDef](formPath);
    const excelData = excelModel.data;
    excelData.forEach(dataItem => {
      let item = removeEmpty(dataItem);
      if (_classPrivateFieldLooseBase(this, _isProperty)[_isProperty](item)) {
        _classPrivateFieldLooseBase(this, _transformProperty)[_transformProperty](formDef, item);
      } else {
        formDef.items.push(_classPrivateFieldLooseBase(this, _transformField)[_transformField](item));
      }
    });
    _classPrivateFieldLooseBase(this, _tranformHierarichalFields)[_tranformHierarichalFields](formDef);
    _classPrivateFieldLooseBase(this, _transformRulesProperties)[_transformRulesProperties](formDef);
    return formDef;
  }
}
function _isProperty2(item) {
  return item && item.fieldType == PROPERTY;
}
function _initFormDef2(formPath) {
  return {
    adaptiveform: "0.10.0",
    metadata: {
      grammar: "json-formula-1.0.0",
      version: "1.0.0"
    },
    properties: {},
    rules: {
      properties: []
    },
    items: [],
    action: formPath == null ? void 0 : formPath.split('.json')[0]
  };
}
function _initField2() {
  return {
    constraintMessages: {
      required: "Please fill in this field."
    }
  };
}
function _transformField2(item) {
  // @todo initField only for required field
  let field = _extends({}, item, _classPrivateFieldLooseBase(this, _initField)[_initField]());
  _classPrivateFieldLooseBase(this, _transformFieldNames)[_transformFieldNames](field);
  _classPrivateFieldLooseBase(this, _transformFieldType)[_transformFieldType](field);
  _classPrivateFieldLooseBase(this, _transformFlatToHierarchy)[_transformFlatToHierarchy](field);
  _classPrivateFieldLooseBase(this, _handleMultiValues)[_handleMultiValues](field, "enum");
  _classPrivateFieldLooseBase(this, _handleMultiValues)[_handleMultiValues](field, "enumNames");
  _classPrivateFieldLooseBase(this, _handleSpecialCases)[_handleSpecialCases](field);
  return field;
}
function _transformFieldNames2(field) {
  Object.keys(FieldPropertyMapping).forEach(key => {
    if (field[key]) {
      item[FieldPropertyMapping[key]] = item[key];
      delete field[key];
    }
  });
}
function _transformFieldType2(field) {
  if (FieldMapping.has(field.fieldType)) {
    field.fieldType = FieldMapping.get(field.fieldType);
  }
}
function _transformFlatToHierarchy2(item) {
  Object.keys(item).forEach(key => {
    if (key.includes(".")) {
      let temp = item;
      key.split('.').map((k, i, values) => {
        temp = temp[k] = i == values.length - 1 ? item[key] : temp[k] != null ? temp[k] : {};
      });
      delete item[key];
    }
  });
}
function _handleMultiValues2(item, key) {
  let values;
  if (item && item[key]) {
    values = item[key].split(",").map(value => value.trim());
    item[key] = values;
  }
}
function _handleSpecialCases2(item) {
  //Franklin Mandatory uses x for true.
  item.required = item.required == "x" || item.required == "true";
}
function _transformProperty2(formDef, item) {
  formDef.properties[item.name] = item.default;
  if (item.hasOwnProperty(PROPERTY_RULES)) {
    if (!formDef.rules.properties) {
      formDef.rules.properties = [];
    }
    formDef.rules.properties.push(`{${item.name}: ${item[PROPERTY_RULES]}}`);
  }
}
function _createModelGraph2(items) {
  let graph = new Map([["root", []]]);
  items.forEach(item => {
    let parent = "root";
    if (item.hasOwnProperty("parent")) {
      parent = item["parent"];
      !graph.has(parent) && graph.set(parent, []);
      delete item["parent"];
    }
    graph.get(parent).push(item);
  });
  return graph;
}
function _createModelTree2(modelGraph, currNode = "root", visited = new Set()) {
  let rootItems = modelGraph.get(currNode);
  rootItems.forEach(item => {
    if (modelGraph.has(item.name)) {
      item.items = _classPrivateFieldLooseBase(this, _createModelTree)[_createModelTree](modelGraph, item.name, visited);
    }
  });
  modelGraph.delete(currNode);
  return rootItems;
}
function _tranformHierarichalFields2(formDef) {
  let modelGraph = _classPrivateFieldLooseBase(this, _createModelGraph)[_createModelGraph](formDef.items);
  formDef.items = _classPrivateFieldLooseBase(this, _createModelTree)[_createModelTree](modelGraph);
  if (modelGraph.size > 0) {
    console.error("form json contains some unreachable, undefined or circular dependent parent fields");
  }
}
function _transformRulesProperties2(formDef) {
  let rulesProperties = formDef.rules.properties;
  if (!isEmpty(rulesProperties)) {
    formDef.rules.properties = rulesProperties.reduce((properties, rule) => properties + "," + rule, "merge($properties") + ")";
  }
}
var transformer = new ExcelToFormModel();

async function getFormModel(formPath) {
  if (!formPath) {
    throw new Error("formPath is required");
  }
  const resp = await fetch(formPath);
  const json = await resp.json();
  return json;
}
async function createFormContainer(placeholder, url) {
  const t0 = performance.now();
  const excelModel = await getFormModel(url);
  console.log(excelModel);
  const t1 = performance.now();
  console.log("start time : " + t0 + " end time : " + t1);
  console.log("Get excel Model time: " + (t1 - t0));
  const transformedModel = transformer.transform(excelModel, url);
  console.log(transformedModel);
  const t2 = performance.now();
  console.log("start time : " + t1 + " end time : " + t2);
  console.log("excel model to json model time: " + (t2 - t1));

  let div = document.createElement("div");
  let label1 = document.createElement("label");
  let pre1 = document.createElement("pre");
  label1.innerHTML = "Excel Json"
  pre1.innerText = JSON.stringify(excelModel, null, 2);

  let label2 = document.createElement("label");
  let pre2 = document.createElement("pre");
  label2.innerHTML = "Transformed Json";
  pre2.innerText = JSON.stringify(transformedModel, null, 2);

  div.append(label1, pre1, label2, pre2);

  placeholder.replaceWith(div);

  // let formContainer = new FormContainer({
  //   _formJson: transformedModel,
  //   _path: url
  // });
  // const t3 = performance.now();
  // console.log('Form Model Instance Creation time: ' + (t3 - t2));
  // window.guideContainer = formContainer;
  // formContainer.render(placeholder);
  // const t4 = performance.now();
  // console.log('Form Rendition time: ' + (t4 - t3));
  // console.log('Total time : ' + (t4 - t0));
}
async function decorate(block) {
  const formLinkWrapper = block.querySelector('div.button-container > :has(a[href$=".json"]');
  const formLink = (formLinkWrapper == null ? block : formLinkWrapper).querySelector('a[href$=".json"]');
  if (!formLink || !formLink.href) {
    throw new Error("No formdata action is provided, can't render formblock");
  }
  await createFormContainer(formLinkWrapper ? formLinkWrapper : formLink, formLink.href);
}

export { decorate as default };
