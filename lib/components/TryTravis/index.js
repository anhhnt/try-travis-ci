'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TryTravis = function (_Component) {
  _inherits(TryTravis, _Component);

  function TryTravis() {
    _classCallCheck(this, TryTravis);

    var _this = _possibleConstructorReturn(this, (TryTravis.__proto__ || Object.getPrototypeOf(TryTravis)).call(this));

    _this.state = {
      savedImages: []
    };
    return _this;
  }

  _createClass(TryTravis, [{
    key: 'onChange',
    value: function onChange(evt) {
      var files = evt.target.files;
      var file = files[0];
      this.setState({ file: file });
    }
  }, {
    key: 'submit',
    value: function submit() {
      var _this2 = this;

      var file = this.state.file;
      var imagesRef = this.storageRef.child('images/' + file.name);
      imagesRef.put(file).then(function (snapshot) {
        _this2.rtImagesRef.push().set({
          fullPath: snapshot.metadata.fullPath,
          generation: snapshot.metadata.generation,
          downloadURL: snapshot.metadata.downloadURLs[0],
          size: snapshot.metadata.size
        });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.storageRef = _firebase2.default.storage().ref();
      var database = _firebase2.default.database();
      this.rtImagesRef = database.ref('images');
      var savedImages = [];
      this.rtImagesRef.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var value = childSnapshot.val().downloadURL;
          savedImages.push({ key: key, value: value });
        });
        _this3.setState(Object.assign({}, _this3.state, { savedImages: savedImages }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        null,
        'Hello Travis-ci',
        _react2.default.createElement('br', null),
        'Please select a file to upload',
        _react2.default.createElement('br', null),
        _react2.default.createElement('input', {
          type: 'file', id: 'files', name: 'files[]',
          multiple: true, onChange: function onChange(evt) {
            return _this4.onChange(evt);
          }
        }),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'button',
          { onClick: function onClick(evt) {
              return _this4.submit(evt);
            } },
          'Upload'
        ),
        this.state.savedImages.map(function (img) {
          return _react2.default.createElement('img', { key: img.key, src: img.value });
        })
      );
    }
  }]);

  return TryTravis;
}(_react.Component);

exports.default = TryTravis;