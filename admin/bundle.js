(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require('./iframe-load');

module.exports = /*#__PURE__*/function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.iframe = document.querySelector('iframe');
  }

  _createClass(Editor, [{
    key: "open",
    value: function open(page) {
      var _this = this;

      this.iframe.load("../" + page, function () {
        var body = _this.iframe.contentDocument.body;
        var textNodes = [];

        function recursy(element) {
          element.childNodes.forEach(function (node) {
            if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
              textNodes.push(node);
            } else {
              recursy(node);
            }
          });
        }

        recursy(body);
        textNodes.forEach(function (node) {
          var wrapper = _this.iframe.contentDocument.createElement('text-editor');

          node.parentNode.replaceChild(wrapper, node);
          wrapper.appendChild(node);
          wrapper.contentEditable = 'true';
        });
      });
    }
  }]);

  return Editor;
}();

},{"./iframe-load":2}],2:[function(require,module,exports){
"use strict";

HTMLIFrameElement.prototype.load = function (url, callback) {
  var iframe = this;

  try {
    iframe.src = url + "?rnd=" + Math.random().toString().substring(2);
  } catch (error) {
    if (!callback) {
      return new Promise(function (resolve, reject) {
        reject(error);
      });
    } else {
      callback(error);
    }
  }

  var maxTime = 60000;
  var interval = 200;
  var timerCount = 0;

  if (!callback) {
    return new Promise(function (resolve, reject) {
      var timer = setInterval(function () {
        if (!iframe) return clearInterval(timer);
        timerCount++;

        if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
          clearInterval(timer);
          resolve();
        } else if (timerCount * interval > maxTime) {
          reject(new Error("Iframe load fail!"));
        }
      }, interval);
    });
  } else {
    var timer = setInterval(function () {
      if (!iframe) return clearInterval(timer);

      if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
        clearInterval(timer);
        callback();
      } else if (timerCount * interval > maxTime) {
        callback(new Error("Iframe load fail!"));
      }
    }, interval);
  }
};

},{}],3:[function(require,module,exports){
"use strict";

var Editor = require('./editor');

window.editor = new Editor();

window.onload = function () {
  window.editor.open("index.html");
};

},{"./editor":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc3JjL2VkaXRvci5qcyIsImFwcC9zcmMvaWZyYW1lLWxvYWQuanMiLCJhcHAvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBLE9BQU8sQ0FBQyxlQUFELENBQVA7O0FBRUEsTUFBTSxDQUFDLE9BQVA7QUFDSSxvQkFBYztBQUFBOztBQUNWLFNBQUssTUFBTCxHQUFjLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQWQ7QUFDSDs7QUFITDtBQUFBO0FBQUEseUJBS1MsSUFMVCxFQUtlO0FBQUE7O0FBQ1AsV0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixRQUFRLElBQXpCLEVBQStCLFlBQU07QUFDbEMsWUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLE1BQUwsQ0FBWSxlQUFaLENBQTRCLElBQXpDO0FBRUMsWUFBSSxTQUFTLEdBQUcsRUFBaEI7O0FBRUEsaUJBQVMsT0FBVCxDQUFpQixPQUFqQixFQUF5QjtBQUNyQixVQUFBLE9BQU8sQ0FBQyxVQUFSLENBQW1CLE9BQW5CLENBQTJCLFVBQUMsSUFBRCxFQUFVO0FBQ2pDLGdCQUFHLElBQUksQ0FBQyxRQUFMLEtBQWtCLE9BQWxCLElBQTZCLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQUF1QixNQUF2QixFQUErQixFQUEvQixFQUFtQyxNQUFuQyxHQUE0QyxDQUE1RSxFQUE4RTtBQUMxRSxjQUFBLFNBQVMsQ0FBQyxJQUFWLENBQWUsSUFBZjtBQUNILGFBRkQsTUFFSztBQUNELGNBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUDtBQUNIO0FBQ0osV0FORDtBQU9IOztBQUNELFFBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUDtBQUVBLFFBQUEsU0FBUyxDQUFDLE9BQVYsQ0FBa0IsVUFBQyxJQUFELEVBQVU7QUFDeEIsY0FBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQUwsQ0FBWSxlQUFaLENBQTRCLGFBQTVCLENBQTBDLGFBQTFDLENBQWhCOztBQUVBLFVBQUEsSUFBSSxDQUFDLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsT0FBN0IsRUFBc0MsSUFBdEM7QUFDQSxVQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLElBQXBCO0FBQ0EsVUFBQSxPQUFPLENBQUMsZUFBUixHQUEwQixNQUExQjtBQUNILFNBTkQ7QUFPSCxPQXZCRDtBQXdCSDtBQTlCTDs7QUFBQTtBQUFBOzs7OztBQ0RBLGlCQUFpQixDQUFDLFNBQWxCLENBQTRCLElBQTVCLEdBQW1DLFVBQVUsR0FBVixFQUFlLFFBQWYsRUFBeUI7QUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBZjs7QUFDQSxNQUFJO0FBQ0EsSUFBQSxNQUFNLENBQUMsR0FBUCxHQUFhLEdBQUcsR0FBRyxPQUFOLEdBQWdCLElBQUksQ0FBQyxNQUFMLEdBQWMsUUFBZCxHQUF5QixTQUF6QixDQUFtQyxDQUFuQyxDQUE3QjtBQUNILEdBRkQsQ0FFRSxPQUFPLEtBQVAsRUFBYztBQUNaLFFBQUksQ0FBQyxRQUFMLEVBQWU7QUFDWCxhQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDcEMsUUFBQSxNQUFNLENBQUMsS0FBRCxDQUFOO0FBQ0gsT0FGTSxDQUFQO0FBR0gsS0FKRCxNQUlPO0FBQ0gsTUFBQSxRQUFRLENBQUMsS0FBRCxDQUFSO0FBQ0g7QUFDSjs7QUFFRCxNQUFNLE9BQU8sR0FBRyxLQUFoQjtBQUNBLE1BQU0sUUFBUSxHQUFHLEdBQWpCO0FBRUEsTUFBSSxVQUFVLEdBQUcsQ0FBakI7O0FBRUEsTUFBSSxDQUFDLFFBQUwsRUFBZTtBQUNYLFdBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUNwQyxVQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsWUFBWTtBQUNsQyxZQUFJLENBQUMsTUFBTCxFQUFhLE9BQU8sYUFBYSxDQUFDLEtBQUQsQ0FBcEI7QUFDYixRQUFBLFVBQVU7O0FBQ1YsWUFBSSxNQUFNLENBQUMsZUFBUCxJQUEwQixNQUFNLENBQUMsZUFBUCxDQUF1QixVQUF2QixLQUFzQyxVQUFwRSxFQUFnRjtBQUM1RSxVQUFBLGFBQWEsQ0FBQyxLQUFELENBQWI7QUFDQSxVQUFBLE9BQU87QUFDVixTQUhELE1BR08sSUFBSSxVQUFVLEdBQUcsUUFBYixHQUF3QixPQUE1QixFQUFxQztBQUN4QyxVQUFBLE1BQU0sQ0FBQyxJQUFJLEtBQUosQ0FBVSxtQkFBVixDQUFELENBQU47QUFDSDtBQUNKLE9BVHdCLEVBU3RCLFFBVHNCLENBQXpCO0FBVUgsS0FYTSxDQUFQO0FBWUgsR0FiRCxNQWFPO0FBQ0gsUUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVk7QUFDbEMsVUFBSSxDQUFDLE1BQUwsRUFBYSxPQUFPLGFBQWEsQ0FBQyxLQUFELENBQXBCOztBQUNiLFVBQUksTUFBTSxDQUFDLGVBQVAsSUFBMEIsTUFBTSxDQUFDLGVBQVAsQ0FBdUIsVUFBdkIsS0FBc0MsVUFBcEUsRUFBZ0Y7QUFDNUUsUUFBQSxhQUFhLENBQUMsS0FBRCxDQUFiO0FBQ0EsUUFBQSxRQUFRO0FBQ1gsT0FIRCxNQUdPLElBQUksVUFBVSxHQUFHLFFBQWIsR0FBd0IsT0FBNUIsRUFBcUM7QUFDeEMsUUFBQSxRQUFRLENBQUMsSUFBSSxLQUFKLENBQVUsbUJBQVYsQ0FBRCxDQUFSO0FBQ0g7QUFDSixLQVJ3QixFQVF0QixRQVJzQixDQUF6QjtBQVNIO0FBQ0osQ0EzQ0Q7Ozs7O0FDREEsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsSUFBSSxNQUFKLEVBQWhCOztBQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFlBQU07QUFDbEIsRUFBQSxNQUFNLENBQUMsTUFBUCxDQUFjLElBQWQsQ0FBbUIsWUFBbkI7QUFDSCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwicmVxdWlyZSgnLi9pZnJhbWUtbG9hZCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFZGl0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pZnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKHBhZ2UpIHtcclxuICAgICAgICB0aGlzLmlmcmFtZS5sb2FkKFwiLi4vXCIgKyBwYWdlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuaWZyYW1lLmNvbnRlbnREb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgICAgICAgbGV0IHRleHROb2RlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVjdXJzeShlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobm9kZS5ub2RlTmFtZSA9PT0gXCIjdGV4dFwiICYmIG5vZGUubm9kZVZhbHVlLnJlcGxhY2UoL1xccysvZywgXCJcIikubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHROb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWN1cnN5KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlY3Vyc3koYm9keSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRleHROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB3cmFwcGVyID0gdGhpcy5pZnJhbWUuY29udGVudERvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHQtZWRpdG9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh3cmFwcGVyLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNvbnRlbnRFZGl0YWJsZSA9ICd0cnVlJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSIsIlxyXG5IVE1MSUZyYW1lRWxlbWVudC5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICh1cmwsIGNhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBpZnJhbWUgPSB0aGlzO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZnJhbWUuc3JjID0gdXJsICsgXCI/cm5kPVwiICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cmluZygyKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBtYXhUaW1lID0gNjAwMDA7XHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IDIwMDtcclxuXHJcbiAgICBsZXQgdGltZXJDb3VudCA9IDA7XHJcblxyXG4gICAgaWYgKCFjYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpZnJhbWUpIHJldHVybiBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmIChpZnJhbWUuY29udGVudERvY3VtZW50ICYmIGlmcmFtZS5jb250ZW50RG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lckNvdW50ICogaW50ZXJ2YWwgPiBtYXhUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIklmcmFtZSBsb2FkIGZhaWwhXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgaW50ZXJ2YWwpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWlmcmFtZSkgcmV0dXJuIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnREb2N1bWVudCAmJiBpZnJhbWUuY29udGVudERvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWVyQ291bnQgKiBpbnRlcnZhbCA+IG1heFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5ldyBFcnJvcihcIklmcmFtZSBsb2FkIGZhaWwhXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGludGVydmFsKTtcclxuICAgIH1cclxufSIsImNvbnN0IEVkaXRvciA9IHJlcXVpcmUoJy4vZWRpdG9yJyk7XHJcblxyXG53aW5kb3cuZWRpdG9yID0gbmV3IEVkaXRvcigpO1xyXG5cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgIHdpbmRvdy5lZGl0b3Iub3BlbihcImluZGV4Lmh0bWxcIik7XHJcbn0iXX0=
