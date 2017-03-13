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

var apiKey = '--Paste your API Key from http://openweathermap.org/ here';
module.exports = apiKey;

},{}],5:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * render
 * @return {ReactElement} Header
 */
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

},{"react":"react"}],6:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * render
 * @return {ReactElement} Section
 */
module.exports = function (_ref) {
  var informations = _ref.informations,
      inputValue = _ref.inputValue,
      clear = _ref.clear;


  /**
   * Handles missspelling in typed city name
   * render
   * @return {ReactElement} Error section
   */
  if (informations.message === 'Error') {
    return _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'p',
        null,
        inputValue,
        ' is not a city'
      ),
      _react2.default.createElement(
        'button',
        { onClick: clear },
        'Clear all'
      )
    );
  };

  /**
   * Hides sectiond before reciving data
   */
  if (!informations || !informations.list) {
    return null;
  };

  /**
   * render
   * @return {ReactElement} Answer section
   */
  return _react2.default.createElement(
    'section',
    null,
    _react2.default.createElement(
      'p',
      null,
      'Country: ',
      informations.city.country
    ),
    _react2.default.createElement(
      'p',
      null,
      'Current weather: ',
      informations.list[0].weather[0].description
    ),
    _react2.default.createElement(
      'p',
      null,
      'Time of latest report: ',
      informations.list[0].dt_txt
    ),
    _react2.default.createElement(
      'button',
      { onClick: clear },
      'Clear all'
    )
  );
};

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _cmz = require('cmz');

var _cmz2 = _interopRequireDefault(_cmz);

var _buttonStyles = require('./buttonStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * render
 * @return {ReactElement} SubmitButton
 */

/** Import styles for component */
module.exports = function (_ref) {
  var disabled = _ref.disabled,
      onSubmit = _ref.onSubmit,
      isSubmitting = _ref.isSubmitting,
      primary = _ref.primary,
      getCityWeather = _ref.getCityWeather;

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
      onClick: getCityWeather },
    'Submit'
  ) : null;
};

},{"./buttonStyles":8,"cmz":1,"react":"react"}],8:[function(require,module,exports){
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

},{"../../styles":13,"cmz":1}],9:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * render
 * @return {ReactElement} TextInput
 */
module.exports = function (_ref) {
  var inputValue = _ref.inputValue,
      onTextInput = _ref.onTextInput,
      isSubmitting = _ref.isSubmitting;

  if (isSubmitting) {
    return null;
  }
  return _react2.default.createElement('input', { type: 'text', value: inputValue, onChange: onTextInput });
};

},{"react":"react"}],10:[function(require,module,exports){
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

var _Section = require('../../components/Section/Section');

var _Section2 = _interopRequireDefault(_Section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**Components*/
module.exports = function WeatherApp(props) {
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
      getCityWeather: props.getCityWeather
    }),
    _react2.default.createElement(_Section2.default, {
      informations: props.data,
      inputValue: props.inputValue || props.text,
      clear: props.clear
    })
  );
};

},{"../../components/Label/Label":5,"../../components/Section/Section":6,"../../components/SubmitButton/SubmitButton":7,"../../components/TextInput/TextInput":9,"cmz":1,"react":"react"}],11:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/** import key from config file */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

var _config = require('../../common/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presets = {};

presets.init = {
  text: '',
  error: null,
  isChecked: false,
  isSubmitting: false,
  header: 'Check current weather in any city in the world',
  data: {}
};

presets.submitting = _extends({}, presets.init);

presets.error = _extends({}, presets.init, {
  error: new Error('something bad happened')
});

presets.withValues = _extends({}, presets.init, {
  text: 'Warsaw'
});

/**
 * Statefull container
 */
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

  /**
   * Handle ajax request
   */
  getCityWeather: function getCityWeather() {
    var _this = this;

    var apiKey = _config2.default;
    var apiLink = 'http://api.openweathermap.org/data/2.5/forecast?APPID=' + apiKey;
    var cityUrl = apiLink + '&q=' + this.state.inputValue;

    fetch(cityUrl).then(function (blob) {
      return blob.json();
    }).then(function (data) {
      _this.setState({
        data: data
      });
    });
  },

  /**
   * Clear all typed informations and states
   */
  clear: function clear() {
    this.setState({
      data: {},
      inputValue: ''
    });
  },

  render: function render() {
    return _react2.default.createElement(_index2.default, _extends({}, this.state, {
      inputValue: this.state.inputValue,
      onTextInput: this.onTextInput,
      onSubmit: this.onSubmit,
      getCityWeather: this.getCityWeather,
      clear: this.clear
    }));
  }
});

},{"../../common/config":4,"./index.js":10,"react":"react"}],12:[function(require,module,exports){
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

},{"./containers/WeatherApp/state":11,"react":"react","react-dom":"react-dom"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generalStyle = undefined;

var _cmz = require('cmz');

var _cmz2 = _interopRequireDefault(_cmz);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Place to defince general re-usable styles for components */

var generalStyle = exports.generalStyle = (0, _cmz2.default)('\n  textransform: uppercase;\n');

},{"cmz":1}]},{},[12]);
