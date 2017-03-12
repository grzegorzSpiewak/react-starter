(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const upsertCss = require('./lib/upsert-css')
const createName = require('./lib/create-name')

function cmz (raw) {
  if (typeof raw === 'string') { return createAtom(raw) }
  if (typeof raw === 'object') { return createFamily(raw) }
}

function createAtom (raw) {
  return new CmzAtom(null, raw)
}

function createFamily (atoms) {
  return new CmzFamily(createName(), atoms)
}

function CmzFamily (prefix, raw) {
  // we'll use the same prefix for all atoms in this family
  this._prefix = prefix || createName()
  this._atoms = {}
  this._addAtoms(raw)
}

CmzFamily.prototype._addAtoms = function (raw) {
  const self = this
  Object.keys(raw).forEach(function (k) {
    if (raw[k] instanceof CmzAtom) {
      // families can include pre-created atoms
      self._addAtom(k, raw[k])
    } else {
      // use the family key to make the classname a bit more descriptive
      self._addAtom(k, new CmzAtom(self._prefix + '-' + k, raw[k]))
    }
  })
}

CmzFamily.prototype._addAtom = function (key, atom) {
  // expose atoms directly (but warn if there's a name clash)
  if (this[key]) {
    console.warning('CmzFamily: %s already exists', key)
  }
  this[key] = this._atoms[key] = atom
}

// compose 2 families together
CmzFamily.prototype.compose = function (other) {
  const self = this
  Object.keys(other._atoms).forEach(function (k) {
    if (self._atoms[k]) {
      self._atoms[k].compose(other[k])
    } else {
      self._addAtom(k, other[k])
    }
  })

  return this
}

function CmzAtom (name, raw) {
  this.name = name || createName()
  this.raw = raw
  this.comps = []
}

CmzAtom.prototype.getCss = function () {
  // if no placeholder was given, wrap the entire thing in a selector
  if (this.raw.indexOf('&') === -1) {
    return '.' + this.name + ' {\n' + this.raw + '\n}'
  }

  // otherwise replace the placeholder with the unique name
  return this.raw.replace(/&/g, '.' + this.name)
}

CmzAtom.prototype.toString = function () {
  // need to call toString() on the comps first,
  // so that they appear higher in source
  const fullName = this.getFullName()
  upsertCss(this.name, this.getCss())
  return fullName
}

CmzAtom.prototype.getFullName = function () {
  return [this.name]
    .concat(this.comps)
    .filter(Boolean)
    .join(' ')
}

CmzAtom.prototype.compose = function (comps) {
  if (!Array.isArray(comps)) { comps = [comps] }
  this.comps = this.comps.concat(comps)
  return this
}

module.exports = cmz

},{"./lib/create-name":2,"./lib/upsert-css":3}],2:[function(require,module,exports){
var nameCounter = 0
module.exports = function createName () {
  const name = 'cmz-' + nameCounter
  nameCounter += 1
  return name
}

},{}],3:[function(require,module,exports){
module.exports = function upsertCss (id, css) {
  if (typeof document === 'undefined') { return }

  const head = document.querySelector('head')
  var el = head.querySelector('style[data-cmz="' + id + '"]')

  if (!el) {
    el = document.createElement('style')
    el.setAttribute('type', 'text/css')
    el.setAttribute('data-cmz', id)
    head.appendChild(el)
  }

  if (el.styleSheet) {
    el.styleSheet.cssText = css
  } else {
    el.textContent = css
  }

  return el
}

},{}],4:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var header = _ref.header,
      isSubmitting = _ref.isSubmitting;

  if (isSubmitting) {
    return null;
  }
  return _react2.default.createElement(
    'h1',
    null,
    header
  );
};

},{"react":"react"}],5:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cmz = require('cmz');

var _cmz2 = _interopRequireDefault(_cmz);

var _buttonStyles = require('./buttonStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Import styles for component */
module.exports = function (_ref) {
  var disabled = _ref.disabled,
      onSubmit = _ref.onSubmit,
      isSubmitting = _ref.isSubmitting,
      primary = _ref.primary,
      getCity = _ref.getCity;

  if (isSubmitting) {
    return _react2.default.createElement(
      'p',
      null,
      'Submiting...'
    );
  }
  return !disabled ? _react2.default.createElement(
    'button',
    { className: primary ? _buttonStyles.primaryButton : _buttonStyles.button,
      onClick: (onSubmit, getCity) },
    'Submit'
  ) : null;
};

},{"./buttonStyles":6,"cmz":1,"react":"react"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.primaryButton = exports.button = undefined;

var _cmz = require('cmz');

var _cmz2 = _interopRequireDefault(_cmz);

var _styles = require('../../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var button = exports.button = (0, _cmz2.default)('\n  &: {\n    background: #9295b5;\n    border-color: white;\n    border-radius: 5px;\n  }\n\n  &:hover {\n    background: #e29a09;\n  }\n').compose(_styles.generalStyle); //** atache reusable styles defined in styles.js */

var primaryButton = exports.primaryButton = (0, _cmz2.default)('\n  background: red;\n').compose(_styles.generalStyle);

},{"../../styles":11,"cmz":1}],7:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (_ref) {
  var inputValue = _ref.inputValue,
      onTextInput = _ref.onTextInput,
      isSubmitting = _ref.isSubmitting;

  if (isSubmitting) {
    return null;
  }
  return _react2.default.createElement('input', { type: 'text', value: inputValue, onChange: onTextInput });
};

},{"react":"react"}],8:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cmz = require('cmz');

var _cmz2 = _interopRequireDefault(_cmz);

var _TextInput = require('../../components/TextInput/TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _SubmitButton = require('../../components/SubmitButton/SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

var _Label = require('../../components/Label/Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function SampleForm(props) {
  if (props.error) {
    return _react2.default.createElement(
      'div',
      { style: { color: 'red' } },
      props.error.toString()
    );
  }

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Label2.default, { header: props.header,
      isSubmitting: props.isSubmitting
    }),
    _react2.default.createElement(_TextInput2.default, {
      isSubmitting: props.isSubmitting,
      inputValue: props.inputValue || props.text,
      onTextInput: props.onTextInput
    }),
    _react2.default.createElement(_SubmitButton2.default, {
      isSubmitting: props.isSubmitting,
      onSubmit: props.onSubmit,
      getCity: props.getCity
    })
  );
};

/**Components*/

},{"../../components/Label/Label":4,"../../components/SubmitButton/SubmitButton":5,"../../components/TextInput/TextInput":7,"cmz":1,"react":"react"}],9:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presets = {};

presets.init = {
  text: '',
  error: null,
  isChecked: false,
  isSubmitting: false,
  header: 'Type in your city',
  cities: []
};

presets.submitting = _extends({}, presets.init, {
  isSubmitting: true
});

presets.error = _extends({}, presets.init, {
  error: new Error('something bad happened')
});

presets.withValues = _extends({}, presets.init, {
  text: '1234',
  isChecked: true
});

presets.onlyText = _extends({}, presets.withValues, {
  isChecked: false

});

presets.onlyChechbox = _extends({}, presets.withValues, {
  text: '1234'
});

// stateful container
module.exports = _react2.default.createClass({
  displayName: 'State',

  getInitialState: function getInitialState() {
    return presets.init;
  },

  onTextInput: function onTextInput(event) {
    this.setState({
      inputValue: event.nativeEvent.target.value
    });
  },

  onSubmit: function onSubmit() {
    var isSubmitting = this.state.isSubmitting;
    this.setState(_extends({}, this.state, {
      isSubmitting: true
    }));
  },

  getCity: function getCity() {
    var _this = this;

    var apiKey = '953079470cc6ebfc8ed5cbe3c2fb7101';
    var apiLink = 'http://api.openweathermap.org/data/2.5/forecast?APPID=' + apiKey;
    var cityUrl = apiLink + '&q=' + this.state.inputValue;
    fetch(cityUrl).then(function (blob) {
      return blob.json();
    }).then(function (data) {
      _this.data = data;
      console.log(data.city);
    });
  },

  render: function render() {
    return _react2.default.createElement(_index2.default, _extends({}, this.state, {
      inputValue: this.state.inputValue,
      onTextInput: this.onTextInput,
      onSubmit: this.onSubmit,
      getCity: this.getCity
    }));
  }
});

},{"./index.js":8,"react":"react"}],10:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _state = require('./containers/WeatherApp/state');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_state2.default, null), document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

},{"./containers/WeatherApp/state":9,"react":"react","react-dom":"react-dom"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generalStyle = undefined;

var _cmz = require('cmz');

var _cmz2 = _interopRequireDefault(_cmz);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Place to defince general re-usable styles for components */

var generalStyle = exports.generalStyle = (0, _cmz2.default)('\n  padding: 10px 20px;\n  textransform: uppercase;\n');

},{"cmz":1}]},{},[10]);
