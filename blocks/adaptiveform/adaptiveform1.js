function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return ContinueSentinel;
    }
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
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
  return _extends$1.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

var Constants = {
  /**
   * namespsace of the data-attribute. Any data attribute will be prefixed with this name.
   * i.e. data-name would be data-{NS}-{ComponentClass}-name. Each component will have a different
   * component class
   */
  NS: "cmp",
  /**
   * @summary Form event to be triggered with a Form container is initialized
   *
   * @name  AF_FormContainerInitialised
   * @event
   * @property {object} event
   * @property {object} event.detail instance of FormContainer that is initialzied
   * @example
   * document.on("AF_FormContainerInitialised" , function(event) {
   *      var formContainer = event.detail;
   *      ...
   * }
   */
  FORM_CONTAINER_INITIALISED: "AF_FormContainerInitialised",
  /**
   * @summary Panel event to be triggered when a child view is added to panel view
   *
   * @name  AF_PanelChildAdded
   * @event
   * @property {object} event
   * @property {object} event.detail instance of child view that is added
   * @example
   * panel.element.on("AF_PanelChildAdded" , function(event) {
   *      var childView = event.detail;
   *      ...
   * }
   */
  PANEL_CHILD_ADDED: "AF_PanelChildAdded",
  /**
   * @summary Panel event to be triggered when a child view is removed from panel view
   *
   * @name  AF_PanelChildRemoved
   * @event
   * @property {object} event
   * @property {object} event.detail instance of child view that was removed
   * @example
   * panel.element.on("AF_PanelChildRemoved" , function(event) {
   *      var childView = event.detail;
   *      ...
   * }
   */
  PANEL_CHILD_REMOVED: "AF_PanelChildRemoved",
  /**
   * data attribute to store the form container path. In HTML it will be namespaced
   * data-{NS}-{ComponentClass}-adaptiveformcontainerPath
   */
  FORM_CONTAINER_DATA_ATTRIBUTE: "adaptiveformcontainerPath",
  /**
   * data attribute to be added on clickable element to repeat a repeatable panel
   */
  DATA_HOOK_ADD_INSTANCE: "data-cmp-hook-add-instance",
  /**
   * data attribute to be added on element to remove a repeatable panel
   */
  DATA_HOOK_REMOVE_INSTANCE: "data-cmp-hook-remove-instance",
  /**
   * data attribute to mark the dragged component valid or invalid.
   * value true for valid
   * value false for invalid
   */
  DATA_ATTRIBUTE_VALID: "data-cmp-valid",
  /**
   * data attribute to mark the dragged component enabled or disabled.
   * value true for enabled
   * value false for disabled
   */
  DATA_ATTRIBUTE_ENABLED: "data-cmp-enabled",
  /**
   * data attribute to mark the dragged component visible or invisible.
   * value true for visible
   * value false for invisible
   */
  DATA_ATTRIBUTE_VISIBLE: "data-cmp-visible",
  /**
   * data attribute to mark the dragged component active or inactive.
   * value true for active
   * value false for inactive
   */
  DATA_ATTRIBUTE_ACTIVE: "data-cmp-active",
  /**
   * aria attribute to mark the dragged component disabled.
   */
  ARIA_DISABLED: "aria-disabled",
  /**
   * aria attribute to mark the dragged component hidden.
   */
  ARIA_HIDDEN: "aria-hidden",
  /**
   * aria attribute to mark the dragged component invalid.
   */
  ARIA_INVALID: "aria-invalid",
  /**
   * aria attribute to mark the dragged component checked.
   */
  ARIA_CHECKED: "aria-checked",
  /**
   * aria attribute to mark component selected
   */
  ARIA_SELECTED: "aria-selected",
  /**
   * Event to trigger when GuideBridge Initialisation Begins
   */
  GUIDE_BRIDGE_INITIALIZE_START: "bridgeInitializeStart",
  HTML_ATTRS: {
    /**
     * attribute to mark the dragged component disabled.
     */
    DISABLED: "disabled",
    /**
     * attribute to mark the dragged component checked.
     */
    CHECKED: "checked"
  },
  TABINDEX: "tabindex",
  /**
   * Prefix path for all AF HTTP APIs
   */
  API_PATH_PREFIX: "/adobe/forms/af"
};

var FormField = /*#__PURE__*/function () {
  function FormField(params, model) {
    this.formContainer = void 0;
    this.element = void 0;
    this.active = void 0;
    this.id = void 0;
    this.parentView = void 0;
    this._model = void 0;
    this.options = void 0;
    this.formContainer = params.formContainer;
    this.id = params.id;
    this.element = params.element; //html element of field
    this.active = false;
    this.setModel(model);
  }
  var _proto = FormField.prototype;
  _proto.setId = function setId(id) {
    this.id = id;
  };
  _proto.setParent = function setParent(parentView) {
    this.parentView = parentView;
    if (this.parentView.addChild) {
      this.parentView.addChild(this);
    }
  };
  _proto.setActive = function setActive() {
    if (!this.isActive()) {
      this.element.setAttribute(Constants.DATA_ATTRIBUTE_ACTIVE, "true");
    }
    if (this.parentView && this.parentView.setActive) {
      this.parentView.setActive();
    }
  };
  _proto.setInactive = function setInactive() {
    if (this.isActive()) {
      this.element.setAttribute(Constants.DATA_ATTRIBUTE_ACTIVE, "false");
    }
    if (this.parentView && this.parentView.setInactive) {
      this.parentView.setInactive();
    }
  };
  _proto.isActive = function isActive() {
    return this.active;
  };
  _proto.getFormContainerPath = function getFormContainerPath() {
    var _this$options;
    return (_this$options = this.options) == null ? void 0 : _this$options["adaptiveformcontainerPath"];
  };
  _proto.getId = function getId() {
    return this.id;
  };
  _proto.setModel = function setModel(model) {
    if (typeof this._model === "undefined" || this._model === null) {
      this._model = model;
    } else {
      throw "Re-initializing model is not permitted";
    }
  }
  /**
   * toggles the html element based on the property. If the property is false, then adds the data-attribute and
   * css class
   * @param property
   * @param dataAttribute
   * @param value
   */;
  _proto.toggle = function toggle(property, dataAttribute, value) {
    this.toggleAttribute(this.element, property, dataAttribute, value);
  }
  /**
   * Toggles the given @param element based on the property. If the property is false, then adds the data-attribute and
   * css class
   * @param element
   * @param property
   * @param dataAttribute
   * @param value
   */;
  _proto.toggleAttribute = function toggleAttribute(element, property, dataAttribute, value) {
    if (element) {
      if (property === false) {
        element.setAttribute(dataAttribute, value);
      } else {
        element.removeAttribute(dataAttribute);
      }
    }
  }
  /**
   * @return 'afs:layout' properties. Empty object if no layout property present
   */;
  _proto.getLayoutProperties = function getLayoutProperties() {
    var layoutProperties = {};
    var state = this.getModel().getState();
    if (state && state.properties && state.properties['afs:layout']) {
      layoutProperties = state.properties['afs:layout'];
    }
    return layoutProperties;
  };
  _proto.getModel = function getModel() {
    return this._model;
  };
  _proto.subscribe = function subscribe() {
    throw "the field does not subscribe to the model";
  };
  _proto.getState = function getState() {
    var _this$_model;
    return (_this$_model = this._model) == null ? void 0 : _this$_model.getState();
  };
  _proto.isVisible = function isVisible() {
    return (this == null ? void 0 : this.getState().visible) || true;
  };
  _proto.isEnabled = function isEnabled() {
    return (this == null ? void 0 : this.getState().enabled) || true;
  };
  _proto.isLabelVisible = function isLabelVisible() {
    var _this$getState, _this$getState$label;
    return (this == null ? void 0 : (_this$getState = this.getState()) == null ? void 0 : (_this$getState$label = _this$getState.label) == null ? void 0 : _this$getState$label.visible) || true;
  };
  _proto.getLabelValue = function getLabelValue() {
    var _this$getState2, _this$getState2$label;
    return (this == null ? void 0 : (_this$getState2 = this.getState()) == null ? void 0 : (_this$getState2$label = _this$getState2.label) == null ? void 0 : _this$getState2$label.value) || "";
  };
  _proto.getName = function getName() {
    var _this$getState3;
    return (this == null ? void 0 : (_this$getState3 = this.getState()) == null ? void 0 : _this$getState3.name) || "";
  };
  _proto.isTooltipVisible = function isTooltipVisible() {
    return false; // TBD - Missing in Spec
  };
  _proto.getTooltipValue = function getTooltipValue() {
    return ""; // TBD - Missing in Spec
  };
  _proto.isShortDescVisible = function isShortDescVisible() {
    return false; // TBD - Missing in Spec
  };
  _proto.getShortDescValue = function getShortDescValue() {
    return ""; // TBD - Missing in Spec
  };
  _proto.getDescriptionValue = function getDescriptionValue() {
    var _this$getState4;
    return (this == null ? void 0 : (_this$getState4 = this.getState()) == null ? void 0 : _this$getState4.description) || "";
  };
  _proto.getDefault = function getDefault() {
    var _this$getState5;
    return (this == null ? void 0 : (_this$getState5 = this.getState()) == null ? void 0 : _this$getState5["default"]) || "";
  };
  _proto.isReadOnly = function isReadOnly() {
    var _this$getState6;
    return (this == null ? void 0 : (_this$getState6 = this.getState()) == null ? void 0 : _this$getState6.readOnly) || false;
  };
  _proto.isRequired = function isRequired() {
    var _this$getState7;
    return (this == null ? void 0 : (_this$getState7 = this.getState()) == null ? void 0 : _this$getState7.required) || false;
  };
  _proto.getPlaceHolder = function getPlaceHolder() {
    var _this$getState8;
    return (this == null ? void 0 : (_this$getState8 = this.getState()) == null ? void 0 : _this$getState8.placeholder) || "";
  };
  _proto.getMinLength = function getMinLength() {
    var _this$getState9;
    return this == null ? void 0 : (_this$getState9 = this.getState()) == null ? void 0 : _this$getState9.minLength;
  };
  _proto.getMaxLength = function getMaxLength() {
    var _this$getState10;
    return this == null ? void 0 : (_this$getState10 = this.getState()) == null ? void 0 : _this$getState10.maxLength;
  };
  _proto.getMinimum = function getMinimum() {
    var _this$getState11;
    return this == null ? void 0 : (_this$getState11 = this.getState()) == null ? void 0 : _this$getState11.minimum;
  };
  _proto.getMaximum = function getMaximum() {
    var _this$getState12;
    return this == null ? void 0 : (_this$getState12 = this.getState()) == null ? void 0 : _this$getState12.maximum;
  };
  return FormField;
}();
FormField.IS = "FormField";

var FormFieldBase = /*#__PURE__*/function (_FormField) {
  _inheritsLoose(FormFieldBase, _FormField);
  function FormFieldBase(params, model) {
    var _this;
    _this = _FormField.call(this, params, model) || this;
    _this.qm = void 0;
    _this.widget = void 0;
    _this.label = void 0;
    _this.errorDiv = void 0;
    _this.tooltip = void 0;
    _this.description = void 0;
    _this.element.className = _this.getbemBlock();
    _this.widget = _this.getWidget();
    _this.description = _this.getDescription();
    _this.label = _this.getLabel();
    _this.errorDiv = _this.getErrorDiv();
    _this.qm = _this.getQuestionMarkDiv();
    _this.tooltip = _this.getTooltipDiv();
    return _this;
  }
  /**
   * implementations should return the widget element that is used to capture the value from the user
   * It will be a input/textarea element
   * @returns
   */
  var _proto = FormFieldBase.prototype;
  _proto.getWidget = function getWidget() {
    throw "method not implemented";
  }
  /**
   * implementations should return the element used to show the description of the field
   * @returns
   */;
  _proto.getDescription = function getDescription() {
    throw "method not implemented";
  }
  /**
   * implementations should return the element used to show the label of the field
   * @returns
   */;
  _proto.getLabel = function getLabel() {
    throw "method not implemented";
  }
  /**
   * implementations should return the element used to show the error on the field
   * @returns
   */;
  _proto.getErrorDiv = function getErrorDiv() {
    throw "method not implemented";
  }
  /**
   * implementation should return the tooltip / short description div
   */;
  _proto.getTooltipDiv = function getTooltipDiv() {
    throw "method not implemented";
  }
  /**
   * Implementation should return the questionMark div
   */;
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    throw "method not implemented";
  };
  _proto.setModel = function setModel(model) {
    _FormField.prototype.setModel.call(this, model);
    var state = this._model.getState();
    this._applyState(state);
  }
  /**
   * Sets the focus on component's widget.
   */;
  _proto.setFocus = function setFocus() {
    var _this$getWidget;
    (_this$getWidget = this.getWidget()) == null ? void 0 : _this$getWidget.focus();
  }
  /**
   * applies full state of the field to the HTML. Generally done just after the model is bound to the field
   * @param state
   * @private
   */;
  _proto._applyState = function _applyState(state) {
    if (state.value) {
      this._updateValue(state.value);
    }
    this._updateVisible(state.visible);
    this._updateEnabled(state.enabled);
    this._initializeHelpContent(state);
  };
  _proto._initializeHelpContent = function _initializeHelpContent(state) {
    // Initializing Hint ('?') and long description.
    this._showHideLongDescriptionDiv(false);
    if (this.getDescription()) {
      this._addHelpIconHandler(state);
    }
  }
  /**
   *
   * @param show If true then <div> containing tooltip(Short Description) will be shown else hidden
   * @private
   */;
  _proto._showHideTooltipDiv = function _showHideTooltipDiv(show) {
    if (this.tooltip) {
      this.toggleAttribute(this.getTooltipDiv(), show, Constants.DATA_ATTRIBUTE_VISIBLE, false);
    }
  }
  /**
   *
   * @param show If true then <div> containing description(Long Description) will be shown
   * @private
   */;
  _proto._showHideLongDescriptionDiv = function _showHideLongDescriptionDiv(show) {
    if (this.description) {
      this.toggleAttribute(this.description, show, Constants.DATA_ATTRIBUTE_VISIBLE, false);
    }
  };
  _proto._isTooltipAlwaysVisible = function _isTooltipAlwaysVisible() {
    return !!this.getLayoutProperties()['tooltipVisible'];
  }
  /**
   * updates html based on visible state
   * @param visible
   * @private
   */;
  _proto._updateVisible = function _updateVisible(visible) {
    this.toggle(visible, Constants.ARIA_HIDDEN, true);
    this.element.setAttribute(Constants.DATA_ATTRIBUTE_VISIBLE, visible + "");
  }
  /**
   * udpates the html state based on enable state of the field
   * @param enabled
   * @private
   */;
  _proto._updateEnabled = function _updateEnabled(enabled) {
    if (this.getWidget()) {
      this.toggle(enabled, Constants.ARIA_DISABLED, true);
      this.element.setAttribute(Constants.DATA_ATTRIBUTE_ENABLED, enabled + "");
      if (enabled === false) {
        var _this$getWidget2, _this$getWidget3;
        (_this$getWidget2 = this.getWidget()) == null ? void 0 : _this$getWidget2.setAttribute("disabled", "true");
        (_this$getWidget3 = this.getWidget()) == null ? void 0 : _this$getWidget3.setAttribute(Constants.ARIA_DISABLED, "true");
      } else {
        var _this$getWidget4, _this$getWidget5;
        (_this$getWidget4 = this.getWidget()) == null ? void 0 : _this$getWidget4.removeAttribute("disabled");
        (_this$getWidget5 = this.getWidget()) == null ? void 0 : _this$getWidget5.removeAttribute(Constants.ARIA_DISABLED);
      }
    }
  };
  _proto._updateValid = function _updateValid(valid, state) {
    if (this.errorDiv) {
      this.toggle(valid, Constants.ARIA_INVALID, true);
      this.element.setAttribute(Constants.DATA_ATTRIBUTE_VALID, valid + "");
      if (typeof state.errorMessage !== "string" || state.errorMessage === "") {
        var errMessage = valid === true ? '' : 'There is an error in the field';
        this.errorDiv.innerHTML = errMessage;
      }
    }
  };
  _proto._updateErrorMessage = function _updateErrorMessage(errorMessage, state) {
    if (this.errorDiv) {
      this.errorDiv.innerHTML = state.errorMessage;
    }
  };
  _proto._updateValue = function _updateValue(value) {
    var inputWidget = this.getWidget();
    if (inputWidget) {
      inputWidget.value = value;
    }
  }
  /**
   * Shows or Hides Description Based on click of '?' mark.
   * @private
   */;
  _proto._addHelpIconHandler = function _addHelpIconHandler(state) {
    var questionMarkDiv = this.qm,
      descriptionDiv = this.description,
      tooltipAlwaysVisible = this._isTooltipAlwaysVisible();
    var self = this;
    if (questionMarkDiv && descriptionDiv) {
      questionMarkDiv.addEventListener('click', function (e) {
        e.preventDefault();
        var longDescriptionVisibleAttribute = descriptionDiv.getAttribute(Constants.DATA_ATTRIBUTE_VISIBLE);
        if (longDescriptionVisibleAttribute === 'false') {
          self._showHideLongDescriptionDiv(true);
          if (tooltipAlwaysVisible) {
            self._showHideTooltipDiv(false);
          }
        } else {
          self._showHideLongDescriptionDiv(false);
          if (tooltipAlwaysVisible) {
            self._showHideTooltipDiv(true);
          }
        }
      });
    }
  };
  _proto.getClass = function getClass() {
    return this.constructor.IS;
  };
  _proto.subscribe = function subscribe() {
    var _this2 = this;
    var changeHandlerName = function changeHandlerName(propName) {
      return "_update" + (propName[0].toUpperCase() + propName.slice(1));
    };
    this._model.subscribe(function (action) {
      var state = action.target.getState();
      var changes = action.payload.changes;
      changes.forEach(function (change) {
        var fn = changeHandlerName(change.propertyName);
        //@ts-ignore
        if (typeof _this2[fn] === "function") {
          //items applicable for repeatable panel
          if ("items" === change.propertyName) {
            //@ts-ignore
            _this2[fn](change.prevValue, change.currentValue, state);
          } else {
            //@ts-ignore
            _this2[fn](change.currentValue, state);
          }
        } else {
          console.error("changes to " + change.propertyName + " are not supported. Please raise an issue");
        }
      });
    });
  };
  _proto.getbemBlock = function getbemBlock() {
    throw "bemBlock not implemented";
  };
  _proto.getIS = function getIS() {
    throw "IS is not implemented";
  };
  _proto.getId = function getId() {
    return this.getIS() + "-" + this.id;
  };
  _proto.addListener = function addListener() {};
  _proto.render = function render() {
    this.element.innerHTML = this.getHTML();
    this.addListener();
    this.subscribe();
  };
  _proto.getHTML = function getHTML() {
    return "\n            <div class=\"" + this.getbemBlock() + "\"\n                data-cmp-is=\"" + this.getIS() + "\"\n                id=\"" + this.getId() + "\"\n                data-cmp-visible=\"" + this.isVisible() + "\"\n                data-cmp-enabled=\"" + this.isEnabled() + "\"\n                data-cmp-adaptiveformcontainer-path=\"" + this.getFormContainerPath() + "\">\n\n                " + this.renderLabel() + "\n                " + this.getInputHTML() + "\n                " + this.getQuestionMarkHTML() + "\n                " + this.getShortDescHTML() + "\n                " + this.getLongDescHTML() + "\n                " + this.getErrorHTML() + "\n            </div>";
  };
  _proto.getInputHTML = function getInputHTML() {
    throw "getInputHTML is not implemented";
  };
  _proto.renderLabel = function renderLabel() {
    return "" + (this.isLabelVisible() ? "<label id=\"" + this.getId() + "-label\" for=\"" + this.getId() + "\" class=\"" + this.getbemBlock() + "__label\" >" + this.getLabelValue() + "</label>" : "");
  };
  _proto.getQuestionMarkHTML = function getQuestionMarkHTML() {
    return "" + (this.getDescriptionValue() ? "<button class=\"" + this.getbemBlock() + "__questionmark\" data-sly-test=\"" + this.getDescriptionValue() + "\">\n        </button>" : "");
  };
  _proto.getShortDescHTML = function getShortDescHTML() {
    return "" + (this.isShortDescVisible() ? "<div id=\"" + this.getId() + "-shortDescription\" class=\"" + this.getbemBlock() + "__shortdescription\">\n                {this.getShortDescValue()}\n            </div>" : "");
  };
  _proto.getLongDescHTML = function getLongDescHTML() {
    return "<div aria-live=\"polite\">\n                " + (this.getDescriptionValue() ? "<div id=\"" + this.getId() + "-longDescription\" class=\"" + this.getbemBlock() + "__longdescription\"></div>" : "") + "\n            </div>";
  };
  _proto.getErrorHTML = function getErrorHTML() {
    return "<div id=\"" + this.getId() + "-errorMessage\" class=\"" + this.getbemBlock() + "__errormessage\"></div>";
  };
  _proto.getDisabledHTML = function getDisabledHTML() {
    return "" + (this.isEnabled() ? "" : " disabled=\"true\" ");
  };
  _proto.getReadonlyHTML = function getReadonlyHTML() {
    return "" + (this.isReadOnly() ? " readonly=\"true\" " : "");
  };
  return FormFieldBase;
}(FormField);

var TextInput = /*#__PURE__*/function (_FormFieldBase) {
  _inheritsLoose(TextInput, _FormFieldBase);
  function TextInput() {
    return _FormFieldBase.apply(this, arguments) || this;
  }
  var _proto = TextInput.prototype;
  _proto.getWidget = function getWidget() {
    return this.element.querySelector(TextInput.selectors.widget);
  };
  _proto.getDescription = function getDescription() {
    return this.element.querySelector(TextInput.selectors.description);
  };
  _proto.getLabel = function getLabel() {
    return this.element.querySelector(TextInput.selectors.label);
  };
  _proto.getErrorDiv = function getErrorDiv() {
    return this.element.querySelector(TextInput.selectors.errorDiv);
  };
  _proto.getTooltipDiv = function getTooltipDiv() {
    return this.element.querySelector(TextInput.selectors.tooltipDiv);
  };
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    return this.element.querySelector(TextInput.selectors.qm);
  };
  _proto.addListener = function addListener() {
    var _this$getWidget,
      _this = this,
      _this$getWidget2;
    (_this$getWidget = this.getWidget()) == null ? void 0 : _this$getWidget.addEventListener('blur', function (e) {
      _this._model.value = e.target.value;
      _this.setInactive();
    });
    (_this$getWidget2 = this.getWidget()) == null ? void 0 : _this$getWidget2.addEventListener('focus', function (e) {
      _this.setActive();
    });
  };
  _proto.getbemBlock = function getbemBlock() {
    return TextInput.bemBlock;
  };
  _proto.getIS = function getIS() {
    return TextInput.IS;
  };
  _proto.getInputHTML = function getInputHTML() {
    return "<input\n            class=\"cmp-adaptiveform-textinput__widget\"\n            title=\"" + (this.isTooltipVisible() ? this.getTooltipValue() : '') + "\"\n            aria-label=\"" + (this.isLabelVisible() ? this.getLabelValue() : '') + "\"\n            type=\"text\"\n            name=\"" + this.getName() + "\"\n            value=\"" + this.getDefault() + "\"\n            " + this.getDisabledHTML() + "\n            " + this.getReadonlyHTML() + "\n            required=\"" + this.isRequired() + "\"\n            placeholder=\"" + this.getPlaceHolder() + "\"\n            minlength=\"" + this.getMinLength() + "\"\n            maxlength=\"" + this.getMaxLength() + "\"/>";
  };
  return TextInput;
}(FormFieldBase);
TextInput.NS = Constants.NS;
TextInput.IS = "adaptiveFormTextInput";
TextInput.bemBlock = 'cmp-adaptiveform-textinput';
TextInput.selectors = {
  self: "[data-" + TextInput.NS + '-is="' + TextInput.IS + '"]',
  widget: "." + TextInput.bemBlock + "__widget",
  label: "." + TextInput.bemBlock + "__label",
  description: "." + TextInput.bemBlock + "__longdescription",
  qm: "." + TextInput.bemBlock + "__questionmark",
  errorDiv: "." + TextInput.bemBlock + "__errormessage",
  tooltipDiv: "." + TextInput.bemBlock + "__shortdescription"
};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var _DateParser = DateParser;

var getSkeleton_1 = getSkeleton;
var parseDateTimeSkeleton_1 = parseDateTimeSkeleton;



/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2022 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

/**
 * https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * Credit: https://git.corp.adobe.com/dc/dfl/blob/master/src/patterns/parseDateTimeSkeleton.js
 * Created a separate library to be used elsewhere as well.
 */
const DATE_TIME_REGEX = // eslint-disable-next-line max-len
/(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvV]{1,5}|[zZOvVxX]{1,3}|S{1,3}|'(?:[^']|'')*')|[^a-zA-Z']+/g;

function getSkeleton(skeleton, language) {
  if (_DateParser.ShorthandStyles.find(type => skeleton.includes(type))) {
    const parsed = parseDateStyle(skeleton, language);
    const result = [];
    const symbols = {
      month: 'M',
      year: 'Y',
      day: 'd'
    };
    parsed.forEach(_ref => {
      let [type, option, length] = _ref;

      if (type in symbols) {
        result.push(Array(length).fill(symbols[type]).join(''));
      } else if (type === 'literal') {
        result.push(option);
      }
    });
    return result.join('');
  }

  return skeleton;
}
/**
 *
 * @param skeleton shorthand style for the date concatenated with shorthand style of time. The
 * Shorthand style for both date and time is one of ['full', 'long', 'medium', 'short'].
 * @param language {string} language to parse the date shorthand style
 * @returns {[*,string][]}
 */


function parseDateStyle(skeleton, language) {
  const options = {}; // the skeleton could have two keywords -- one for date, one for time

  const styles = skeleton.split(/\s/).filter(s => s.length);
  options.dateStyle = styles[0];
  if (styles.length > 1) options.timeStyle = styles[1];
  const testDate = new Date(2000, 2, 1, 2, 3, 4);
  const parts = new Intl.DateTimeFormat(language, options).formatToParts(testDate); // oddly, the formatted month name can be different from the standalone month name

  const formattedMarch = parts.find(p => p.type === 'month').value;
  const longMarch = new Intl.DateTimeFormat(language, {
    month: 'long'
  }).formatToParts(testDate)[0].value;
  const shortMarch = new Intl.DateTimeFormat(language, {
    month: 'short'
  }).formatToParts(testDate)[0].value;
  const result = [];
  parts.forEach(_ref2 => {
    let {
      type,
      value
    } = _ref2;
    let option;

    if (type === 'month') {
      option = {
        [formattedMarch]: skeleton === 'medium' ? 'short' : 'long',
        [longMarch]: 'long',
        [shortMarch]: 'short',
        '03': '2-digit',
        '3': 'numeric'
      }[value];
    }

    if (type === 'year') option = {
      '2000': 'numeric',
      '00': '2-digit'
    }[value];
    if (['day', 'hour', 'minute', 'second'].includes(type)) option = value.length === 2 ? '2-digit' : 'numeric';
    if (type === 'literal') option = value;
    if (type === 'dayPeriod') option = 'short';
    result.push([type, option, value.length]);
  });
  return result;
}
/**
 * Parse Date time skeleton into Intl.DateTimeFormatOptions parts
 * Ref: https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 */


function parseDateTimeSkeleton(skeleton, language) {
  if (_DateParser.ShorthandStyles.find(type => skeleton.includes(type))) {
    return parseDateStyle(skeleton, language);
  }

  const result = [];
  skeleton.replace(DATE_TIME_REGEX, match => {
    const len = match.length;

    switch (match[0]) {
      // Era
      case 'G':
        result.push(['era', len === 4 ? 'long' : len === 5 ? 'narrow' : 'short', len]);
        break;
      // Year

      case 'y':
        result.push(['year', len === 2 ? '2-digit' : 'numeric', len]);
        break;

      case 'Y':
      case 'u':
      case 'U':
      case 'r':
        throw new RangeError('`Y/u/U/r` (year) patterns are not supported, use `y` instead');
      // Quarter

      case 'q':
      case 'Q':
        throw new RangeError('`q/Q` (quarter) patterns are not supported');
      // Month

      case 'M':
      case 'L':
        result.push(['month', ['numeric', '2-digit', 'short', 'long', 'narrow'][len - 1], len]);
        break;
      // Week

      case 'w':
      case 'W':
        throw new RangeError('`w/W` (week) patterns are not supported');

      case 'd':
        result.push(['day', ['numeric', '2-digit'][len - 1], len]);
        break;

      case 'D':
      case 'F':
      case 'g':
        throw new RangeError('`D/F/g` (day) patterns are not supported, use `d` instead');
      // Weekday

      case 'E':
        result.push(['weekday', ['short', 'short', 'short', 'long', 'narrow', 'narrow'][len - 1], len]);
        break;

      case 'e':
        if (len < 4) {
          throw new RangeError('`e..eee` (weekday) patterns are not supported');
        }

        result.push(['weekday', ['short', 'long', 'narrow', 'short'][len - 4], len]);
        break;

      case 'c':
        if (len < 3 || len > 5) {
          throw new RangeError('`c, cc, cccccc` (weekday) patterns are not supported');
        }

        result.push(['weekday', ['short', 'long', 'narrow', 'short'][len - 3], len]);
        break;
      // Period

      case 'a':
        // AM, PM
        result.push(['hour12', true, 1]);
        break;

      case 'b': // am, pm, noon, midnight

      case 'B':
        // flexible day periods
        throw new RangeError('`b/B` (period) patterns are not supported, use `a` instead');
      // Hour

      case 'h':
        result.push(['hourCycle', 'h12']);
        result.push(['hour', ['numeric', '2-digit'][len - 1], len]);
        break;

      case 'H':
        result.push(['hourCycle', 'h23', 1]);
        result.push(['hour', ['numeric', '2-digit'][len - 1], len]);
        break;

      case 'K':
        result.push(['hourCycle', 'h11', 1]);
        result.push(['hour', ['numeric', '2-digit'][len - 1], len]);
        break;

      case 'k':
        result.push(['hourCycle', 'h24', 1]);
        result.push(['hour', ['numeric', '2-digit'][len - 1], len]);
        break;

      case 'j':
      case 'J':
      case 'C':
        throw new RangeError('`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead');
      // Minute

      case 'm':
        result.push(['minute', ['numeric', '2-digit'][len - 1], len]);
        break;
      // Second

      case 's':
        result.push(['second', ['numeric', '2-digit'][len - 1], len]);
        break;

      case 'S':
        result.push(['fractionalSecondDigits', len, len]);
        break;

      case 'A':
        throw new RangeError('`S/A` (millisecond) patterns are not supported, use `s` instead');
      // Zone

      case 'O':
        // timeZone GMT-8 or GMT-08:00
        result.push(['timeZoneName', len < 4 ? 'shortOffset' : 'longOffset', len]);
        result.push(['x-timeZoneName', len < 4 ? 'O' : 'OOOO', len]);
        break;

      case 'X': // 1, 2, 3, 4: The ISO8601 varios formats

      case 'x': // 1, 2, 3, 4: The ISO8601 varios formats

      case 'Z':
        // 1..3, 4, 5: The ISO8601 varios formats
        // Z, ZZ, ZZZ should produce -0800
        // ZZZZ should produce GMT-08:00
        // ZZZZZ should produce -8:00 or -07:52:58
        result.push(['timeZoneName', 'longOffset', 1]);
        result.push(['x-timeZoneName', match, 1]);
        break;

      case 'z': // 1..3, 4: specific non-location format

      case 'v': // 1, 4: generic non-location format

      case 'V':
        // 1, 2, 3, 4: time zone ID or city
        throw new RangeError('z/v/V` (timeZone) patterns are not supported, use `X/x/Z/O` instead');

      case '\'':
        result.push(['literal', match.slice(1, -1).replace(/''/g, '\''), -1]);
        break;

      default:
        result.push(['literal', match, -1]);
    }

    return '';
  });
  return result;
}

var SkeletonParser = /*#__PURE__*/Object.defineProperty({
	getSkeleton: getSkeleton_1,
	parseDateTimeSkeleton: parseDateTimeSkeleton_1
}, '__esModule', {value: true});

var DateParser = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShorthandStyles = void 0;
exports.adjustTimeZone = adjustTimeZone;
exports.datetimeToNumber = datetimeToNumber;
exports.formatDate = formatDate;
exports.numberToDatetime = numberToDatetime;
exports.offsetMS = offsetMS;
exports.offsetMSFallback = offsetMSFallback;
exports.parseDate = parseDate;
exports.parseDefaultDate = parseDefaultDate;



/*************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *  Copyright 2022 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

/**
 * Credit: https://git.corp.adobe.com/dc/dfl/blob/master/src/patterns/dates.js
 */
// Test Japanese full/half width character support
// get the localized month names resulting from a given pattern
const twelveMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(m => new Date(2000, m, 1));
/**
 * returns the name of all the months for a given locale and given Date Format Settings
 * @param locale {string}
 * @param options {string} instance of Intl.DateTimeFormatOptions
 */

function monthNames(locale, options) {
  return twelveMonths.map(month => {
    const parts = new Intl.DateTimeFormat(locale, options).formatToParts(month);
    const m = parts.find(p => p.type === 'month');
    return m && m.value;
  });
}
/**
 * return an array of digits used by a given locale
 * @param locale {string}
 */


function digitChars(locale) {
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    useGrouping: false
  }).format(9876543210).split('').reverse();
}
/**
 * returns the calendar name used in a given locale
 * @param locale {string}
 */


function calendarName(locale) {
  var _parts$find;

  const parts = new Intl.DateTimeFormat(locale, {
    era: 'short'
  }).formatToParts(new Date());
  const era = (_parts$find = parts.find(p => p.type === 'era')) === null || _parts$find === void 0 ? void 0 : _parts$find.value;
  return era === 'هـ' ? 'islamic' : 'gregory';
}
/**
 * returns the representation of the time of day for a given language
 * @param language {string}
 */


function getDayPeriod(language) {
  const morning = new Date(2000, 1, 1, 1, 1, 1);
  const afternoon = new Date(2000, 1, 1, 16, 1, 1);
  const df = new Intl.DateTimeFormat(language, {
    dateStyle: 'full',
    timeStyle: 'full'
  });
  const am = df.formatToParts(morning).find(p => p.type === 'dayPeriod');
  const pm = df.formatToParts(afternoon).find(p => p.type === 'dayPeriod');
  if (!am || !pm) return null;
  return {
    regex: `(${am.value}|${pm.value})`,
    fn: (period, obj) => obj.hour += period === pm.value ? 12 : 0
  };
}
/**
 * get the offset in MS, given a date and timezone
 * @param dateObj {Date}
 * @param timeZone {string}
 */


function offsetMS(dateObj, timeZone) {
  let tzOffset;

  try {
    tzOffset = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'longOffset'
    }).format(dateObj);
  } catch (e) {
    return offsetMSFallback(dateObj, timeZone);
  }

  const offset = /GMT([+\-−])?(\d{1,2}):?(\d{0,2})?/.exec(tzOffset);
  if (!offset) return 0;
  const [sign, hours, minutes] = offset.slice(1);
  const nHours = isNaN(parseInt(hours)) ? 0 : parseInt(hours);
  const nMinutes = isNaN(parseInt(minutes)) ? 0 : parseInt(minutes);
  const result = (nHours * 60 + nMinutes) * 60 * 1000;
  return sign === '-' ? -result : result;
}

function getTimezoneOffsetFrom(otherTimezone) {
  var date = new Date();

  function objFromStr(str) {
    var array = str.replace(":", " ").split(" ");
    return {
      day: parseInt(array[0]),
      hour: parseInt(array[1]),
      minute: parseInt(array[2])
    };
  }

  var str = date.toLocaleString('en-US', {
    timeZone: otherTimezone,
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  var other = objFromStr(str);
  str = date.toLocaleString('en-US', {
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  var myLocale = objFromStr(str);
  var otherOffset = other.day * 24 * 60 + other.hour * 60 + other.minute; // utc date + otherTimezoneDifference

  var myLocaleOffset = myLocale.day * 24 * 60 + myLocale.hour * 60 + myLocale.minute; // utc date + myTimeZoneDifference
  // (utc date + otherZoneDifference) - (utc date + myZoneDifference) - (-1 * myTimeZoneDifference)

  return otherOffset - myLocaleOffset - date.getTimezoneOffset();
}

function offsetMSFallback(dateObj, timezone) {
  //const defaultOffset = dateObj.getTimezoneOffset();
  const timezoneOffset = getTimezoneOffsetFrom(timezone);
  return timezoneOffset * 60 * 1000;
}
/**
 * adjust from the default JavaScript timezone to the default timezone
 * @param dateObj {Date}
 * @param timeZone {string}
 */


function adjustTimeZone(dateObj, timeZone) {
  if (dateObj === null) return null; // const defaultOffset = new Intl.DateTimeFormat('en-US', { timeZoneName: 'longOffset'}).format(dateObj);

  let baseDate = dateObj.getTime() - dateObj.getTimezoneOffset() * 60 * 1000;
  const offset = offsetMS(dateObj, timeZone);
  offsetMSFallback(dateObj, timeZone);
  baseDate += -offset; // get the offset for the default JS environment
  // return days since the epoch

  return new Date(baseDate);
}
/**
 * Our script object model treats dates as numbers where the integer portion is days since the epoch,
 * the fractional portion is the number hours in the day
 * @param dateObj {Date}
 * @returns {number}
 */


function datetimeToNumber(dateObj) {
  if (dateObj === null) return 0; // return days since the epoch

  return dateObj.getTime() / (1000 * 60 * 60 * 24);
}
/**
 * Our script object model treats dates as numbers where the integer portion is days since the epoch,
 * the fractional portion is the number hours in the day
 * @param num
 * @returns {Date}
 */


function numberToDatetime(num) {
  return new Date(Math.round(num * 1000 * 60 * 60 * 24));
}
/**
 * in some cases, DateTimeFormat doesn't respect the 'numeric' vs. '2-digit' setting
 * for time values. The function corrects that
 * @param formattedParts instance of Intl.DateTimeFormatPart[]
 * @param parsed
 */


function fixDigits(formattedParts, parsed) {
  ['hour', 'minute', 'second'].forEach(type => {
    const defn = formattedParts.find(f => f.type === type);
    if (!defn) return;
    const fmt = parsed.find(pair => pair[0] === type)[1];
    if (fmt === '2-digit' && defn.value.length === 1) defn.value = `0${defn.value}`;
    if (fmt === 'numeric' && defn.value.length === 2 && defn.value.charAt(0) === '0') defn.value = defn.value.slice(1);
  });
}

function fixYear(formattedParts, parsed) {
  // two digit years are handled differently in DateTimeFormat. 00 becomes 1900
  // providing a two digit year 0010 gets formatted to 10 and when parsed becomes 1910
  // Hence we need to pad the year with 0 as required by the skeleton and mentioned in
  // unicode. https://www.unicode.org/reports/tr35/tr35-dates.html#dfst-year
  const defn = formattedParts.find(f => f.type === 'year');
  if (!defn) return; // eslint-disable-next-line no-unused-vars

  const chars = parsed.find(pair => pair[0] === 'year')[2];

  while (defn.value.length < chars) {
    defn.value = `0${defn.value}`;
  }
}
/**
 *
 * @param dateValue {Date}
 * @param language {string}
 * @param skeleton {string}
 * @param timeZone {string}
 * @returns {T}
 */


function formatDateToParts(dateValue, language, skeleton, timeZone) {
  // DateTimeFormat renames some of the options in its formatted output
  //@ts-ignore
  const mappings = key => ({
    hour12: 'dayPeriod',
    fractionalSecondDigits: 'fractionalSecond'
  })[key] || key; // produces an array of name/value pairs of skeleton parts


  const allParameters = (0, SkeletonParser.parseDateTimeSkeleton)(skeleton, language);
  allParameters.push(['timeZone', timeZone]);
  const parsed = allParameters.filter(p => !p[0].startsWith('x-'));
  const nonStandard = allParameters.filter(p => p[0].startsWith('x-')); // reduce to a set of options that can be used to format

  const options = Object.fromEntries(parsed);
  delete options.literal;
  const df = new Intl.DateTimeFormat(language, options); // formattedParts will have all the pieces we need for our date -- but not in the correct order

  const formattedParts = df.formatToParts(dateValue);
  fixDigits(formattedParts, allParameters);
  fixYear(formattedParts, parsed); // iterate through the original parsed components and use its ordering and literals,
  // and add  the formatted pieces

  return parsed.reduce((result, cur) => {
    if (cur[0] === 'literal') result.push(cur);else {
      const v = formattedParts.find(p => p.type === mappings(cur[0]));

      if (v && v.type === 'timeZoneName') {
        const tz = nonStandard.find(p => p[0] === 'x-timeZoneName')[1];
        const category = tz[0];

        if (category === 'Z') {
          if (tz.length < 4) {
            // handle 'Z', 'ZZ', 'ZZZ' Time Zone: ISO8601 basic hms? / RFC 822
            v.value = v.value.replace(/(GMT|:)/g, '');
            if (v.value === '') v.value = '+0000';
          } else if (tz.length === 5) {
            // 'ZZZZZ' Time Zone: ISO8601 extended hms?
            if (v.value === 'GMT') v.value = 'Z';else v.value = v.value.replace(/GMT/, '');
          }
        }

        if (category === 'X' || category === 'x') {
          if (tz.length === 1) {
            // 'X' ISO8601 basic hm?, with Z for 0
            // -08, +0530, Z
            // 'x' ISO8601 basic hm?, without Z for 0
            v.value = v.value.replace(/(GMT|:(00)?)/g, '');
          }

          if (tz.length === 2) {
            // 'XX' ISO8601 basic hm, with Z
            // -0800, Z
            // 'xx' ISO8601 basic hm, without Z
            v.value = v.value.replace(/(GMT|:)/g, '');
          }

          if (tz.length === 3) {
            // 'XXX' ISO8601 extended hm, with Z
            // -08:00, Z
            // 'xxx' ISO8601 extended hm, without Z
            v.value = v.value.replace(/GMT/g, '');
          }

          if (category === 'X' && v.value === '') v.value = 'Z';
        } else if (tz === 'O') {
          // eliminate 'GMT', leading and trailing zeros
          v.value = v.value.replace(/GMT/g, '').replace(/0(\d+):/, '$1:').replace(/:00/, '');
          if (v.value === '') v.value = '+0';
        }
      }

      if (v) result.push([v.type, v.value]);
    }
    return result;
  }, []);
}

const ShorthandStyles = ["full", "long", "medium", "short"];
/**
 *
 * @param dateValue {Date}
 * @param language {string}
 * @param skeleton {string}
 * @param timeZone {string}
 */

exports.ShorthandStyles = ShorthandStyles;

function formatDate(dateValue, language, skeleton, timeZone) {
  if (ShorthandStyles.find(type => skeleton.includes(type))) {
    const options = {
      timeZone
    }; // the skeleton could have two keywords -- one for date, one for time

    const parts = skeleton.split(/\s/).filter(s => s.length);

    if (ShorthandStyles.indexOf(parts[0]) > -1) {
      options.dateStyle = parts[0];
    }

    if (parts.length > 1 && ShorthandStyles.indexOf(parts[1]) > -1) {
      options.timeStyle = parts[1];
    }

    return new Intl.DateTimeFormat(language, options).format(dateValue);
  }

  const parts = formatDateToParts(dateValue, language, skeleton, timeZone);
  return parts.map(p => p[1]).join('');
}
/**
 *
 * @param dateString {string}
 * @param language {string}
 * @param skeleton {string}
 * @param timeZone {string}
 */


function parseDate(dateString, language, skeleton, timeZone) {
  let bUseUTC = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  // start by getting all the localized parts of a date/time picture:
  // digits, calendar name
  const lookups = [];
  const regexParts = [];
  const calendar = calendarName(language);
  const digits = digitChars(language);
  const twoDigit = `([${digits[0]}-${digits[9]}]{1,2})`;
  const threeDigit = `([${digits[0]}-${digits[9]}]{1,3})`;
  const fourDigit = `([${digits[0]}-${digits[9]}]{1,4})`;
  let hourCycle = 'h12';
  let _bUseUTC = bUseUTC;
  let _setFullYear = false; // functions to process the results of the regex match

  const isSeparator = str => str.length === 1 && ':-/.'.includes(str);

  const monthNumber = str => getNumber(str) - 1;

  const getNumber = str => str.split('').reduce((total, digit) => total * 10 + digits.indexOf(digit), 0);

  const yearNumber = templateDigits => str => {
    let year = getNumber(str); //todo: align with AF

    year = year < 100 && templateDigits === 2 ? year + 2000 : year;
    if (calendar === 'islamic') year = Math.ceil(year * 0.97 + 622);

    if (templateDigits > 2 && year < 100) {
      _setFullYear = true;
    }

    return year;
  };

  const monthLookup = list => month => list.indexOf(month);

  const parsed = (0, SkeletonParser.parseDateTimeSkeleton)(skeleton, language);
  const months = monthNames(language, Object.fromEntries(parsed)); // build up a regex expression that identifies each option in the skeleton
  // We build two parallel structures:
  // 1. the regex expression that will extract parts of the date/time
  // 2. a lookup array that will convert the matched results into date/time values

  parsed.forEach(_ref => {
    let [option, value, len] = _ref;

    // use a generic regex pattern for all single-character separator literals.
    // Then we'll be forgiving when it comes to separators: / vs - vs : etc
    if (option === 'literal') {
      if (isSeparator(value)) regexParts.push(`[^${digits[0]}-${digits[9]}]`);else regexParts.push(value);
    } else if (option === 'month' && ['numeric', '2-digit'].includes(value)) {
      regexParts.push(twoDigit);
      lookups.push(['month', monthNumber]);
    } else if (option === 'month' && ['formatted', 'long', 'short', 'narrow'].includes(value)) {
      regexParts.push(`(${months.join('|')})`);
      lookups.push(['month', monthLookup(months)]);
    } else if (['day', 'minute', 'second'].includes(option)) {
      if (option === 'minute' || option === 'second') {
        _bUseUTC = false;
      }

      regexParts.push(twoDigit);
      lookups.push([option, getNumber]);
    } else if (option === 'fractionalSecondDigits') {
      _bUseUTC = false;
      regexParts.push(threeDigit);
      lookups.push([option, (v, obj) => obj.fractionalSecondDigits + getNumber(v)]);
    } else if (option === 'hour') {
      _bUseUTC = false;
      regexParts.push(twoDigit);
      lookups.push([option, (v, obj) => obj.hour + getNumber(v)]);
    } else if (option === 'year') {
      regexParts.push('numeric' === value ? fourDigit : twoDigit);
      lookups.push(['year', yearNumber(len)]);
    } else if (option === 'dayPeriod') {
      _bUseUTC = false;
      const dayPeriod = getDayPeriod(language);

      if (dayPeriod) {
        regexParts.push(dayPeriod.regex);
        lookups.push(['hour', dayPeriod.fn]);
      } // Any other part that we don't need, we'll just add a non-greedy consumption

    } else if (option === 'hourCycle') {
      _bUseUTC = false;
      hourCycle = value;
    } else if (option === 'x-timeZoneName') {
      _bUseUTC = false; // we handle only the GMT offset picture

      regexParts.push('(?:GMT|UTC|Z)?([+\\-−0-9]{0,3}:?[0-9]{0,2})');
      lookups.push([option, (v, obj) => {
        _bUseUTC = true; // v could be undefined if we're on GMT time

        if (!v) return; // replace the unicode minus, then extract hours [and minutes]

        const timeParts = v.replace(/−/, '-').match(/([+\-\d]{2,3}):?(\d{0,2})/);
        const hours = timeParts[1] * 1;
        obj.hour -= hours;
        const mins = timeParts.length > 2 ? timeParts[2] * 1 : 0;
        obj.minute -= hours < 0 ? -mins : mins;
      }]);
    } else if (option !== 'timeZoneName') {
      _bUseUTC = false;
      regexParts.push('.+?');
    }

    return regexParts;
  }, []);
  const regex = new RegExp(regexParts.join(''));
  const match = dateString.match(regex);
  if (match === null) return dateString; // now loop through all the matched pieces and build up an object we'll use to create a Date object

  const dateObj = {
    year: 1972,
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    fractionalSecondDigits: 0
  };
  match.slice(1).forEach((m, index) => {
    const [element, func] = lookups[index];
    dateObj[element] = func(m, dateObj);
  });
  if (hourCycle === 'h24' && dateObj.hour === 24) dateObj.hour = 0;
  if (hourCycle === 'h12' && dateObj.hour === 12) dateObj.hour = 0;

  if (_bUseUTC) {
    const utcDate = new Date(Date.UTC(dateObj.year, dateObj.month, dateObj.day, dateObj.hour, dateObj.minute, dateObj.second, dateObj.fractionalSecondDigits));

    if (_setFullYear) {
      utcDate.setUTCFullYear(dateObj.year);
    }

    return utcDate;
  }

  const jsDate = new Date(dateObj.year, dateObj.month, dateObj.day, dateObj.hour, dateObj.minute, dateObj.second, dateObj.fractionalSecondDigits);

  if (_setFullYear) {
    jsDate.setFullYear(dateObj.year);
  }

  return timeZone == null ? jsDate : adjustTimeZone(jsDate, timeZone);
}

function parseDefaultDate(dateString, language, bUseUTC) {
  return parseDate(dateString, language, 'short', null, false);
}
});

var date = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formatDate", {
  enumerable: true,
  get: function () {
    return _DateParser.formatDate;
  }
});
Object.defineProperty(exports, "getSkeleton", {
  enumerable: true,
  get: function () {
    return SkeletonParser.getSkeleton;
  }
});
Object.defineProperty(exports, "parseDate", {
  enumerable: true,
  get: function () {
    return _DateParser.parseDate;
  }
});
});

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "formatDate", {
  enumerable: true,
  get: function () {
    return date.formatDate;
  }
});
Object.defineProperty(exports, "getSkeleton", {
  enumerable: true,
  get: function () {
    return date.getSkeleton;
  }
});
Object.defineProperty(exports, "parseDate", {
  enumerable: true,
  get: function () {
    return date.parseDate;
  }
});
});

var _E, _e11;
var t = {
    TYPE_NUMBER: 0,
    TYPE_ANY: 1,
    TYPE_STRING: 2,
    TYPE_ARRAY: 3,
    TYPE_OBJECT: 4,
    TYPE_BOOLEAN: 5,
    TYPE_EXPREF: 6,
    TYPE_NULL: 7,
    TYPE_ARRAY_NUMBER: 8,
    TYPE_ARRAY_STRING: 9,
    TYPE_CLASS: 10,
    TYPE_ARRAY_ARRAY: 11
  },
  e = {
    TOK_EOF: "EOF",
    TOK_UNQUOTEDIDENTIFIER: "UnquotedIdentifier",
    TOK_QUOTEDIDENTIFIER: "QuotedIdentifier",
    TOK_RBRACKET: "Rbracket",
    TOK_RPAREN: "Rparen",
    TOK_COMMA: "Comma",
    TOK_COLON: "Colon",
    TOK_CONCATENATE: "Concatenate",
    TOK_RBRACE: "Rbrace",
    TOK_NUMBER: "Number",
    TOK_CURRENT: "Current",
    TOK_GLOBAL: "Global",
    TOK_FIELD: "Field",
    TOK_EXPREF: "Expref",
    TOK_PIPE: "Pipe",
    TOK_OR: "Or",
    TOK_AND: "And",
    TOK_ADD: "Add",
    TOK_SUBTRACT: "Subtract",
    TOK_MULTIPLY: "Multiply",
    TOK_POWER: "Power",
    TOK_UNION: "Union",
    TOK_DIVIDE: "Divide",
    TOK_EQ: "EQ",
    TOK_GT: "GT",
    TOK_LT: "LT",
    TOK_GTE: "GTE",
    TOK_LTE: "LTE",
    TOK_NE: "NE",
    TOK_FLATTEN: "Flatten",
    TOK_STAR: "Star",
    TOK_FILTER: "Filter",
    TOK_DOT: "Dot",
    TOK_NOT: "Not",
    TOK_LBRACE: "Lbrace",
    TOK_LBRACKET: "Lbracket",
    TOK_LPAREN: "Lparen",
    TOK_LITERAL: "Literal"
  };
var r = t.TYPE_NUMBER,
  n = t.TYPE_ANY,
  s = t.TYPE_STRING,
  i = t.TYPE_ARRAY,
  u = t.TYPE_OBJECT,
  o = t.TYPE_BOOLEAN,
  c = t.TYPE_EXPREF,
  a = t.TYPE_NULL,
  l = t.TYPE_ARRAY_NUMBER,
  h = t.TYPE_ARRAY_STRING,
  _ = t.TYPE_CLASS,
  p = t.TYPE_ARRAY_ARRAY,
  T = e.TOK_EXPREF,
  E = (_E = {}, _E[r] = "number", _E[n] = "any", _E[s] = "string", _E[i] = "array", _E[u] = "object", _E[o] = "boolean", _E[c] = "expression", _E[a] = "null", _E[l] = "Array<number>", _E[h] = "Array<string>", _E[_] = "class", _E[p] = "Array<array>", _E);
function f(t, e) {
  if (e === void 0) {
    e = !0;
  }
  if (null === t) return a;
  var n = t;
  if (e) {
    if ("function" != typeof t.valueOf) return u;
    n = t.valueOf.call(t);
  }
  switch (Object.prototype.toString.call(n)) {
    case "[object String]":
      return s;
    case "[object Number]":
      return r;
    case "[object Array]":
      return i;
    case "[object Boolean]":
      return o;
    case "[object Null]":
      return a;
    case "[object Object]":
      return n.jmespathType === T ? c : u;
    default:
      return u;
  }
}
function d(t) {
  return [f(t), f(t, !1)];
}
function y(t, e, c, T, f, g) {
  var _e2;
  var O = t[0];
  if (-1 !== e.findIndex(function (t) {
    return t === n || O === t;
  })) return c;
  var R = !1;
  if ((O === u || 1 === e.length && e[0] === _) && (R = !0), O === i && 1 === e.length && e[0] === u && (R = !0), e.includes(p)) {
    if (O === i && (c.forEach(function (t) {
      t instanceof Array || (R = !0);
    }), !R)) return c;
    R = !0;
  }
  if (R) throw new Error("TypeError: " + T + " expected argument to be type " + E[e[0]] + " but received type " + E[O] + " instead.");
  var N = -1;
  if (O === i && e.includes(h) && e.includes(l) && (N = c.length > 0 && "string" == typeof c[0] ? h : l), -1 === N && [h, l, i].includes(O) && (N = e.find(function (t) {
    return [h, l, i].includes(t);
  })), -1 === N && (_e2 = e, N = _e2[0], _e2), N === n) return c;
  if (N === h || N === l || N === i) {
    if (N === i) return O === l || O === h ? c : null === c ? [] : [c];
    var _e3 = N === l ? r : s;
    if (O === i) {
      var _t2 = c.slice();
      for (var _r = 0; _r < _t2.length; _r += 1) {
        var _n = d(_t2[_r]);
        _t2[_r] = y(_n, [_e3], _t2[_r], T, f, g);
      }
      return _t2;
    }
    if ([r, s, a, o].includes(_e3)) return [y(t, [_e3], c, T, f, g)];
  } else {
    if (N === r) return [s, o, a].includes(O) ? f(c) : 0;
    if (N === s) return O === a || O === u ? "" : g(c);
    if (N === o) return !!c;
    if (N === u && t[1] === u) return c;
  }
  throw new Error("unhandled argument");
}
function g(t) {
  return null !== t && "[object Array]" === Object.prototype.toString.call(t);
}
function O(t) {
  return null !== t && "[object Object]" === Object.prototype.toString.call(t);
}
function R(t) {
  return null == t ? t : g(t) ? t.map(function (t) {
    return R(t);
  }) : "function" != typeof t.valueOf ? t : t.valueOf();
}
function N(t, e) {
  var r = R(t),
    n = R(e);
  if (r === n) return !0;
  if (Object.prototype.toString.call(r) !== Object.prototype.toString.call(n)) return !1;
  if (!0 === g(r)) {
    if (r.length !== n.length) return !1;
    for (var _t3 = 0; _t3 < r.length; _t3 += 1) {
      if (!1 === N(r[_t3], n[_t3])) return !1;
    }
    return !0;
  }
  if (!0 === O(r)) {
    var _t4 = {};
    for (var _e4 in r) {
      if (hasOwnProperty.call(r, _e4)) {
        if (!1 === N(r[_e4], n[_e4])) return !1;
        _t4[_e4] = !0;
      }
    }
    for (var _e5 in n) {
      if (hasOwnProperty.call(n, _e5) && !0 !== _t4[_e5]) return !1;
    }
    return !0;
  }
  return !1;
}
var P = e.TOK_CURRENT,
  m = e.TOK_GLOBAL,
  Y = e.TOK_EXPREF,
  v = e.TOK_PIPE,
  A = e.TOK_EQ,
  K = e.TOK_GT,
  I = e.TOK_LT,
  S = e.TOK_GTE,
  b = e.TOK_LTE,
  x = e.TOK_NE,
  U = e.TOK_FLATTEN,
  M = t.TYPE_STRING,
  w = t.TYPE_ARRAY_STRING,
  L = t.TYPE_ARRAY;
function B(t) {
  if (null === t) return !0;
  var e = R(t);
  if ("" === e || !1 === e || null === e) return !0;
  if (g(e) && 0 === e.length) return !0;
  if (O(e)) {
    for (var _t5 in e) {
      if (Object.prototype.hasOwnProperty.call(e, _t5)) return !1;
    }
    return !0;
  }
  return !e;
}
var k = /*#__PURE__*/function () {
  function k(t, e, r, n, s, i) {
    this.runtime = t, this.globals = e, this.toNumber = r, this.toString = n, this.debug = s, this.language = i;
  }
  var _proto = k.prototype;
  _proto.search = function search(t, e) {
    return this.visit(t, e);
  };
  _proto.visit = function visit(t, e) {
    var _this = this,
      _Field$Subexpression$;
    var r = t && (_Field$Subexpression$ = {
      Field: function Field(t, e) {
        if (null !== e && (O(e) || g(e))) {
          var _r2 = e[t.name];
          if ("function" == typeof _r2 && (_r2 = void 0), void 0 === _r2) {
            try {
              _this.debug.push("Failed to find: '" + t.name + "'");
              var _r3 = Object.keys(e).map(function (t) {
                return "'" + t + "'";
              }).toString();
              _r3.length && _this.debug.push("Available fields: " + _r3);
            } catch (t) {}
            return null;
          }
          return _r2;
        }
        return null;
      },
      Subexpression: function Subexpression(t, e) {
        var r = _this.visit(t.children[0], e);
        for (var _e6 = 1; _e6 < t.children.length; _e6 += 1) {
          if (r = _this.visit(t.children[1], r), null === r) return null;
        }
        return r;
      },
      IndexExpression: function IndexExpression(t, e) {
        var r = _this.visit(t.children[0], e);
        return _this.visit(t.children[1], r);
      },
      Index: function Index(t, e) {
        if (g(e)) {
          var _r4 = _this.toNumber(_this.visit(t.value, e));
          _r4 < 0 && (_r4 = e.length + _r4);
          var _n2 = e[_r4];
          return void 0 === _n2 ? (_this.debug.push("Index " + _r4 + " out of range"), null) : _n2;
        }
        if (O(e)) {
          var _r5 = _this.toString(_this.visit(t.value, e)),
            _n3 = e[_r5];
          return void 0 === _n3 ? (_this.debug.push("Key " + _r5 + " does not exist"), null) : _n3;
        }
        return _this.debug.push("left side of index expression " + e + " is not an array or object."), null;
      },
      Slice: function Slice(t, e) {
        if (!g(e)) return null;
        var r = t.children.slice(0).map(function (t) {
            return null != t ? _this.toNumber(_this.visit(t, e)) : null;
          }),
          n = _this.computeSliceParams(e.length, r),
          s = n[0],
          i = n[1],
          u = n[2],
          o = [];
        if (u > 0) for (var _t6 = s; _t6 < i; _t6 += u) {
          o.push(e[_t6]);
        } else for (var _t7 = s; _t7 > i; _t7 += u) {
          o.push(e[_t7]);
        }
        return o;
      },
      Projection: function Projection(t, e) {
        var r = _this.visit(t.children[0], e);
        if (!g(r)) return null;
        var n = [];
        return r.forEach(function (e) {
          var r = _this.visit(t.children[1], e);
          null !== r && n.push(r);
        }), n;
      },
      ValueProjection: function ValueProjection(t, e) {
        var r = _this.visit(t.children[0], e);
        if (!O(R(r))) return null;
        var n = [];
        return Object.values(r).forEach(function (e) {
          var r = _this.visit(t.children[1], e);
          null !== r && n.push(r);
        }), n;
      },
      FilterProjection: function FilterProjection(t, e) {
        var r = _this.visit(t.children[0], e);
        if (!g(r)) return null;
        var n = r.filter(function (e) {
            return !B(_this.visit(t.children[2], e));
          }),
          s = [];
        return n.forEach(function (e) {
          var r = _this.visit(t.children[1], e);
          null !== r && s.push(r);
        }), s;
      },
      Comparator: function Comparator(t, e) {
        var r = _this.visit(t.children[0], e),
          n = _this.visit(t.children[1], e);
        if (t.name === A) return N(r, n);
        if (t.name === x) return !N(r, n);
        if (t.name === K) return r > n;
        if (t.name === S) return r >= n;
        if (t.name === I) return r < n;
        if (t.name === b) return r <= n;
        throw new Error("Unknown comparator: " + t.name);
      }
    }, _Field$Subexpression$[U] = function (t, e) {
      var r = _this.visit(t.children[0], e);
      if (!g(r)) return null;
      var n = [];
      return r.forEach(function (t) {
        g(t) ? n.push.apply(n, t) : n.push(t);
      }), n;
    }, _Field$Subexpression$.Identity = function Identity(t, e) {
      return e;
    }, _Field$Subexpression$.MultiSelectList = function MultiSelectList(t, e) {
      return null === e ? null : t.children.map(function (t) {
        return _this.visit(t, e);
      });
    }, _Field$Subexpression$.MultiSelectHash = function MultiSelectHash(t, e) {
      if (null === e) return null;
      var r = {};
      return t.children.forEach(function (t) {
        r[t.name] = _this.visit(t.value, e);
      }), r;
    }, _Field$Subexpression$.OrExpression = function OrExpression(t, e) {
      var r = _this.visit(t.children[0], e);
      return B(r) && (r = _this.visit(t.children[1], e)), r;
    }, _Field$Subexpression$.AndExpression = function AndExpression(t, e) {
      var r = _this.visit(t.children[0], e);
      return !0 === B(r) ? r : _this.visit(t.children[1], e);
    }, _Field$Subexpression$.AddExpression = function AddExpression(t, e) {
      var r = _this.visit(t.children[0], e),
        n = _this.visit(t.children[1], e);
      return _this.applyOperator(r, n, "+");
    }, _Field$Subexpression$.ConcatenateExpression = function ConcatenateExpression(t, e) {
      var r = _this.visit(t.children[0], e),
        n = _this.visit(t.children[1], e);
      return r = y(d(r), [M, w], r, "concatenate", _this.toNumber, _this.toString), n = y(d(n), [M, w], n, "concatenate", _this.toNumber, _this.toString), _this.applyOperator(r, n, "&");
    }, _Field$Subexpression$.UnionExpression = function UnionExpression(t, e) {
      var r = _this.visit(t.children[0], e),
        n = _this.visit(t.children[1], e);
      return r = y(d(r), [L], r, "union", _this.toNumber, _this.toString), n = y(d(n), [L], n, "union", _this.toNumber, _this.toString), r.concat(n);
    }, _Field$Subexpression$.SubtractExpression = function SubtractExpression(t, e) {
      var r = _this.visit(t.children[0], e),
        n = _this.visit(t.children[1], e);
      return _this.applyOperator(r, n, "-");
    }, _Field$Subexpression$.MultiplyExpression = function MultiplyExpression(t, e) {
      var r = _this.visit(t.children[0], e),
        n = _this.visit(t.children[1], e);
      return _this.applyOperator(r, n, "*");
    }, _Field$Subexpression$.DivideExpression = function DivideExpression(t, e) {
      var r = _this.visit(t.children[0], e),
        n = _this.visit(t.children[1], e);
      return _this.applyOperator(r, n, "/");
    }, _Field$Subexpression$.PowerExpression = function PowerExpression(t, e) {
      var r = _this.visit(t.children[0], e),
        n = _this.visit(t.children[1], e);
      return _this.applyOperator(r, n, "^");
    }, _Field$Subexpression$.NotExpression = function NotExpression(t, e) {
      return B(_this.visit(t.children[0], e));
    }, _Field$Subexpression$.Literal = function Literal(t) {
      return t.value;
    }, _Field$Subexpression$.Number = function Number(t) {
      return t.value;
    }, _Field$Subexpression$[v] = function (t, e) {
      var r = _this.visit(t.children[0], e);
      return _this.visit(t.children[1], r);
    }, _Field$Subexpression$[P] = function (t, e) {
      return e;
    }, _Field$Subexpression$[m] = function (t) {
      var e = _this.globals[t.name];
      return void 0 === e ? null : e;
    }, _Field$Subexpression$.Function = function Function(t, e) {
      if ("if" === t.name) return _this.runtime.callFunction(t.name, t.children, e, _this, !1);
      var r = t.children.map(function (t) {
        return _this.visit(t, e);
      });
      return _this.runtime.callFunction(t.name, r, e, _this);
    }, _Field$Subexpression$.ExpressionReference = function ExpressionReference(t) {
      var _t$children = t.children,
        e = _t$children[0];
      return e.jmespathType = Y, e;
    }, _Field$Subexpression$)[t.type];
    if (!r) throw new Error("Unknown/missing node type " + (t && t.type || ""));
    return r(t, e);
  };
  _proto.computeSliceParams = function computeSliceParams(t, e) {
    function r(t, e, r) {
      var n = e;
      return n < 0 ? (n += t, n < 0 && (n = r < 0 ? -1 : 0)) : n >= t && (n = r < 0 ? t - 1 : t), n;
    }
    var n = e[0],
      s = e[1],
      i = e[2];
    if (null === i) i = 1;else if (0 === i) {
      var _t8 = new Error("Invalid slice, step cannot be 0");
      throw _t8.name = "RuntimeError", _t8;
    }
    var u = i < 0;
    return n = null === n ? u ? t - 1 : 0 : r(t, n, i), s = null === s ? u ? -1 : t : r(t, s, i), [n, s, i];
  };
  _proto.applyOperator = function applyOperator(t, e, r) {
    var _this2 = this;
    if (g(t) && g(e)) {
      var _n4 = t.length < e.length ? t : e,
        _s = Math.abs(t.length - e.length);
      _n4.length += _s, _n4.fill(null, _n4.length - _s);
      var _i = [];
      for (var _n5 = 0; _n5 < t.length; _n5 += 1) {
        _i.push(this.applyOperator(t[_n5], e[_n5], r));
      }
      return _i;
    }
    if (g(t)) return t.map(function (t) {
      return _this2.applyOperator(t, e, r);
    });
    if (g(e)) return e.map(function (e) {
      return _this2.applyOperator(t, e, r);
    });
    if ("*" === r) return this.toNumber(t) * this.toNumber(e);
    if ("&" === r) return t + e;
    if ("+" === r) return this.toNumber(t) + this.toNumber(e);
    if ("-" === r) return this.toNumber(t) - this.toNumber(e);
    if ("/" === r) {
      var _r6 = t / e;
      return Number.isFinite(_r6) ? _r6 : null;
    }
    if ("^" === r) return Math.pow(t, e);
    throw new Error("Unknown operator: " + r);
  };
  return k;
}();
var C = e.TOK_UNQUOTEDIDENTIFIER,
  j = e.TOK_QUOTEDIDENTIFIER,
  D = e.TOK_RBRACKET,
  G = e.TOK_RPAREN,
  F = e.TOK_COMMA,
  $ = e.TOK_COLON,
  H = e.TOK_CONCATENATE,
  Q = e.TOK_RBRACE,
  J = e.TOK_NUMBER,
  q = e.TOK_CURRENT,
  z = e.TOK_GLOBAL,
  X = e.TOK_EXPREF,
  V = e.TOK_PIPE,
  W = e.TOK_OR,
  Z = e.TOK_AND,
  tt = e.TOK_ADD,
  et = e.TOK_SUBTRACT,
  rt = e.TOK_MULTIPLY,
  nt = e.TOK_POWER,
  st = e.TOK_DIVIDE,
  it = e.TOK_UNION,
  ut = e.TOK_EQ,
  ot = e.TOK_GT,
  ct = e.TOK_LT,
  at = e.TOK_GTE,
  lt = e.TOK_LTE,
  ht = e.TOK_NE,
  _t = e.TOK_FLATTEN,
  pt = e.TOK_STAR,
  Tt = e.TOK_FILTER,
  Et = e.TOK_DOT,
  ft = e.TOK_NOT,
  dt = e.TOK_LBRACE,
  yt = e.TOK_LBRACKET,
  gt = e.TOK_LPAREN,
  Ot = e.TOK_LITERAL,
  Rt = {
    ".": Et,
    ",": F,
    ":": $,
    "{": dt,
    "}": Q,
    "]": D,
    "(": gt,
    ")": G,
    "@": q
  },
  Nt = {
    "<": !0,
    ">": !0,
    "=": !0,
    "!": !0
  },
  Pt = {
    " ": !0,
    "\t": !0,
    "\n": !0
  };
function mt(t, e) {
  return t >= "0" && t <= "9" || e && "-" === t || "." === t;
}
function Yt(t) {
  return t >= "a" && t <= "z" || t >= "A" && t <= "Z" || t >= "0" && t <= "9" || "_" === t;
}
function vt(t, e) {
  var r = t[e];
  return "$" === r ? t.length > e && Yt(t[e + 1]) : r >= "a" && r <= "z" || r >= "A" && r <= "Z" || "_" === r;
}
var At = /*#__PURE__*/function () {
  function At(t, e) {
    if (t === void 0) {
      t = [];
    }
    if (e === void 0) {
      e = [];
    }
    this._allowedGlobalNames = t, this.debug = e;
  }
  var _proto2 = At.prototype;
  _proto2.tokenize = function tokenize(t) {
    var e = [];
    var r, n, s;
    for (this._current = 0; this._current < t.length;) {
      var _i2 = e.length ? e.slice(-1)[0].type : null;
      if (this._isGlobal(_i2, t, this._current)) e.push(this._consumeGlobal(t));else if (vt(t, this._current)) r = this._current, n = this._consumeUnquotedIdentifier(t), e.push({
        type: C,
        value: n,
        start: r
      });else if (void 0 !== Rt[t[this._current]]) e.push({
        type: Rt[t[this._current]],
        value: t[this._current],
        start: this._current
      }), this._current += 1;else if ("-" === t[this._current] && ![q, J, G, C, j, D].includes(_i2) || mt(t[this._current], !1)) s = this._consumeNumber(t), e.push(s);else if ("[" === t[this._current]) s = this._consumeLBracket(t), e.push(s);else if ('"' === t[this._current]) r = this._current, n = this._consumeQuotedIdentifier(t), e.push({
        type: j,
        value: n,
        start: r
      });else if ("'" === t[this._current]) r = this._current, n = this._consumeRawStringLiteral(t), e.push({
        type: Ot,
        value: n,
        start: r
      });else if ("`" === t[this._current]) {
        r = this._current;
        var _n6 = this._consumeLiteral(t);
        e.push({
          type: Ot,
          value: _n6,
          start: r
        });
      } else if (void 0 !== Nt[t[this._current]]) e.push(this._consumeOperator(t));else if (void 0 !== Pt[t[this._current]]) this._current += 1;else if ("&" === t[this._current]) r = this._current, this._current += 1, "&" === t[this._current] ? (this._current += 1, e.push({
        type: Z,
        value: "&&",
        start: r
      })) : e.push(_i2 === F || _i2 === gt ? {
        type: X,
        value: "&",
        start: r
      } : {
        type: H,
        value: "&",
        start: r
      });else if ("~" === t[this._current]) r = this._current, this._current += 1, e.push({
        type: it,
        value: "~",
        start: r
      });else if ("+" === t[this._current]) r = this._current, this._current += 1, e.push({
        type: tt,
        value: "+",
        start: r
      });else if ("-" === t[this._current]) r = this._current, this._current += 1, e.push({
        type: et,
        value: "-",
        start: r
      });else if ("*" === t[this._current]) {
        r = this._current, this._current += 1;
        var _t9 = e.length && e.slice(-1)[0].type;
        0 === e.length || [yt, Et, V, Z, W, F, $].includes(_t9) ? e.push({
          type: pt,
          value: "*",
          start: r
        }) : e.push({
          type: rt,
          value: "*",
          start: r
        });
      } else if ("/" === t[this._current]) r = this._current, this._current += 1, e.push({
        type: st,
        value: "/",
        start: r
      });else if ("^" === t[this._current]) r = this._current, this._current += 1, e.push({
        type: nt,
        value: "^",
        start: r
      });else {
        if ("|" !== t[this._current]) {
          var _e7 = new Error("Unknown character:" + t[this._current]);
          throw _e7.name = "LexerError", _e7;
        }
        r = this._current, this._current += 1, "|" === t[this._current] ? (this._current += 1, e.push({
          type: W,
          value: "||",
          start: r
        })) : e.push({
          type: V,
          value: "|",
          start: r
        });
      }
    }
    return e;
  };
  _proto2._consumeUnquotedIdentifier = function _consumeUnquotedIdentifier(t) {
    var e = this._current;
    for (this._current += 1; this._current < t.length && Yt(t[this._current]);) {
      this._current += 1;
    }
    return t.slice(e, this._current);
  };
  _proto2._consumeQuotedIdentifier = function _consumeQuotedIdentifier(t) {
    var e = this._current;
    this._current += 1;
    var r = t.length;
    var n = !vt(t, e + 1);
    for (; '"' !== t[this._current] && this._current < r;) {
      var _e8 = this._current;
      Yt(t[_e8]) || (n = !0), _e8 += "\\" !== t[_e8] || "\\" !== t[_e8 + 1] && '"' !== t[_e8 + 1] ? 1 : 2, this._current = _e8;
    }
    this._current += 1;
    var s = t.slice(e, this._current);
    try {
      n && !s.includes(" ") || (this.debug.push("Suspicious quotes: " + s), this.debug.push("Did you intend a literal? '" + s.replace(/"/g, "") + "'?"));
    } catch (t) {}
    return JSON.parse(s);
  };
  _proto2._consumeRawStringLiteral = function _consumeRawStringLiteral(t) {
    var e = this._current;
    this._current += 1;
    var r = t.length;
    for (; "'" !== t[this._current] && this._current < r;) {
      var _e9 = this._current;
      _e9 += "\\" !== t[_e9] || "\\" !== t[_e9 + 1] && "'" !== t[_e9 + 1] ? 1 : 2, this._current = _e9;
    }
    return this._current += 1, t.slice(e + 1, this._current - 1).replaceAll("\\'", "'");
  };
  _proto2._consumeNumber = function _consumeNumber(t) {
    var e = this._current;
    this._current += 1;
    var r = t.length;
    for (; mt(t[this._current], !1) && this._current < r;) {
      this._current += 1;
    }
    var n = t.slice(e, this._current);
    var s;
    return s = n.includes(".") ? parseFloat(n) : parseInt(n, 10), {
      type: J,
      value: s,
      start: e
    };
  };
  _proto2._consumeLBracket = function _consumeLBracket(t) {
    var e = this._current;
    return this._current += 1, "?" === t[this._current] ? (this._current += 1, {
      type: Tt,
      value: "[?",
      start: e
    }) : "]" === t[this._current] ? (this._current += 1, {
      type: _t,
      value: "[]",
      start: e
    }) : {
      type: yt,
      value: "[",
      start: e
    };
  };
  _proto2._isGlobal = function _isGlobal(t, e, r) {
    if (null !== t && t === Et) return !1;
    if ("$" !== e[r]) return !1;
    var n = r + 1;
    for (; n < e.length && Yt(e[n]);) {
      n += 1;
    }
    var s = e.slice(r, n);
    return this._allowedGlobalNames.includes(s);
  };
  _proto2._consumeGlobal = function _consumeGlobal(t) {
    var e = this._current;
    for (this._current += 1; this._current < t.length && Yt(t[this._current]);) {
      this._current += 1;
    }
    var r = t.slice(e, this._current);
    return {
      type: z,
      name: r,
      start: e
    };
  };
  _proto2._consumeOperator = function _consumeOperator(t) {
    var e = this._current,
      r = t[e];
    return this._current += 1, "!" === r ? "=" === t[this._current] ? (this._current += 1, {
      type: ht,
      value: "!=",
      start: e
    }) : {
      type: ft,
      value: "!",
      start: e
    } : "<" === r ? "=" === t[this._current] ? (this._current += 1, {
      type: lt,
      value: "<=",
      start: e
    }) : {
      type: ct,
      value: "<",
      start: e
    } : ">" === r ? "=" === t[this._current] ? (this._current += 1, {
      type: at,
      value: ">=",
      start: e
    }) : {
      type: ot,
      value: ">",
      start: e
    } : "=" === t[this._current] ? (this._current += 1, {
      type: ut,
      value: "==",
      start: e
    }) : {
      type: ut,
      value: "=",
      start: e
    };
  };
  _proto2._consumeLiteral = function _consumeLiteral(t) {
    this._current += 1;
    var e = this._current,
      r = t.length;
    var n,
      s = !1;
    for (; (s || "`" !== t[this._current]) && this._current < r;) {
      var _e10 = this._current;
      s && "\\" === t[_e10] && '"' === t[_e10 + 1] ? _e10 += 2 : ('"' === t[_e10] && (s = !s), _e10 += s && "`" === t[_e10 + 1] ? 2 : "\\" !== t[_e10] || "\\" !== t[_e10 + 1] && "`" !== t[_e10 + 1] ? 1 : 2), this._current = _e10;
    }
    var i = t.slice(e, this._current).trimStart();
    return i = i.replaceAll("\\`", "`"), n = function (t) {
      if ("" === t) return !1;
      if ('[{"'.includes(t[0])) return !0;
      if (["true", "false", "null"].includes(t)) return !0;
      if (!"-0123456789".includes(t[0])) return !1;
      try {
        return JSON.parse(t), !0;
      } catch (t) {
        return !1;
      }
    }(i) ? JSON.parse(i) : JSON.parse("\"" + i + "\""), this._current += 1, n;
  };
  return At;
}();
var Kt = e.TOK_LITERAL,
  It = e.TOK_COLON,
  St = e.TOK_EOF,
  bt = e.TOK_UNQUOTEDIDENTIFIER,
  xt = e.TOK_QUOTEDIDENTIFIER,
  Ut = e.TOK_RBRACKET,
  Mt = e.TOK_RPAREN,
  wt = e.TOK_COMMA,
  Lt = e.TOK_CONCATENATE,
  Bt = e.TOK_RBRACE,
  kt = e.TOK_NUMBER,
  Ct = e.TOK_CURRENT,
  jt = e.TOK_GLOBAL,
  Dt = e.TOK_FIELD,
  Gt = e.TOK_EXPREF,
  Ft = e.TOK_PIPE,
  $t = e.TOK_OR,
  Ht = e.TOK_AND,
  Qt = e.TOK_ADD,
  Jt = e.TOK_SUBTRACT,
  qt = e.TOK_MULTIPLY,
  zt = e.TOK_POWER,
  Xt = e.TOK_DIVIDE,
  Vt = e.TOK_UNION,
  Wt = e.TOK_EQ,
  Zt = e.TOK_GT,
  te = e.TOK_LT,
  ee = e.TOK_GTE,
  re = e.TOK_LTE,
  ne = e.TOK_NE,
  se = e.TOK_FLATTEN,
  ie = e.TOK_STAR,
  ue = e.TOK_FILTER,
  oe = e.TOK_DOT,
  ce = e.TOK_NOT,
  ae = e.TOK_LBRACE,
  le = e.TOK_LBRACKET,
  he = e.TOK_LPAREN,
  _e = (_e11 = {}, _e11[St] = 0, _e11[bt] = 0, _e11[xt] = 0, _e11[Ut] = 0, _e11[Mt] = 0, _e11[wt] = 0, _e11[Bt] = 0, _e11[kt] = 0, _e11[Ct] = 0, _e11[jt] = 0, _e11[Dt] = 0, _e11[Gt] = 0, _e11[Ft] = 1, _e11[$t] = 2, _e11[Ht] = 3, _e11[Qt] = 6, _e11[Jt] = 6, _e11[Lt] = 7, _e11[qt] = 7, _e11[Xt] = 7, _e11[zt] = 7, _e11[Vt] = 7, _e11[Wt] = 5, _e11[Zt] = 5, _e11[te] = 5, _e11[ee] = 5, _e11[re] = 5, _e11[ne] = 5, _e11[se] = 9, _e11[ie] = 20, _e11[ue] = 21, _e11[oe] = 40, _e11[ce] = 45, _e11[ae] = 50, _e11[le] = 55, _e11[he] = 60, _e11);
var pe = /*#__PURE__*/function () {
  function pe(t) {
    if (t === void 0) {
      t = [];
    }
    this._allowedGlobalNames = t;
  }
  var _proto3 = pe.prototype;
  _proto3.parse = function parse(t, e) {
    this._loadTokens(t, e), this.index = 0;
    var r = this.expression(0);
    if (this._lookahead(0) !== St) {
      var _t10 = this._lookaheadToken(0),
        _e12 = new Error("Unexpected token type: " + _t10.type + ", value: " + _t10.value);
      throw _e12.name = "ParserError", _e12;
    }
    return r;
  };
  _proto3._loadTokens = function _loadTokens(t, e) {
    var r = new At(this._allowedGlobalNames, e).tokenize(t);
    r.push({
      type: St,
      value: "",
      start: t.length
    }), this.tokens = r;
  };
  _proto3.expression = function expression(t) {
    var e = this._lookaheadToken(0);
    this._advance();
    var r = this.nud(e),
      n = this._lookahead(0);
    for (; t < _e[n];) {
      this._advance(), r = this.led(n, r), n = this._lookahead(0);
    }
    return r;
  };
  _proto3._lookahead = function _lookahead(t) {
    return this.tokens[this.index + t].type;
  };
  _proto3._lookaheadToken = function _lookaheadToken(t) {
    return this.tokens[this.index + t];
  };
  _proto3._advance = function _advance() {
    this.index += 1;
  };
  _proto3._getIndex = function _getIndex() {
    return this.index;
  };
  _proto3._setIndex = function _setIndex(t) {
    this.index = t;
  };
  _proto3.nud = function nud(t) {
    var e, r, n, s, i;
    switch (t.type) {
      case Kt:
        return {
          type: "Literal",
          value: t.value
        };
      case kt:
        return {
          type: "Number",
          value: t.value
        };
      case bt:
        return {
          type: "Field",
          name: t.value
        };
      case xt:
        if (s = {
          type: "Field",
          name: t.value
        }, this._lookahead(0) === he) throw new Error("Quoted identifier not allowed for function names.");
        return s;
      case ce:
        return r = this.expression(_e.Not), {
          type: "NotExpression",
          children: [r]
        };
      case ie:
        return e = {
          type: "Identity"
        }, r = this._lookahead(0) === Ut ? {
          type: "Identity"
        } : this._parseProjectionRHS(_e.Star), {
          type: "ValueProjection",
          children: [e, r]
        };
      case ue:
        return this.led(t.type, {
          type: "Identity"
        });
      case ae:
        return this._parseMultiselectHash();
      case se:
        return e = {
          type: se,
          children: [{
            type: "Identity"
          }]
        }, r = this._parseProjectionRHS(_e.Flatten), {
          type: "Projection",
          children: [e, r]
        };
      case le:
        return this._lookahead(0) === ie && this._lookahead(1) === Ut ? (this._advance(), this._advance(), r = this._parseProjectionRHS(_e.Star), {
          type: "Projection",
          children: [{
            type: "Identity"
          }, r]
        }) : this._parseUnchainedIndexExpression();
      case Ct:
        return {
          type: Ct
        };
      case jt:
        return {
          type: jt,
          name: t.name
        };
      case Dt:
        return {
          type: Dt
        };
      case Gt:
        return n = this.expression(_e.Expref), {
          type: "ExpressionReference",
          children: [n]
        };
      case he:
        for (i = []; this._lookahead(0) !== Mt;) {
          n = this.expression(0), i.push(n);
        }
        return this._match(Mt), i[0];
      default:
        this._errorToken(t);
    }
  };
  _proto3.led = function led(t, e) {
    var r, n, s, i, u, o, c, a, l;
    switch (t) {
      case Lt:
        return n = this.expression(_e.Concatenate), {
          type: "ConcatenateExpression",
          children: [e, n]
        };
      case oe:
        return c = _e.Dot, this._lookahead(0) !== ie ? (n = this._parseDotRHS(c), {
          type: "Subexpression",
          children: [e, n]
        }) : (this._advance(), n = this._parseProjectionRHS(c), {
          type: "ValueProjection",
          children: [e, n]
        });
      case Ft:
        return n = this.expression(_e.Pipe), {
          type: Ft,
          children: [e, n]
        };
      case $t:
        return n = this.expression(_e.Or), {
          type: "OrExpression",
          children: [e, n]
        };
      case Ht:
        return n = this.expression(_e.And), {
          type: "AndExpression",
          children: [e, n]
        };
      case Qt:
        return n = this.expression(_e.Add), {
          type: "AddExpression",
          children: [e, n]
        };
      case Jt:
        return n = this.expression(_e.Subtract), {
          type: "SubtractExpression",
          children: [e, n]
        };
      case qt:
        return n = this.expression(_e.Multiply), {
          type: "MultiplyExpression",
          children: [e, n]
        };
      case Xt:
        return n = this.expression(_e.Divide), {
          type: "DivideExpression",
          children: [e, n]
        };
      case zt:
        return n = this.expression(_e.Power), {
          type: "PowerExpression",
          children: [e, n]
        };
      case Vt:
        return n = this.expression(_e.Power), {
          type: "UnionExpression",
          children: [e, n]
        };
      case he:
        for (s = e.name, i = []; this._lookahead(0) !== Mt;) {
          u = this.expression(0), this._lookahead(0) === wt && this._match(wt), i.push(u);
        }
        return this._match(Mt), o = {
          type: "Function",
          name: s,
          children: i
        }, o;
      case ue:
        return r = this.expression(0), this._match(Ut), n = this._lookahead(0) === se ? {
          type: "Identity"
        } : this._parseProjectionRHS(_e.Filter), {
          type: "FilterProjection",
          children: [e, n, r]
        };
      case se:
        return a = {
          type: se,
          children: [e]
        }, l = this._parseProjectionRHS(_e.Flatten), {
          type: "Projection",
          children: [a, l]
        };
      case Wt:
      case ne:
      case Zt:
      case ee:
      case te:
      case re:
        return this._parseComparator(e, t);
      case le:
        return this._lookahead(0) === ie && this._lookahead(1) === Ut ? (this._advance(), this._advance(), n = this._parseProjectionRHS(_e.Star), {
          type: "Projection",
          children: [e, n]
        }) : (n = this._parseChainedIndexExpression(), this._projectIfSlice(e, n));
      default:
        this._errorToken(this._lookaheadToken(0));
    }
  };
  _proto3._match = function _match(t) {
    if (this._lookahead(0) !== t) {
      var _e13 = this._lookaheadToken(0),
        _r7 = new Error("Expected " + t + ", got: " + _e13.type);
      throw _r7.name = "ParserError", _r7;
    }
    this._advance();
  };
  _proto3._errorToken = function _errorToken(t) {
    var e = new Error("Invalid token (" + t.type + "): \"" + t.value + "\"");
    throw e.name = "ParserError", e;
  };
  _proto3._parseChainedIndexExpression = function _parseChainedIndexExpression() {
    var t = this._getIndex();
    if (this._lookahead(0) === It) return this._parseSliceExpression();
    var e = this.expression(0);
    return this._lookahead(0) === It ? (this._setIndex(t), this._parseSliceExpression()) : (this._match(Ut), {
      type: "Index",
      value: e
    });
  };
  _proto3._parseUnchainedIndexExpression = function _parseUnchainedIndexExpression() {
    var t = this._getIndex(),
      e = this._lookahead(0);
    if (e === It) {
      var _t11 = this._parseSliceExpression();
      return this._projectIfSlice({
        type: "Identity"
      }, _t11);
    }
    var r = this.expression(0),
      n = this._lookahead(0);
    if (n === wt) return this._setIndex(t), this._parseMultiselectList();
    if (n === It) {
      this._setIndex(t);
      var _e14 = this._parseSliceExpression();
      return this._projectIfSlice({
        type: "Identity"
      }, _e14);
    }
    return e === kt ? (this._match(Ut), {
      type: "Index",
      value: r
    }) : (this._setIndex(t), this._parseMultiselectList());
  };
  _proto3._projectIfSlice = function _projectIfSlice(t, e) {
    var r = {
      type: "IndexExpression",
      children: [t, e]
    };
    return "Slice" === e.type ? {
      type: "Projection",
      children: [r, this._parseProjectionRHS(_e.Star)]
    } : r;
  };
  _proto3._parseSliceExpression = function _parseSliceExpression() {
    var t = [null, null, null];
    var e = 0,
      r = this._lookahead(0);
    for (; r !== Ut && e < 3;) {
      if (r === It && e < 2) e += 1, this._advance();else {
        t[e] = this.expression(0);
        var _r8 = this._lookahead(0);
        if (_r8 !== It && _r8 !== Ut) {
          var _t12 = new Error("Syntax error, unexpected token: " + _r8.value + "(" + _r8.type + ")");
          throw _t12.name = "Parsererror", _t12;
        }
      }
      r = this._lookahead(0);
    }
    return this._match(Ut), {
      type: "Slice",
      children: t
    };
  };
  _proto3._parseComparator = function _parseComparator(t, e) {
    return {
      type: "Comparator",
      name: e,
      children: [t, this.expression(_e[e])]
    };
  };
  _proto3._parseDotRHS = function _parseDotRHS(t) {
    var e = this._lookahead(0);
    return [bt, xt, ie].indexOf(e) >= 0 ? this.expression(t) : e === le ? (this._match(le), this._parseMultiselectList()) : e === ae ? (this._match(ae), this._parseMultiselectHash()) : void 0;
  };
  _proto3._parseProjectionRHS = function _parseProjectionRHS(t) {
    var e;
    if (_e[this._lookahead(0)] < 10) e = {
      type: "Identity"
    };else if (this._lookahead(0) === le) e = this.expression(t);else if (this._lookahead(0) === ue) e = this.expression(t);else {
      if (this._lookahead(0) !== oe) {
        var _t13 = this._lookaheadToken(0),
          _e15 = new Error("Sytanx error, unexpected token: " + _t13.value + "(" + _t13.type + ")");
        throw _e15.name = "ParserError", _e15;
      }
      this._match(oe), e = this._parseDotRHS(t);
    }
    return e;
  };
  _proto3._parseMultiselectList = function _parseMultiselectList() {
    var t = [];
    for (; this._lookahead(0) !== Ut;) {
      var _e16 = this.expression(0);
      if (t.push(_e16), this._lookahead(0) === wt && (this._match(wt), this._lookahead(0) === Ut)) throw new Error("Unexpected token Rbracket");
    }
    return this._match(Ut), {
      type: "MultiSelectList",
      children: t
    };
  };
  _proto3._parseMultiselectHash = function _parseMultiselectHash() {
    var t = [],
      e = [bt, xt];
    var r, n, s, i;
    if (this._lookahead(0) === Bt) return this._advance(), {
      type: "MultiSelectHash",
      children: []
    };
    for (;;) {
      if (r = this._lookaheadToken(0), e.indexOf(r.type) < 0) throw new Error("Expecting an identifier token, got: " + r.type);
      if (n = r.value, this._advance(), this._match(It), s = this.expression(0), i = {
        type: "KeyValuePair",
        name: n,
        value: s
      }, t.push(i), this._lookahead(0) === wt) this._match(wt);else if (this._lookahead(0) === Bt) {
        this._match(Bt);
        break;
      }
    }
    return {
      type: "MultiSelectHash",
      children: t
    };
  };
  return pe;
}();
function Te(t, e) {
  var r = Math.pow(10, e);
  return Math.round(t * r) / r;
}
function Ee(e, r, n, s) {
  if (s === void 0) {
    s = [];
  }
  return {
    casefold: {
      _func: function _func(t, e, n) {
        return r(t[0]).toLocaleUpperCase(n.language).toLocaleLowerCase(n.language);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    and: {
      _func: function _func(t) {
        var r = !!e(t[0]);
        return t.slice(1).forEach(function (t) {
          r = r && !!e(t);
        }), r;
      },
      _signature: [{
        types: [t.TYPE_ANY],
        variadic: !0
      }]
    },
    deepScan: {
      _func: function _func(t) {
        var e = t[0],
          r = t[1],
          n = r.toString(),
          s = [];
        return null === e || function t(e) {
          Object.entries(e).forEach(function (_ref) {
            var e = _ref[0],
              r = _ref[1];
            e === n && s.push(r), "object" == typeof r && t(r);
          });
        }(e), s;
      },
      _signature: [{
        types: [t.TYPE_OBJECT, t.TYPE_ARRAY, t.TYPE_NULL]
      }, {
        types: [t.TYPE_STRING, t.TYPE_NUMBER]
      }]
    },
    or: {
      _func: function _func(t) {
        var r = !!e(t[0]);
        return t.slice(1).forEach(function (t) {
          r = r || !!e(t);
        }), r;
      },
      _signature: [{
        types: [t.TYPE_ANY],
        variadic: !0
      }]
    },
    not: {
      _func: function _func(t) {
        return !e(t[0]);
      },
      _signature: [{
        types: [t.TYPE_ANY]
      }]
    },
    "null": {
      _func: function _func() {
        return null;
      },
      _signature: []
    },
    "true": {
      _func: function _func() {
        return !0;
      },
      _signature: []
    },
    "false": {
      _func: function _func() {
        return !1;
      },
      _signature: []
    },
    "if": {
      _func: function _func(t, r, n) {
        var s = t[1],
          i = t[2],
          u = n.visit(t[0], r);
        return e(u) ? n.visit(s, r) : n.visit(i, r);
      },
      _signature: [{
        types: [t.TYPE_ANY]
      }, {
        types: [t.TYPE_ANY]
      }, {
        types: [t.TYPE_ANY]
      }]
    },
    substitute: {
      _func: function _func(t) {
        var e = r(t[0]),
          s = r(t[1]),
          i = r(t[2]);
        if (t.length <= 3) return e.replaceAll(s, i);
        var u = n(t[3]);
        if (u < 1) return e;
        var o = -1;
        for (var _t14 = 0; _t14 < u; _t14 += 1) {
          o += 1;
          var _t15 = e.slice(o).indexOf(s);
          if (-1 === _t15) return e;
          o += _t15;
        }
        return e.slice(0, o) + e.slice(o).replace(s, i);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }, {
        types: [t.TYPE_STRING]
      }, {
        types: [t.TYPE_STRING]
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }]
    },
    value: {
      _func: function _func(t) {
        var e = t[0] || {},
          r = t[1],
          n = e[r];
        if (void 0 === n) {
          s.push("Failed to find: '" + r + "'");
          var _t16 = Object.keys(e).map(function (t) {
            return "'" + t + "'";
          }).toString();
          return _t16.length && s.push("Available fields: " + _t16), null;
        }
        return n;
      },
      _signature: [{
        types: [t.TYPE_OBJECT, t.TYPE_ARRAY, t.TYPE_NULL]
      }, {
        types: [t.TYPE_STRING, t.TYPE_NUMBER]
      }]
    },
    lower: {
      _func: function _func(t) {
        return r(t[0]).toLowerCase();
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    upper: {
      _func: function _func(t) {
        return r(t[0]).toUpperCase();
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    exp: {
      _func: function _func(t) {
        var e = n(t[0]);
        return Math.exp(e);
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    power: {
      _func: function _func(t) {
        return Math.pow(n(t[0]), n(t[1]));
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }]
    },
    find: {
      _func: function _func(t) {
        var e = r(t[0]),
          s = r(t[1]),
          i = t.length > 2 ? n(t[2]) : 0,
          u = s.indexOf(e, i);
        return -1 === u ? null : u;
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }, {
        types: [t.TYPE_STRING]
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }]
    },
    left: {
      _func: function _func(t) {
        var e = t.length > 1 ? n(t[1]) : 1;
        return e < 0 ? null : t[0] instanceof Array ? t[0].slice(0, e) : r(t[0]).substr(0, e);
      },
      _signature: [{
        types: [t.TYPE_STRING, t.TYPE_ARRAY]
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }]
    },
    right: {
      _func: function _func(t) {
        var e = t.length > 1 ? n(t[1]) : 1;
        if (e < 0) return null;
        if (t[0] instanceof Array) return 0 === e ? [] : t[0].slice(-1 * e);
        var s = r(t[0]);
        return s.substr(s.length - e, e);
      },
      _signature: [{
        types: [t.TYPE_STRING, t.TYPE_ARRAY]
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }]
    },
    mid: {
      _func: function _func(t) {
        var e = n(t[1]),
          s = n(t[2]);
        return e < 0 ? null : t[0] instanceof Array ? t[0].slice(e, e + s) : r(t[0]).substr(e, s);
      },
      _signature: [{
        types: [t.TYPE_STRING, t.TYPE_ARRAY]
      }, {
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }]
    },
    mod: {
      _func: function _func(t) {
        return n(t[0]) % n(t[1]);
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }]
    },
    proper: {
      _func: function _func(t) {
        return r(t[0]).split(" ").map(function (t) {
          return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
        }).join(" ");
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    rept: {
      _func: function _func(t) {
        var e = r(t[0]),
          s = n(t[1]);
        return s < 0 ? null : e.repeat(s);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }, {
        types: [t.TYPE_NUMBER]
      }]
    },
    replace: {
      _func: function _func(t) {
        var e = r(t[0]),
          s = n(t[1]),
          i = n(t[2]),
          u = r(t[3]);
        return s < 0 ? null : e.substr(0, s) + u + e.substr(s + i);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }, {
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_STRING]
      }]
    },
    round: {
      _func: function _func(t) {
        return Te(n(t[0]), n(t[1]));
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }]
    },
    sqrt: {
      _func: function _func(t) {
        var e = Math.sqrt(n(t[0]));
        return Number.isNaN(e) ? null : e;
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    stdevp: {
      _func: function _func(t) {
        var e = t[0] || [];
        if (0 === e.length) return null;
        var r = e.map(function (t) {
            return n(t);
          }),
          s = r.reduce(function (t, e) {
            return t + e;
          }, 0) / e.length,
          i = r.reduce(function (t, e) {
            return t + e * e;
          }, 0) / e.length,
          u = Math.sqrt(i - s * s);
        return Number.isNaN(u) ? null : u;
      },
      _signature: [{
        types: [t.TYPE_ARRAY_NUMBER]
      }]
    },
    stdev: {
      _func: function _func(t) {
        var e = t[0] || [];
        if (e.length <= 1) return null;
        var r = e.map(function (t) {
            return n(t);
          }),
          s = r.reduce(function (t, e) {
            return t + e;
          }, 0) / e.length,
          i = r.reduce(function (t, e) {
            return t + e * e;
          }, 0),
          u = Math.sqrt((i - e.length * s * s) / (e.length - 1));
        return Number.isNaN(u) ? null : u;
      },
      _signature: [{
        types: [t.TYPE_ARRAY_NUMBER]
      }]
    },
    trim: {
      _func: function _func(t) {
        return r(t[0]).split(" ").filter(function (t) {
          return t;
        }).join(" ");
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    trunc: {
      _func: function _func(t) {
        var e = n(t[0]),
          r = t.length > 1 ? n(t[1]) : 0;
        return (e >= 0 ? Math.floor : Math.ceil)(e * Math.pow(10, r)) / Math.pow(10, r);
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }]
    },
    charCode: {
      _func: function _func(t) {
        var e = n(t[0]);
        return Number.isInteger(e) ? String.fromCharCode(e) : null;
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    codePoint: {
      _func: function _func(t) {
        var e = r(t[0]);
        return 0 === e.length ? null : e.codePointAt(0);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    datetime: {
      _func: function _func(t) {
        var e = n(t[0]),
          s = n(t[1]),
          i = n(t[2]),
          u = t.length > 3 ? n(t[3]) : 0,
          o = t.length > 4 ? n(t[4]) : 0,
          c = t.length > 5 ? n(t[5]) : 0,
          a = t.length > 6 ? n(t[6]) : 0,
          l = t.length > 7 ? r(t[7]) : null;
        var h = new Date(e, s - 1, i, u, o, c, a);
        return l && (h = function (t, e) {
          if (null === t) return null;
          var r = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
          return r += function (t, e) {
            var r = new Intl.DateTimeFormat("en-US", {
                timeZone: e,
                timeZoneName: "longOffset"
              }).format(t),
              n = /GMT([+\-−])?(\d{1,2}):?(\d{0,2})?/.exec(r);
            if (!n) return 0;
            var _n$slice = n.slice(1),
              s = _n$slice[0],
              i = _n$slice[1],
              u = _n$slice[2],
              o = 60 * (60 * (i || 0) + 1 * (u || 0)) * 1e3;
            return "-" === s ? -1 * o : o;
          }(t, e), new Date(r);
        }(h, l)), h.getTime() / 864e5;
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }, {
        types: [t.TYPE_STRING],
        optional: !0
      }]
    },
    datedif: {
      _func: function _func(t) {
        var e = n(t[0]),
          s = n(t[1]),
          i = r(t[2]).toLowerCase();
        if (s === e) return 0;
        if (s < e) return null;
        if ("d" === i) return Math.floor(s - e);
        var u = new Date(864e5 * e),
          o = new Date(864e5 * s),
          c = o.getFullYear() - u.getFullYear();
        var a = o.getMonth() - u.getMonth();
        var l = o.getDate() - u.getDate();
        if ("y" === i) {
          var _t17 = c;
          return a < 0 && (_t17 -= 1), 0 === a && l < 0 && (_t17 -= 1), _t17;
        }
        if ("m" === i) return 12 * c + a + (l < 0 ? -1 : 0);
        if ("ym" === i) return l < 0 && (a -= 1), a <= 0 && c > 0 ? 12 + a : a;
        if ("yd" === i) return l < 0 && (a -= 1), o.setFullYear(a < 0 ? u.getFullYear() + 1 : u.getFullYear()), Math.floor((o.getTime() - u.getTime()) / 864e5);
        throw new TypeError("Unrecognized unit parameter \"" + i + "\" for datedif()");
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_STRING]
      }]
    },
    eomonth: {
      _func: function _func(t) {
        var e = n(t[0]),
          r = n(t[1]),
          s = new Date(864e5 * e);
        return new Date(s.getFullYear(), s.getMonth() + r + 1, 0).getTime() / 864e5;
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }]
    },
    day: {
      _func: function _func(t) {
        var e = n(t[0]);
        return new Date(864e5 * e).getDate();
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    month: {
      _func: function _func(t) {
        var e = n(t[0]);
        return new Date(864e5 * e).getMonth() + 1;
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    year: {
      _func: function _func(t) {
        var e = n(t[0]);
        return new Date(864e5 * e).getFullYear();
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    time: {
      _func: function _func(t) {
        var e = (3600 * n(t[0]) + 60 * n(t[1]) + n(t[2])) / 86400;
        return e < 0 ? null : e - Math.floor(e);
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER]
      }]
    },
    hour: {
      _func: function _func(t) {
        var e = n(t[0]) % 1;
        if (e < 0) return null;
        var r = Te(24 * e, 14);
        return Math.floor(r % 24);
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    minute: {
      _func: function _func(t) {
        var e = n(t[0]) % 1;
        if (e < 0) return null;
        var r = Math.round(1440 * e, 10);
        return Math.floor(r % 60);
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    second: {
      _func: function _func(t) {
        var e = n(t[0]) % 1;
        if (e < 0) return null;
        var r = Te(86400 * e, 10);
        return Math.floor(r % 60);
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }]
    },
    now: {
      _func: function _func() {
        return Date.now() / 864e5;
      },
      _signature: []
    },
    today: {
      _func: function _func() {
        return Math.floor(Date.now() / 864e5);
      },
      _signature: []
    },
    weekday: {
      _func: function _func(t) {
        var e = n(t[0]),
          r = t.length > 1 ? n(t[1]) : 1,
          s = new Date(864e5 * e).getDay();
        switch (r) {
          case 1:
            return s + 1;
          case 2:
            return (s + 6) % 7 + 1;
          case 3:
            return (s + 6) % 7;
          default:
            return null;
        }
      },
      _signature: [{
        types: [t.TYPE_NUMBER]
      }, {
        types: [t.TYPE_NUMBER],
        optional: !0
      }]
    },
    entries: {
      _func: function _func(t) {
        var r = e(t[0]);
        return Object.entries(r);
      },
      _signature: [{
        types: [t.TYPE_NUMBER, t.TYPE_STRING, t.TYPE_ARRAY, t.TYPE_OBJECT, t.TYPE_BOOLEAN]
      }]
    },
    fromEntries: {
      _func: function _func(t) {
        return Object.fromEntries(t[0]);
      },
      _signature: [{
        types: [t.TYPE_ARRAY_ARRAY]
      }]
    },
    split: {
      _func: function _func(t) {
        var e = r(t[0]),
          n = r(t[1]);
        return e.split(n);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }, {
        types: [t.TYPE_STRING]
      }]
    },
    unique: {
      _func: function _func(t) {
        var r = t[0].map(function (t) {
          return e(t);
        });
        return t[0].filter(function (t, n) {
          return r.indexOf(e(t)) === n;
        });
      },
      _signature: [{
        types: [t.TYPE_ARRAY]
      }]
    },
    encodeUrlComponent: {
      _func: function _func(t) {
        return encodeURIComponent(t[0]);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    encodeUrl: {
      _func: function _func(t) {
        return encodeURI(t[0]);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    decodeUrlComponent: {
      _func: function _func(t) {
        return decodeURIComponent(t[0]);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    },
    decodeUrl: {
      _func: function _func(t) {
        return decodeURI(t[0]);
      },
      _signature: [{
        types: [t.TYPE_STRING]
      }]
    }
  };
}
function fe(e, r, n, s, i, u, o) {
  var c = t.TYPE_NUMBER,
    a = t.TYPE_ANY,
    l = t.TYPE_STRING,
    h = t.TYPE_ARRAY,
    _ = t.TYPE_OBJECT,
    p = t.TYPE_BOOLEAN,
    T = t.TYPE_EXPREF,
    E = t.TYPE_NULL,
    f = t.TYPE_ARRAY_NUMBER,
    d = t.TYPE_ARRAY_STRING;
  function y(t, r) {
    return function (n) {
      var s = e.visit(t, n);
      if (r.indexOf(i(s)) < 0) {
        var _t18 = "TypeError: expected one of " + r + ", received " + i(s);
        throw new Error(_t18);
      }
      return s;
    };
  }
  return {
    abs: {
      _func: function _func(t) {
        return Math.abs(t[0]);
      },
      _signature: [{
        types: [c]
      }]
    },
    avg: {
      _func: function _func(t) {
        var e = 0;
        var r = t[0];
        return r.forEach(function (t) {
          e += t;
        }), e / r.length;
      },
      _signature: [{
        types: [f]
      }]
    },
    ceil: {
      _func: function _func(t) {
        return Math.ceil(t[0]);
      },
      _signature: [{
        types: [c]
      }]
    },
    contains: {
      _func: function _func(t) {
        return u(t[0]).indexOf(u(t[1])) >= 0;
      },
      _signature: [{
        types: [l, h]
      }, {
        types: [a]
      }]
    },
    endsWith: {
      _func: function _func(t) {
        var e = u(t[0]),
          r = u(t[1]);
        return -1 !== e.indexOf(r, e.length - r.length);
      },
      _signature: [{
        types: [l]
      }, {
        types: [l]
      }]
    },
    floor: {
      _func: function _func(t) {
        return Math.floor(t[0]);
      },
      _signature: [{
        types: [c]
      }]
    },
    length: {
      _func: function _func(t) {
        var e = u(t[0]);
        return r(e) ? Object.keys(e).length : n(e) ? e.length : o(e).length;
      },
      _signature: [{
        types: [l, h, _]
      }]
    },
    map: {
      _func: function _func(t) {
        var r = t[0];
        return t[1].map(function (t) {
          return e.visit(r, t);
        });
      },
      _signature: [{
        types: [T]
      }, {
        types: [h]
      }]
    },
    reduce: {
      _func: function _func(t) {
        var r = t[0];
        return t[1].reduce(function (t, n, s, i) {
          return e.visit(r, {
            accumulated: t,
            current: n,
            index: s,
            array: i
          });
        }, 3 === t.length ? t[2] : null);
      },
      _signature: [{
        types: [T]
      }, {
        types: [h]
      }, {
        types: [a],
        optional: !0
      }]
    },
    max: {
      _func: function _func(t) {
        if (t[0].length > 0) {
          var _e17 = i(t[0][0]);
          return t[0].reduce(_e17 === c ? function (t, e) {
            return s(t) >= s(e) ? t : e;
          } : function (t, e) {
            return o(e).localeCompare(o(t)) < 0 ? t : e;
          }, t[0][0]);
        }
        return null;
      },
      _signature: [{
        types: [h, f, d]
      }]
    },
    merge: {
      _func: function _func(t) {
        var e = {};
        return t.forEach(function (t) {
          Object.entries(t).forEach(function (_ref2) {
            var t = _ref2[0],
              r = _ref2[1];
            e[t] = r;
          });
        }), e;
      },
      _signature: [{
        types: [_],
        variadic: !0
      }]
    },
    maxBy: {
      _func: function _func(t) {
        var e = t[0],
          r = y(t[1], [c, l]);
        var n,
          s,
          i = -Infinity;
        return e.forEach(function (t) {
          s = r(t), s > i && (i = s, n = t);
        }), n;
      },
      _signature: [{
        types: [h]
      }, {
        types: [T]
      }]
    },
    sum: {
      _func: function _func(t) {
        var e = 0;
        return t[0].forEach(function (t) {
          e += 1 * t;
        }), e;
      },
      _signature: [{
        types: [f]
      }]
    },
    startsWith: {
      _func: function _func(t) {
        return u(t[0]).startsWith(u(t[1]));
      },
      _signature: [{
        types: [l]
      }, {
        types: [l]
      }]
    },
    min: {
      _func: function _func(t) {
        if (t[0].length > 0) {
          if (i(t[0][0]) === c) return t[0].reduce(function (t, e) {
            return s(t) <= s(e) ? t : e;
          }, t[0][0]);
          var _e18 = t[0];
          var _r9 = _e18[0];
          for (var _t19 = 1; _t19 < _e18.length; _t19 += 1) {
            o(_e18[_t19]).localeCompare(o(_r9)) < 0 && (_r9 = _e18[_t19]);
          }
          return _r9;
        }
        return null;
      },
      _signature: [{
        types: [h, f, d]
      }]
    },
    minBy: {
      _func: function _func(t) {
        var e = t[0],
          r = y(t[1], [c, l]);
        var n,
          s,
          i = Infinity;
        return e.forEach(function (t) {
          s = r(t), s < i && (i = s, n = t);
        }), n;
      },
      _signature: [{
        types: [h]
      }, {
        types: [T]
      }]
    },
    type: {
      _func: function _func(t) {
        var _c$l$h$_$p$T$E$i;
        return (_c$l$h$_$p$T$E$i = {}, _c$l$h$_$p$T$E$i[c] = "number", _c$l$h$_$p$T$E$i[l] = "string", _c$l$h$_$p$T$E$i[h] = "array", _c$l$h$_$p$T$E$i[_] = "object", _c$l$h$_$p$T$E$i[p] = "boolean", _c$l$h$_$p$T$E$i[T] = "expref", _c$l$h$_$p$T$E$i[E] = "null", _c$l$h$_$p$T$E$i)[i(t[0])];
      },
      _signature: [{
        types: [a]
      }]
    },
    keys: {
      _func: function _func(t) {
        return null === t[0] ? [] : Object.keys(t[0]);
      },
      _signature: [{
        types: [a]
      }]
    },
    values: {
      _func: function _func(t) {
        var e = u(t[0]);
        return null === e ? [] : Object.values(e);
      },
      _signature: [{
        types: [a]
      }]
    },
    sort: {
      _func: function _func(t) {
        var e = t[0].slice(0);
        if (e.length > 0) {
          var _r10 = i(t[0][0]) === c ? s : o;
          e.sort(function (t, e) {
            var n = _r10(t),
              s = _r10(e);
            return n < s ? -1 : n > s ? 1 : 0;
          });
        }
        return e;
      },
      _signature: [{
        types: [h, d, f]
      }]
    },
    sortBy: {
      _func: function _func(t) {
        var r = t[0].slice(0);
        if (0 === r.length) return r;
        var n = t[1],
          s = i(e.visit(n, r[0]));
        if ([c, l].indexOf(s) < 0) throw new Error("TypeError");
        var u = [];
        for (var _t20 = 0; _t20 < r.length; _t20 += 1) {
          u.push([_t20, r[_t20]]);
        }
        u.sort(function (t, r) {
          var u = e.visit(n, t[1]),
            o = e.visit(n, r[1]);
          if (i(u) !== s) throw new Error("TypeError: expected " + s + ", received " + i(u));
          if (i(o) !== s) throw new Error("TypeError: expected " + s + ", received " + i(o));
          return u > o ? 1 : u < o ? -1 : t[0] - r[0];
        });
        for (var _t21 = 0; _t21 < u.length; _t21 += 1) {
          var _u$_t = u[_t21];
          r[_t21] = _u$_t[1];
        }
        return r;
      },
      _signature: [{
        types: [h]
      }, {
        types: [T]
      }]
    },
    join: {
      _func: function _func(t) {
        return t[1].join(t[0]);
      },
      _signature: [{
        types: [l]
      }, {
        types: [d]
      }]
    },
    reverse: {
      _func: function _func(t) {
        var e = u(t[0]);
        if (i(e) === l) {
          var _t22 = "";
          for (var _r11 = e.length - 1; _r11 >= 0; _r11 -= 1) {
            _t22 += e[_r11];
          }
          return _t22;
        }
        var r = t[0].slice(0);
        return r.reverse(), r;
      },
      _signature: [{
        types: [l, h]
      }]
    },
    toArray: {
      _func: function _func(t) {
        return i(t[0]) === h ? t[0] : [t[0]];
      },
      _signature: [{
        types: [a]
      }]
    },
    toString: {
      _func: function _func(t) {
        return i(t[0]) === l ? t[0] : JSON.stringify(t[0]);
      },
      _signature: [{
        types: [a]
      }]
    },
    toNumber: {
      _func: function _func(t) {
        var e = i(t[0]);
        return e === c ? t[0] : e === l ? s(t[0]) : null;
      },
      _signature: [{
        types: [a]
      }]
    },
    notNull: {
      _func: function _func(t) {
        return t.find(function (t) {
          return i(t) !== E;
        }) || null;
      },
      _signature: [{
        types: [a],
        variadic: !0
      }]
    },
    zip: {
      _func: function _func(t) {
        var e = t.reduce(function (t, e) {
            return Math.min(t, e.length);
          }, t[0].length),
          r = new Array(e);
        var _loop = function _loop(_n7) {
          r[_n7] = [], t.forEach(function (t) {
            r[_n7].push(t[_n7]);
          });
        };
        for (var _n7 = 0; _n7 < e; _n7 += 1) {
          _loop(_n7);
        }
        return r;
      },
      _signature: [{
        types: [h],
        variadic: !0
      }]
    }
  };
}
var de = t.TYPE_CLASS,
  ye = t.TYPE_ANY;
var ge = new function () {
  var t;
  function e(t) {
    return null == t ? "" : t.toString();
  }
  var r = /*#__PURE__*/function () {
    function r() {}
    var _proto4 = r.prototype;
    _proto4.addFunctions = function addFunctions(_r12, n) {
      if (n === void 0) {
        n = {};
      }
      this.functionTable = _extends$1({}, fe(this._interpreter, O, g, t, f, R, e), Ee(R, e, t, _r12), n);
    };
    _proto4._validateArgs = function _validateArgs(_r13, n, s, i) {
      if (0 === s.length) return;
      var u;
      var o = s.filter(function (t) {
        return !t.optional;
      }).length;
      if (s[s.length - 1].variadic) {
        if (n.length < s.length) throw u = 1 === s.length ? " argument" : " arguments", new Error("ArgumentError: " + _r13 + "() takes at least" + s.length + u + " but received " + n.length);
      } else if (n.length < o || n.length > s.length) throw u = 1 === s.length ? " argument" : " arguments", new Error("ArgumentError: " + _r13 + "() takes " + s.length + u + " but received " + n.length);
      if (!i) return;
      var c, a;
      var l = Math.min(s.length, n.length);
      for (var _i3 = 0; _i3 < l; _i3 += 1) {
        c = s[_i3].types, h = n[_i3], _ = void 0, c.includes(de) && null !== (_ = h) && !Array.isArray(_) && "Object" !== _.constructor.name || c.includes(ye) || (a = d(n[_i3]), n[_i3] = y(a, c, n[_i3], _r13, t, e));
      }
      var h, _;
    };
    _proto4.callFunction = function callFunction(t, e, _r14, n, s) {
      if (s === void 0) {
        s = !0;
      }
      if (!Object.prototype.hasOwnProperty.call(this.functionTable, t)) throw new Error("Unknown function: " + t + "()");
      var i = this.functionTable[t];
      return this._validateArgs(t, e, i._signature, s), i._func.call(this, e, _r14, n);
    };
    return r;
  }();
  this.compile = function (t, e, r) {
    if (e === void 0) {
      e = [];
    }
    if (r === void 0) {
      r = [];
    }
    var n;
    try {
      n = new pe(e).parse(t, r);
    } catch (t) {
      throw r.push(t.toString()), t;
    }
    return n;
  }, this.search = function (n, s, i, u, o, c, a) {
    if (c === void 0) {
      c = [];
    }
    if (a === void 0) {
      a = "en-US";
    }
    var l = new r(u);
    l.debug = c, t = function (t, e) {
      if (e === void 0) {
        e = [];
      }
      return function (r) {
        var n = R(r);
        if (null === n) return null;
        if (n instanceof Array) return e.push("Converted array to zero"), 0;
        var s = typeof n;
        return "number" === s ? n : "string" === s ? t(n, e) : "boolean" === s ? n ? 1 : 0 : (e.push("Converted object to zero"), 0);
      };
    }(o || function (t) {
      var e = +t;
      return Number.isNaN(e) ? 0 : e;
    }, c);
    var h = new k(l, i, t, e, c, a);
    l._interpreter = h, l.addFunctions(c, u);
    try {
      return h.search(n, s);
    } catch (t) {
      throw c.push(t.message || t.toString()), t;
    }
  }, this.strictDeepEqual = N;
}();
var Oe = /*#__PURE__*/function () {
  function Oe(t, e, r, n, s, i) {
    if (e === void 0) {
      e = {};
    }
    if (r === void 0) {
      r = null;
    }
    if (n === void 0) {
      n = [];
    }
    if (s === void 0) {
      s = [];
    }
    if (i === void 0) {
      i = "en-US";
    }
    this.expression = t, this.customFunctions = e, this.stringToNumber = r, this.node = ge.compile(t, n, s), this.debug = s, this.language = i;
  }
  var _proto5 = Oe.prototype;
  _proto5.search = function search(t, e) {
    return ge.search(this.node, t, e, _extends$1({}, this.customFunctions), this.stringToNumber, this.debug, this.language);
  };
  return Oe;
}();

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
} /*
   * Copyright 2022 Adobe, Inc.
   *
   * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
/** Constant for all properties which can be translated based on `adaptive form specification` */
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
var processFile = function processFile(file) {
  try {
    var name = file.name,
      size = file.size,
      type = file.type;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Promise.resolve(new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (event) {
        resolve(new FileObject({
          // @ts-ignore
          data: addNameToDataURL(event.target.result, name),
          type: type,
          name: name,
          size: size
        }));
      };
      reader.readAsDataURL(file.data);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Implementation of {@link IValidationError | Validation Error} interface
 */
var ValidationError = function ValidationError(fieldName, errorMessages) {
  if (fieldName === void 0) {
    fieldName = '';
  }
  if (errorMessages === void 0) {
    errorMessages = [];
  }
  this.errorMessages = errorMessages;
  this.fieldName = fieldName;
};
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// const primitives = ['string', 'boolean', 'number'];
// const containers = ['object', 'array', 'number'];
var objToMap = function objToMap(o) {
  return new Map(Object.entries(o));
};
var stringViewTypes = objToMap({
  'date': 'date-input',
  'data-url': 'file-input',
  'binary': 'file-input'
});
var typeToViewTypes = objToMap({
  'number': 'number-input',
  'boolean': 'checkbox',
  'object': 'panel',
  'array': 'panel',
  'file': 'file-input',
  'file[]': 'file-input'
});
var arrayTypes = ['string[]', 'boolean[]', 'number[]', 'array'];
/**
 * Returns the default view type for a given form field object based on `adaptive form specification`
 * @param schema    schema item for which default view type is to found
 * @returns default view type
 */
var defaultFieldTypes = function defaultFieldTypes(schema) {
  var type = schema.type || 'string';
  if ('enum' in schema) {
    var enums = schema["enum"];
    if (enums.length > 2 || arrayTypes.indexOf(type) > -1) {
      return 'drop-down';
    } else {
      return 'checkbox';
    }
  }
  if (type === 'string' || type === 'string[]') {
    return stringViewTypes.get(schema.format) || 'text-input';
  }
  return typeToViewTypes.get(type) || 'text-input';
};

/**
 * Get the property value form the json
 * @param data      object as json
 * @param key       name of the key
 * @param def       default value
 * @typeParam P     type for the default value
 */
var getProperty = function getProperty(data, key, def) {
  if (key in data) {
    return data[key];
  } else if (!key.startsWith(':')) {
    var prefixedKey = ":" + key;
    if (prefixedKey in data) {
      return data[prefixedKey];
    }
  }
  return def;
};
/**
 * Checks if the input item provided is a form file attachment field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form file attachment, `false` otherwise
 */
var isFile = function isFile(item) {
  return (item == null ? void 0 : item.type) === 'file' || (item == null ? void 0 : item.type) === 'file[]' || ((item == null ? void 0 : item.type) === 'string' || (item == null ? void 0 : item.type) === 'string[]') && ((item == null ? void 0 : item.format) === 'binary' || (item == null ? void 0 : item.format) === 'data-url');
};
/**
 * Checks if the input item provided is a form check box field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form check box, `false` otherwise
 */
var isCheckbox = function isCheckbox(item) {
  var fieldType = (item == null ? void 0 : item.fieldType) || defaultFieldTypes(item);
  return fieldType === 'checkbox';
};
/**
 * Checks if the input item provided is a form check box group field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form check box group, `false` otherwise
 */
var isCheckboxGroup = function isCheckboxGroup(item) {
  var fieldType = (item == null ? void 0 : item.fieldType) || defaultFieldTypes(item);
  return fieldType === 'checkbox-group';
};
/**
 * Checks if the input item provided is a date field
 * @param item  input item it could be {@link FieldsetJson | Fieldset} or {@link FieldJson | Field}
 * @returns `true` if `item` is a form check box group, `false` otherwise
 */
var isDateField = function isDateField(item) {
  var fieldType = (item == null ? void 0 : item.fieldType) || defaultFieldTypes(item);
  return fieldType === 'text-input' && (item == null ? void 0 : item.format) === 'date' || fieldType === 'date-input';
};
/**
 * Clones an object completely including any nested objects or arrays
 * @param obj
 * @param idGenerator
 * @private
 */
function deepClone(obj, idGenerator) {
  var result;
  if (obj instanceof Array) {
    result = [];
    result = obj.map(function (x) {
      return deepClone(x, idGenerator);
    });
  } else if (typeof obj === 'object' && obj !== null) {
    result = {};
    Object.entries(obj).forEach(function (_ref) {
      var key = _ref[0],
        value = _ref[1];
      result[key] = deepClone(value, idGenerator);
    });
  } else {
    result = obj;
  }
  //if idGenerator is specified, and id exists in the object
  if (idGenerator && result && result.id) {
    result.id = idGenerator();
  }
  return result;
}
/**
 * Prettifies obj as json string
 * @param obj object to prettify
 * @return json string
 */
var jsonString = function jsonString(obj) {
  return JSON.stringify(obj, null, 2);
};

/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Implementation of generic event
 * @private
 */
var ActionImpl = /*#__PURE__*/function () {
  //@ts-ignore

  function ActionImpl(payload, type, _metadata) {
    this._metadata = _metadata;
    this._payload = payload;
    this._type = type;
  }
  var _proto = ActionImpl.prototype;
  _proto.payloadToJson = function payloadToJson() {
    return this.payload;
  };
  _proto.toJson = function toJson() {
    return {
      payload: this.payloadToJson(),
      type: this.type,
      isCustomEvent: this.isCustomEvent
    };
  };
  _proto.toString = function toString() {
    return JSON.stringify(this.toJson());
  };
  _createClass(ActionImpl, [{
    key: "type",
    get: function get() {
      return this._type;
    }
  }, {
    key: "payload",
    get: function get() {
      return this._payload;
    }
  }, {
    key: "metadata",
    get: function get() {
      return this._metadata;
    }
  }, {
    key: "target",
    get: function get() {
      return this._target;
    }
  }, {
    key: "isCustomEvent",
    get: function get() {
      return false;
    }
  }]);
  return ActionImpl;
}();
/**
 * Implementation of `change` event. The change event is triggered on the field whenever the value of the field is changed
 */
var Change = /*#__PURE__*/function (_ActionImpl) {
  _inheritsLoose(Change, _ActionImpl);
  /**
   * @constructor
   * @param [payload] event payload
   * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
   */
  function Change(payload, dispatch) {
    if (dispatch === void 0) {
      dispatch = false;
    }
    return _ActionImpl.call(this, payload, 'change', {
      dispatch: dispatch
    }) || this;
  }
  var _proto2 = Change.prototype;
  _proto2.withAdditionalChange = function withAdditionalChange(change) {
    return new Change(this.payload.changes.concat(change.payload.changes), this.metadata);
  };
  return Change;
}(ActionImpl);
/**
 * Implementation of `invalid` event. The invalid event is triggered when a Field’s value becomes invalid after a change event or whenever its value property change
 */
var Invalid = /*#__PURE__*/function (_ActionImpl2) {
  _inheritsLoose(Invalid, _ActionImpl2);
  /**
   * @constructor
   * @param [payload] event payload
   */
  function Invalid(payload) {
    if (payload === void 0) {
      payload = {};
    }
    return _ActionImpl2.call(this, payload, 'invalid', {}) || this;
  }
  return Invalid;
}(ActionImpl);
/**
 * Implementation of `valid` event. The valid event is triggered whenever the field’s valid state is changed from invalid to valid.
 */
var Valid = /*#__PURE__*/function (_ActionImpl3) {
  _inheritsLoose(Valid, _ActionImpl3);
  /**
   * @constructor
   * @param [payload] event payload
   */
  function Valid(payload) {
    if (payload === void 0) {
      payload = {};
    }
    return _ActionImpl3.call(this, payload, 'valid', {}) || this;
  }
  return Valid;
}(ActionImpl);
/**
 * Implementation of an ExecuteRule event.
 * @private
 */
var ExecuteRule = /*#__PURE__*/function (_ActionImpl4) {
  _inheritsLoose(ExecuteRule, _ActionImpl4);
  /**
   * @constructor
   * @param [payload] event payload
   * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
   */
  function ExecuteRule(payload, dispatch) {
    if (payload === void 0) {
      payload = {};
    }
    if (dispatch === void 0) {
      dispatch = false;
    }
    return _ActionImpl4.call(this, payload, 'executeRule', {
      dispatch: dispatch
    }) || this;
  }
  return ExecuteRule;
}(ActionImpl);
/**
 * Creates a change event
 * @param propertyName  name of the form field property
 * @param currentValue  current value
 * @param prevValue     previous value
 * @returns {@link Change} change event
 */
var propertyChange = function propertyChange(propertyName, currentValue, prevValue) {
  return new Change({
    changes: [{
      propertyName: propertyName,
      currentValue: currentValue,
      prevValue: prevValue
    }]
  });
};
/**
 * Implementation of `initialize` event. The event is triggered on all the fields when the form initialisation is complete
 */
var Initialize = /*#__PURE__*/function (_ActionImpl5) {
  _inheritsLoose(Initialize, _ActionImpl5);
  /**
   * @constructor
   * @param [payload] event payload
   * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
   */
  function Initialize(payload, dispatch) {
    if (dispatch === void 0) {
      dispatch = false;
    }
    return _ActionImpl5.call(this, payload, 'initialize', {
      dispatch: dispatch
    }) || this;
  }
  return Initialize;
}(ActionImpl);
/**
 * Implementation of `load` event. The event is when the form initialization is complete
 */
var FormLoad = /*#__PURE__*/function (_ActionImpl6) {
  _inheritsLoose(FormLoad, _ActionImpl6);
  /**
   * @constructor
   */
  function FormLoad() {
    return _ActionImpl6.call(this, {}, 'load', {
      dispatch: false
    }) || this;
  }
  return FormLoad;
}(ActionImpl);
/**
 * Implementation of `click` event. The event is triggered when user clicks on an element.
 */
var Click = /*#__PURE__*/function (_ActionImpl7) {
  _inheritsLoose(Click, _ActionImpl7);
  /**
   * @constructor
   * @param [payload] event payload
   * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
   */
  function Click(payload, dispatch) {
    if (dispatch === void 0) {
      dispatch = false;
    }
    return _ActionImpl7.call(this, payload, 'click', {
      dispatch: dispatch
    }) || this;
  }
  return Click;
}(ActionImpl);
/**
 * Implementation of `blur` event. The event is triggered when the element loses focus.
 */
var Blur = /*#__PURE__*/function (_ActionImpl8) {
  _inheritsLoose(Blur, _ActionImpl8);
  /**
   * @constructor
   * @param [payload] event payload
   * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
   */
  function Blur(payload, dispatch) {
    if (dispatch === void 0) {
      dispatch = false;
    }
    return _ActionImpl8.call(this, payload, 'blur', {
      dispatch: dispatch
    }) || this;
  }
  return Blur;
}(ActionImpl);
/**
 * Implementation of `ValidationComplete` event. The ValidationComplete event is triggered once validation is completed
 * on the form.
 *
 * An example of using this event,
 * ```
 * function onValidationComplete(event) {
 *	 const x = event.payload[0].id;
 *	 // do something with the invalid field
 * }
 * ```
 */
var ValidationComplete = /*#__PURE__*/function (_ActionImpl9) {
  _inheritsLoose(ValidationComplete, _ActionImpl9);
  /**
   * @constructor
   * @param [payload] event payload (ie) list of {@link ValidationError | validation errors}
   * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
   */
  function ValidationComplete(payload, dispatch) {
    if (dispatch === void 0) {
      dispatch = false;
    }
    return _ActionImpl9.call(this, payload, 'validationComplete', {
      dispatch: dispatch
    }) || this;
  }
  return ValidationComplete;
}(ActionImpl);
/**
 * Implementation of `submit` event. The submit event is triggered on the Form.
 * To trigger the submit event, submit function needs to be invoked or one can invoke dispatchEvent API.
 */
var Submit = /*#__PURE__*/function (_ActionImpl11) {
  _inheritsLoose(Submit, _ActionImpl11);
  /**
   * @constructor
   * @param [payload] event payload
   * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
   */
  function Submit(payload, dispatch) {
    if (dispatch === void 0) {
      dispatch = false;
    }
    return _ActionImpl11.call(this, payload, 'submit', {
      dispatch: dispatch
    }) || this;
  }
  return Submit;
}(ActionImpl);
/**
 * Implementation of `fieldChanged` event. The field changed event is triggered on the field which it has changed.
 */
var FieldChanged = /*#__PURE__*/function (_ActionImpl12) {
  _inheritsLoose(FieldChanged, _ActionImpl12);
  function FieldChanged(changes, field) {
    return _ActionImpl12.call(this, {
      field: field,
      changes: changes
    }, 'fieldChanged') || this;
  }
  return FieldChanged;
}(ActionImpl);
/**
 * Implementation of `custom event`.
 */
var CustomEvent$1 = /*#__PURE__*/function (_ActionImpl13) {
  _inheritsLoose(CustomEvent, _ActionImpl13);
  /**
   * @constructor
   * @param [eventName] name of the event
   * @param [payload] event payload
   * @param [dispatch] true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
   */
  function CustomEvent(eventName, payload, dispatch) {
    if (payload === void 0) {
      payload = {};
    }
    if (dispatch === void 0) {
      dispatch = false;
    }
    return _ActionImpl13.call(this, payload, eventName, {
      dispatch: dispatch
    }) || this;
  }
  /**
   * Defines if the event is custom
   */
  _createClass(CustomEvent, [{
    key: "isCustomEvent",
    get: function get() {
      return true;
    }
  }]);
  return CustomEvent;
}(ActionImpl);
/**
 * Implementation of `addItem` event. The event is triggered on a panel to add a new instance of items inside it.
 */
var AddItem = /*#__PURE__*/function (_ActionImpl14) {
  _inheritsLoose(AddItem, _ActionImpl14);
  /**
   * @constructor
   * @param [payload] event payload
   */
  function AddItem(payload) {
    return _ActionImpl14.call(this, payload, 'addItem') || this;
  }
  return AddItem;
}(ActionImpl);
/**
 * Implementation of `removeItem` event. The event is triggered on a panel to remove an instance of items inside it.
 */
var RemoveItem = /*#__PURE__*/function (_ActionImpl15) {
  _inheritsLoose(RemoveItem, _ActionImpl15);
  /**
   * @constructor
   * @param [payload] event payload
   */
  function RemoveItem(payload) {
    return _ActionImpl15.call(this, payload, 'removeItem') || this;
  }
  return RemoveItem;
}(ActionImpl);
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * @private
 */
var DataValue = /*#__PURE__*/function () {
  function DataValue($_name, $_value, $_type) {
    if ($_type === void 0) {
      $_type = typeof $_value;
    }
    this.$_fields = [];
    this.$_name = $_name;
    this.$_value = $_value;
    this.$_type = $_type;
  }
  var _proto3 = DataValue.prototype;
  _proto3.valueOf = function valueOf() {
    return this.$_value;
  };
  _proto3.setValue = function setValue(typedValue, originalValue, fromField) {
    this.$_value = typedValue;
    this.$_fields.forEach(function (x) {
      if (fromField !== x) {
        x.value = originalValue;
      }
    });
  };
  _proto3.$bindToField = function $bindToField(field) {
    if (this.$_fields.indexOf(field) === -1) {
      this.$_fields.push(field);
    }
  };
  _proto3.$convertToDataValue = function $convertToDataValue() {
    return this;
  };
  _createClass(DataValue, [{
    key: "$name",
    get: function get() {
      return this.$_name;
    }
  }, {
    key: "$value",
    get: function get() {
      return this.$_value;
    }
  }, {
    key: "$type",
    get: function get() {
      return this.$_type;
    }
  }, {
    key: "$isDataGroup",
    get: function get() {
      return false;
    }
  }]);
  return DataValue;
}();
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var value = Symbol('NullValue');
var NullDataValueClass = /*#__PURE__*/function (_DataValue) {
  _inheritsLoose(NullDataValueClass, _DataValue);
  function NullDataValueClass() {
    return _DataValue.call(this, '', value, 'null') || this;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  var _proto4 = NullDataValueClass.prototype;
  _proto4.setValue = function setValue() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ;
  _proto4.$bindToField = function $bindToField() {};
  _proto4.$length = function $length() {
    return 0;
  };
  _proto4.$convertToDataValue = function $convertToDataValue() {
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ;
  _proto4.$addDataNode = function $addDataNode() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ;
  _proto4.$removeDataNode = function $removeDataNode() {};
  _proto4.$getDataNode = function $getDataNode() {
    return this;
  };
  _proto4.$containsDataNode = function $containsDataNode() {
    return false;
  };
  return NullDataValueClass;
}(DataValue); //@ts-ignore
var NullDataValue = new NullDataValueClass();

/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * @private
 */
var DataGroup = /*#__PURE__*/function (_DataValue2) {
  _inheritsLoose(DataGroup, _DataValue2);
  var _proto5 = DataGroup.prototype;
  _proto5.createEntry = function createEntry(key, value) {
    var t = value instanceof Array ? 'array' : typeof value;
    if (typeof value === 'object' && value != null) {
      return new DataGroup(key, value, t);
    } else {
      return new DataValue(key, value, t);
    }
  };
  function DataGroup(_name, _value, _type) {
    var _this;
    if (_type === void 0) {
      _type = typeof _value;
    }
    _this = _DataValue2.call(this, _name, _value, _type) || this;
    if (_value instanceof Array) {
      _this.$_items = _value.map(function (value, index) {
        return _this.createEntry(index, value);
      });
    } else {
      _this.$_items = Object.fromEntries(Object.entries(_value).map(function (_ref2) {
        var key = _ref2[0],
          value = _ref2[1];
        return [key, _this.createEntry(key, value)];
      }));
    }
    return _this;
  }
  _proto5.$convertToDataValue = function $convertToDataValue() {
    return new DataValue(this.$name, this.$value, this.$type);
  };
  _proto5.$addDataNode = function $addDataNode(name, value, override) {
    if (override === void 0) {
      override = false;
    }
    if (value !== NullDataValue) {
      if (this.$type === 'array') {
        var index = name;
        if (!override) {
          this.$_items.splice(index, 0, value);
        } else {
          this.$_items[name] = value;
        }
      } else {
        this.$_items[name] = value;
      }
    }
  };
  _proto5.$removeDataNode = function $removeDataNode(name) {
    //@ts-ignore not calling delete
    this.$_items[name] = undefined;
  };
  _proto5.$getDataNode = function $getDataNode(name) {
    if (this.$_items.hasOwnProperty(name)) {
      return this.$_items[name];
    }
  };
  _proto5.$containsDataNode = function $containsDataNode(name) {
    return this.$_items.hasOwnProperty(name) && typeof this.$_items[name] !== 'undefined';
  };
  _createClass(DataGroup, [{
    key: "$value",
    get: function get() {
      if (this.$type === 'array') {
        return Object.values(this.$_items).filter(function (x) {
          return typeof x !== 'undefined';
        }).map(function (x) {
          return x.$value;
        });
      } else {
        return Object.fromEntries(Object.values(this.$_items).filter(function (x) {
          return typeof x !== 'undefined';
        }).map(function (x) {
          return [x.$name, x.$value];
        }));
      }
    }
  }, {
    key: "$length",
    get: function get() {
      return Object.entries(this.$_items).length;
    }
  }, {
    key: "$isDataGroup",
    get: function get() {
      return true;
    }
  }]);
  return DataGroup;
}(DataValue);
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var TOK_DOT = 'DOT';
var TOK_IDENTIFIER = 'Identifier';
var TOK_GLOBAL = 'Global';
var TOK_BRACKET = 'bracket';
var TOK_NUMBER = 'Number';
var globalStartToken = '$';
var identifier = function identifier(value, start) {
  return {
    type: TOK_IDENTIFIER,
    value: value,
    start: start
  };
};
var bracket = function bracket(value, start) {
  return {
    type: TOK_BRACKET,
    value: value,
    start: start
  };
};
var global$ = function global$() {
  return {
    type: TOK_GLOBAL,
    start: 0,
    value: globalStartToken
  };
};
var isAlphaNum = function isAlphaNum(ch) {
  return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9' || ch === '_';
};
var isGlobal = function isGlobal(prev, stream, pos) {
  // global tokens occur only at the start of an expression
  return prev === null && stream[pos] === globalStartToken;
};
var isIdentifier = function isIdentifier(stream, pos) {
  var ch = stream[pos];
  // $ is special -- it's allowed to be part of an identifier if it's the first character
  if (ch === '$') {
    return stream.length > pos && isAlphaNum(stream[pos + 1]);
  }
  // return whether character 'isAlpha'
  return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch === '_';
};
var isNum = function isNum(ch) {
  return ch >= '0' && ch <= '9';
};
var Tokenizer = /*#__PURE__*/function () {
  function Tokenizer(stream) {
    this._tokens = [];
    this._result_tokens = [];
    this.stream = stream;
    this._current = 0;
  }
  var _proto6 = Tokenizer.prototype;
  _proto6._consumeGlobal = function _consumeGlobal() {
    this._current += 1;
    return global$();
  };
  _proto6._consumeUnquotedIdentifier = function _consumeUnquotedIdentifier(stream) {
    var start = this._current;
    this._current += 1;
    while (this._current < stream.length && isAlphaNum(stream[this._current])) {
      this._current += 1;
    }
    return identifier(stream.slice(start, this._current), start);
  };
  _proto6._consumeQuotedIdentifier = function _consumeQuotedIdentifier(stream) {
    var start = this._current;
    this._current += 1;
    var maxLength = stream.length;
    while (stream[this._current] !== '"' && this._current < maxLength) {
      // You can escape a double quote and you can escape an escape.
      var current = this._current;
      if (stream[current] === '\\' && (stream[current + 1] === '\\' || stream[current + 1] === '"')) {
        current += 2;
      } else {
        current += 1;
      }
      this._current = current;
    }
    this._current += 1;
    return identifier(JSON.parse(stream.slice(start, this._current)), start);
  };
  _proto6._consumeNumber = function _consumeNumber(stream) {
    var start = this._current;
    this._current += 1;
    var maxLength = stream.length;
    while (isNum(stream[this._current]) && this._current < maxLength) {
      this._current += 1;
    }
    var n = stream.slice(start, this._current);
    var value = parseInt(n, 10);
    return {
      type: TOK_NUMBER,
      value: value,
      start: start
    };
  };
  _proto6._consumeBracket = function _consumeBracket(stream) {
    var start = this._current;
    this._current += 1;
    var value;
    if (isNum(stream[this._current])) {
      value = this._consumeNumber(stream).value;
    } else {
      throw new Error("unexpected exception at position " + this._current + ". Must be a character");
    }
    if (this._current < this.stream.length && stream[this._current] !== ']') {
      throw new Error("unexpected exception at position " + this._current + ". Must be a character");
    }
    this._current++;
    return bracket(value, start);
  };
  _proto6.tokenize = function tokenize() {
    var stream = this.stream;
    while (this._current < stream.length) {
      var prev = this._tokens.length ? this._tokens.slice(-1)[0] : null;
      if (isGlobal(prev, stream, this._current)) {
        var token = this._consumeGlobal();
        this._tokens.push(token);
        this._result_tokens.push(token);
      } else if (isIdentifier(stream, this._current)) {
        var _token = this._consumeUnquotedIdentifier(stream);
        this._tokens.push(_token);
        this._result_tokens.push(_token);
      } else if (stream[this._current] === '.' && prev != null && prev.type !== TOK_DOT) {
        this._tokens.push({
          type: TOK_DOT,
          value: '.',
          start: this._current
        });
        this._current += 1;
      } else if (stream[this._current] === '[') {
        // No need to increment this._current.  This happens
        // in _consumeLBracket
        var _token2 = this._consumeBracket(stream);
        this._tokens.push(_token2);
        this._result_tokens.push(_token2);
      } else if (stream[this._current] === '"') {
        var _token3 = this._consumeQuotedIdentifier(stream);
        this._tokens.push(_token3);
        this._result_tokens.push(_token3);
      } else {
        var p = Math.max(0, this._current - 2);
        var s = Math.min(this.stream.length, this._current + 2);
        throw new Error("Exception at parsing stream " + this.stream.slice(p, s));
      }
    }
    return this._result_tokens;
  };
  return Tokenizer;
}();
var tokenize = function tokenize(stream) {
  return new Tokenizer(stream).tokenize();
};
var resolveData = function resolveData(data, input, create) {
  var tokens;
  if (typeof input === 'string') {
    tokens = tokenize(input);
  } else {
    tokens = input;
  }
  var result = data;
  var i = 0;
  var createIntermediateNode = function createIntermediateNode(token, nextToken, create) {
    return nextToken === null ? create : nextToken.type === TOK_BRACKET ? new DataGroup(token.value, [], 'array') : new DataGroup(token.value, {});
  };
  while (i < tokens.length && result != null) {
    var token = tokens[i];
    if (token.type === TOK_GLOBAL) {
      result = data;
    } else if (token.type === TOK_IDENTIFIER) {
      if (result instanceof DataGroup && result.$type === 'object') {
        //@ts-ignore
        if (result.$containsDataNode(token.value) && result.$getDataNode(token.value).$value !== null) {
          result = result.$getDataNode(token.value);
        } else if (create) {
          var nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
          var toCreate = createIntermediateNode(token, nextToken, create);
          result.$addDataNode(token.value, toCreate);
          result = toCreate;
        } else {
          result = undefined;
        }
      } else {
        throw new Error("Looking for " + token.value + " in " + result.$value);
      }
    } else if (token.type === TOK_BRACKET) {
      if (result instanceof DataGroup && result.$type === 'array') {
        var index = token.value;
        if (index < result.$length) {
          //@ts-ignore
          result = result.$getDataNode(index);
        } else if (create) {
          var _nextToken = i < tokens.length - 1 ? tokens[i + 1] : null;
          var _toCreate = createIntermediateNode(token, _nextToken, create);
          result.$addDataNode(index, _toCreate);
          result = _toCreate;
        } else {
          result = undefined;
        }
      } else {
        throw new Error("Looking for index " + token.value + " in non array" + result.$value);
      }
    }
    i += 1;
  }
  return result;
};

/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var __decorate$2 = function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the properties that are editable. These properties can be modified during rule execution.
 */
var editableProperties = ['value', 'label', 'description', 'visible', 'enabled', 'readOnly', 'enum', 'enumNames', 'required', 'properties',
// 'enforceEnum', // not exposed for now
'exclusiveMinimum', 'exclusiveMaximum', 'maxLength', 'maximum', 'maxItems', 'minLength', 'minimum', 'minItems', 'step'
// 'placeholder' // not exposed for now.
];
/**
 * Defines props that are dynamic and can be changed at runtime.
 */
var dynamicProps = [].concat(editableProperties, ['valid', 'index', 'activeChild']);
/**
 * Implementation of action with target
 * @private
 */
var ActionImplWithTarget = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param _action
   * @param _target
   * @private
   */
  function ActionImplWithTarget(_action, _target) {
    this._action = _action;
    this._target = _target;
  }
  var _proto7 = ActionImplWithTarget.prototype;
  _proto7.toString = function toString() {
    return this._action.toString();
  };
  _createClass(ActionImplWithTarget, [{
    key: "type",
    get: function get() {
      return this._action.type;
    }
  }, {
    key: "payload",
    get: function get() {
      return this._action.payload;
    }
  }, {
    key: "metadata",
    get: function get() {
      return this._action.metadata;
    }
  }, {
    key: "target",
    get: function get() {
      return this._target;
    }
  }, {
    key: "isCustomEvent",
    get: function get() {
      return this._action.isCustomEvent;
    }
  }, {
    key: "originalAction",
    get: function get() {
      return this._action.originalAction;
    }
  }]);
  return ActionImplWithTarget;
}();
var target = Symbol('target');
var qualifiedName = Symbol('qualifiedName');
function dependencyTracked() {
  return function (target, propertyKey, descriptor) {
    var get = descriptor.get;
    if (get != undefined) {
      descriptor.get = function () {
        // @ts-ignore
        this.ruleEngine.trackDependency(this);
        return get.call(this);
      };
    }
  };
}
/**
 * Defines a generic base class which all objects of form runtime model should extend from.
 * @typeparam T type of the form object which extends from {@link BaseJson | base type}
 */
var BaseNode = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param params
   * @param _options
   * @private
   */
  function BaseNode(params,
  //@ts_ignore
  _options) {
    this._callbacks = {};
    this._dependents = [];
    this._tokens = [];
    this._options = _options;
    //@ts-ignore
    this[qualifiedName] = null;
    this._jsonModel = _extends({}, params, {
      //@ts-ignore
      id: 'id' in params ? params.id : this.form.getUniqueId()
    });
  }
  var _proto8 = BaseNode.prototype;
  _proto8.setupRuleNode = function setupRuleNode() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var self = this;
    this._ruleNode = new Proxy(this.ruleNodeReference(), {
      get: function get(ruleNodeReference, prop) {
        return self.getFromRule(ruleNodeReference, prop);
      }
    });
  }
  /**
   * @private
   */;
  _proto8.ruleNodeReference = function ruleNodeReference() {
    return this;
  }
  /**
   * @private
   */;
  _proto8.getRuleNode = function getRuleNode() {
    return this._ruleNode;
  };
  _proto8.getFromRule = function getFromRule(ruleNodeReference, prop) {
    if (prop === Symbol.toPrimitive || prop === 'valueOf' && !ruleNodeReference.hasOwnProperty('valueOf')) {
      return this.valueOf;
    } else if (prop === target) {
      return this;
    } else if (typeof prop === 'string') {
      //look for property
      if (prop.startsWith('$')) {
        prop = prop.substr(1);
        //@ts-ignore
        //@todo: create a list of properties that are allowed
        //@ts-ignore
        // return only non functional properties in this object
        if (typeof this[prop] !== 'function') {
          //@ts-ignore
          var retValue = this[prop];
          if (retValue instanceof BaseNode) {
            //$parent
            return retValue.getRuleNode();
          } else if (retValue instanceof Array) {
            //$items
            return retValue.map(function (r) {
              return r instanceof BaseNode ? r.getRuleNode() : r;
            });
          } else {
            return retValue;
          }
        }
      } else {
        //look in the items
        if (ruleNodeReference.hasOwnProperty(prop)) {
          return ruleNodeReference[prop];
        } else if (typeof ruleNodeReference[prop] === 'function') {
          //todo : create allow list of functions
          //to support panel instanceof Array panel1.map(..)
          return ruleNodeReference[prop];
        }
      }
    }
  };
  /**
   * Transparent form fields are meant only for creation of view. They are also not part of data
   */
  _proto8.isTransparent = function isTransparent() {
    var _this$parent;
    // named form fields are not transparent
    // @ts-ignore
    // handling array use-case as items of array can be unnamed
    var isNonTransparent = ((_this$parent = this.parent) == null ? void 0 : _this$parent._jsonModel.type) === 'array';
    return !this._jsonModel.name && !isNonTransparent;
  };
  _proto8.getState = function getState() {
    return _extends({}, this._jsonModel, {
      ':type': this[':type']
    });
  }
  /**
   * @private
   */;
  _proto8.subscribe = function subscribe(callback, eventName) {
    var _this2 = this;
    if (eventName === void 0) {
      eventName = 'change';
    }
    this._callbacks[eventName] = this._callbacks[eventName] || [];
    this._callbacks[eventName].push(callback);
    //console.log(`subscription added : ${this._elem.id}, count : ${this._callbacks[eventName].length}`);
    return {
      unsubscribe: function unsubscribe() {
        _this2._callbacks[eventName] = _this2._callbacks[eventName].filter(function (x) {
          return x !== callback;
        });
        //console.log(`subscription removed : ${this._elem.id}, count : ${this._callbacks[eventName].length}`);
      }
    };
  }
  /**
   * @private
   */;
  _proto8._addDependent = function _addDependent(dependent) {
    if (this._dependents.find(function (_ref3) {
      var node = _ref3.node;
      return node === dependent;
    }) === undefined) {
      var subscription = this.subscribe(function (change) {
        var changes = change.payload.changes;
        var propsToLook = [].concat(dynamicProps, ['items']);
        // @ts-ignore
        var isPropChanged = changes.findIndex(function (x) {
          return propsToLook.indexOf(x.propertyName) > -1;
        }) > -1;
        if (isPropChanged) {
          dependent.dispatch(new ExecuteRule());
        }
      });
      this._dependents.push({
        node: dependent,
        subscription: subscription
      });
    }
  }
  /**
   * @private
   */;
  _proto8.removeDependent = function removeDependent(dependent) {
    var index = this._dependents.findIndex(function (_ref4) {
      var node = _ref4.node;
      return node === dependent;
    });
    if (index > -1) {
      this._dependents[index].subscription.unsubscribe();
      this._dependents.splice(index, 1);
    }
  }
  /**
   * @private
   */;
  _proto8.queueEvent = function queueEvent(action) {
    var actionWithTarget = new ActionImplWithTarget(action, this);
    this.form.getEventQueue().queue(this, actionWithTarget, ['valid', 'invalid'].indexOf(actionWithTarget.type) > -1);
  };
  _proto8.dispatch = function dispatch(action) {
    this.queueEvent(action);
    this.form.getEventQueue().runPendingQueue();
  }
  /**
   * @private
   */;
  _proto8.notifyDependents = function notifyDependents(action) {
    var _this3 = this;
    var handlers = this._callbacks[action.type] || [];
    handlers.forEach(function (x) {
      x(new ActionImplWithTarget(action, _this3));
    });
  }
  /**
   * @param prop
   * @param newValue
   * @private
   */;
  _proto8._setProperty = function _setProperty(prop, newValue, notify) {
    if (notify === void 0) {
      notify = true;
    }
    //@ts-ignore
    var oldValue = this._jsonModel[prop];
    var isValueSame = false;
    if (newValue !== null && oldValue !== null && typeof newValue === 'object' && typeof oldValue === 'object') {
      isValueSame = JSON.stringify(newValue) === JSON.stringify(oldValue);
    } else {
      // @ts-ignore
      isValueSame = oldValue === newValue;
    }
    if (!isValueSame) {
      //@ts-ignore
      this._jsonModel[prop] = newValue;
      var changeAction = propertyChange(prop, newValue, oldValue);
      if (notify) {
        this.notifyDependents(changeAction);
      }
      return changeAction.payload.changes;
    }
    return [];
  }
  /**
   * @private
   */;
  _proto8._bindToDataModel = function _bindToDataModel(contextualDataModel) {
    if (this.id === '$form') {
      this._data = contextualDataModel;
      return;
    }
    var dataRef = this._jsonModel.dataRef;
    var _data,
      _parent = contextualDataModel,
      _key = '';
    if (dataRef === null) {
      // null data binding
      _data = NullDataValue;
    } else if (dataRef !== undefined) {
      // explicit data binding
      if (this._tokens.length === 0) {
        this._tokens = tokenize(dataRef);
      }
      var searchData = contextualDataModel;
      if (this._tokens[0].type === TOK_GLOBAL) {
        searchData = this.form.getDataNode();
      }
      if (typeof searchData !== 'undefined') {
        var name = this._tokens[this._tokens.length - 1].value;
        var create = this.defaultDataModel(name);
        _data = resolveData(searchData, this._tokens, create);
        // @ts-ignore
        _parent = resolveData(searchData, this._tokens.slice(0, -1));
        _key = name;
      }
    } else {
      // name data binding
      if (
      //@ts-ignore
      contextualDataModel !== NullDataValue) {
        _parent = contextualDataModel;
        var _name2 = this._jsonModel.name || '';
        var key = contextualDataModel.$type === 'array' ? this.index : _name2;
        _key = key;
        if (key !== '') {
          var _create = this.defaultDataModel(key);
          if (_create !== undefined) {
            _data = contextualDataModel.$getDataNode(key);
            if (_data === undefined) {
              _data = _create;
              contextualDataModel.$addDataNode(key, _data);
            }
          }
        } else {
          _data = undefined;
        }
      }
    }
    if (_data) {
      var _data3;
      //@ts-ignore
      if (!this.isContainer && _parent !== NullDataValue && _data !== NullDataValue) {
        var _data2;
        _data = (_data2 = _data) == null ? void 0 : _data2.$convertToDataValue();
        _parent.$addDataNode(_key, _data, true);
      }
      (_data3 = _data) == null ? void 0 : _data3.$bindToField(this);
      this._data = _data;
    }
  }
  /**
   * @private
   */;
  _proto8.getDataNode = function getDataNode() {
    return this._data;
  };
  _proto8.getNonTransparentParent = function getNonTransparentParent() {
    var nonTransparentParent = this.parent;
    while (nonTransparentParent != null && nonTransparentParent.isTransparent()) {
      nonTransparentParent = nonTransparentParent.parent;
    }
    return nonTransparentParent;
  }
  /**
   * called after the node is inserted in the parent
   * @private
   */;
  _proto8._initialize = function _initialize() {
    if (typeof this._data === 'undefined') {
      var dataNode,
        parent = this.parent;
      do {
        //@ts-ignore
        dataNode = parent.getDataNode();
        parent = parent.parent;
      } while (dataNode === undefined);
      this._bindToDataModel(dataNode);
    }
  }
  /**
   * Checks whether there are any updates in the properties. If there are applies them to the
   * json model as well.
   * @param propNames
   * @param updates
   * @private
   */;
  _proto8._applyUpdates = function _applyUpdates(propNames, updates) {
    var _this4 = this;
    return propNames.reduce(function (acc, propertyName) {
      //@ts-ignore
      var currentValue = updates[propertyName];
      var changes = _this4._setProperty(propertyName, currentValue, false);
      if (changes.length > 0) {
        acc[propertyName] = changes[0];
      }
      return acc;
    }, {});
  };
  _proto8.focus = function focus() {
    if (this.parent) {
      this.parent.activeChild = this;
    }
  };
  _createClass(BaseNode, [{
    key: "isContainer",
    get:
    //@ts-ignore

    function get() {
      return false;
    }
  }, {
    key: "id",
    get: function get() {
      return this._jsonModel.id;
    }
  }, {
    key: "index",
    get: function get() {
      return this.parent.indexOf(this);
    }
  }, {
    key: "parent",
    get: function get() {
      return this._options.parent;
    }
  }, {
    key: "type",
    get: function get() {
      return this._jsonModel.type;
    }
  }, {
    key: "fieldType",
    get: function get() {
      return this._jsonModel.fieldType || 'text-input';
    }
  }, {
    key: ':type',
    get: function get() {
      return this._jsonModel[':type'] || this.fieldType;
    }
  }, {
    key: "name",
    get: function get() {
      return this._jsonModel.name;
    }
  }, {
    key: "description",
    get: function get() {
      return this._jsonModel.description;
    },
    set: function set(d) {
      this._setProperty('description', d);
    }
  }, {
    key: "dataRef",
    get: function get() {
      return this._jsonModel.dataRef;
    }
  }, {
    key: "visible",
    get: function get() {
      return this._jsonModel.visible;
    },
    set: function set(v) {
      if (v !== this._jsonModel.visible) {
        var changeAction = propertyChange('visible', v, this._jsonModel.visible);
        this._jsonModel.visible = v;
        this.notifyDependents(changeAction);
      }
    }
  }, {
    key: "form",
    get: function get() {
      return this._options.form;
    }
  }, {
    key: "ruleEngine",
    get: function get() {
      return this.form.ruleEngine;
    }
  }, {
    key: "label",
    get: function get() {
      return this._jsonModel.label;
    },
    set: function set(l) {
      if (l !== this._jsonModel.label) {
        var changeAction = propertyChange('label', l, this._jsonModel.label);
        this._jsonModel = _extends({}, this._jsonModel, {
          label: l
        });
        this.notifyDependents(changeAction);
      }
    }
  }, {
    key: "uniqueItems",
    get: function get() {
      return this._jsonModel.uniqueItems;
    }
  }, {
    key: "properties",
    get: function get() {
      return this._jsonModel.properties || {};
    },
    set: function set(p) {
      this._setProperty('properties', _extends({}, p));
    }
  }, {
    key: "qualifiedName",
    get: function get() {
      if (this.isTransparent()) {
        return null;
      }
      // @ts-ignore
      if (this[qualifiedName] !== null) {
        // @ts-ignore
        return this[qualifiedName];
      }
      // use qualified name
      var parent = this.getNonTransparentParent();
      if (parent && parent.type === 'array') {
        //@ts-ignore
        this[qualifiedName] = parent.qualifiedName + "[" + this.index + "]";
      } else {
        //@ts-ignore
        this[qualifiedName] = parent.qualifiedName + "." + this.name;
      }
      //@ts-ignore
      return this[qualifiedName];
    }
  }]);
  return BaseNode;
}();
__decorate$2([dependencyTracked()], BaseNode.prototype, "index", null);
__decorate$2([dependencyTracked()], BaseNode.prototype, "description", null);
__decorate$2([dependencyTracked()], BaseNode.prototype, "visible", null);
__decorate$2([dependencyTracked()], BaseNode.prototype, "label", null);
__decorate$2([dependencyTracked()], BaseNode.prototype, "properties", null);

/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Defines scriptable aspects (ie rules, events) of form runtime model. Any form runtime object which requires
 * execution of rules/events should extend from this class.
 */
var Scriptable = /*#__PURE__*/function (_BaseNode) {
  _inheritsLoose(Scriptable, _BaseNode);
  function Scriptable() {
    var _this5;
    _this5 = _BaseNode.call.apply(_BaseNode, [this].concat([].slice.call(arguments))) || this;
    _this5._events = {};
    _this5._rules = {};
    return _this5;
  }
  var _proto9 = Scriptable.prototype;
  _proto9.getCompiledRule = function getCompiledRule(eName, rule) {
    if (!(eName in this._rules)) {
      var eString = rule || this.rules[eName];
      if (typeof eString === 'string' && eString.length > 0) {
        try {
          this._rules[eName] = this.ruleEngine.compileRule(eString);
        } catch (e) {
          this.form.logger.error("Unable to compile rule `\"" + eName + "\" : \"" + eString + "\"` Exception : " + e);
        }
      } else {
        throw new Error("only expression strings are supported. " + typeof eString + " types are not supported");
      }
    }
    return this._rules[eName];
  };
  _proto9.getCompiledEvent = function getCompiledEvent(eName) {
    var _this6 = this;
    if (!(eName in this._events)) {
      var _this$_jsonModel$even;
      var eString = (_this$_jsonModel$even = this._jsonModel.events) == null ? void 0 : _this$_jsonModel$even[eName];
      if (typeof eString === 'string' && eString.length > 0) {
        eString = [eString];
      }
      if (typeof eString !== 'undefined' && eString.length > 0) {
        this._events[eName] = eString.map(function (x) {
          try {
            return _this6.ruleEngine.compileRule(x);
          } catch (e) {
            _this6.form.logger.error("Unable to compile expression `\"" + eName + "\" : \"" + eString + "\"` Exception : " + e);
          }
          return null;
        }).filter(function (x) {
          return x !== null;
        });
      }
    }
    return this._events[eName] || [];
  };
  _proto9.applyUpdates = function applyUpdates(updates) {
    var _this7 = this;
    Object.entries(updates).forEach(function (_ref5) {
      var key = _ref5[0],
        value = _ref5[1];
      // @ts-ignore
      // the first check is to disable accessing this.value & this.items property
      // otherwise that will trigger dependency tracking
      if (key in editableProperties || key in _this7 && typeof _this7[key] !== 'function') {
        try {
          // @ts-ignore
          _this7[key] = value;
        } catch (e) {
          console.error(e);
        }
      }
    });
  };
  _proto9.executeAllRules = function executeAllRules(context) {
    var _this8 = this;
    var entries = Object.entries(this.rules);
    if (entries.length > 0) {
      var scope = this.getExpressionScope();
      entries.forEach(function (_ref6) {
        var prop = _ref6[0],
          rule = _ref6[1];
        var node = _this8.getCompiledRule(prop, rule);
        if (node) {
          var newVal = _this8.ruleEngine.execute(node, scope, context, true);
          if (editableProperties.indexOf(prop) > -1) {
            //@ts-ignore
            _this8[prop] = newVal;
          } else {
            _this8.form.logger.warn(prop + " is not a valid editable property.");
          }
        }
      });
    }
  };
  _proto9.getExpressionScope = function getExpressionScope() {
    var parent = this.getNonTransparentParent();
    var target = {
      self: this.getRuleNode(),
      siblings: (parent == null ? void 0 : parent.ruleNodeReference()) || {}
    };
    var scope = new Proxy(target, {
      get: function get(target, prop) {
        if (prop === Symbol.toStringTag) {
          return 'Object';
        }
        prop = prop;
        // The order of resolution is
        // 1. property
        // 2. sibling
        // 3. child
        if (prop.startsWith('$')) {
          //this returns children as well, so adding an explicit check for property name
          var retValue = target.self[prop];
          if (retValue instanceof BaseNode) {
            //$parent
            return retValue.getRuleNode();
          } else if (retValue instanceof Array) {
            //$items
            return retValue.map(function (r) {
              return r instanceof BaseNode ? r.getRuleNode() : r;
            });
          } else {
            return retValue;
          }
        } else {
          if (prop in target.siblings) {
            return target.siblings[prop];
          } else {
            return target.self[prop];
          }
        }
      },
      has: function has(target, prop) {
        prop = prop;
        var selfPropertyOrChild = target.self[prop];
        var sibling = target.siblings[prop];
        return typeof selfPropertyOrChild != 'undefined' || typeof sibling != 'undefined';
      }
    });
    return scope;
  };
  _proto9.executeEvent = function executeEvent(context, node) {
    var updates;
    if (node) {
      updates = this.ruleEngine.execute(node, this.getExpressionScope(), context);
    }
    if (typeof updates !== 'undefined' && updates != null) {
      this.applyUpdates(updates);
    }
  }
  /**
   * Executes the given rule
   * @param event
   * @param context
   * @private
   */;
  _proto9.executeRule = function executeRule(event, context) {
    if (typeof event.payload.ruleName === 'undefined') {
      this.executeAllRules(context);
    }
  };
  _proto9.executeExpression = function executeExpression(expr) {
    var ruleContext = {
      'form': this.form,
      '$form': this.form.getRuleNode(),
      '$field': this.getRuleNode(),
      'field': this
    };
    var node = this.ruleEngine.compileRule(expr);
    return this.ruleEngine.execute(node, this.getExpressionScope(), ruleContext);
  }
  /**
   * Executes the given action
   * @param action    {@link Action | event object}
   */;
  _proto9.executeAction = function executeAction(action) {
    var _this9 = this;
    var context = {
      'form': this.form,
      '$form': this.form.getRuleNode(),
      '$field': this.getRuleNode(),
      'field': this,
      '$event': {
        type: action.type,
        payload: action.payload,
        target: this.getRuleNode()
      }
    };
    var eventName = action.isCustomEvent ? "custom:" + action.type : action.type;
    var funcName = action.isCustomEvent ? "custom_" + action.type : action.type;
    var node = this.getCompiledEvent(eventName);
    //todo: apply all the updates at the end  or
    // not trigger the change event until the execution is finished
    node.forEach(function (n) {
      return _this9.executeEvent(context, n);
    });
    // @ts-ignore
    if (funcName in this && typeof this[funcName] === 'function') {
      //@ts-ignore
      this[funcName](action, context);
    }
    this.notifyDependents(action);
  };
  _createClass(Scriptable, [{
    key: "rules",
    get: function get() {
      return this._jsonModel.rules || {};
    }
  }]);
  return Scriptable;
}(BaseNode);
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var __decorate$1 = function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines a generic container class which any form container should extend from.
 * @typeparam T type of the node which extends {@link ContainerJson} and {@link RulesJson}
 */
var Container = /*#__PURE__*/function (_Scriptable) {
  _inheritsLoose(Container, _Scriptable);
  function Container() {
    var _this10;
    _this10 = _Scriptable.call.apply(_Scriptable, [this].concat([].slice.call(arguments))) || this;
    _this10._children = [];
    _this10._itemTemplate = null;
    _this10._activeChild = null;
    return _this10;
  }
  /**
   * @private
   */
  var _proto10 = Container.prototype;
  _proto10.ruleNodeReference = function ruleNodeReference() {
    return this._childrenReference;
  }
  //todo : this should not be public
  ;
  /**
   * returns whether the items in the Panel can repeat or not
   */
  _proto10.hasDynamicItems = function hasDynamicItems() {
    return this._itemTemplate != null;
  };
  /**
   * Returns the current container state
   */
  _proto10.getState = function getState() {
    return _extends({}, this._jsonModel, {
      ':type': this[':type'],
      items: this._children.map(function (x) {
        return _extends({}, x.getState());
      })
    });
  };
  _proto10._addChildToRuleNode = function _addChildToRuleNode(child, options) {
    var _this11 = this;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var self = this;
    var _options$parent = options.parent,
      parent = _options$parent === void 0 ? this : _options$parent;
    //the child has not been added to the array, hence using the length as new index
    // this means unnamed panel inside repeatable named parent // this is an edge case, handling it gracefully
    // todo: rules don't work inside repeatable array
    var name = parent.type == 'array' ? parent._children.length + '' : child.name || '';
    if (name.length > 0) {
      Object.defineProperty(parent._childrenReference, name, {
        get: function get() {
          if (child.isContainer && child.hasDynamicItems()) {
            self.ruleEngine.trackDependency(child); //accessing dynamic panel directly
          }

          if (self.hasDynamicItems()) {
            self.ruleEngine.trackDependency(self); //accessing a child of dynamic panel
            if (_this11._children[name] !== undefined) {
              // pop function calls this getter in order to return the item
              return _this11._children[name].getRuleNode();
            }
          } else {
            return child.getRuleNode();
          }
        },
        configurable: true,
        enumerable: true
      });
    }
  };
  _proto10._addChild = function _addChild(itemJson, index, cloneIds) {
    if (cloneIds === void 0) {
      cloneIds = false;
    }
    // get first non transparent parent
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var nonTransparentParent = this;
    while (nonTransparentParent != null && nonTransparentParent.isTransparent()) {
      // @ts-ignore
      nonTransparentParent = nonTransparentParent.parent;
    }
    if (typeof index !== 'number' || index > nonTransparentParent._children.length) {
      index = this._children.length;
    }
    var form = this.form;
    var itemTemplate = _extends({
      index: index
    }, deepClone(itemJson, cloneIds ? function () {
      return form.getUniqueId();
    } : undefined));
    //@ts-ignore
    var retVal = this._createChild(itemTemplate, {
      parent: this,
      index: index
    });
    this._addChildToRuleNode(retVal, {
      parent: nonTransparentParent
    });
    if (index === this._children.length) {
      this._children.push(retVal);
    } else {
      // @ts-ignore
      this._children.splice(index, 0, retVal);
    }
    return retVal;
  };
  _proto10.indexOf = function indexOf(f) {
    return this._children.indexOf(f);
  }
  /**
   * @private
   */;
  _proto10.defaultDataModel = function defaultDataModel(name) {
    var type = this._jsonModel.type || undefined;
    if (type === undefined) {
      return undefined;
    } else {
      var instance = type === 'array' ? [] : {};
      return new DataGroup(name, instance, type);
    }
  }
  /**
   * @private
   */;
  _proto10._initialize = function _initialize() {
    var _this12 = this;
    _Scriptable.prototype._initialize.call(this);
    var items = this._jsonModel.items;
    this._jsonModel.items = [];
    this._childrenReference = this._jsonModel.type == 'array' ? [] : {};
    if (this._jsonModel.type == 'array' && items.length === 1 && this.getDataNode() != null) {
      this._itemTemplate = deepClone(items[0]);
      if (typeof this._jsonModel.minItems !== 'number') {
        this._jsonModel.minItems = 0;
      }
      if (typeof this._jsonModel.maxItems !== 'number') {
        this._jsonModel.maxItems = -1;
      }
      if (typeof this._jsonModel.initialItems !== 'number') {
        this._jsonModel.initialItems = Math.max(1, this._jsonModel.minItems);
      }
      for (var i = 0; i < this._jsonModel.initialItems; i++) {
        //@ts-ignore
        var child = this._addChild(this._itemTemplate);
        child._initialize();
      }
    } else if (items.length > 0) {
      items.forEach(function (item) {
        var child = _this12._addChild(item);
        child._initialize();
      });
      this._jsonModel.minItems = this._children.length;
      this._jsonModel.maxItems = this._children.length;
      this._jsonModel.initialItems = this._children.length;
    }
    this.setupRuleNode();
  }
  /**
   * @private
   */;
  _proto10.addItem = function addItem(action) {
    if (action.type === 'addItem' && this._itemTemplate != null) {
      //@ts-ignore
      if (this._jsonModel.maxItems === -1 || this._children.length < this._jsonModel.maxItems) {
        var dataNode = this.getDataNode();
        var index = action.payload;
        if (typeof index !== 'number' || index > this._children.length) {
          index = this._children.length;
        }
        var retVal = this._addChild(this._itemTemplate, action.payload, true);
        var _data = retVal.defaultDataModel(index);
        if (_data) {
          dataNode.$addDataNode(index, _data);
        }
        retVal._initialize();
        this.notifyDependents(propertyChange('items', retVal.getState, null));
        retVal.dispatch(new Initialize());
        retVal.dispatch(new ExecuteRule());
        for (var i = index + 1; i < this._children.length; i++) {
          this._children[i].dispatch(new ExecuteRule());
        }
      }
    }
  }
  /**
   * @private
   */;
  _proto10.removeItem = function removeItem(action) {
    if (action.type === 'removeItem' && this._itemTemplate != null) {
      if (this._children.length == 0) {
        //can't remove item if there isn't any
        return;
      }
      var index = typeof action.payload === 'number' ? action.payload : this._children.length - 1;
      var state = this._children[index].getState();
      //@ts-ignore
      if (this._children.length > this._jsonModel.minItems) {
        // clear child
        //remove field
        this._childrenReference.pop();
        this._children.splice(index, 1);
        this.getDataNode().$removeDataNode(index);
        for (var i = index; i < this._children.length; i++) {
          this._children[i].dispatch(new ExecuteRule());
        }
        this.notifyDependents(propertyChange('items', null, state));
      }
    }
  }
  /**
   * @private
   */;
  _proto10.queueEvent = function queueEvent(action) {
    var _action$metadata;
    _Scriptable.prototype.queueEvent.call(this, action);
    if ((_action$metadata = action.metadata) != null && _action$metadata.dispatch) {
      this.items.forEach(function (x) {
        //@ts-ignore
        x.queueEvent(action);
      });
    }
  };
  _proto10.validate = function validate() {
    return this.items.flatMap(function (x) {
      return x.validate();
    }).filter(function (x) {
      return x.fieldName !== '';
    });
  }
  /**
   * @private
   */;
  _proto10.dispatch = function dispatch(action) {
    _Scriptable.prototype.dispatch.call(this, action);
  }
  /**
   * @private
   */;
  _proto10.importData = function importData(contextualDataModel) {
    this._bindToDataModel(contextualDataModel);
    var dataNode = this.getDataNode() || contextualDataModel;
    this.syncDataAndFormModel(dataNode);
  }
  /**
   * prefill the form with data on the given element
   * @param dataModel
   * @param contextualDataModel
   * @param operation
   * @private
   */;
  _proto10.syncDataAndFormModel = function syncDataAndFormModel(contextualDataModel) {
    if ((contextualDataModel == null ? void 0 : contextualDataModel.$type) === 'array' && this._itemTemplate != null) {
      var dataLength = contextualDataModel == null ? void 0 : contextualDataModel.$value.length;
      var itemsLength = this._children.length;
      var maxItems = this._jsonModel.maxItems === -1 ? dataLength : this._jsonModel.maxItems;
      var minItems = this._jsonModel.minItems;
      //@ts-ignore
      var items2Add = Math.min(dataLength - itemsLength, maxItems - itemsLength);
      //@ts-ignore
      var items2Remove = Math.min(itemsLength - dataLength, itemsLength - minItems);
      while (items2Add > 0) {
        items2Add--;
        var child = this._addChild(this._itemTemplate);
        child._initialize();
      }
      if (items2Remove > 0) {
        this._children.splice(dataLength, items2Remove);
        for (var i = 0; i < items2Remove; i++) {
          this._childrenReference.pop();
        }
      }
    }
    this._children.forEach(function (x) {
      x.importData(contextualDataModel);
    });
  };
  _createClass(Container, [{
    key: "items",
    get: function get() {
      return this._children;
    }
  }, {
    key: "maxItems",
    get: function get() {
      return this._jsonModel.maxItems;
    },
    set: function set(m) {
      this._jsonModel.maxItems = m;
      var minItems = this._jsonModel.minItems || 1;
      var itemsLength = this._children.length;
      var items2Remove = Math.min(itemsLength - m, itemsLength - minItems);
      if (items2Remove > 0) {
        for (var i = 0; i < items2Remove; i++) {
          this.getDataNode().$removeDataNode(m + i);
          this._childrenReference.pop();
        }
        var elems = this._children.splice(m, items2Remove);
        this.notifyDependents(propertyChange('items', elems, null));
      }
    }
  }, {
    key: "minItems",
    get: function get() {
      return this._jsonModel.minItems;
    }
  }, {
    key: "isContainer",
    get: function get() {
      return true;
    }
  }, {
    key: "activeChild",
    get: function get() {
      return this._activeChild;
    },
    set: function set(c) {
      if (c !== this._activeChild) {
        var activeChild = this._activeChild;
        while (activeChild instanceof Container) {
          var temp = activeChild.activeChild;
          activeChild.activeChild = null;
          activeChild = temp;
        }
        var change = propertyChange('activeChild', c, this._activeChild);
        this._activeChild = c;
        if (this.parent && c !== null) {
          this.parent.activeChild = this;
        }
        this._jsonModel.activeChild = c == null ? void 0 : c.id;
        this.notifyDependents(change);
      }
    }
  }]);
  return Container;
}(Scriptable);
__decorate$1([dependencyTracked()], Container.prototype, "maxItems", null);
__decorate$1([dependencyTracked()], Container.prototype, "minItems", null);
__decorate$1([dependencyTracked()], Container.prototype, "activeChild", null);

/**
 * Defines generic form object class which any form runtime model (like textbox, checkbox etc)
 * should extend from.
 * @typeparam T type of the node (for example, {@link MetaDataJson | form meta data}
 */
var Node = /*#__PURE__*/function () {
  function Node(inputModel) {
    this._jsonModel = _extends({}, inputModel);
  }
  var _proto11 = Node.prototype;
  _proto11.getP = function getP(key, def) {
    return getProperty(this._jsonModel, key, def);
  };
  _createClass(Node, [{
    key: "isContainer",
    get: function get() {
      return false;
    }
  }]);
  return Node;
}();
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Defines form metadata which implements {@link FormMetaDataModel | Form MetaData Model}
 */
var FormMetaData = /*#__PURE__*/function (_Node) {
  _inheritsLoose(FormMetaData, _Node);
  function FormMetaData() {
    return _Node.apply(this, arguments) || this;
  }
  _createClass(FormMetaData, [{
    key: "version",
    get: function get() {
      return this.getP('version', '');
    }
  }, {
    key: "locale",
    get: function get() {
      return this.getP('locale', '');
    }
  }, {
    key: "grammar",
    get: function get() {
      return this.getP('grammar', '');
    }
  }]);
  return FormMetaData;
}(Node);
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Defines a file object which implements the {@link IFileObject | file object interface}
 */
var FileObject = /*#__PURE__*/function () {
  function FileObject(init) {
    this.type = 'application/octet-stream';
    this.name = 'unknown';
    this.size = 0;
    Object.assign(this, init);
  }
  var _proto12 = FileObject.prototype;
  _proto12.toJSON = function toJSON() {
    return {
      'name': this.name,
      'size': this.size,
      'type': this.type,
      'data': this.data.toString()
    };
  };
  _proto12.equals = function equals(obj) {
    return this.data === obj.data && this.type === obj.type && this.name === obj.name && this.size === obj.size;
  };
  return FileObject;
}();
var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'.split('');
var fileSizeRegex = /^(\d*\.?\d+)(\\?(?=[KMGT])([KMGT])(?:i?B)?|B?)$/i;
/**
 * Utility to generate a random word from seed
 * @param l seed value
 * @returns random word
 */
var randomWord = function randomWord(l) {
  var ret = [];
  for (var i = 0; i <= l; i++) {
    var randIndex = Math.floor(Math.random() * chars.length);
    ret.push(chars[randIndex]);
  }
  return ret.join('');
};
/**
 * Returns the list of attachments with its data reference
 * @param input form model
 * @returns list of file attachments {@link FileObject} present in the form
 */
var getAttachments = function getAttachments(input) {
  var items = input.items || [];
  return items == null ? void 0 : items.reduce(function (acc, item) {
    var ret = null;
    if (item.isContainer) {
      ret = getAttachments(item);
    } else {
      if (isFile(item.getState())) {
        ret = {}; // @ts-ignore
        var name = item.name || '';
        var dataRef = item.dataRef != null ? item.dataRef : name.length > 0 ? item.name : undefined;
        //@ts-ignore
        if (item.value instanceof Array) {
          // @ts-ignore
          ret[item.id] = item.value.map(function (x) {
            return _extends({}, x, {
              'dataRef': dataRef
            });
          });
        } else if (item.value != null) {
          // @ts-ignore
          ret[item.id] = _extends({}, item.value, {
            'dataRef': dataRef
          });
        }
      }
    }
    return Object.assign(acc, ret);
  }, {});
};
/**
 * Converts file size in string to bytes based on IEC specification
 * @param str   file size
 * @returns file size as bytes (in kb) based on IEC specification
 */
var getFileSizeInBytes = function getFileSizeInBytes(str) {
  var retVal = 0;
  if (typeof str === 'string') {
    var matches = fileSizeRegex.exec(str.trim());
    if (matches != null) {
      retVal = sizeToBytes(parseFloat(matches[1]), (matches[2] || 'kb').toUpperCase());
    }
  }
  return retVal;
};
/**
 * Converts number to bytes based on the symbol as per IEC specification
 * @param size      size as number
 * @param symbol    symbol to use (for example, kb, mb, gb or tb)
 * @returns number as bytes based on the symbol
 */
var sizeToBytes = function sizeToBytes(size, symbol) {
  var sizes = {
    'KB': 1,
    'MB': 2,
    'GB': 3,
    'TB': 4
  };
  // @ts-ignore
  var i = Math.pow(1024, sizes[symbol]);
  return Math.round(size * i);
};
/**
 * ID Generator
 * @param initial
 * @constructor
 * @private
 */
var IdGenerator = function IdGenerator(initial) {
  if (initial === void 0) {
    initial = 50;
  }
  return /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var initialize, passedIds, ids, x;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            initialize = function initialize() {
              var arr = [];
              for (var i = 0; i < initial; i++) {
                arr.push(randomWord(10));
              }
              return arr;
            };
            passedIds = {};
            ids = initialize();
          case 3:
            x = ids.pop();
            while (x in passedIds) {
              if (ids.length === 0) {
                ids = initialize();
              }
              x = ids.pop();
            }
            passedIds[x] = true;
            _context.next = 8;
            return ids.pop();
          case 8:
            if (ids.length === 0) {
              ids = initialize();
            }
          case 9:
            if (ids.length > 0) {
              _context.next = 3;
              break;
            }
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })();
};
/**
 * Utility to extract {@link FileObject} from string or HTML File data type
 * @param file
 * @returns list of {@link FileObject}
 */
var extractFileInfo = function extractFileInfo(file) {
  if (file !== null) {
    var retVal = null;
    if (file instanceof FileObject) {
      retVal = file;
    } else if (typeof File !== 'undefined' && file instanceof File) {
      // case: file object
      retVal = {
        name: file.name,
        type: file.type,
        size: file.size,
        data: file
      };
    } else if (typeof file === 'string' && isDataUrl(file)) {
      // case: data URL
      var result = dataURItoBlob(file);
      if (result !== null) {
        var blob = result.blob,
          name = result.name;
        retVal = {
          name: name,
          type: blob.type,
          size: blob.size,
          data: blob
        };
      }
    } else {
      var _jFile, _jFile2;
      // case: string as file object
      var jFile = file;
      try {
        jFile = JSON.parse(file);
        retVal = jFile;
      } catch (ex) {
        // do nothing
      }
      if (typeof ((_jFile = jFile) == null ? void 0 : _jFile.data) === 'string' && isDataUrl((_jFile2 = jFile) == null ? void 0 : _jFile2.data)) {
        var _jFile3;
        // case: data URL
        var _result = dataURItoBlob((_jFile3 = jFile) == null ? void 0 : _jFile3.data);
        if (_result !== null) {
          var _jFile4, _jFile5;
          var _blob = _result.blob;
          retVal = {
            name: (_jFile4 = jFile) == null ? void 0 : _jFile4.name,
            type: (_jFile5 = jFile) == null ? void 0 : _jFile5.type,
            size: _blob.size,
            data: _blob
          };
        }
      } else if (typeof jFile === 'string') {
        // case: data as external url
        var fileName = jFile.split('/').pop();
        retVal = {
          name: fileName,
          type: 'application/octet-stream',
          size: 0,
          data: jFile
        };
      } else if (typeof jFile === 'object') {
        var _jFile6, _jFile7, _jFile8, _jFile9;
        // todo: just added for ease of integration for the view layer
        retVal = {
          name: (_jFile6 = jFile) == null ? void 0 : _jFile6.name,
          type: (_jFile7 = jFile) == null ? void 0 : _jFile7.type,
          size: (_jFile8 = jFile) == null ? void 0 : _jFile8.size,
          data: (_jFile9 = jFile) == null ? void 0 : _jFile9.data
        };
      }
    }
    if (retVal !== null && retVal.data != null) {
      return new FileObject(retVal);
    }
    return null;
  } else {
    return null;
  }
};
/**
 * Utility to convert data URI to a `blob` object
 * @param dataURI uri to convert to blob
 * @returns `Blob` object for the data URI
 */
var dataURItoBlob = function dataURItoBlob(dataURI) {
  var regex = /^data:([a-z]+\/[a-z0-9-+.]+)?(?:;name=([^;]+))?(;base64)?,(.+)$/;
  var groups = regex.exec(dataURI);
  if (groups !== null) {
    var type = groups[1] || '';
    var name = groups[2] || 'unknown';
    var isBase64 = typeof groups[3] === 'string';
    if (isBase64) {
      var binary = atob(groups[4]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      var blob = new window.Blob([new Uint8Array(array)], {
        type: type
      });
      return {
        name: name,
        blob: blob
      };
    } else {
      var _blob2 = new window.Blob([groups[4]], {
        type: type
      });
      return {
        name: name,
        blob: _blob2
      };
    }
  } else {
    return null;
  }
};

/**
 * Defines generic utilities to validate form runtime model based on the constraints defined
 * as per `adaptive form specification`
 */
// issue with import
//import {FieldJson, isFileObject} from '../types';
var dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
var dataUrlRegex = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/;
var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInMonth = function daysInMonth(leapYear, month) {
  if (leapYear && month == 2) {
    return 29;
  }
  return days[month - 1];
};
var isLeapYear = function isLeapYear(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
};
var isDataUrl = function isDataUrl(str) {
  return dataUrlRegex.exec(str.trim()) != null;
};
/**
 * Checks whether inputVal is valid number value or not
 *
 * ```
 * const x = checkNumber('12')
 * ```
 * would return
 * ```
 * {
 *     value : 12,
 *     valid : true
 * }
 * ```
 * @param inputVal input value
 * @returns {@link ValidationResult | Validation result}
 */
var checkNumber = function checkNumber(inputVal) {
  var value = parseFloat(inputVal);
  var valid = !isNaN(value);
  if (!valid) {
    value = inputVal;
  }
  return {
    value: value,
    valid: valid
  };
};
var checkInteger = function checkInteger(inputVal) {
  var value = parseFloat(inputVal);
  var valid = !isNaN(value) && Math.round(value) === value;
  if (!valid) {
    value = inputVal;
  }
  return {
    value: value,
    valid: valid
  };
};
/**
 * Wraps a non-null value and not an array value into an array
 * @param inputVal input value
 * @returns wraps the input value into an array
 */
var toArray = function toArray(inputVal) {
  if (inputVal != null && !(inputVal instanceof Array)) {
    return [inputVal];
  }
  return inputVal;
};
/**
 * Checks whether inputVal is valid boolean value or not
 *
 * ```
 * const x = checkBool('false')
 * ```
 * would return
 * ```
 * {
 *     value : false,
 *     valid : true
 * }
 * ```
 * @param inputVal input value
 * @returns {@link ValidationResult | Validation result}
 */
var checkBool = function checkBool(inputVal) {
  var valid = typeof inputVal === 'boolean' || inputVal === 'true' || inputVal === 'false';
  var value = typeof inputVal === 'boolean' ? inputVal : valid ? inputVal === 'true' : inputVal;
  return {
    valid: valid,
    value: value
  };
};
/**
 *
 * @param inputVal
 */
var checkFile = function checkFile(inputVal) {
  var value = extractFileInfo(inputVal);
  var valid = value !== null;
  return {
    value: valid ? value : inputVal,
    valid: valid
  };
};
/**
 * validates whether the mediaType is one present in the accepts list
 * @param mediaType
 * @param accepts
 */
var matchMediaType = function matchMediaType(mediaType, accepts) {
  return !mediaType || accepts.some(function (accept) {
    var trimmedAccept = accept.trim();
    var prefixAccept = trimmedAccept.split('/')[0];
    var suffixAccept = trimmedAccept.split('.')[1];
    return trimmedAccept.includes('*') && mediaType.startsWith(prefixAccept) || trimmedAccept.includes('.') && mediaType.endsWith(suffixAccept) || trimmedAccept === mediaType;
  });
};
/**
 * Validates an array of values using a validator function.
 * @param inputVal
 * @param validatorFn
 * @return an array containing two arrays, the first one with all the valid values and the second one with one invalid
 * value (if there is).
 */
var partitionArray = function partitionArray(inputVal, validatorFn) {
  var value = toArray(inputVal);
  if (value == null) {
    return [[], [value]];
  }
  return value.reduce(function (acc, x) {
    if (acc[1].length == 0) {
      var r = validatorFn(x);
      var index = r.valid ? 0 : 1;
      acc[index].push(r.value);
    }
    return acc;
  }, [[], []]);
};
var ValidConstraints = {
  date: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'format'],
  string: ['minLength', 'maxLength', 'pattern'],
  number: ['minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum'],
  array: ['minItems', 'maxItems', 'uniqueItems'],
  file: ['accept', 'maxFileSize']
};
/**
 * Implementation of all constraints defined by `adaptive form specification`
 */
var Constraints = {
  /**
   * Implementation of type constraint
   * @param constraint    `type` property of the form object
   * @param inputVal      value of the form object
   * @return {@link ValidationResult | validation result}
   */
  type: function type(constraint, inputVal) {
    var value = inputVal;
    if (inputVal == undefined) {
      return {
        valid: true,
        value: inputVal
      };
    }
    var valid = true,
      res;
    switch (constraint) {
      case 'string':
        valid = true;
        value = inputVal.toString();
        break;
      case 'string[]':
        value = toArray(inputVal);
        break;
      case 'number':
        res = checkNumber(inputVal);
        value = res.value;
        valid = res.valid;
        break;
      case 'boolean':
        res = checkBool(inputVal);
        valid = res.valid;
        value = res.value;
        break;
      case 'integer':
        res = checkInteger(inputVal);
        valid = res.valid;
        value = res.value;
        break;
      case 'integer[]':
        res = partitionArray(inputVal, checkInteger);
        valid = res[1].length === 0;
        value = valid ? res[0] : inputVal;
        break;
      case 'file':
        // for file types only, we support setting value via an array
        res = checkFile(inputVal instanceof Array ? inputVal[0] : inputVal);
        valid = res.valid;
        value = res.value;
        break;
      case 'file[]':
        res = partitionArray(inputVal, checkFile);
        valid = res[1].length === 0;
        value = valid ? res[0] : inputVal;
        break;
      case 'number[]':
        res = partitionArray(inputVal, checkNumber);
        valid = res[1].length === 0;
        value = valid ? res[0] : inputVal;
        break;
      case 'boolean[]':
        res = partitionArray(inputVal, checkBool);
        valid = res[1].length === 0;
        value = valid ? res[0] : inputVal;
        break;
    }
    return {
      valid: valid,
      value: value
    };
  },
  /**
   * Implementation of format constraint
   * @param constraint    `format` property of the form object
   * @param input         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  format: function format(constraint, input) {
    var valid = true;
    var value = input;
    if (input === null) {
      return {
        value: value,
        valid: valid
      };
    }
    var res;
    switch (constraint) {
      case 'date':
        res = dateRegex.exec((input || '').trim());
        if (res != null) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          var _res = res,
            year = _res[1],
            month = _res[2],
            date = _res[3];
          var nMonth = +month,
            nDate = +date;
          var leapYear = isLeapYear(+year);
          valid = nMonth >= 1 && nMonth <= 12 && nDate >= 1 && nDate <= daysInMonth(leapYear, nMonth);
        } else {
          valid = false;
        }
        break;
      case 'data-url':
        // todo: input is of type file, do we need this format ? since value is always of type file object
        //res = dataUrlRegex.exec(input.trim());
        //valid = res != null;
        valid = true;
        break;
    }
    return {
      valid: valid,
      value: value
    };
  },
  //todo : add support for date
  /**
   * Implementation of minimum constraint
   * @param constraint    `minimum` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  minimum: function minimum(constraint, value) {
    return {
      valid: value >= constraint,
      value: value
    };
  },
  //todo : add support for date
  /**
   * Implementation of maximum constraint
   * @param constraint    `maximum` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  maximum: function maximum(constraint, value) {
    return {
      valid: value <= constraint,
      value: value
    };
  },
  /**
   * Implementation of exclusiveMinimum constraint
   * @param constraint    `minimum` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  exclusiveMinimum: function exclusiveMinimum(constraint, value) {
    return {
      valid: value > constraint,
      value: value
    };
  },
  //todo : add support for date
  /**
   * Implementation of exclusiveMaximum constraint
   * @param constraint    `maximum` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  exclusiveMaximum: function exclusiveMaximum(constraint, value) {
    return {
      valid: value < constraint,
      value: value
    };
  },
  /**
   * Implementation of the minItems constraint
   * @param constraint `minItems` constraint from object
   * @param value value of the form object
   */
  minItems: function minItems(constraint, value) {
    return {
      valid: value instanceof Array && value.length >= constraint,
      value: value
    };
  },
  /**
   * Implementation of the maxItems constraint
   * @param constraint `maxItems` constraint from object
   * @param value value of the form object
   */
  maxItems: function maxItems(constraint, value) {
    return {
      valid: value instanceof Array && value.length <= constraint,
      value: value
    };
  },
  /**
   * Implementation of the uniqueItems constraint
   * @param constraint `uniqueItems` constraint from object
   * @param value value of the form object
   */
  uniqueItems: function uniqueItems(constraint, value) {
    return {
      valid: !constraint || value instanceof Array && value.length === new Set(value).size,
      value: value
    };
  },
  /**
   * Implementation of minLength constraint
   * @param constraint    `minLength` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  minLength: function minLength(constraint, value) {
    return _extends({}, Constraints.minimum(constraint, typeof value === 'string' ? value.length : 0), {
      value: value
    });
  },
  /**
   * Implementation of maxLength constraint
   * @param constraint    `maxLength` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  maxLength: function maxLength(constraint, value) {
    return _extends({}, Constraints.maximum(constraint, typeof value === 'string' ? value.length : 0), {
      value: value
    });
  },
  /**
   * Implementation of pattern constraint
   * @param constraint    `pattern` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  pattern: function pattern(constraint, value) {
    var regex;
    if (typeof constraint === 'string') {
      regex = new RegExp(constraint);
    } else {
      regex = constraint;
    }
    return {
      valid: regex.test(value),
      value: value
    };
  },
  /**
   * Implementation of required constraint
   * @param constraint    `required` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  required: function required(constraint, value) {
    var valid = constraint ? value != null && value !== '' : true;
    return {
      valid: valid,
      value: value
    };
  },
  /**
   * Implementation of enum constraint
   * @param constraint    `enum` property of the form object
   * @param value         value of the form object
   * @return {@link ValidationResult | validation result}
   */
  "enum": function _enum(constraint, value) {
    return {
      valid: constraint.indexOf(value) > -1,
      value: value
    };
  },
  /**
   *
   * @param constraint
   * @param value
   */
  accept: function accept(constraint, value) {
    if (!constraint || constraint.length === 0 || value === null || value === undefined) {
      return {
        valid: true,
        value: value
      };
    }
    var tempValue = value instanceof Array ? value : [value];
    var invalidFile = tempValue.some(function (file) {
      return !matchMediaType(file.type, constraint);
    });
    return {
      valid: !invalidFile,
      value: value
    };
  },
  /**
   * @param constraint
   * @param value
   */
  maxFileSize: function maxFileSize(constraint, value) {
    var sizeLimit = typeof constraint === 'string' ? getFileSizeInBytes(constraint) : constraint;
    return {
      valid: !(value instanceof FileObject) || value.size <= sizeLimit,
      value: value
    };
  }
};

/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var __decorate = function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines a form object field which implements {@link FieldModel | field model} interface
 */
var Field = /*#__PURE__*/function (_Scriptable2) {
  _inheritsLoose(Field, _Scriptable2);
  /**
   * @param params
   * @param _options
   * @private
   */
  function Field(params, _options) {
    var _this13;
    _this13 = _Scriptable2.call(this, params, _options) || this;
    _this13._ruleNodeReference = [];
    _this13._applyDefaults();
    _this13.queueEvent(new Initialize());
    _this13.queueEvent(new ExecuteRule());
    return _this13;
  }
  /**
   * @private
   */
  var _proto13 = Field.prototype;
  _proto13._initialize = function _initialize() {
    _Scriptable2.prototype._initialize.call(this);
    this.setupRuleNode();
  };
  _proto13.ruleNodeReference = function ruleNodeReference() {
    var _this$type;
    if ((_this$type = this.type) != null && _this$type.endsWith('[]')) {
      this._ruleNodeReference = [];
    } else {
      this._ruleNodeReference = this;
    }
    return this._ruleNodeReference;
  };
  _proto13._getDefaults = function _getDefaults() {
    return {
      readOnly: false,
      enabled: true,
      visible: true,
      type: this._getFallbackType()
    };
  }
  /**
   * Returns the fallback type to be used for this field, in case type is not defined. Otherwise returns
   * undefined
   * @protected
   */;
  _proto13._getFallbackType = function _getFallbackType() {
    var type = this._jsonModel.type;
    if (typeof type !== 'string') {
      var _enum = this["enum"];
      return _enum && _enum.length > 0 ? typeof _enum[0] : 'string';
    }
  };
  _proto13._applyDefaults = function _applyDefaults() {
    var _this14 = this;
    Object.entries(this._getDefaults()).map(function (_ref7) {
      var key = _ref7[0],
        value = _ref7[1];
      //@ts-ignore
      if (_this14._jsonModel[key] === undefined && value !== undefined) {
        //@ts-ignore
        _this14._jsonModel[key] = value;
      }
    });
    var value = this._jsonModel.value;
    if (value === undefined) {
      var typedRes = Constraints.type(this.getInternalType() || 'string', this._jsonModel["default"]);
      this._jsonModel.value = typedRes.value;
    }
    if (this._jsonModel.fieldType === undefined) {
      //@ts-ignore
      if (this._jsonModel.viewType) {
        //@ts-ignore
        if (this._jsonModel.viewType.startsWith('custom:')) {
          this.form.logger.error('viewType property has been removed. For custom types, use :type property');
        } else {
          this.form.logger.error('viewType property has been removed. Use fieldType property');
        }
        //@ts-ignore
        this._jsonModel.fieldType = this._jsonModel.viewType;
      } else {
        this._jsonModel.fieldType = defaultFieldTypes(this._jsonModel);
      }
    }
    if (this._jsonModel["enum"] === undefined) {
      var type = this._jsonModel.type;
      if (type === 'boolean') {
        this._jsonModel["enum"] = [true, false];
      }
    }
    if (typeof this._jsonModel.step !== 'number' || this._jsonModel.type !== 'number') {
      this._jsonModel.step = undefined;
    }
  };
  /**
   * returns whether the value is empty. Empty value is either a '', undefined or null
   * @private
   */
  _proto13.isEmpty = function isEmpty() {
    return this._jsonModel.value === undefined || this._jsonModel.value === null || this._jsonModel.value === '';
  };
  _proto13.getDataNodeValue = function getDataNodeValue(typedValue) {
    return this.isEmpty() ? this.emptyValue : typedValue;
  };
  _proto13._updateRuleNodeReference = function _updateRuleNodeReference(value) {
    var _this15 = this;
    var _this$type2;
    if ((_this$type2 = this.type) != null && _this$type2.endsWith('[]')) {
      if (value != null) {
        value.forEach(function (val, index) {
          _this15._ruleNodeReference[index] = val;
        });
        while (value.length !== this._ruleNodeReference.length) {
          this._ruleNodeReference.pop();
        }
      } else {
        while (this._ruleNodeReference.length !== 0) {
          this._ruleNodeReference.pop();
        }
      }
    }
  };
  _proto13.getInternalType = function getInternalType() {
    return this.type;
  };
  _proto13.valueOf = function valueOf() {
    // @ts-ignore
    var obj = this[target];
    var actualField = obj === undefined ? this : obj;
    actualField.ruleEngine.trackDependency(actualField);
    return actualField._jsonModel.value || null;
  };
  _proto13.toString = function toString() {
    var _actualField$_jsonMod;
    // @ts-ignore
    var obj = this[target];
    var actualField = obj === undefined ? this : obj;
    return ((_actualField$_jsonMod = actualField._jsonModel.value) == null ? void 0 : _actualField$_jsonMod.toString()) || '';
  }
  /**
   * Returns the error message for a given constraint
   * @param constraint
   */;
  _proto13.getErrorMessage = function getErrorMessage(constraint) {
    var _this$_jsonModel$cons;
    return ((_this$_jsonModel$cons = this._jsonModel.constraintMessages) == null ? void 0 : _this$_jsonModel$cons[constraint]) || '';
  }
  /**
   *
   * @private
   */;
  _proto13._getConstraintObject = function _getConstraintObject() {
    return Constraints;
  }
  /**
   * returns whether the field is array type or not
   * @private
   */;
  _proto13.isArrayType = function isArrayType() {
    return this.type ? this.type.indexOf('[]') > -1 : false;
  }
  /**
   *
   * @param value
   * @param constraints
   * @private
   */;
  _proto13.checkEnum = function checkEnum(value, constraints) {
    var _this16 = this;
    if (this._jsonModel.enforceEnum === true && value != null) {
      var fn = constraints["enum"];
      if (value instanceof Array && this.isArrayType()) {
        return value.every(function (x) {
          return fn(_this16["enum"] || [], x).valid;
        });
      } else {
        return fn(this["enum"] || [], value).valid;
      }
    }
    return true;
  }
  /**
   * checks whether the value can be achieved by stepping the min/default value by the step constraint.
   * Basically to find a integer solution for n in the equation
   * initialValue + n * step = value
   * @param constraints
   * @private
   */;
  _proto13.checkStep = function checkStep() {
    var value = this._jsonModel.value;
    if (typeof this._jsonModel.step === 'number') {
      var initialValue = this._jsonModel.minimum || this._jsonModel["default"] || 0;
      return (value - initialValue) % this._jsonModel.step === 0;
    }
    return true;
  }
  /**
   * checks whether the validation expression returns a boolean value or not
   * @private
   */;
  _proto13.checkValidationExpression = function checkValidationExpression() {
    if (typeof this._jsonModel.validationExpression === 'string') {
      return this.executeExpression(this._jsonModel.validationExpression);
    }
    return true;
  }
  /**
   * Returns the applicable constraints for a given type
   * @private
   */;
  _proto13.getConstraints = function getConstraints() {
    switch (this.type) {
      case 'string':
        switch (this.format) {
          case 'date':
            return ValidConstraints.date;
          case 'binary':
            return ValidConstraints.file;
          case 'data-url':
            return ValidConstraints.file;
          default:
            return ValidConstraints.string;
        }
      case 'file':
        return ValidConstraints.file;
      case 'number':
      case 'integer':
        return ValidConstraints.number;
    }
    if (this.isArrayType()) {
      return ValidConstraints.array;
    }
    return [];
  }
  /**
   * returns the format constraint
   */;
  /**
   * @private
   */
  _proto13.evaluateConstraints = function evaluateConstraints() {
    var _this17 = this;
    var constraint = 'type';
    var elem = this._jsonModel;
    var value = this._jsonModel.value;
    var Constraints = this._getConstraintObject();
    var supportedConstraints = this.getConstraints();
    var valid = true;
    if (valid) {
      valid = Constraints.required(this.required, value).valid && (this.isArrayType() && this.required ? value.length > 0 : true);
      constraint = 'required';
    }
    if (valid && value != this.emptyValue) {
      var invalidConstraint = supportedConstraints.find(function (key) {
        if (key in elem) {
          // @ts-ignore
          var restriction = elem[key];
          // @ts-ignore
          var fn = Constraints[key];
          if (value instanceof Array && _this17.isArrayType()) {
            if (ValidConstraints.array.indexOf(key) !== -1) {
              return !fn(restriction, value).valid;
            } else {
              return value.some(function (x) {
                return !fn(restriction, x).valid;
              });
            }
          } else if (typeof fn === 'function') {
            return !fn(restriction, value).valid;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      if (invalidConstraint != null) {
        valid = false;
        constraint = invalidConstraint;
      } else {
        valid = this.checkEnum(value, Constraints);
        constraint = 'enum';
        if (valid && this.type === 'number') {
          valid = this.checkStep();
          constraint = 'step';
        }
        if (valid) {
          valid = this.checkValidationExpression();
          constraint = 'validationExpression';
        }
      }
    }
    if (!valid) {
      //@ts-ignore
      this.form.logger.log(constraint + " constraint evaluation failed " + this[constraint] + ". Received " + this._jsonModel.value);
    }
    var changes = {
      'valid': valid,
      'errorMessage': valid ? '' : this.getErrorMessage(constraint)
    };
    return this._applyUpdates(['valid', 'errorMessage'], changes);
  };
  _proto13.triggerValidationEvent = function triggerValidationEvent(changes) {
    if (changes.valid) {
      if (this.valid) {
        this.dispatch(new Valid());
      } else {
        this.dispatch(new Invalid());
      }
    }
  }
  /**
   * Validates the current form object
   */;
  _proto13.validate = function validate() {
    var changes = this.evaluateConstraints();
    if (changes.valid) {
      this.triggerValidationEvent(changes);
      this.notifyDependents(new Change({
        changes: Object.values(changes)
      }));
    }
    return this.valid ? [] : [new ValidationError(this.id, [this._jsonModel.errorMessage])];
  };
  _proto13.importData = function importData(contextualDataModel) {
    this._bindToDataModel(contextualDataModel);
    var dataNode = this.getDataNode();
    // only if the value has changed, queue change event
    if (dataNode !== undefined && dataNode !== NullDataValue && dataNode.$value !== this._jsonModel.value) {
      var changeAction = propertyChange('value', dataNode.$value, this._jsonModel.value);
      this._jsonModel.value = dataNode.$value;
      this.queueEvent(changeAction);
    }
  }
  /**
   * @param name
   * @private
   */;
  _proto13.defaultDataModel = function defaultDataModel(name) {
    return new DataValue(name, this.getDataNodeValue(this._jsonModel.value), this.type || 'string');
  };
  _proto13.getState = function getState() {
    return _extends({}, _Scriptable2.prototype.getState.call(this), {
      editValue: this.editValue,
      displayValue: this.displayValue
    });
  };
  _createClass(Field, [{
    key: "editFormat",
    get: function get() {
      return this._jsonModel.editFormat;
    }
  }, {
    key: "displayFormat",
    get: function get() {
      return this._jsonModel.displayFormat;
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this._jsonModel.placeholder;
    }
  }, {
    key: "readOnly",
    get: function get() {
      return this._jsonModel.readOnly;
    },
    set: function set(e) {
      this._setProperty('readOnly', e);
    }
  }, {
    key: "language",
    get: function get() {
      //todo: add this in the specification and take it as a property
      return Intl.DateTimeFormat().resolvedOptions().locale;
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._jsonModel.enabled;
    },
    set: function set(e) {
      this._setProperty('enabled', e);
    }
  }, {
    key: "valid",
    get: function get() {
      return this._jsonModel.valid;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      if (this._jsonModel.emptyValue === 'null') {
        return null;
      } else if (this._jsonModel.emptyValue === '' && this.type === 'string') {
        return '';
      } else {
        return undefined;
      }
    }
  }, {
    key: "enum",
    get: function get() {
      return this._jsonModel["enum"];
    },
    set: function set(e) {
      this._setProperty('enum', e);
    }
  }, {
    key: "enumNames",
    get: function get() {
      return this._jsonModel.enumNames;
    },
    set: function set(e) {
      this._setProperty('enumNames', e);
    }
  }, {
    key: "required",
    get: function get() {
      return this._jsonModel.required || false;
    },
    set: function set(r) {
      this._setProperty('required', r);
    }
  }, {
    key: "maximum",
    get: function get() {
      return this._jsonModel.maximum;
    },
    set: function set(m) {
      this._setProperty('maximum', m);
    }
  }, {
    key: "minimum",
    get: function get() {
      return this._jsonModel.minimum;
    },
    set: function set(m) {
      this._setProperty('minimum', m);
    }
  }, {
    key: "editValue",
    get: function get() {
      var format = this.editFormat;
      if (this.format == 'date' && this.value != null && this.valid !== false) {
        return lib.formatDate(new Date(this.value), this.language, format);
      } else {
        return this.value;
      }
    }
  }, {
    key: "displayValue",
    get: function get() {
      var format = this.displayFormat;
      if (this.format == 'date' && this.value != null && this.valid !== false) {
        return lib.formatDate(new Date(this.value), this.language, format);
      } else {
        return this.value;
      }
    }
  }, {
    key: "value",
    get: function get() {
      if (this._jsonModel.value === undefined) {
        return null;
      } else {
        return this._jsonModel.value;
      }
    },
    set: function set(v) {
      var Constraints = this._getConstraintObject();
      var typeRes = Constraints.type(this.getInternalType() || 'string', v);
      var changes = this._setProperty('value', typeRes.value, false);
      var uniqueRes = {
        valid: true
      };
      if (changes.length > 0) {
        this._updateRuleNodeReference(typeRes.value);
        var dataNode = this.getDataNode();
        if (typeof dataNode !== 'undefined') {
          dataNode.setValue(this.getDataNodeValue(this._jsonModel.value), this._jsonModel.value, this);
        }
        if (this.parent.uniqueItems && this.parent.type === 'array') {
          // @ts-ignore
          uniqueRes = Constraints.uniqueItems(this.parent.uniqueItems, this.parent.getDataNode().$value);
        }
        var updates;
        if (typeRes.valid && uniqueRes.valid) {
          updates = this.evaluateConstraints();
        } else {
          var _changes = {
            'valid': typeRes.valid && uniqueRes.valid,
            'errorMessage': typeRes.valid && uniqueRes.valid ? '' : this.getErrorMessage('type')
          };
          updates = this._applyUpdates(['valid', 'errorMessage'], _changes);
        }
        if (updates.valid) {
          this.triggerValidationEvent(updates);
        }
        var changeAction = new Change({
          changes: changes.concat(Object.values(updates))
        });
        this.dispatch(changeAction);
      }
    }
  }, {
    key: "format",
    get: function get() {
      return this._jsonModel.format || '';
    }
  }]);
  return Field;
}(Scriptable);
__decorate([dependencyTracked()], Field.prototype, "readOnly", null);
__decorate([dependencyTracked()], Field.prototype, "enabled", null);
__decorate([dependencyTracked()], Field.prototype, "valid", null);
__decorate([dependencyTracked()], Field.prototype, "enum", null);
__decorate([dependencyTracked()], Field.prototype, "enumNames", null);
__decorate([dependencyTracked()], Field.prototype, "required", null);
__decorate([dependencyTracked()], Field.prototype, "value", null);
function addNameToDataURL(dataURL, name) {
  return dataURL.replace(';base64', ";name=" + encodeURIComponent(name) + ";base64");
}
function processFiles(files) {
  return Promise.all([].map.call(files, processFile));
}
var FileUpload = /*#__PURE__*/function (_Field) {
  _inheritsLoose(FileUpload, _Field);
  function FileUpload() {
    return _Field.apply(this, arguments) || this;
  }
  var _proto14 = FileUpload.prototype;
  //private _files: FileObject[];
  _proto14._getDefaults = function _getDefaults() {
    return _extends({}, _Field.prototype._getDefaults.call(this), {
      accept: ['audio/*', 'video/*', 'image/*', 'text/*', 'application/pdf'],
      maxFileSize: '2MB',
      type: 'file'
    });
  }
  /**
   * Returns the max file size in bytes as per IEC specification
   */;
  /**
   * Checks whether there are any updates in the properties
   * @param propNames
   * @param updates
   * @private
   */
  _proto14._applyUpdates = function _applyUpdates(propNames, updates) {
    var _this18 = this;
    return propNames.reduce(function (acc, propertyName) {
      //@ts-ignore
      var prevValue = _this18._jsonModel[propertyName];
      var currentValue = updates[propertyName];
      if (currentValue !== prevValue) {
        acc[propertyName] = {
          propertyName: propertyName,
          currentValue: currentValue,
          prevValue: prevValue
        };
        if (prevValue instanceof FileObject && typeof currentValue === 'object' && propertyName === 'value') {
          // @ts-ignore
          _this18._jsonModel[propertyName] = new FileObject(_extends({}, prevValue, {
            'data': currentValue.data
          }));
        } else {
          // @ts-ignore
          _this18._jsonModel[propertyName] = currentValue;
        }
      }
      return acc;
    }, {});
  };
  _proto14.getInternalType = function getInternalType() {
    var _this$type;
    return (_this$type = this.type) != null && _this$type.endsWith('[]') ? 'file[]' : 'file';
  };
  _proto14.getDataNodeValue = function getDataNodeValue(typedValue) {
    var dataNodeValue = typedValue;
    if (dataNodeValue != null) {
      if (this.type === 'string') {
        var _dataNodeValue$data;
        dataNodeValue = (_dataNodeValue$data = dataNodeValue.data) == null ? void 0 : _dataNodeValue$data.toString();
      } else if (this.type === 'string[]') {
        dataNodeValue = dataNodeValue instanceof Array ? dataNodeValue : [dataNodeValue];
        dataNodeValue = dataNodeValue.map(function (_) {
          var _$data;
          return _ == null ? void 0 : (_$data = _.data) == null ? void 0 : _$data.toString();
        });
      }
    }
    return dataNodeValue;
  };
  _proto14._serialize = function _serialize() {
    try {
      var _this20 = this;
      var val = _this20._jsonModel.value;
      if (val === undefined) {
        return Promise.resolve(null);
      }
      // @ts-ignore
      return Promise.resolve(processFiles(val instanceof Array ? val : [val]));
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto14.importData = function importData(dataModel) {
    this._bindToDataModel(dataModel);
    var dataNode = this.getDataNode();
    if (dataNode !== undefined) {
      var _value2 = dataNode == null ? void 0 : dataNode.$value;
      // only if not undefined, proceed further
      if (_value2 != null) {
        var res = Constraints.type(this.getInternalType(), _value2);
        if (!res.valid) {
          this.form.logger.error("unable to bind " + this.name + " to data");
        }
        // is this needed ?
        this.form.getEventQueue().queue(this, propertyChange('value', res.value, this._jsonModel.value));
        this._jsonModel.value = res.value;
      } else {
        this._jsonModel.value = null;
      }
    }
  };
  _createClass(FileUpload, [{
    key: "maxFileSize",
    get: function get() {
      return getFileSizeInBytes(this._jsonModel.maxFileSize);
    }
    /**
     * Returns the list of mime types which file attachment can accept
     */
  }, {
    key: "accept",
    get: function get() {
      return this._jsonModel.accept;
    }
  }]);
  return FileUpload;
}(Field);
/**
 * @param offValue
 * @private
 */
var requiredConstraint = function requiredConstraint(offValue) {
  return function (constraint, value) {
    var valid = Constraints.required(constraint, value).valid && (!constraint || value != offValue);
    return {
      valid: valid,
      value: value
    };
  };
};
/**
 * Implementation of check box runtime model which extends from {@link Field | field} model
 */
var Checkbox = /*#__PURE__*/function (_Field2) {
  _inheritsLoose(Checkbox, _Field2);
  function Checkbox() {
    return _Field2.apply(this, arguments) || this;
  }
  var _proto15 = Checkbox.prototype;
  _proto15.offValue = function offValue() {
    var opts = this["enum"];
    return opts.length > 1 ? opts[1] : null;
  }
  /**
   * @private
   */;
  _proto15._getConstraintObject = function _getConstraintObject() {
    var baseConstraints = _extends({}, _Field2.prototype._getConstraintObject.call(this));
    baseConstraints.required = requiredConstraint(this.offValue());
    return baseConstraints;
  };
  _proto15._getDefaults = function _getDefaults() {
    return _extends({}, _Field2.prototype._getDefaults.call(this), {
      enforceEnum: true
    });
  }
  /**
   * Returns the `enum` constraints from the json
   */;
  _createClass(Checkbox, [{
    key: "enum",
    get: function get() {
      return this._jsonModel["enum"] || [];
    }
  }]);
  return Checkbox;
}(Field);
/**
 * Implementation of CheckBoxGroup runtime model which extends from {@link Field | field}
 */
var CheckboxGroup = /*#__PURE__*/function (_Field3) {
  _inheritsLoose(CheckboxGroup, _Field3);
  /**
   * @param params
   * @param _options
   * @private
   */
  function CheckboxGroup(params, _options) {
    return _Field3.call(this, params, _options) || this;
  }
  /**
   * converts the fallback type, if required, to an array. Since checkbox-group has an array type
   * @protected
   */
  var _proto16 = CheckboxGroup.prototype;
  _proto16._getFallbackType = function _getFallbackType() {
    var fallbackType = _Field3.prototype._getFallbackType.call(this);
    if (typeof fallbackType === 'string') {
      return fallbackType + "[]";
    }
  };
  _proto16._getDefaults = function _getDefaults() {
    return _extends({}, _Field3.prototype._getDefaults.call(this), {
      enforceEnum: true,
      "enum": []
    });
  };
  return CheckboxGroup;
}(Field);
/*
 *
 *  * Copyright 2022 Adobe, Inc.
 *  *
 *  * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *  *
 *  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
var DateField = /*#__PURE__*/function (_Field4) {
  _inheritsLoose(DateField, _Field4);
  function DateField() {
    return _Field4.apply(this, arguments) || this;
  }
  var _proto17 = DateField.prototype;
  _proto17._applyDefaults = function _applyDefaults() {
    _Field4.prototype._applyDefaults.call(this);
    var locale = new Intl.DateTimeFormat().resolvedOptions().locale;
    if (!this._jsonModel.editFormat) {
      this._jsonModel.editFormat = 'short';
    }
    if (!this._jsonModel.displayFormat) {
      this._jsonModel.displayFormat = this._jsonModel.editFormat;
    }
    if (!this._jsonModel.placeholder) {
      this._jsonModel.placeholder = lib.getSkeleton(this._jsonModel.editFormat, locale);
    }
    if (!this._jsonModel.description) {
      this._jsonModel.description = "To enter today's date use " + lib.formatDate(new Date(), locale, this._jsonModel.editFormat);
    }
  };
  return DateField;
}(Field);
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Creates a child model inside the given parent
 * @param child
 * @param options
 * @private
 */
var createChild = function createChild(child, options) {
  var retVal;
  if ('items' in child) {
    retVal = new Fieldset(child, options);
  } else {
    if (isFile(child) || child.fieldType === 'file-input') {
      // @ts-ignore
      retVal = new FileUpload(child, options);
    } else if (isCheckbox(child)) {
      retVal = new Checkbox(child, options);
    } else if (isCheckboxGroup(child)) {
      retVal = new CheckboxGroup(child, options);
    } else if (isDateField(child)) {
      retVal = new DateField(child, options);
    } else {
      retVal = new Field(child, options);
    }
  }
  options.form.fieldAdded(retVal);
  return retVal;
};
var defaults = {
  visible: true
};
/**
 * Defines a field set class which extends from {@link Container | container}
 */
var Fieldset = /*#__PURE__*/function (_Container) {
  _inheritsLoose(Fieldset, _Container);
  /**
   * @param params
   * @param _options
   * @private
   */
  function Fieldset(params, _options) {
    var _this21;
    _this21 = _Container.call(this, params, _options) || this;
    _this21._applyDefaults();
    _this21.queueEvent(new Initialize());
    _this21.queueEvent(new ExecuteRule());
    return _this21;
  }
  var _proto18 = Fieldset.prototype;
  _proto18._applyDefaults = function _applyDefaults() {
    var _this22 = this;
    Object.entries(defaults).map(function (_ref8) {
      var key = _ref8[0],
        value = _ref8[1];
      //@ts-ignore
      if (_this22._jsonModel[key] === undefined) {
        //@ts-ignore
        _this22._jsonModel[key] = value;
      }
    });
    if (this._jsonModel.dataRef && this._jsonModel.type === undefined) {
      this._jsonModel.type = 'object';
    }
  };
  // @ts-ignore
  _proto18._createChild = function _createChild(child, options) {
    var _options$parent2 = options.parent,
      parent = _options$parent2 === void 0 ? this : _options$parent2;
    return createChild(child, {
      form: this.form,
      parent: parent
    });
  };
  _createClass(Fieldset, [{
    key: "type",
    get: function get() {
      var ret = _Container.prototype.type;
      if (ret === 'array' || ret === 'object') {
        return ret;
      }
      return undefined;
    }
  }, {
    key: "items",
    get: function get() {
      return _Container.prototype.items;
    }
  }, {
    key: "value",
    get: function get() {
      return null;
    }
  }, {
    key: "fieldType",
    get: function get() {
      return 'panel';
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._jsonModel.enabled;
    },
    set: function set(e) {
      this._setProperty('enabled', e);
    }
  }]);
  return Fieldset;
}(Container);
var levels = {
  off: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};
/**
 * @private
 */
var Logger = /*#__PURE__*/function () {
  var _proto19 = Logger.prototype;
  _proto19.debug = function debug(msg) {
    this.log(msg, 'debug');
  };
  _proto19.info = function info(msg) {
    this.log(msg, 'info');
  };
  _proto19.warn = function warn(msg) {
    this.log(msg, 'warn');
  };
  _proto19.error = function error(msg) {
    this.log(msg, 'error');
  };
  _proto19.log = function log(msg, level) {
    if (this.logLevel !== 0 && this.logLevel <= levels[level]) {
      console[level](msg);
    }
  };
  function Logger(logLevel) {
    if (logLevel === void 0) {
      logLevel = 'off';
    }
    this.logLevel = levels[logLevel];
  }
  return Logger;
}();
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Implementation of event node
 * @private
 */
var EventNode = /*#__PURE__*/function () {
  function EventNode(_node, _event) {
    this._node = _node;
    this._event = _event;
  }
  var _proto20 = EventNode.prototype;
  _proto20.isEqual = function isEqual(that) {
    return that !== null && that !== undefined && this._node == that._node && this._event.type == that._event.type;
  };
  _proto20.toString = function toString() {
    return this._node.id + '__' + this.event.type;
  };
  _proto20.valueOf = function valueOf() {
    return this.toString();
  };
  _createClass(EventNode, [{
    key: "node",
    get: function get() {
      return this._node;
    }
  }, {
    key: "event",
    get: function get() {
      return this._event;
    }
  }]);
  return EventNode;
}();
/**
 * Implementation of event queue. When a user event, like change or click, is captured the expression to be evaluated
 * must be put in an Event Queue and then evaluated.
 * @private
 */
var EventQueue = /*#__PURE__*/function () {
  function EventQueue(logger) {
    if (logger === void 0) {
      logger = new Logger('off');
    }
    this._isProcessing = false;
    this._pendingEvents = [];
    this.logger = logger;
    this._runningEventCount = {};
  }
  var _proto21 = EventQueue.prototype;
  _proto21.isQueued = function isQueued(node, event) {
    var evntNode = new EventNode(node, event);
    return this._pendingEvents.find(function (x) {
      return evntNode.isEqual(x);
    }) !== undefined;
  };
  _proto21.queue = function queue(node, events, priority) {
    var _this23 = this;
    if (priority === void 0) {
      priority = false;
    }
    if (!node || !events) {
      return;
    }
    if (!(events instanceof Array)) {
      events = [events];
    }
    events.forEach(function (e) {
      var evntNode = new EventNode(node, e);
      var counter = _this23._runningEventCount[evntNode.valueOf()] || 0;
      if (counter < EventQueue.MAX_EVENT_CYCLE_COUNT) {
        _this23.logger.info("Queued event : " + e.type + " node: " + node.id + " - " + node.name);
        //console.log(`Event Details ${e.toString()}`)
        if (priority) {
          var index = _this23._isProcessing ? 1 : 0;
          _this23._pendingEvents.splice(index, 0, evntNode);
        } else {
          _this23._pendingEvents.push(evntNode);
        }
        _this23._runningEventCount[evntNode.valueOf()] = counter + 1;
      } else {
        _this23.logger.info("Skipped queueing event : " + e.type + " node: " + node.id + " - " + node.name + " with count=" + counter);
      }
    });
  };
  _proto21.runPendingQueue = function runPendingQueue() {
    if (this._isProcessing) {
      return;
    }
    this._isProcessing = true;
    while (this._pendingEvents.length > 0) {
      var e = this._pendingEvents[0];
      this.logger.info("Dequeued event : " + e.event.type + " node: " + e.node.id + " - " + e.node.name);
      //console.log(`Event Details ${e.event.toString()}`);
      e.node.executeAction(e.event);
      this._pendingEvents.shift();
    }
    this._runningEventCount = {};
    this._isProcessing = false;
  };
  _createClass(EventQueue, [{
    key: "length",
    get: function get() {
      return this._pendingEvents.length;
    }
  }, {
    key: "isProcessing",
    get: function get() {
      return this._isProcessing;
    }
  }]);
  return EventQueue;
}();
EventQueue.MAX_EVENT_CYCLE_COUNT = 10;

/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var request$1 = function request$1(url, data, options) {
  if (data === void 0) {
    data = null;
  }
  if (options === void 0) {
    options = {};
  }
  var opts = _extends({}, defaultRequestOptions, options);
  return fetch(url, _extends({}, opts, {
    body: data
  })).then(function (response) {
    var _response$headers$get;
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    if (response != null && (_response$headers$get = response.headers.get('Content-Type')) != null && _response$headers$get.includes('application/json')) {
      return response.json();
    } else {
      return response.text();
    }
  });
};
var defaultRequestOptions = {
  method: 'GET'
};
var getCustomEventName = function getCustomEventName(name) {
  var eName = name;
  if (eName.length > 0 && eName.startsWith('custom:')) {
    return eName.substring('custom:'.length);
  }
  return eName;
};
/**
 * Implementation of generic request API. This API can be used to make external web request
 * @param context                   expression execution context(consists of current form, current field, current event)
 * @param uri                       request URI
 * @param httpVerb                  http verb (for example, GET or POST)
 * @param payload                   request payload
 * @param success                   success handler
 * @param error                     error handler
 * @param headers                   headers
 * @private
 */
var request = function request(context, uri, httpVerb, payload, success, error, headers) {
  try {
    var _temp3 = function _temp3(_result2) {
      if (_exit2) return _result2;
      var eName = getCustomEventName(success);
      context.form.dispatch(new CustomEvent$1(eName, result, true));
    };
    var _exit2;
    var endpoint = uri;
    var requestOptions = {
      method: httpVerb
    };
    var result;
    var inputPayload;
    var _temp4 = _catch(function () {
      if (payload && payload instanceof FileObject && payload.data instanceof File) {
        // todo: have to implement array type
        var formData = new FormData();
        formData.append(payload.name, payload.data);
        inputPayload = formData;
      } else if (payload instanceof FormData) {
        inputPayload = payload;
      } else if (payload && typeof payload === 'object' && Object.keys(payload).length > 0) {
        var _requestOptions$heade;
        var headerNames = Object.keys(headers);
        if (headerNames.length > 0) {
          requestOptions.headers = _extends({}, headers, headerNames.indexOf('Content-Type') === -1 ? {
            'Content-Type': 'application/json'
          } : {});
        } else {
          requestOptions.headers = {
            'Content-Type': 'application/json'
          };
        }
        var contentType = (requestOptions == null ? void 0 : (_requestOptions$heade = requestOptions.headers) == null ? void 0 : _requestOptions$heade['Content-Type']) || 'application/json';
        if (contentType === 'application/json') {
          inputPayload = JSON.stringify(payload);
        } else if (contentType.indexOf('multipart/form-data') > -1) {
          inputPayload = multipartFormData(payload);
        } else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
          inputPayload = urlEncoded(payload);
        }
      }
      return Promise.resolve(request$1(endpoint, inputPayload, requestOptions)).then(function (_request$) {
        result = _request$;
      });
    }, function () {
      //todo: define error payload
      context.form.logger.error('Error invoking a rest API');
      var _eName = getCustomEventName(error);
      context.form.dispatch(new CustomEvent$1(_eName, {}, true));
      _exit2 = 1;
    });
    return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
  } catch (e) {
    return Promise.reject(e);
  }
};
var urlEncoded = function urlEncoded(data) {
  var formData = new URLSearchParams();
  Object.entries(data).forEach(function (_ref9) {
    var key = _ref9[0],
      value = _ref9[1];
    if (value != null && typeof value === 'object') {
      formData.append(key, jsonString(value));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};
/**
 * Create multi part form data using form data and form attachments
 * @param data              form data
 * @param attachments       form events
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var multipartFormData = function multipartFormData(data, attachments) {
  var formData = new FormData();
  Object.entries(data).forEach(function (_ref10) {
    var key = _ref10[0],
      value = _ref10[1];
    if (value != null && typeof value === 'object') {
      formData.append(key, jsonString(value));
    } else {
      formData.append(key, value);
    }
  });
  var addAttachmentToFormData = function addAttachmentToFormData(objValue, formData) {
    if ((objValue == null ? void 0 : objValue.data) instanceof File) {
      var attIdentifier = (objValue == null ? void 0 : objValue.dataRef) + "/" + (objValue == null ? void 0 : objValue.name);
      if (!attIdentifier.startsWith('/')) {
        attIdentifier = "/" + attIdentifier;
      }
      formData.append(attIdentifier, objValue.data);
    }
  };
  if (attachments) {
    // @ts-ignore
    Object.keys(attachments).reduce(function (acc, curr) {
      var objValue = attachments[curr];
      if (objValue && objValue instanceof Array) {
        return [].concat(acc, objValue.map(function (x) {
          return addAttachmentToFormData(x, formData);
        }));
      } else {
        return [].concat(acc, [addAttachmentToFormData(objValue, formData)]);
      }
    }, []);
  }
  return formData;
};
var _submit = function submit(context, success, error, submitAs, input_data) {
  if (submitAs === void 0) {
    submitAs = 'multipart/form-data';
  }
  if (input_data === void 0) {
    input_data = null;
  }
  try {
    var endpoint = context.form.action;
    var data = input_data;
    if (typeof data != 'object' || data == null) {
      data = context.form.exportData();
    }
    // todo: have to implement sending of attachments here
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var attachments = getAttachments(context.form);
    var submitContentType = submitAs;
    var formData;
    if (Object.keys(attachments).length > 0 || submitAs === 'multipart/form-data') {
      formData = multipartFormData({
        'data': data
      }, attachments);
      submitContentType = 'multipart/form-data';
    } else {
      formData = {
        'data': data
      };
    }
    // submitContentType = submitAs;
    // note: don't send multipart/form-data let browser decide on the content type
    return Promise.resolve(request(context, endpoint, 'POST', formData, success, error, {
      'Content-Type': submitContentType
    })).then(function () {});
  } catch (e) {
    return Promise.reject(e);
  }
};
/**
 * Helper function to create an action
 * @param name          name of the event
 * @param payload       event payload
 * @param dispatch      true to trigger the event on all the fields in DFS order starting from the top level form element, false otherwise
 * @private
 */
var createAction = function createAction(name, payload) {
  if (payload === void 0) {
    payload = {};
  }
  switch (name) {
    case 'change':
      return new Change(payload);
    case 'submit':
      return new Submit(payload);
    case 'click':
      return new Click(payload);
    case 'addItem':
      return new AddItem(payload);
    case 'removeItem':
      return new RemoveItem(payload);
    default:
      console.error('invalid action');
  }
};
/**
 * Implementation of function runtime
 * @private
 */
var FunctionRuntimeImpl = /*#__PURE__*/function () {
  function FunctionRuntimeImpl() {
    this.customFunctions = {};
  }
  var _proto22 = FunctionRuntimeImpl.prototype;
  _proto22.registerFunctions = function registerFunctions(functions) {
    var _this24 = this;
    Object.entries(functions).forEach(function (_ref11) {
      var name = _ref11[0],
        funcDef = _ref11[1];
      var finalFunction = funcDef;
      if (typeof funcDef === 'function') {
        finalFunction = {
          _func: function _func(args) {
            // eslint-disable-next-line @typescript-eslint/ban-types
            return funcDef.apply(void 0, args);
          },
          _signature: []
        };
      }
      if (!finalFunction.hasOwnProperty('_func')) {
        console.warn("Unable to register function with name " + name + ".");
        return;
      }
      _this24.customFunctions[name] = finalFunction;
    });
  };
  _proto22.unregisterFunctions = function unregisterFunctions() {
    var _this25 = this;
    [].slice.call(arguments).forEach(function (name) {
      if (name in _this25.customFunctions) {
        delete _this25.customFunctions[name];
      }
    });
  };
  _proto22.getFunctions = function getFunctions() {
    // todo: remove these once json-formula exposes a way to call them from custom functions
    function isArray(obj) {
      if (obj !== null) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      }
      return false;
    }
    function valueOf(a) {
      if (a === null || a === undefined) {
        return a;
      }
      if (isArray(a)) {
        return a.map(function (i) {
          return valueOf(i);
        });
      }
      return a.valueOf();
    }
    function toString(a) {
      if (a === null || a === undefined) {
        return '';
      }
      return a.toString();
    }
    var defaultFunctions = {
      validate: {
        _func: function _func(args, data, interpreter) {
          var element = args[0];
          var validation;
          if (typeof element === 'string' || typeof element === 'undefined') {
            validation = interpreter.globals.form.validate();
          } else {
            validation = interpreter.globals.form.getElement(element.$id).validate();
          }
          if (Array.isArray(validation) && validation.length) {
            interpreter.globals.form.logger.error('Form Validation Error');
          }
          return validation;
        },
        _signature: []
      },
      setFocus: {
        _func: function _func(args, data, interpreter) {
          var element = args[0];
          try {
            var field = interpreter.globals.form.getElement(element.$id);
            interpreter.globals.form.setFocus(field);
          } catch (e) {
            interpreter.globals.form.logger.error('Invalid argument passed in setFocus. An element is expected');
          }
        },
        _signature: []
      },
      getData: {
        _func: function _func(args, data, interpreter) {
          // deprecated. left for backward compatability.
          interpreter.globals.form.logger.warn('The `getData` function is depricated. Use `exportData` instead.');
          return interpreter.globals.form.exportData();
        },
        _signature: []
      },
      exportData: {
        _func: function _func(args, data, interpreter) {
          return interpreter.globals.form.exportData();
        },
        _signature: []
      },
      importData: {
        _func: function _func(args, data, interpreter) {
          var inputData = args[0];
          if (typeof inputData === 'object' && inputData !== null) {
            interpreter.globals.form.importData(inputData);
          }
          return {};
        },
        _signature: []
      },
      submitForm: {
        _func: function _func(args, data, interpreter) {
          // success: string, error: string, submit_as: 'json' | 'multipart' = 'json', data: any = null
          var success = toString(args[0]);
          var error = toString(args[1]);
          var submit_as = args.length > 2 ? toString(args[2]) : 'multipart/form-data';
          var submit_data = args.length > 3 ? valueOf(args[3]) : null;
          interpreter.globals.form.dispatch(new Submit({
            success: success,
            error: error,
            submit_as: submit_as,
            data: submit_data
          }));
          return {};
        },
        _signature: []
      },
      // todo: only supports application/json for now
      request: {
        _func: function _func(args, data, interpreter) {
          var uri = toString(args[0]);
          var httpVerb = toString(args[1]);
          var payload = valueOf(args[2]);
          var success,
            error,
            headers = {};
          if (typeof args[3] === 'string') {
            interpreter.globals.form.logger.warn('This usage of request is deprecated. Please see the documentation and update');
            success = valueOf(args[3]);
            error = valueOf(args[4]);
          } else {
            headers = valueOf(args[3]);
            success = valueOf(args[4]);
            error = valueOf(args[5]);
          }
          request(interpreter.globals, uri, httpVerb, payload, success, error, headers);
          return {};
        },
        _signature: []
      },
      /**
       *
       * @name dispatchEvent
       * @param [element] element on which to trigger the event. If not defined the event will be triggered on entire form
       * @param eventName name of the event to trigger
       * @param payload payload to pass in the event
       */
      dispatchEvent: {
        _func: function _func(args, data, interpreter) {
          var element = args[0];
          var eventName = valueOf(args[1]);
          var payload = args.length > 2 ? valueOf(args[2]) : undefined;
          var dispatch = false;
          if (typeof element === 'string') {
            payload = eventName;
            eventName = element;
            dispatch = true;
          }
          var event;
          if (eventName.startsWith('custom:')) {
            event = new CustomEvent$1(eventName.substring('custom:'.length), payload, dispatch);
          } else {
            event = createAction(eventName, payload);
          }
          if (event != null) {
            if (typeof element === 'string') {
              interpreter.globals.form.dispatch(event);
            } else {
              interpreter.globals.form.getElement(element.$id).dispatch(event);
            }
          }
          return {};
        },
        _signature: []
      }
    };
    return _extends({}, defaultFunctions, this.customFunctions);
  };
  return FunctionRuntimeImpl;
}();
var FunctionRuntime = new FunctionRuntimeImpl();

/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Defines `form model` which implements {@link FormModel | form model}
 */
var Form = /*#__PURE__*/function (_Container2) {
  _inheritsLoose(Form, _Container2);
  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @param n
   * @param _ruleEngine
   * @param _eventQueue
   * @param logLevel
   * @private
   */
  function Form(n, _ruleEngine, _eventQueue, logLevel) {
    var _this26;
    if (_eventQueue === void 0) {
      _eventQueue = new EventQueue();
    }
    if (logLevel === void 0) {
      logLevel = 'off';
    }
    //@ts-ignore
    _this26 = _Container2.call(this, n, {}) || this;
    _this26._fields = {};
    _this26._invalidFields = [];
    _this26.dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g;
    _this26._ruleEngine = _ruleEngine;
    _this26._eventQueue = _eventQueue;
    _this26._logger = new Logger(logLevel);
    _this26.queueEvent(new Initialize());
    _this26.queueEvent(new ExecuteRule());
    _this26._ids = IdGenerator();
    _this26._bindToDataModel(new DataGroup('$form', {}));
    _this26._initialize();
    _this26.queueEvent(new FormLoad());
    return _this26;
  }
  var _proto23 = Form.prototype;
  _proto23._createChild = function _createChild(child) {
    return createChild(child, {
      form: this,
      parent: this
    });
  };
  _proto23.importData = function importData(dataModel) {
    this._bindToDataModel(new DataGroup('$form', dataModel));
    this.syncDataAndFormModel(this.getDataNode());
    this._eventQueue.runPendingQueue();
  };
  _proto23.exportData = function exportData() {
    var _this$getDataNode;
    return (_this$getDataNode = this.getDataNode()) == null ? void 0 : _this$getDataNode.$value;
  };
  _proto23.setFocus = function setFocus(field) {
    var parent = field.parent;
    var currentField = field;
    while (parent != null && parent.activeChild != currentField) {
      parent.activeChild = currentField;
    }
  }
  /**
   * Returns the current state of the form
   *
   * To access the form data and attachments, one needs to use the `data` and `attachments` property.
   * For example,
   * ```
   * const data = form.getState().data
   * const attachments = form.getState().attachments
   * ```
   */;
  _proto23.getState = function getState() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    var self = this;
    var res = _Container2.prototype.getState.call(this);
    res.id = '$form';
    Object.defineProperty(res, 'data', {
      get: function get() {
        return self.exportData();
      }
    });
    Object.defineProperty(res, 'attachments', {
      get: function get() {
        return getAttachments(self);
      }
    });
    return res;
  };
  _proto23.isTransparent = function isTransparent() {
    return false;
  };
  _proto23.getUniqueId = function getUniqueId() {
    if (this._ids == null) {
      return '';
    }
    return this._ids.next().value;
  }
  /**
   * @param field
   * @private
   */;
  _proto23.fieldAdded = function fieldAdded(field) {
    var _this27 = this;
    this._fields[field.id] = field;
    field.subscribe(function (action) {
      if (_this27._invalidFields.indexOf(action.target.id) === -1) {
        _this27._invalidFields.push(action.target.id);
      }
    }, 'invalid');
    field.subscribe(function (action) {
      var index = _this27._invalidFields.indexOf(action.target.id);
      if (index > -1) {
        _this27._invalidFields.splice(index, 1);
      }
    }, 'valid');
    field.subscribe(function (action) {
      //@ts-ignore
      var field = action.target.getState();
      if (field) {
        var fieldChangedAction = new FieldChanged(action.payload.changes, field);
        _this27.dispatch(fieldChangedAction);
      }
    });
  };
  _proto23.validate = function validate() {
    var validationErrors = _Container2.prototype.validate.call(this);
    // trigger event on form so that user's can customize their application
    this.dispatch(new ValidationComplete(validationErrors));
    return validationErrors;
  }
  /**
   * Checks if the given form is valid or not
   * @returns `true`, if form is valid, `false` otherwise
   */;
  _proto23.isValid = function isValid() {
    return this._invalidFields.length === 0;
  }
  /**
   * @param field
   * @private
   */;
  _proto23.dispatch = function dispatch(action) {
    if (action.type === 'submit') {
      _Container2.prototype.queueEvent.call(this, action);
      this._eventQueue.runPendingQueue();
    } else {
      _Container2.prototype.dispatch.call(this, action);
    }
  }
  /**
   * @param action
   * @private
   */;
  _proto23.executeAction = function executeAction(action) {
    if (action.type !== 'submit' || this._invalidFields.length === 0) {
      _Container2.prototype.executeAction.call(this, action);
    }
  }
  /**
   * @param action
   * @param context
   * @private
   */;
  _proto23.submit = function submit(action, context) {
    // if no errors, only then submit
    if (this.validate().length === 0) {
      var payload = (action == null ? void 0 : action.payload) || {};
      _submit(context, payload == null ? void 0 : payload.success, payload == null ? void 0 : payload.error, payload == null ? void 0 : payload.submit_as, payload == null ? void 0 : payload.data);
    }
  };
  _proto23.getElement = function getElement(id) {
    if (id == this.id) {
      return this;
    }
    return this._fields[id];
  };
  /**
   * @private
   */
  _proto23.getEventQueue = function getEventQueue() {
    return this._eventQueue;
  };
  _createClass(Form, [{
    key: "logger",
    get: function get() {
      return this._logger;
    }
  }, {
    key: "metaData",
    get: function get() {
      var metaData = this._jsonModel.metadata || {};
      return new FormMetaData(metaData);
    }
  }, {
    key: "action",
    get: function get() {
      return this._jsonModel.action;
    }
  }, {
    key: "type",
    get: function get() {
      return 'object';
    }
  }, {
    key: "form",
    get: function get() {
      return this;
    }
  }, {
    key: "ruleEngine",
    get: function get() {
      return this._ruleEngine;
    }
  }, {
    key: "qualifiedName",
    get: function get() {
      return '$form';
    }
  }, {
    key: "name",
    get: function get() {
      return '$form';
    }
  }, {
    key: "value",
    get: function get() {
      return null;
    }
  }, {
    key: "id",
    get: function get() {
      return '$form';
    }
  }, {
    key: "title",
    get: function get() {
      return this._jsonModel.title || '';
    }
  }]);
  return Form;
}(Container);
/*
 * Copyright 2022 Adobe, Inc.
 *
 * Your access and use of this software is governed by the Adobe Customer Feedback Program Terms and Conditions or other Beta License Agreement signed by your employer and Adobe, Inc.. This software is NOT open source and may not be used without one of the foregoing licenses. Even with a foregoing license, your access and use of this file is limited to the earlier of (a) 180 days, (b) general availability of the product(s) which utilize this software (i.e. AEM Forms), (c) January 1, 2023, (d) Adobe providing notice to you that you may no longer use the software or that your beta trial has otherwise ended.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ADOBE NOR ITS THIRD PARTY PROVIDERS AND PARTNERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Implementation of rule engine
 * @private
 */
var RuleEngine = /*#__PURE__*/function () {
  function RuleEngine() {
    this._globalNames = ['$form', '$field', '$event'];
  }
  var _proto24 = RuleEngine.prototype;
  _proto24.compileRule = function compileRule(rule) {
    var customFunctions = FunctionRuntime.getFunctions();
    return new Oe(rule, customFunctions, undefined, this._globalNames);
  };
  _proto24.execute = function execute(node, data, globals, useValueOf) {
    if (useValueOf === void 0) {
      useValueOf = false;
    }
    var oldContext = this._context;
    this._context = globals;
    var res = undefined;
    try {
      node.debug = []; // clean previous debug info
      res = node.search(data, globals);
    } catch (err) {
      var _this$_context, _this$_context$form, _this$_context$form$l;
      (_this$_context = this._context) == null ? void 0 : (_this$_context$form = _this$_context.form) == null ? void 0 : (_this$_context$form$l = _this$_context$form.logger) == null ? void 0 : _this$_context$form$l.error(err);
    }
    for (var _iterator = _createForOfIteratorHelperLoose(node.debug), _step; !(_step = _iterator()).done;) {
      var debugInfo = _step.value;
      var _this$_context2, _this$_context2$form, _this$_context2$form$;
      (_this$_context2 = this._context) == null ? void 0 : (_this$_context2$form = _this$_context2.form) == null ? void 0 : (_this$_context2$form$ = _this$_context2$form.logger) == null ? void 0 : _this$_context2$form$.debug(debugInfo);
    }
    var finalRes = res;
    if (useValueOf) {
      if (typeof res === 'object' && res !== null) {
        finalRes = Object.getPrototypeOf(res).valueOf.call(res);
      }
    }
    this._context = oldContext;
    return finalRes;
  }
  /**
   * Listen to subscriber for
   * @param subscriber
   */;
  _proto24.trackDependency = function trackDependency(subscriber) {
    if (this._context && this._context.field !== undefined && this._context.field !== subscriber) {
      subscriber._addDependent(this._context.field);
    }
  };
  return RuleEngine;
}();
/**
 * Creates form instance using form model definition as per `adaptive form specification`
 * @param formModel form model definition
 * @param callback a callback that recieves the FormModel instance that gets executed before any event in the Form
 * is executed
 * @param logLevel Logging Level for the form. Setting it off will disable the logging
 * @param fModel existing form model, this is additional optimization to prevent creation of form instance
 * @returns {@link FormModel | form model}
 */
var createFormInstance = function createFormInstance(formModel, callback, logLevel, fModel) {
  if (logLevel === void 0) {
    logLevel = 'error';
  }
  if (fModel === void 0) {
    fModel = undefined;
  }
  try {
    var f = fModel;
    if (f == null) {
      f = new Form(_extends({}, formModel), new RuleEngine(), new EventQueue(new Logger(logLevel)), logLevel);
    }
    var formData = formModel == null ? void 0 : formModel.data;
    if (formData) {
      f.importData(formData);
    }
    if (typeof callback === 'function') {
      callback(f);
    }
    // Once the field or panel is initialized, execute the initialization script
    // this means initialization happens after prefill and restore
    // Before execution of calcExp, visibleExp, enabledExp, validate, options, navigationChange, we execute init script
    //f.queueEvent(new Initialize(undefined, true));
    //f.queueEvent(new ExecuteRule(undefined, true));
    f.getEventQueue().runPendingQueue();
    return f;
  } catch (e) {
    console.error("Unable to create an instance of the Form " + e);
    throw new Error(e);
  }
};

var TextArea = /*#__PURE__*/function (_TextInput) {
  _inheritsLoose(TextArea, _TextInput);
  function TextArea() {
    return _TextInput.apply(this, arguments) || this;
  }
  var _proto = TextArea.prototype;
  _proto.getInputHTML = function getInputHTML() {
    return "<textarea\n              title=\"" + (this.isTooltipVisible() ? this.getTooltipValue() : '') + "\"\n              aria-label=\"" + (this.isLabelVisible() ? this.getLabelValue() : '') + "\"\n              class=\"cmp-adaptiveform-textinput__widget\"\n              name=\"" + this.getName() + "\"\n              " + this.getDisabledHTML() + "\n              " + this.getReadonlyHTML() + "\n              required=\"" + this.isRequired() + "\"\n              placeholder=\"" + this.getPlaceHolder() + "\"\n              minlength=\"" + this.getMinLength() + "\"\n              maxlength=\"" + this.getMaxLength() + "\"></textarea>";
  };
  return TextArea;
}(TextInput);

var _checkIfEqual = /*#__PURE__*/_classPrivateFieldLooseKey("checkIfEqual");
var DropDown = /*#__PURE__*/function (_FormFieldBase) {
  _inheritsLoose(DropDown, _FormFieldBase);
  function DropDown(params, model) {
    var _this;
    _this = _FormFieldBase.call(this, params, model) || this;
    Object.defineProperty(_assertThisInitialized(_this), _checkIfEqual, {
      writable: true,
      value: function value(_value, optionValue, multiSelect) {
        if (multiSelect) {
          var isPresent = false;
          _value.forEach(function (saveValue) {
            if (String(saveValue) === optionValue)
              // save value can be number and boolean also.
              isPresent = true;
          });
          return isPresent;
        }
        return String(_value) === optionValue;
      }
    });
    _this.qm = _this.element.querySelector(DropDown.selectors.qm);
    return _this;
  }
  var _proto = DropDown.prototype;
  _proto.getWidget = function getWidget() {
    return this.element.querySelector(DropDown.selectors.widget);
  };
  _proto.getDescription = function getDescription() {
    return this.element.querySelector(DropDown.selectors.description);
  };
  _proto.getLabel = function getLabel() {
    return this.element.querySelector(DropDown.selectors.label);
  };
  _proto.getErrorDiv = function getErrorDiv() {
    return this.element.querySelector(DropDown.selectors.errorDiv);
  };
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    return this.element.querySelector(DropDown.selectors.qm);
  };
  _proto.getTooltipDiv = function getTooltipDiv() {
    return this.element.querySelector(DropDown.selectors.tooltipDiv);
  };
  _proto._updateValue = function _updateValue(value) {
    var _this2 = this;
    var isMultiSelect = this._model.isArrayType();
    if (this.widget) {
      var select = this.widget;
      [select].forEach(function (option) {
        if (_classPrivateFieldLooseBase(_this2, _checkIfEqual)[_checkIfEqual](value, option.value, isMultiSelect)) {
          option.setAttribute('selected', 'selected');
        } else {
          option.removeAttribute('selected');
        }
      });
    }
  };
  _proto.addListener = function addListener() {
    var _this$getWidget,
      _this3 = this;
    (_this$getWidget = this.getWidget()) == null ? void 0 : _this$getWidget.addEventListener('blur', function (e) {
      if (_this3._model.isArrayType()) {
        var valueArray = [];
        var select = _this3.widget;
        [select].forEach(function (option) {
          if (option.selected) {
            valueArray.push(option.value);
          }
        });
        _this3._model.value = valueArray;
      } else {
        _this3._model.value = e.target.value;
      }
    });
  };
  _proto.getbemBlock = function getbemBlock() {
    return DropDown.bemBlock;
  };
  _proto.getIS = function getIS() {
    return DropDown.IS;
  };
  _proto.getInputHTML = function getInputHTML() {
    var _this$getState,
      _this$getState$enumNa,
      _this4 = this;
    return "<select class=\"cmp-adaptiveform-dropdown__widget\"\n                    aria-label=\"" + (this.isLabelVisible() ? this.getLabelValue() : '') + "\"\n                    title=\"" + (this.isTooltipVisible() ? this.getTooltipValue() : '') + "\"\n                    name=\"" + this.getName() + "\"\n                    " + this.getDisabledHTML() + "\n                    " + this.getReadonlyHTML() + "\n                    " + this.getMultipleHTML() + "\n                    required=\"" + this.isRequired() + "\">\n                " + (this.getPlaceHolder() ? "<option  value=\"\" disabled selected>" + this.getPlaceHolder() + "</option>" : "") + "\n                \n                " + ((_this$getState = this.getState()) == null ? void 0 : (_this$getState$enumNa = _this$getState.enumNames) == null ? void 0 : _this$getState$enumNa.map(function (enumDisplayName, index) {
      var _this4$getState;
      return _this4.getOptionsHTML((_this4$getState = _this4.getState()) == null ? void 0 : _this4$getState["enum"][index], enumDisplayName, _this4.getDefault());
    }).join("")) + "\n            </select>";
  };
  _proto.getOptionsHTML = function getOptionsHTML(enumValue, enumDisplayName, defaultVal) {
    return "\n            <option value=\"" + enumValue + "\" class=\"cmp-adaptiveform-dropdown__option\"\n                selected=\"" + (enumValue == defaultVal ? 'selected' : '') + "\">" + enumDisplayName + "</option>\n            ";
  };
  _proto.getMultipleHTML = function getMultipleHTML() {
    return (this.getState().isMultiSelect ? 'multiple: multiple' : '') + "\"";
  };
  return DropDown;
}(FormFieldBase);
DropDown.NS = Constants.NS;
DropDown.IS = "adaptiveFormDropDown";
DropDown.bemBlock = 'cmp-adaptiveform-dropdown';
DropDown.selectors = {
  self: "[data-" + DropDown.NS + '-is="' + DropDown.IS + '"]',
  widget: "." + DropDown.bemBlock + "__widget",
  options: "." + DropDown.bemBlock + "__option",
  label: "." + DropDown.bemBlock + "__label",
  description: "." + DropDown.bemBlock + "__longdescription",
  qm: "." + DropDown.bemBlock + "__questionmark",
  errorDiv: "." + DropDown.bemBlock + "__errormessage",
  tooltipDiv: "." + DropDown.bemBlock + "__shortdescription"
};

var Actions = {
  Click: Click,
  Change: Change,
  Submit: Submit,
  Blur: Blur,
  AddItem: AddItem,
  RemoveItem: RemoveItem
};

var Button = /*#__PURE__*/function (_FormFieldBase) {
  _inheritsLoose(Button, _FormFieldBase);
  function Button() {
    return _FormFieldBase.apply(this, arguments) || this;
  }
  var _proto = Button.prototype;
  /**
   * Each FormField has a data attribute class that is prefixed along with the global namespace to
   * distinguish between them. If a component wants to put a data-attribute X, the attribute in HTML would be
   * data-{NS}-{IS}-x=""
   * @type {string}
   */
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    return null;
  };
  _proto.getLabel = function getLabel() {
    return null;
  };
  _proto.getWidget = function getWidget() {
    return this.element.querySelector(".cmp-button");
  }
  /**
   * Return the description element.
   * @returns {HTMLElement}
   */;
  _proto.getDescription = function getDescription() {
    return null;
  };
  _proto.getErrorDiv = function getErrorDiv() {
    return null;
  };
  _proto.getTooltipDiv = function getTooltipDiv() {
    return null;
  };
  _proto.addListener = function addListener() {
    var _this$getWidget,
      _this = this;
    (_this$getWidget = this.getWidget()) == null ? void 0 : _this$getWidget.addEventListener("click", function () {
      _this._model.dispatch(new Actions.Click());
    });
  };
  _proto.getbemBlock = function getbemBlock() {
    return Button.bemBlock;
  };
  _proto.getIS = function getIS() {
    return Button.IS;
  }
  // TODO - Icon part of spec?
  ;
  _proto.getHTML = function getHTML() {
    return "<button \n            type=\"button\"\n            id=\"" + this.getId() + "\"\n            class=\"cmp-button\"\n            " + this.getDisabledHTML() + "\n            " + this.getReadonlyHTML() + "\n            title=\"" + this.getTooltipValue + "\"\n            data-cmp-visible=\"" + this.isVisible() + "\"\n            data-cmp-enabled=\"" + this.isEnabled() + "\"\n            data-cmp-is=\"adaptiveFormButton\"\n            aria-label=\"" + this.getLabelValue() + "\"\n            data-cmp-adaptiveformcontainer-path=\"" + this.getFormContainerPath() + "\">\n            <span class=\"cmp-button__text\">" + this.getLabelValue() + "</span>\n        </button>";
  };
  return Button;
}(FormFieldBase);
Button.NS = Constants.NS;
Button.IS = "adaptiveFormButton";
Button.bemBlock = 'cmp-adaptiveform-button';
Button.selectors = {
  self: "[data-" + Button.NS + '-is="' + Button.IS + '"]'
};

var _widget = /*#__PURE__*/_classPrivateFieldLooseKey("widget");
var _model = /*#__PURE__*/_classPrivateFieldLooseKey("model");
var _options = /*#__PURE__*/_classPrivateFieldLooseKey("options");
var _defaultOptions = /*#__PURE__*/_classPrivateFieldLooseKey("defaultOptions");
var _matchArray = /*#__PURE__*/_classPrivateFieldLooseKey("matchArray");
var _regex = /*#__PURE__*/_classPrivateFieldLooseKey("regex");
var _processedValue = /*#__PURE__*/_classPrivateFieldLooseKey("processedValue");
var _engRegex = /*#__PURE__*/_classPrivateFieldLooseKey("engRegex");
var _writtenInLocale = /*#__PURE__*/_classPrivateFieldLooseKey("writtenInLocale");
var _previousCompositionVal = /*#__PURE__*/_classPrivateFieldLooseKey("previousCompositionVal");
var _toLatinForm = /*#__PURE__*/_classPrivateFieldLooseKey("toLatinForm");
var _attachEventHandlers = /*#__PURE__*/_classPrivateFieldLooseKey("attachEventHandlers");
var _attachCompositionEventHandlers = /*#__PURE__*/_classPrivateFieldLooseKey("attachCompositionEventHandlers");
var _getDigits = /*#__PURE__*/_classPrivateFieldLooseKey("getDigits");
var _escape = /*#__PURE__*/_classPrivateFieldLooseKey("escape");
var _compositionUpdateCallback = /*#__PURE__*/_classPrivateFieldLooseKey("compositionUpdateCallback");
var _handleKeyInput = /*#__PURE__*/_classPrivateFieldLooseKey("handleKeyInput");
var _handleKeyDown = /*#__PURE__*/_classPrivateFieldLooseKey("handleKeyDown");
var _isValidChar = /*#__PURE__*/_classPrivateFieldLooseKey("isValidChar");
var _handleKeyPress = /*#__PURE__*/_classPrivateFieldLooseKey("handleKeyPress");
var _handlePaste = /*#__PURE__*/_classPrivateFieldLooseKey("handlePaste");
var _handleCut = /*#__PURE__*/_classPrivateFieldLooseKey("handleCut");
var _convertValueToLocale = /*#__PURE__*/_classPrivateFieldLooseKey("convertValueToLocale");
var _convertValueFromLocale = /*#__PURE__*/_classPrivateFieldLooseKey("convertValueFromLocale");
var _isValueSame = /*#__PURE__*/_classPrivateFieldLooseKey("isValueSame");
/**
 * This class is responsible for interacting with the numeric input widget. It implements edit/display format
 * for numeric input, along with the following features
 * - Convert's input type number to text to support display/edit format (for example `$` symbol)
 * - One cannot type or paste alphabets in the html input element
 */
var NumericInputWidget = /*#__PURE__*/function () {
  // passed by reference

  //TODO: to support writing in different locales \d should be replaced by [0-9] for different locales

  function NumericInputWidget(_widget2, model) {
    Object.defineProperty(this, _isValueSame, {
      value: _isValueSame2
    });
    Object.defineProperty(this, _convertValueFromLocale, {
      value: _convertValueFromLocale2
    });
    Object.defineProperty(this, _convertValueToLocale, {
      value: _convertValueToLocale2
    });
    Object.defineProperty(this, _handleCut, {
      value: _handleCut2
    });
    Object.defineProperty(this, _handlePaste, {
      value: _handlePaste2
    });
    Object.defineProperty(this, _handleKeyPress, {
      value: _handleKeyPress2
    });
    Object.defineProperty(this, _isValidChar, {
      value: _isValidChar2
    });
    Object.defineProperty(this, _handleKeyDown, {
      value: _handleKeyDown2
    });
    Object.defineProperty(this, _handleKeyInput, {
      value: _handleKeyInput2
    });
    Object.defineProperty(this, _compositionUpdateCallback, {
      value: _compositionUpdateCallback2
    });
    Object.defineProperty(this, _escape, {
      value: _escape2
    });
    Object.defineProperty(this, _getDigits, {
      value: _getDigits2
    });
    Object.defineProperty(this, _attachCompositionEventHandlers, {
      value: _attachCompositionEventHandlers2
    });
    Object.defineProperty(this, _attachEventHandlers, {
      value: _attachEventHandlers2
    });
    Object.defineProperty(this, _toLatinForm, {
      value: _toLatinForm2
    });
    Object.defineProperty(this, _widget, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _model, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _options, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _defaultOptions, {
      writable: true,
      value: {
        value: null,
        curValue: null,
        pos: 0,
        lengthLimitVisible: true,
        zero: "0",
        decimal: ".",
        minus: "-"
      }
    });
    Object.defineProperty(this, _matchArray, {
      writable: true,
      value: {
        "integer": "^[+-]?{digits}*$",
        "decimal": "^[+-]?{digits}{leading}({decimal}{digits}{fraction})?$",
        "float": "^[+-]?{digits}*({decimal}{digits}*)?$"
      }
    });
    Object.defineProperty(this, _regex, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _processedValue, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _engRegex, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _writtenInLocale, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _previousCompositionVal, {
      writable: true,
      value: ""
    });
    // initialize the widget and model
    _classPrivateFieldLooseBase(this, _widget)[_widget] = _widget2;
    _classPrivateFieldLooseBase(this, _model)[_model] = model;
    // initialize options for backward compatibility
    _classPrivateFieldLooseBase(this, _options)[_options] = Object.assign({}, _classPrivateFieldLooseBase(this, _defaultOptions)[_defaultOptions], _classPrivateFieldLooseBase(this, _model)[_model]._jsonModel);
    var matchStr = _classPrivateFieldLooseBase(this, _matchArray)[_matchArray][_classPrivateFieldLooseBase(this, _options)[_options].dataType];
    if (matchStr) {
      var ld = _classPrivateFieldLooseBase(this, _options)[_options].leadDigits,
        fd = _classPrivateFieldLooseBase(this, _options)[_options].fracDigits,
        ldstr = ld && ld !== -1 ? "{0," + ld + "}" : "*",
        fdstr = fd && fd !== -1 ? "{0," + fd + "}" : "*",
        _matchStr = _matchStr.replace("{leading}", ldstr).replace("{fraction}", fdstr),
        localeStr = _matchStr.replace(/{digits}/g, _classPrivateFieldLooseBase(this, _getDigits)[_getDigits]()).replace("{decimal}", _classPrivateFieldLooseBase(this, _escape)[_escape](_classPrivateFieldLooseBase(this, _options)[_options].decimal)),
        engStr = _matchStr.replace(/{digits}/g, "[0-9]").replace("{decimal}", "\\.");
      _classPrivateFieldLooseBase(this, _processedValue)[_processedValue] = !(_classPrivateFieldLooseBase(this, _getDigits)[_getDigits]() === "[0123456789]" && _classPrivateFieldLooseBase(this, _options)[_options].decimal === ".");
      _classPrivateFieldLooseBase(this, _regex)[_regex] = new RegExp(localeStr, "g");
      _classPrivateFieldLooseBase(this, _engRegex)[_engRegex] = new RegExp(engStr, "g");
    }
    // change the input type to text for patterns
    _classPrivateFieldLooseBase(this, _widget)[_widget].setAttribute("type", "text");
    _classPrivateFieldLooseBase(this, _attachEventHandlers)[_attachEventHandlers](_widget2);
  }
  var _proto = NumericInputWidget.prototype;
  _proto.getValue = function getValue(value) {
    // we support full width, half width and locale specific numbers
    value = _classPrivateFieldLooseBase(this, _toLatinForm)[_toLatinForm](value);
    if (value.length > 0 && _classPrivateFieldLooseBase(this, _processedValue)[_processedValue] && !value.match(_classPrivateFieldLooseBase(this, _engRegex)[_engRegex])) {
      _classPrivateFieldLooseBase(this, _writtenInLocale)[_writtenInLocale] = true;
      value = _classPrivateFieldLooseBase(this, _convertValueFromLocale)[_convertValueFromLocale](value);
    } else {
      _classPrivateFieldLooseBase(this, _writtenInLocale)[_writtenInLocale] = false;
    }
    if (value && value.length >= _classPrivateFieldLooseBase(this, _options)[_options].combCells) value = value.slice(0, _classPrivateFieldLooseBase(this, _options)[_options].combCells);
    _classPrivateFieldLooseBase(this, _previousCompositionVal)[_previousCompositionVal] = value;
    return value;
  };
  _proto.trigger = function trigger(event, detail) {
    if (!_classPrivateFieldLooseBase(this, _widget)[_widget]) {
      return this;
    }
    var eventName = event.split('.')[0];
    var isNativeEvent = typeof document.body["on" + eventName] !== 'undefined';
    if (isNativeEvent) {
      _classPrivateFieldLooseBase(this, _widget)[_widget].dispatchEvent(new Event(eventName));
      return this;
    }
    var customEvent = new CustomEvent(eventName, {
      detail: detail || null
    });
    _classPrivateFieldLooseBase(this, _widget)[_widget].dispatchEvent(customEvent);
    return this;
  };
  _proto.getHTMLSupportedAttr = function getHTMLSupportedAttr(domElement, attr) {
    try {
      return domElement[attr];
    } catch (err) {
      return undefined;
    }
  };
  _proto.isNonPrintableKey = function isNonPrintableKey(key) {
    return key // In IE, event.key returns words instead of actual characters for some keys.
    && !['MozPrintableKey', 'Divide', 'Multiply', 'Subtract', 'Add', 'Enter', 'Decimal', 'Spacebar', 'Del'].includes(key) && key.length !== 1;
  };
  _proto.setValue = function setValue(value) {
    // if the value is same, don't do anything
    if (!_classPrivateFieldLooseBase(this, _isValueSame)[_isValueSame]()) {
      if (value && _classPrivateFieldLooseBase(this, _writtenInLocale)[_writtenInLocale]) {
        _classPrivateFieldLooseBase(this, _widget)[_widget].value = _classPrivateFieldLooseBase(this, _convertValueToLocale)[_convertValueToLocale](value);
      } else {
        _classPrivateFieldLooseBase(this, _widget)[_widget].value = _classPrivateFieldLooseBase(this, _model)[_model].value;
      }
    }
  };
  return NumericInputWidget;
}();
function _toLatinForm2(halfOrFullWidthStr) {
  // refer http://www.fileformat.info/info/unicode/block/halfwidth_and_fullwidth_forms/utf8test.htm
  return halfOrFullWidthStr.replace(/[\uff00-\uffef]/g, function (ch) {
    return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
  });
}
function _attachEventHandlers2(widget, model) {
  var _this = this;
  widget.addEventListener('keydown', function (e) {
    _classPrivateFieldLooseBase(_this, _handleKeyDown)[_handleKeyDown](e);
  });
  widget.addEventListener('keypress', function (e) {
    _classPrivateFieldLooseBase(_this, _handleKeyPress)[_handleKeyPress](e);
  });
  widget.addEventListener('paste', function (e) {
    _classPrivateFieldLooseBase(_this, _handlePaste)[_handlePaste](e);
  });
  widget.addEventListener('cut', function (e) {
    _classPrivateFieldLooseBase(_this, _handleCut)[_handleCut](e);
  });
  widget.addEventListener('blur', function (e) {
    _classPrivateFieldLooseBase(_this, _model)[_model].value = _this.getValue(e.target.value);
  });
  // IME specific handling, to handle japanese languages max limit
  _classPrivateFieldLooseBase(this, _attachCompositionEventHandlers)[_attachCompositionEventHandlers](widget);
}
function _attachCompositionEventHandlers2(widget) {
  var hasCompositionJustEnded = false; // Used to swallow keyup event related to compositionend
  // IME specific handling, to handle japanese languages max limit
  // since enter can also be invoked during composing, a special handling is done here
  var that = this,
    changeCaratPosition = function changeCaratPosition() {
      // change the carat selection position to further limit input of characters
      var range = window.getSelection();
      range.selectAllChildren(widget);
      range.collapseToEnd();
    };
  widget.addEventListener('keyup', function (event) {
    if ( /*isComposing || */hasCompositionJustEnded) {
      if (_classPrivateFieldLooseBase(that, _compositionUpdateCallback)[_compositionUpdateCallback](event)) {
        changeCaratPosition();
      }
      // IME composing fires keydown/keyup events
      hasCompositionJustEnded = false;
    }
  });
  widget.addEventListener('compositionstart', function (event) {
  });
  widget.addEventListener("compositionupdate", function (event) {
    // event.originalEvent.data refers to the actual content
    if (_classPrivateFieldLooseBase(that, _compositionUpdateCallback)[_compositionUpdateCallback](event)) {
      changeCaratPosition();
    }
  });
  widget.addEventListener("compositionend", function (event) {
    // some browsers (IE, Firefox, Safari) send a keyup event after
    //  compositionend, some (Chrome, Edge) don't. This is to swallow
    // the next keyup event, unless a keydown event happens first
    hasCompositionJustEnded = true;
  });
  widget.addEventListener("keydown", function (event) {
    // Safari on OS X may send a keydown of 229 after compositionend
    if (event.which !== 229) {
      hasCompositionJustEnded = false;
    }
  });
}
function _getDigits2() {
  var zeroCode = _classPrivateFieldLooseBase(this, _options)[_options].zero.charCodeAt(0),
    digits = "";
  for (var i = 0; i < 10; i++) {
    digits += String.fromCharCode(zeroCode + i);
  }
  return "[" + digits + "]";
}
function _escape2(str) {
  return str.replace(".", "\\.");
}
function _compositionUpdateCallback2(event) {
  var that = this;
  var flag = false;
  var leadDigits = _classPrivateFieldLooseBase(that, _options)[_options].leadDigits;
  var fracDigits = _classPrivateFieldLooseBase(that, _options)[_options].fracDigits;
  // we don't check use-case where just fracDigits is set since in case of composition update, the value to update is not known
  if (leadDigits !== -1) {
    var val = _classPrivateFieldLooseBase(this, _widget)[_widget].value;
    if (event.type === "compositionupdate" && event.originalEvent.data) {
      val = val + event.originalEvent.data.substr(event.originalEvent.data.length - 1);
    }
    // can't use the existing regex (since current regex checks for english digits), rather doing leadDigit compare
    var totalLength = leadDigits + (fracDigits !== -1 ? fracDigits + _classPrivateFieldLooseBase(that, _options)[_options].decimal.length : 0);
    if (val.indexOf(_classPrivateFieldLooseBase(that, _options)[_options].decimal) === -1) {
      totalLength = leadDigits;
    }
    var latinVal = _classPrivateFieldLooseBase(this, _toLatinForm)[_toLatinForm](val);
    // match both since we support full width, half width and locale specific input
    var match = latinVal.match(_classPrivateFieldLooseBase(that, _regex)[_regex]) || latinVal.match(_classPrivateFieldLooseBase(this, _engRegex)[_engRegex]);
    flag = !match;
    if (match === null) {
      // entered invalid character, revert to previous value
      _classPrivateFieldLooseBase(that, _widget)[_widget].value = _classPrivateFieldLooseBase(that, _previousCompositionVal)[_previousCompositionVal];
      flag = true;
    } else if (flag) {
      // if max reached
      var newVal = val.substr(0, totalLength);
      _classPrivateFieldLooseBase(that, _widget)[_widget].value = newVal;
      _classPrivateFieldLooseBase(that, _previousCompositionVal)[_previousCompositionVal] = newVal;
      flag = true;
    } else {
      _classPrivateFieldLooseBase(that, _previousCompositionVal)[_previousCompositionVal] = val;
    }
  }
  return flag;
}
function _handleKeyInput2(event, character, code) {
  if (event.ctrlKey && !['paste', 'cut'].includes(event.type)) {
    return true;
  }
  _classPrivateFieldLooseBase(this, _handleKeyDown)[_handleKeyDown](arguments);
  _classPrivateFieldLooseBase(this, _options)[_options].lengthLimitVisible = true;
  var val = _classPrivateFieldLooseBase(this, _widget)[_widget].value,
    // if selectionStart attribute isn't supported then its value will be undefined
    selectionStart = this.getHTMLSupportedAttr(_classPrivateFieldLooseBase(this, _widget)[_widget], "selectionStart") || 0,
    isSelectionAttrSupported = !(selectionStart === undefined || selectionStart === null),
    selectionEnd = this.getHTMLSupportedAttr(_classPrivateFieldLooseBase(this, _widget)[_widget], "selectionEnd") || 0,
    combCells = parseInt(_classPrivateFieldLooseBase(this, _options)[_options].combCells) || 0,
    current,
    change = character;
  if (combCells > 0) {
    change = character.substr(0, combCells - val.length + selectionEnd - selectionStart);
  }

  // CQ-4245407 : selectionStart and selectionEnd attributes aren't supported in case of input type = number
  // it is used for providing native HTML5 implementation for numeric field, so no further processing is required
  // As it is specific to AF and AF doesn't support change event on each keypress, so this change should be fine
  if (!isSelectionAttrSupported) {
    return true;
  }
  current = val.substr(0, selectionStart) + change + val.substr(selectionEnd);
  // done to handle support for both full width, half width or mixed input in number field
  var latinCurrentValue = _classPrivateFieldLooseBase(this, _toLatinForm)[_toLatinForm](current);
  if (!(_classPrivateFieldLooseBase(this, _regex)[_regex] == null || latinCurrentValue.match(_classPrivateFieldLooseBase(this, _regex)[_regex]) || latinCurrentValue.match(_classPrivateFieldLooseBase(this, _engRegex)[_engRegex]))) {
    event.preventDefault();
    return false;
  }
  if (!['keydown', 'cut'].includes(event.type) && combCells && (val.length >= combCells || current.length > combCells) && selectionStart === selectionEnd) {
    event.preventDefault();
    return false;
  }
  _classPrivateFieldLooseBase(this, _options)[_options].curValue = val;
  _classPrivateFieldLooseBase(this, _previousCompositionVal)[_previousCompositionVal] = val;
  _classPrivateFieldLooseBase(this, _options)[_options].pos = selectionStart;
}
function _handleKeyDown2(event) {
  if (event) {
    var code = event.charCode || event.which || event.keyCode || 0;
    if (code === 8 || code === 46)
      // backspace and del
      _classPrivateFieldLooseBase(this, _handleKeyInput)[_handleKeyInput](event, "", code);else if (code === 32) {
      // suppress space
      event.preventDefault();
      return false;
    }
  }
}
function _isValidChar2(character) {
  character = _classPrivateFieldLooseBase(this, _toLatinForm)[_toLatinForm](character);
  var lastSingleDigitChar = String.fromCharCode(_classPrivateFieldLooseBase(this, _options)[_options].zero.charCodeAt(0) + 9);
  // we only full width, half width and also locale specific if customer has overlayed the i18n file
  return character >= "0" && character <= "9" || character >= _classPrivateFieldLooseBase(this, _options)[_options].zero && character <= lastSingleDigitChar || character === _classPrivateFieldLooseBase(this, _options)[_options].decimal || character === _classPrivateFieldLooseBase(this, _options)[_options].minus;
}
function _handleKeyPress2(event) {
  if (event) {
    var code = event.charCode || event.which || event.keyCode || 0,
      character = String.fromCharCode(code);
    if (this.isNonPrintableKey(event.key)) {
      // mozilla also generates a keypress, along with keydown
      return true; // for all keys, so only handling printable keys in keypress
    }

    if (_classPrivateFieldLooseBase(this, _isValidChar)[_isValidChar](character)) _classPrivateFieldLooseBase(this, _handleKeyInput)[_handleKeyInput](event, character, code);else if (!event.ctrlKey) {
      event.preventDefault();
      return false;
    }
  }
}
function _handlePaste2(event) {
  if (event) {
    // get the contents
    var pastedChar = undefined;
    if (window.clipboardData && window.clipboardData.getData) {
      // IE
      pastedChar = window.clipboardData.getData('Text');
    } else if ((event.originalEvent || event).clipboardData && (event.originalEvent || event).clipboardData.getData) {
      pastedChar = (event.originalEvent || event).clipboardData.getData('text/plain');
    }
    if (pastedChar) {
      var allPastedCharsValid = pastedChar.split('').every(function (character) {
        return _classPrivateFieldLooseBase(this, _isValidChar)[_isValidChar](character);
      }, this);
      if (allPastedCharsValid) {
        // during paste we support both half width, full width and locale specific numbers
        pastedChar = _classPrivateFieldLooseBase(this, _toLatinForm)[_toLatinForm](pastedChar);
        _classPrivateFieldLooseBase(this, _handleKeyInput)[_handleKeyInput](event, pastedChar, 0);
      } else if (!event.ctrlKey) {
        event.preventDefault();
        return false;
      }
    }
  }
}
function _handleCut2(event) {
  if (event) {
    _classPrivateFieldLooseBase(this, _handleKeyInput)[_handleKeyInput](event, "", 0);
  }
}
function _convertValueToLocale2(val) {
  var zeroCode = _classPrivateFieldLooseBase(this, _options)[_options].zero.charCodeAt(0);
  return val.map(function (c) {
    if (c === ".") {
      return _classPrivateFieldLooseBase(this, _options)[_options].decimal;
    } else if (c === "-") {
      return _classPrivateFieldLooseBase(this, _options)[_options].minus;
    } else {
      return String.fromCharCode(parseInt(c) + zeroCode);
    }
  }, this).join("");
}
function _convertValueFromLocale2(val) {
  val = _classPrivateFieldLooseBase(this, _toLatinForm)[_toLatinForm](val);
  var zeroCode = _classPrivateFieldLooseBase(this, _options)[_options].zero.charCodeAt(0);
  return val.map(function (c) {
    if (c === _classPrivateFieldLooseBase(this, _options)[_options].decimal) {
      return ".";
    } else if (c === _classPrivateFieldLooseBase(this, _options)[_options].minus) {
      return "-";
    } else {
      return (c.charCodeAt(0) - zeroCode).toString();
    }
  }, this).join("");
}
function _isValueSame2() {
  return _classPrivateFieldLooseBase(this, _model)[_model].value === null && _classPrivateFieldLooseBase(this, _widget)[_widget].value === "" || _classPrivateFieldLooseBase(this, _model)[_model].value === _classPrivateFieldLooseBase(this, _widget)[_widget].value;
}

var NumberInput = /*#__PURE__*/function (_FormFieldBase) {
  _inheritsLoose(NumberInput, _FormFieldBase);
  function NumberInput() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _FormFieldBase.call.apply(_FormFieldBase, [this].concat(args)) || this;
    _this.widgetObject = void 0;
    return _this;
  }
  var _proto = NumberInput.prototype;
  _proto.getClass = function getClass() {
    return NumberInput.IS;
  };
  _proto.getWidget = function getWidget() {
    return this.element.querySelector(NumberInput.selectors.widget);
  };
  _proto.getDescription = function getDescription() {
    return this.element.querySelector(NumberInput.selectors.description);
  };
  _proto.getLabel = function getLabel() {
    return this.element.querySelector(NumberInput.selectors.label);
  };
  _proto.getErrorDiv = function getErrorDiv() {
    return this.element.querySelector(NumberInput.selectors.errorDiv);
  };
  _proto.getTooltipDiv = function getTooltipDiv() {
    return this.element.querySelector(NumberInput.selectors.tooltipDiv);
  };
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    return this.element.querySelector(NumberInput.selectors.qm);
  };
  _proto._updateValue = function _updateValue(value) {
    if (this.widgetObject == null && (this._model._jsonModel.editFormat || this._model._jsonModel.displayFormat)) {
      this.widgetObject = new NumericInputWidget(this.getWidget(), this._model);
    }
    if (this.widgetObject) {
      this.widgetObject.setValue(value);
    } else {
      _FormFieldBase.prototype._updateValue.call(this, value);
    }
  };
  _proto.addListener = function addListener() {
    var _this2 = this;
    // only initialize if patterns are set
    if (this._model._jsonModel.editFormat || this._model._jsonModel.displayFormat) {
      if (this.widgetObject == null) {
        this.widgetObject = new NumericInputWidget(this.getWidget(), this._model);
      }
    } else {
      var _this$getWidget;
      (_this$getWidget = this.getWidget()) == null ? void 0 : _this$getWidget.addEventListener('blur', function (e) {
        _this2._model.value = e.target.value;
      });
    }
  };
  _proto.getbemBlock = function getbemBlock() {
    return NumberInput.bemBlock;
  };
  _proto.getIS = function getIS() {
    return NumberInput.IS;
  };
  _proto.getInputHTML = function getInputHTML() {
    return "<input\n            class=\"cmp-adaptiveform-numberinput__widget\"\n            title=\"" + (this.isTooltipVisible() ? this.getTooltipValue() : '') + "\"\n            aria-label=\"" + (this.isLabelVisible() ? this.getLabelValue() : '') + "\"\n            type=\"number\"\n            name=\"" + this.getName() + "\"\n            value=\"" + this.getDefault() + "\"\n            max=\"" + this.getMaximum() + "\"\n            min=\"" + this.getMinimum() + "\"\n            " + this.getDisabledHTML() + "\n            " + this.getReadonlyHTML() + "\n            required=\"" + this.isRequired() + "\"\n            placeholder=\"" + this.getPlaceHolder() + "\"/>";
  };
  return NumberInput;
}(FormFieldBase);
NumberInput.NS = Constants.NS;
NumberInput.IS = "adaptiveFormNumberInput";
NumberInput.bemBlock = 'cmp-adaptiveform-numberinput';
NumberInput.selectors = {
  self: "[data-" + NumberInput.NS + '-is="' + NumberInput.IS + '"]',
  widget: "." + NumberInput.bemBlock + "__widget",
  label: "." + NumberInput.bemBlock + "__label",
  description: "." + NumberInput.bemBlock + "__longdescription",
  errorDiv: "." + NumberInput.bemBlock + "__errormessage",
  qm: "." + NumberInput.bemBlock + "__questionmark",
  tooltipDiv: "." + NumberInput.bemBlock + "__shortdescription"
};

var RadioButton = /*#__PURE__*/function (_FormFieldBase) {
  _inheritsLoose(RadioButton, _FormFieldBase);
  function RadioButton(params, model) {
    var _this;
    _this = _FormFieldBase.call(this, params, model) || this;
    _this.qm = _this.element.querySelector(RadioButton.selectors.qm);
    return _this;
  }
  var _proto = RadioButton.prototype;
  _proto.getWidget = function getWidget() {
    return this.element.querySelector(RadioButton.selectors.widget);
  };
  _proto.getWidgets = function getWidgets() {
    return this.element.querySelectorAll(RadioButton.selectors.widget);
  };
  _proto.getDescription = function getDescription() {
    return this.element.querySelector(RadioButton.selectors.description);
  };
  _proto.getLabel = function getLabel() {
    return this.element.querySelector(RadioButton.selectors.label);
  };
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    return this.element.querySelector(RadioButton.selectors.qm);
  };
  _proto.getTooltipDiv = function getTooltipDiv() {
    return this.element.querySelector(RadioButton.selectors.tooltipDiv);
  };
  _proto.getErrorDiv = function getErrorDiv() {
    return this.element.querySelector(RadioButton.selectors.errorDiv);
  };
  _proto._updateValue = function _updateValue(modelValue) {
    if (modelValue != null) {
      this.getWidgets().forEach(function (widget) {
        if (widget.value != null && modelValue.toString() == widget.value.toString()) {
          widget.checked = true;
          widget.setAttribute(Constants.HTML_ATTRS.CHECKED, Constants.HTML_ATTRS.CHECKED);
          widget.setAttribute(Constants.ARIA_CHECKED, true + "");
        } else {
          widget.checked = false;
          widget.removeAttribute(Constants.HTML_ATTRS.CHECKED);
          widget.setAttribute(Constants.ARIA_CHECKED, false + "");
        }
      }, this);
    }
  };
  _proto._updateEnabled = function _updateEnabled(enabled) {
    this.toggle(enabled, Constants.ARIA_DISABLED, true);
    this.element.setAttribute(Constants.DATA_ATTRIBUTE_ENABLED, enabled + "");
    var widgets = this.getWidgets();
    widgets == null ? void 0 : widgets.forEach(function (widget) {
      if (enabled === false) {
        widget.setAttribute(Constants.HTML_ATTRS.DISABLED, true + "");
        widget.setAttribute(Constants.ARIA_DISABLED, true + "");
      } else {
        widget.removeAttribute(Constants.HTML_ATTRS.DISABLED);
        widget.removeAttribute(Constants.ARIA_DISABLED);
      }
    });
  };
  _proto.addListener = function addListener() {
    var _this2 = this;
    this.getWidgets().forEach(function (widget) {
      widget.addEventListener('change', function (e) {
        _this2._model.value = e.target.value;
      });
    });
  };
  _proto.getbemBlock = function getbemBlock() {
    return RadioButton.bemBlock;
  };
  _proto.getIS = function getIS() {
    return RadioButton.IS;
  };
  _proto.getInputHTML = function getInputHTML() {
    var _this$getState,
      _this$getState$enum,
      _this3 = this;
    return "\n            " + ((_this$getState = this.getState()) == null ? void 0 : (_this$getState$enum = _this$getState["enum"]) == null ? void 0 : _this$getState$enum.map(function (enumVal, index) {
      var _this3$getState;
      return _this3.getRadioHTML(_this3, enumVal, (_this3$getState = _this3.getState()) == null ? void 0 : _this3$getState.enumNames[index], index);
    }).join(""));
  };
  _proto.getRadioHTML = function getRadioHTML(radioButton, enumValue, enumDisplayName, index) {
    return "<div class=\"cmp-adaptiveform-radiobutton__option " + radioButton.getLayoutProperties().orientation + "\">\n                    <label class=\"cmp-adaptiveform-radiobutton__option__label\"\n                            title=\"" + radioButton.getTooltipValue() + "\"\n                            aria-describedby=\"_desc\"\n                            aria-label=\"" + enumDisplayName + "\">\n                        <input type=\"radio\"\n                                name=\"" + radioButton.getName() + "\"\n                                class=\"cmp-adaptiveform-radiobutton__option__widget\"\n                                id=\"" + radioButton.getId() + '_' + index + "__widget\"\n                                value=\"" + enumValue + "\"\n                                " + this.getDisabledHTML() + "\n                                aria-describedby=\"_desc\"\n                                checked=\"" + (enumValue == this.getDefault()) + "\"/>\n                        <span>" + enumDisplayName + "</span>\n                    </label>\n                </div>\n            </div>";
  };
  return RadioButton;
}(FormFieldBase);
RadioButton.NS = Constants.NS;
RadioButton.IS = "adaptiveFormRadioButton";
RadioButton.bemBlock = 'cmp-adaptiveform-radiobutton';
RadioButton.selectors = {
  self: "[data-" + RadioButton.NS + '-is="' + RadioButton.IS + '"]',
  widget: "." + RadioButton.bemBlock + "__option__widget",
  label: "." + RadioButton.bemBlock + "__label",
  description: "." + RadioButton.bemBlock + "__longdescription",
  qm: "." + RadioButton.bemBlock + "__questionmark",
  errorDiv: "." + RadioButton.bemBlock + "__errormessage",
  tooltipDiv: "." + RadioButton.bemBlock + "__shortdescription"
};

var Text = /*#__PURE__*/function (_FormFieldBase) {
  _inheritsLoose(Text, _FormFieldBase);
  function Text() {
    return _FormFieldBase.apply(this, arguments) || this;
  }
  var _proto = Text.prototype;
  _proto.getWidget = function getWidget() {
    return null;
  };
  _proto.getDescription = function getDescription() {
    return null;
  };
  _proto.getLabel = function getLabel() {
    return null;
  };
  _proto.getErrorDiv = function getErrorDiv() {
    return null;
  };
  _proto.getTooltipDiv = function getTooltipDiv() {
    return null;
  };
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    return null;
  };
  _proto.getClass = function getClass() {
    return Text.IS;
  };
  _proto.setFocus = function setFocus() {
    this.setActive();
  };
  _proto.getbemBlock = function getbemBlock() {
    return Text.bemBlock;
  };
  _proto.getIS = function getIS() {
    return Text.IS;
  };
  _proto.getHTML = function getHTML() {
    return "\n        <div data-cmp-is=\"" + this.getIS() + "\"\n            id=\"" + this.id + "\"\n            data-cmp-adaptiveformcontainer-path=\"" + this.getFormContainerPath() + "\"\n            data-cmp-visible=\"" + this.getDefault() + "\"\n            class=\"cmp-adaptiveform-text\">\n            <div class=\"cmp-adaptiveform-text__widget\" tabindex=\"0\">\n                " + this.getState().value + "\n            </div>\n        </div>";
  };
  return Text;
}(FormFieldBase);
Text.NS = Constants.NS;
Text.IS = "adaptiveFormText";
Text.bemBlock = 'cmp-adaptiveform-text';
Text.selectors = {
  self: "[data-" + Text.NS + '-is="' + Text.IS + '"]'
};

var SliderInput = /*#__PURE__*/function (_FormFieldBase) {
  _inheritsLoose(SliderInput, _FormFieldBase);
  function SliderInput() {
    return _FormFieldBase.apply(this, arguments) || this;
  }
  var _proto = SliderInput.prototype;
  _proto.getWidget = function getWidget() {
    return this.element.querySelector(SliderInput.selectors.widget);
  };
  _proto.getDescription = function getDescription() {
    return this.element.querySelector(SliderInput.selectors.description);
  };
  _proto.getLabel = function getLabel() {
    return this.element.querySelector(SliderInput.selectors.label);
  };
  _proto.getErrorDiv = function getErrorDiv() {
    return this.element.querySelector(SliderInput.selectors.errorDiv);
  };
  _proto.getTooltipDiv = function getTooltipDiv() {
    return this.element.querySelector(SliderInput.selectors.tooltipDiv);
  };
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    return this.element.querySelector(SliderInput.selectors.qm);
  };
  _proto.addListener = function addListener() {
    var _this$getWidget,
      _this = this,
      _this$getWidget2;
    (_this$getWidget = this.getWidget()) == null ? void 0 : _this$getWidget.addEventListener('blur', function (e) {
      _this._model.value = e.target.value;
      _this.setInactive();
    });
    (_this$getWidget2 = this.getWidget()) == null ? void 0 : _this$getWidget2.addEventListener('focus', function (e) {
      _this.setActive();
    });
  };
  _proto.getbemBlock = function getbemBlock() {
    return SliderInput.bemBlock;
  };
  _proto.getIS = function getIS() {
    return SliderInput.IS;
  };
  _proto.getInputHTML = function getInputHTML() {
    return "\n            <br>\n            <p class=\"range-info\">" + this.getMinimum() + "</p>\n            <input\n                class=\"cmp-adaptiveform-SliderInput__widget\"\n                title=\"" + (this.isTooltipVisible() ? this.getTooltipValue() : '') + "\"\n                aria-label=\"" + (this.isLabelVisible() ? this.getLabelValue() : '') + "\"\n                type=\"range\"\n                name=\"" + this.getName() + "\"\n                value=\"" + this.getDefault() + "\"\n                step=\"" + this.getState().step + "\"\n                " + this.getDisabledHTML() + "\n                " + this.getReadonlyHTML() + "\n                required=\"" + this.isRequired() + "\"\n                placeholder=\"" + this.getPlaceHolder() + "\"\n                min=\"" + this.getMinimum() + "\"\n                max=\"" + this.getMaximum() + "\"/>\n            \n            <p class=\"range-info\">" + this.getMaximum() + "</p>\n            ";
  };
  return SliderInput;
}(FormFieldBase);
SliderInput.NS = Constants.NS;
SliderInput.IS = "adaptiveFormSliderInput";
SliderInput.bemBlock = 'cmp-adaptiveform-sliderinput';
SliderInput.selectors = {
  self: "[data-" + SliderInput.NS + '-is="' + SliderInput.IS + '"]',
  widget: "." + SliderInput.bemBlock + "__widget",
  label: "." + SliderInput.bemBlock + "__label",
  description: "." + SliderInput.bemBlock + "__longdescription",
  qm: "." + SliderInput.bemBlock + "__questionmark",
  errorDiv: "." + SliderInput.bemBlock + "__errormessage",
  tooltipDiv: "." + SliderInput.bemBlock + "__shortdescription"
};

var EmailInput = /*#__PURE__*/function (_TextInput) {
  _inheritsLoose(EmailInput, _TextInput);
  function EmailInput() {
    return _TextInput.apply(this, arguments) || this;
  }
  var _proto = EmailInput.prototype;
  _proto.getInputHTML = function getInputHTML() {
    return "<input\n              class=\"cmp-adaptiveform-textinput__widget\"\n              title=\"" + (this.isTooltipVisible() ? this.getTooltipValue() : '') + "\"\n              aria-label=\"" + (this.isLabelVisible() ? this.getLabelValue() : '') + "\"\n              type=\"email\"\n              name=\"" + this.getName() + "\"\n              value=\"" + this.getDefault() + "\"\n              " + this.getDisabledHTML() + "\n              " + this.getReadonlyHTML() + "\n              required=\"" + this.isRequired() + "\"\n              placeholder=\"" + this.getPlaceHolder() + "\"\n              minlength=\"" + this.getMinLength() + "\"\n              maxlength=\"" + this.getMaxLength() + "\"/>";
  };
  return EmailInput;
}(TextInput);

var CheckBoxGroup = /*#__PURE__*/function (_FormFieldBase) {
  _inheritsLoose(CheckBoxGroup, _FormFieldBase);
  function CheckBoxGroup(params, model) {
    var _this;
    _this = _FormFieldBase.call(this, params, model) || this;
    _this.widgetLabel = void 0;
    _this.qm = _this.element.querySelector(CheckBoxGroup.selectors.qm);
    _this.widgetLabel = _this.element.querySelector(CheckBoxGroup.selectors.widgetLabel);
    return _this;
  }
  var _proto = CheckBoxGroup.prototype;
  _proto.getWidget = function getWidget() {
    return this.element.querySelector(CheckBoxGroup.selectors.widget);
  };
  _proto.getWidgets = function getWidgets() {
    return this.element.querySelectorAll(CheckBoxGroup.selectors.widget);
  };
  _proto.getDescription = function getDescription() {
    return this.element.querySelector(CheckBoxGroup.selectors.description);
  };
  _proto.getLabel = function getLabel() {
    return this.element.querySelector(CheckBoxGroup.selectors.label);
  };
  _proto.getErrorDiv = function getErrorDiv() {
    return this.element.querySelector(CheckBoxGroup.selectors.errorDiv);
  };
  _proto.getQuestionMarkDiv = function getQuestionMarkDiv() {
    return this.element.querySelector(CheckBoxGroup.selectors.qm);
  };
  _proto.getTooltipDiv = function getTooltipDiv() {
    return this.element.querySelector(CheckBoxGroup.selectors.tooltipDiv);
  };
  _proto._updateModelValue = function _updateModelValue() {
    var value = [];
    var widgets = this.getWidgets();
    widgets == null ? void 0 : widgets.forEach(function (widget) {
      if (widget.checked) {
        value.push(widget.value);
      }
    }, this);
    this._model.value = value;
  };
  _proto._updateEnabled = function _updateEnabled(enabled) {
    this.toggle(enabled, Constants.ARIA_DISABLED, true);
    this.element.setAttribute(Constants.DATA_ATTRIBUTE_ENABLED, enabled + "");
    var widgets = this.getWidgets();
    widgets == null ? void 0 : widgets.forEach(function (widget) {
      if (enabled === false) {
        widget.setAttribute(Constants.HTML_ATTRS.DISABLED, true + "");
        widget.setAttribute(Constants.ARIA_DISABLED, true + "");
      } else {
        widget.removeAttribute(Constants.HTML_ATTRS.DISABLED);
        widget.removeAttribute(Constants.ARIA_DISABLED);
      }
    });
  };
  _proto.getEnum = function getEnum() {
    var _this$getState;
    return (_this$getState = this.getState()) == null ? void 0 : _this$getState["enum"];
  };
  _proto.getEnumNames = function getEnumNames() {
    var _this$getState2;
    return (_this$getState2 = this.getState()) == null ? void 0 : _this$getState2.enumNames;
  };
  _proto.addListener = function addListener() {
    var _this2 = this;
    var widgets = this.getWidgets();
    widgets.forEach(function (widget) {
      widget.addEventListener('change', function (e) {
        _this2._updateModelValue();
      });
    });
  };
  _proto.getbemBlock = function getbemBlock() {
    return CheckBoxGroup.bemBlock;
  };
  _proto.getIS = function getIS() {
    return CheckBoxGroup.IS;
  };
  _proto.getInputHTML = function getInputHTML() {
    var _this$getEnum,
      _this3 = this;
    return "\n            <div class=\"cmp-adaptiveform-checkboxgroup__widget\">\n            " + ((_this$getEnum = this.getEnum()) == null ? void 0 : _this$getEnum.map(function (enumVal, index, enums) {
      var _this3$getEnumNames;
      return _this3.getCheckboxHTML(_this3, enumVal, ((_this3$getEnumNames = _this3.getEnumNames()) == null ? void 0 : _this3$getEnumNames[index]) || enumVal, index, enums == null ? void 0 : enums.length);
    }).join("")) + "\n            </div>\n            ";
  };
  _proto.getCheckboxHTML = function getCheckboxHTML(checkbox, enumValue, enumDisplayName, index, size) {
    return "<div class=\"cmp-adaptiveform-checkboxgroup-item " + checkbox.getName() + " " + checkbox.getLayoutProperties().orientation + " \">\n                <label class=\"cmp-adaptiveform-checkbox__label\" aria-label=\"" + enumDisplayName + "\"\n                    title=\"" + checkbox.getTooltipValue() + "\" for=\"" + checkbox.id + '_' + index + "__widget\">\n                    <input class=\"cmp-adaptiveform-checkbox__widget\" type=\"checkbox\" id=\"" + checkbox.id + '_' + index + "__widget\"\n                        aria-describedby=\"_desc\"\n                        name=\"" + (size > 1 ? checkbox.getName() : checkbox.getLabelValue()) + "\"\n                        value=\"" + enumValue.toString() + "\"\n                        checked=\"" + (enumValue == checkbox.getDefault()) + "\"\n                        " + this.getDisabledHTML() + " />\n                    <span>" + (this.getEnum().length > 1 ? enumDisplayName : checkbox.getLabelValue()) + "</span>\n                </label>\n            </div>";
  };
  _proto.renderLabel = function renderLabel() {
    return "" + (this.isLabelVisible() && this.getEnum().length > 1 ? "<label id=\"" + this.getId() + "-label\" for=\"" + this.getId() + "\" class=\"" + this.getbemBlock() + "__label\" >" + this.getLabelValue() + "</label>" : "");
  };
  return CheckBoxGroup;
}(FormFieldBase);
CheckBoxGroup.NS = Constants.NS;
CheckBoxGroup.IS = "adaptiveFormCheckBoxGroup";
CheckBoxGroup.bemBlock = 'cmp-adaptiveform-checkboxgroup';
CheckBoxGroup.checkboxBemBlock = 'cmp-adaptiveform-checkbox';
CheckBoxGroup.selectors = {
  self: "[data-" + CheckBoxGroup.NS + '-is="' + CheckBoxGroup.IS + '"]',
  widgets: "." + CheckBoxGroup.bemBlock + "__widgets",
  widget: "." + CheckBoxGroup.checkboxBemBlock + "__widget",
  widgetLabel: "." + CheckBoxGroup.checkboxBemBlock + "__label",
  label: "." + CheckBoxGroup.bemBlock + "__label",
  description: "." + CheckBoxGroup.bemBlock + "__longdescription",
  qm: "." + CheckBoxGroup.bemBlock + "__questionmark",
  errorDiv: "." + CheckBoxGroup.bemBlock + "__errormessage",
  tooltipDiv: "." + CheckBoxGroup.bemBlock + "__shortdescription"
};

var FormContainer = /*#__PURE__*/function () {
  function FormContainer(_params) {
    var _this = this;
    this._model = void 0;
    this._path = void 0;
    this._fields = void 0;
    this._deferredParents = void 0;
    this.renderChildrens = function (form, state) {
      console.log("Rendering childrens");
      var items = state == null ? void 0 : state.items;
      if (items && items.length > 0) {
        items.forEach(function (field) {
          form.append(_this.getRender(field));
        });
      }
    };
    this.getRender = function (field) {
      var fieldWrapper = document.createElement('div');
      try {
        var fieldViewModel;
        var fieldModel = _this.getModel(field.id);
        var params = {
          element: fieldWrapper,
          id: field.id
        };
        switch (field == null ? void 0 : field.fieldType) {
          case "checkbox":
            fieldViewModel = new CheckBoxGroup(params, fieldModel);
            break;
          case "email":
            fieldViewModel = new EmailInput(params, fieldModel);
            break;
          case "slider":
            fieldViewModel = new SliderInput(params, fieldModel);
            break;
          case "plain-text":
            fieldViewModel = new Text(params, fieldModel);
            break;
          case "radio":
            fieldViewModel = new RadioButton(params, fieldModel);
            break;
          case "number":
            fieldViewModel = new NumberInput(params, fieldModel);
            break;
          case "button":
            fieldViewModel = new Button(params, fieldModel);
            break;
          case "select":
            fieldViewModel = new DropDown(params, fieldModel);
            break;
          case "text-area":
            fieldViewModel = new TextArea(params, fieldModel);
            break;
          default:
            fieldViewModel = new TextInput(params, fieldModel);
        }
        if (fieldViewModel) {
          fieldViewModel.render();
        }
      } catch (error) {
        console.error("Unexpected error ", error);
      }
      return fieldWrapper;
    };
    //@ts-ignore
    //let createFormInstance = FormView.createFormInstance; // TODO - replace with import after AF-Core is available as ESM
    this._model = createFormInstance(_extends$1({}, _params._formJson));
    this._path = _params._path;
    this._fields = {};
    this._deferredParents = {};
  }
  /**
   * returns the form field view
   * @param fieldId
   */
  var _proto = FormContainer.prototype;
  _proto.getField = function getField(fieldId) {
    if (this._fields.hasOwnProperty(fieldId)) {
      return this._fields[fieldId];
    }
    return null;
  };
  _proto.getModel = function getModel(id) {
    return id ? this._model.getElement(id) : this._model;
  };
  _proto.addField = function addField(fieldView) {
    if (fieldView.getFormContainerPath() === this._path) {
      var fieldId = fieldView.getId();
      this._fields[fieldId] = fieldView;
      var model = this.getModel(fieldId);
      fieldView.setModel(model);
      //todo fix parentId for non form elements, right now parent id might be non form element
      var parentId = model.parent.id;
      if (parentId != '$form') {
        var parentView = this._fields[parentId];
        //if parent view has been initialized then add parent relationship, otherwise add it to deferred parent-child relationship
        if (parentView) {
          fieldView.setParent(parentView);
        } else {
          if (!this._deferredParents[parentId]) {
            this._deferredParents[parentId] = [];
          }
          this._deferredParents[parentId].push(fieldView);
        }
      }
      // check if field id is in deferred relationship, if it is add parent child relationships
      if (this._deferredParents[fieldId]) {
        var childList = this._deferredParents[fieldId];
        for (var index = 0; index < childList.length; index++) {
          childList[index].setParent(fieldView);
        }
        // remove the parent from deferred parents, once child-parent relationship is established
        delete this._deferredParents[fieldId];
      }
      fieldView.subscribe();
    }
  };
  _proto.setFocus = function setFocus(id) {
    if (id) {
      var fieldView = this._fields[id];
      if (fieldView && fieldView.setFocus) {
        fieldView.setFocus();
      } else {
        // todo proper error handling, for AF 2.0 model exceptions as well
        // logging the error right now.
        console.log("View on which focus is to be set, not initialized.");
      }
    }
  };
  _proto.getPath = function getPath() {
    return this._path;
  };
  _proto.render = function render() {
    var form = document.createElement('form');
    form.className = "cmp-adaptiveform-container cmp-container";
    var state = this._model.getState();
    this.renderChildrens(form, state);
    return form;
  };
  return FormContainer;
}();

var PANEL_TYPE = "object";
var PANEL_END = "page-break";
var RULE_TYPE = "Rules.";
var EVENTS = "events.";
var CONSTRAINT_MESSAGE = "constraintMessages.";
var _handlePanel = /*#__PURE__*/_classPrivateFieldLooseKey("handlePanel");
var _handleProperty = /*#__PURE__*/_classPrivateFieldLooseKey("handleProperty");
var _handleCheckbox = /*#__PURE__*/_classPrivateFieldLooseKey("handleCheckbox");
var _setProperty = /*#__PURE__*/_classPrivateFieldLooseKey("setProperty");
var _handleMultiValues = /*#__PURE__*/_classPrivateFieldLooseKey("handleMultiValues");
var _handleHierarchy = /*#__PURE__*/_classPrivateFieldLooseKey("handleHierarchy");
var _isRule = /*#__PURE__*/_classPrivateFieldLooseKey("isRule");
var _isConstraintMsg = /*#__PURE__*/_classPrivateFieldLooseKey("isConstraintMsg");
var _isPanel = /*#__PURE__*/_classPrivateFieldLooseKey("isPanel");
var _isEndingPanel = /*#__PURE__*/_classPrivateFieldLooseKey("isEndingPanel");
var _cleanUpPanel = /*#__PURE__*/_classPrivateFieldLooseKey("cleanUpPanel");
var ExcelToFormModel = /*#__PURE__*/function () {
  function ExcelToFormModel() {
    Object.defineProperty(this, _cleanUpPanel, {
      value: _cleanUpPanel2
    });
    Object.defineProperty(this, _isEndingPanel, {
      value: _isEndingPanel2
    });
    Object.defineProperty(this, _isPanel, {
      value: _isPanel2
    });
    Object.defineProperty(this, _isConstraintMsg, {
      value: _isConstraintMsg2
    });
    Object.defineProperty(this, _isRule, {
      value: _isRule2
    });
    Object.defineProperty(this, _handleHierarchy, {
      value: _handleHierarchy2
    });
    Object.defineProperty(this, _handleMultiValues, {
      value: _handleMultiValues2
    });
    Object.defineProperty(this, _setProperty, {
      value: _setProperty2
    });
    Object.defineProperty(this, _handleCheckbox, {
      value: _handleCheckbox2
    });
    Object.defineProperty(this, _handleProperty, {
      value: _handleProperty2
    });
    Object.defineProperty(this, _handlePanel, {
      value: _handlePanel2
    });
  }
  var _proto = ExcelToFormModel.prototype;
  _proto._getForm = function _getForm(formName) {
    try {
      if (!formName) {
        throw new Error("form name is required");
      }
      return Promise.resolve(fetch(formName)).then(function (resp) {
        return Promise.resolve(resp.json());
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  _proto.getFormModel = function getFormModel(formName) {
    try {
      var _this2 = this;
      return Promise.resolve(function () {
        if (formName) {
          var formDef = {
            adaptiveform: "0.10.0",
            metadata: {
              grammar: "json-formula-1.0.0",
              version: "1.0.0"
            },
            items: []
          };
          console.time("Get Excel JSON");
          return Promise.resolve(_this2._getForm(formName)).then(function (exData) {
            console.timeEnd("Get Excel JSON");
            if (!exData || !exData.data) {
              throw new Error("Unable to retrieve the form details with excel name " + formName);
            }
            var stack = [];
            stack.push(formDef.items);
            var currentPanel = formDef;
            exData.data.forEach(function (item) {
              if (_classPrivateFieldLooseBase(_this2, _isPanel)[_isPanel](item)) {
                item.items = {};
                var panel = JSON.parse(JSON.stringify(item));
                _classPrivateFieldLooseBase(_this2, _handlePanel)[_handlePanel](panel);
                currentPanel.items.push(panel);
                stack.push(currentPanel);
                currentPanel = panel;
              } else if (_classPrivateFieldLooseBase(_this2, _isEndingPanel)[_isEndingPanel](item)) {
                currentPanel = stack.pop();
                if (!currentPanel) {
                  currentPanel = formDef;
                }
              } else {
                currentPanel.items.push(_classPrivateFieldLooseBase(_this2, _handleProperty)[_handleProperty](item));
              }
            });
            return {
              formDef: formDef,
              excelData: exData
            };
          });
        }
      }());
    } catch (e) {
      return Promise.reject(e);
    }
  };
  return ExcelToFormModel;
}();
function _handlePanel2(item) {
  _classPrivateFieldLooseBase(this, _cleanUpPanel)[_cleanUpPanel](item);
  if (_classPrivateFieldLooseBase(this, _isRule)[_isRule](item)) {
    var rule = _classPrivateFieldLooseBase(this, _handleHierarchy)[_handleHierarchy](item, RULE_TYPE);
    if (rule && Object.keys(rule).length != 0) {
      item.rules = rule;
    }
  }
  // Handle Events
  var events = _classPrivateFieldLooseBase(this, _handleHierarchy)[_handleHierarchy](item, EVENTS);
  if (events && Object.keys(events).length != 0) {
    item.events = events;
  }
}
function _handleProperty2(item) {
  var source = Object.fromEntries(Object.entries(item).filter(function (_ref) {
    var v = _ref[1];
    return v != null && v != "";
  }));
  var fieldType = ExcelToFormModel.fieldMapping.has(source.Type) ? ExcelToFormModel.fieldMapping.get(source.Type) : source.Type;
  var field = {
    name: source.Field,
    placeholder: source.Placeholder,
    type: "string",
    fieldType: fieldType,
    value: source.Value,
    label: {
      value: source.Label
    },
    required: source.Mandatory ? true : false
  };
  _classPrivateFieldLooseBase(this, _setProperty)[_setProperty](source, "Maximum", field, "maximum");
  _classPrivateFieldLooseBase(this, _setProperty)[_setProperty](source, "Minimum", field, "minimum");
  _classPrivateFieldLooseBase(this, _setProperty)[_setProperty](source, "MaxLength", field, "maxLength");
  _classPrivateFieldLooseBase(this, _setProperty)[_setProperty](source, "MinLength", field, "minLength");
  _classPrivateFieldLooseBase(this, _setProperty)[_setProperty](source, "Step", field, "step");
  if (_classPrivateFieldLooseBase(this, _isRule)[_isRule](source)) {
    var rule = _classPrivateFieldLooseBase(this, _handleHierarchy)[_handleHierarchy](source, RULE_TYPE);
    if (rule && Object.keys(rule).length != 0) {
      field.rules = rule;
    }
  }
  if (_classPrivateFieldLooseBase(this, _isConstraintMsg)[_isConstraintMsg](source)) {
    var constraints = _classPrivateFieldLooseBase(this, _handleHierarchy)[_handleHierarchy](source, CONSTRAINT_MESSAGE);
    if (constraints && Object.keys(constraints).length != 0) {
      field.constraintMessages = constraints;
    }
  }
  // Handle Events
  var events = _classPrivateFieldLooseBase(this, _handleHierarchy)[_handleHierarchy](source, EVENTS);
  if (events && Object.keys(events).length != 0) {
    field.events = events;
  }
  var enumNames = _classPrivateFieldLooseBase(this, _handleMultiValues)[_handleMultiValues](source, "Options");
  if (enumNames) {
    field.enumNames = field["enum"] = enumNames;
  }
  _classPrivateFieldLooseBase(this, _handleCheckbox)[_handleCheckbox](field);
  return field;
}
function _handleCheckbox2(field) {
  if ((field == null ? void 0 : field.fieldType) == "checkbox" && (!field["enum"] || field["enum"].length == 0)) {
    field["enum"] = ["on"];
  }
}
function _setProperty2(source, sourceKey, target, targetKey) {
  if (source && source[sourceKey]) {
    target[targetKey] = source[sourceKey];
  }
}
function _handleMultiValues2(item, source) {
  var values;
  if (item && item[source]) {
    values = item[source].split(",").map(function (value) {
      return value.trim();
    });
  }
  return values;
}
function _handleHierarchy2(item, match) {
  var constraints = {};
  Object.keys(item).forEach(function (key) {
    if (~key.indexOf(match)) {
      var constraint = key.split(".")[1];
      if (item[key]) {
        constraints[constraint] = item[key];
      }
      delete item[key];
    }
  });
  return constraints;
}
function _isRule2(item) {
  return Object.keys(item).some(function (key) {
    return ~key.indexOf(RULE_TYPE);
  });
}
function _isConstraintMsg2(item) {
  return Object.keys(item).some(function (key) {
    return ~key.indexOf(CONSTRAINT_MESSAGE);
  });
}
function _isPanel2(item) {
  return item && item.type == PANEL_TYPE;
}
function _isEndingPanel2(item) {
  return item && item.viewType == PANEL_END;
}
function _cleanUpPanel2(item) {
  //delete item.viewType;
  delete item.type;
}
ExcelToFormModel.fieldMapping = new Map([["text-input", "text"], ["number-input", "number"], ["date-input", "datetime-local"], ["file-input", "file"], ["drop-down", "select"], ["radio-group", ""], ["checkbox-group", ""], ["plain-text", "plain-text"], ["checkbox", "checkbox"], ["multiline-input", "text-area"], ["panel", "panel"], ["submit", "button"]]);

var decorate = function decorate(block) {
  try {
    var form = block == null ? void 0 : block.querySelector('a[href$=".json"]');
    var _temp = function () {
      if (form && form != null && form.href) {
        var _replaceWith2 = form.replaceWith;
        return Promise.resolve(createFormContainer(form.href)).then(function (_createFormContainer) {
          _replaceWith2.call(form, _createFormContainer);
        });
      }
    }();
    return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
  } catch (e) {
    return Promise.reject(e);
  }
};
var createFormContainer = function createFormContainer(url) {
  try {
    console.log("Loading & Converting excel form to Crispr Form");
    console.time('Json Transformation (including Get)');
    var transform = new ExcelToFormModel();
    return Promise.resolve(transform.getFormModel(url)).then(function (convertedData) {
      console.timeEnd('Json Transformation (including Get)');
      console.log(convertedData);
      console.log("Creating Form Container");
      console.time('Form Model Instance Creation');
      var formContainer = new FormContainer({
        _formJson: convertedData == null ? void 0 : convertedData.formDef
      });
      console.timeEnd('Form Model Instance Creation');
      //@ts-ignore
      window.guideContainer = formContainer;
      console.time('Form Rendition');
      var form = formContainer.render();
      console.timeEnd('Form Rendition');
      return form;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
decorate(document.getElementsByClassName("form")[0]);

export { decorate as default };
//# sourceMappingURL=index.esm.js.map