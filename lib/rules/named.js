'use strict';

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = {
  meta: {
    docs: {
      url: (0, _docsUrl2.default)('named')
    }
  },

  create: function (context) {
    function checkSpecifiers(key, type, node) {
      if (node.source == null) return; // local export, ignore

      if (!node.specifiers.some(function (im) {
        return im.type === type;
      })) {
        return; // no named imports/exports
      }

      if (isTypeFromPackage(node)) return;

      const imports = _ExportMap2.default.get(node.source.value, context);
      if (imports == null) return;

      if (imports.errors.length) {
        imports.reportErrors(context, node);
        return;
      }

      node.specifiers.forEach(function (im) {
        if (im.type !== type) return;

        const deepLookup = imports.hasDeep(im[key].name);

        if (!deepLookup.found) {
          if (deepLookup.path.length > 1) {
            const deepPath = deepLookup.path.map(i => path.relative(path.dirname(context.getFilename()), i.path)).join(' -> ');

            context.report(im[key], `${im[key].name} not found via ${deepPath}`);
          } else {
            context.report(im[key], im[key].name + ' not found in \'' + node.source.value + '\'');
          }
        }
      });
    }

    function isTypeFromPackage(node) {
      return node.importKind === 'type' && !hasRelativePath(node.source);
    }

    function hasRelativePath(source) {
      return source.value.match(/^\.\//);
    }

    return {
      'ImportDeclaration': checkSpecifiers.bind(null, 'imported', 'ImportSpecifier'),

      'ExportNamedDeclaration': checkSpecifiers.bind(null, 'local', 'ExportSpecifier')
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGVzL25hbWVkLmpzIl0sIm5hbWVzIjpbInBhdGgiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJjcmVhdGUiLCJjb250ZXh0IiwiY2hlY2tTcGVjaWZpZXJzIiwia2V5IiwidHlwZSIsIm5vZGUiLCJzb3VyY2UiLCJzcGVjaWZpZXJzIiwic29tZSIsImltIiwiaXNUeXBlRnJvbVBhY2thZ2UiLCJpbXBvcnRzIiwiZ2V0IiwidmFsdWUiLCJlcnJvcnMiLCJsZW5ndGgiLCJyZXBvcnRFcnJvcnMiLCJmb3JFYWNoIiwiZGVlcExvb2t1cCIsImhhc0RlZXAiLCJuYW1lIiwiZm91bmQiLCJkZWVwUGF0aCIsIm1hcCIsImkiLCJyZWxhdGl2ZSIsImRpcm5hbWUiLCJnZXRGaWxlbmFtZSIsImpvaW4iLCJyZXBvcnQiLCJpbXBvcnRLaW5kIiwiaGFzUmVsYXRpdmVQYXRoIiwibWF0Y2giLCJiaW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBOztJQUFZQSxJOztBQUNaOzs7O0FBQ0E7Ozs7Ozs7O0FBRUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNO0FBQ0pDLFdBQUssdUJBQVEsT0FBUjtBQUREO0FBREYsR0FEUzs7QUFPZkMsVUFBUSxVQUFVQyxPQUFWLEVBQW1CO0FBQ3pCLGFBQVNDLGVBQVQsQ0FBeUJDLEdBQXpCLEVBQThCQyxJQUE5QixFQUFvQ0MsSUFBcEMsRUFBMEM7QUFDeEMsVUFBSUEsS0FBS0MsTUFBTCxJQUFlLElBQW5CLEVBQXlCLE9BRGUsQ0FDUjs7QUFFaEMsVUFBSSxDQUFDRCxLQUFLRSxVQUFMLENBQ0VDLElBREYsQ0FDTyxVQUFVQyxFQUFWLEVBQWM7QUFBRSxlQUFPQSxHQUFHTCxJQUFILEtBQVlBLElBQW5CO0FBQXlCLE9BRGhELENBQUwsRUFDd0Q7QUFDdEQsZUFEc0QsQ0FDL0M7QUFDUjs7QUFFRCxVQUFJTSxrQkFBa0JMLElBQWxCLENBQUosRUFBNkI7O0FBRTdCLFlBQU1NLFVBQVUsb0JBQVFDLEdBQVIsQ0FBWVAsS0FBS0MsTUFBTCxDQUFZTyxLQUF4QixFQUErQlosT0FBL0IsQ0FBaEI7QUFDQSxVQUFJVSxXQUFXLElBQWYsRUFBcUI7O0FBRXJCLFVBQUlBLFFBQVFHLE1BQVIsQ0FBZUMsTUFBbkIsRUFBMkI7QUFDekJKLGdCQUFRSyxZQUFSLENBQXFCZixPQUFyQixFQUE4QkksSUFBOUI7QUFDQTtBQUNEOztBQUVEQSxXQUFLRSxVQUFMLENBQWdCVSxPQUFoQixDQUF3QixVQUFVUixFQUFWLEVBQWM7QUFDcEMsWUFBSUEsR0FBR0wsSUFBSCxLQUFZQSxJQUFoQixFQUFzQjs7QUFFdEIsY0FBTWMsYUFBYVAsUUFBUVEsT0FBUixDQUFnQlYsR0FBR04sR0FBSCxFQUFRaUIsSUFBeEIsQ0FBbkI7O0FBRUEsWUFBSSxDQUFDRixXQUFXRyxLQUFoQixFQUF1QjtBQUNyQixjQUFJSCxXQUFXeEIsSUFBWCxDQUFnQnFCLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQzlCLGtCQUFNTyxXQUFXSixXQUFXeEIsSUFBWCxDQUNkNkIsR0FEYyxDQUNWQyxLQUFLOUIsS0FBSytCLFFBQUwsQ0FBYy9CLEtBQUtnQyxPQUFMLENBQWF6QixRQUFRMEIsV0FBUixFQUFiLENBQWQsRUFBbURILEVBQUU5QixJQUFyRCxDQURLLEVBRWRrQyxJQUZjLENBRVQsTUFGUyxDQUFqQjs7QUFJQTNCLG9CQUFRNEIsTUFBUixDQUFlcEIsR0FBR04sR0FBSCxDQUFmLEVBQ0csR0FBRU0sR0FBR04sR0FBSCxFQUFRaUIsSUFBSyxrQkFBaUJFLFFBQVMsRUFENUM7QUFFRCxXQVBELE1BT087QUFDTHJCLG9CQUFRNEIsTUFBUixDQUFlcEIsR0FBR04sR0FBSCxDQUFmLEVBQ0VNLEdBQUdOLEdBQUgsRUFBUWlCLElBQVIsR0FBZSxrQkFBZixHQUFvQ2YsS0FBS0MsTUFBTCxDQUFZTyxLQUFoRCxHQUF3RCxJQUQxRDtBQUVEO0FBQ0Y7QUFDRixPQWxCRDtBQW1CRDs7QUFFRCxhQUFTSCxpQkFBVCxDQUEyQkwsSUFBM0IsRUFBaUM7QUFDL0IsYUFBT0EsS0FBS3lCLFVBQUwsS0FBb0IsTUFBcEIsSUFBOEIsQ0FBQ0MsZ0JBQWdCMUIsS0FBS0MsTUFBckIsQ0FBdEM7QUFDRDs7QUFFRCxhQUFTeUIsZUFBVCxDQUF5QnpCLE1BQXpCLEVBQWlDO0FBQy9CLGFBQU9BLE9BQU9PLEtBQVAsQ0FBYW1CLEtBQWIsQ0FBbUIsT0FBbkIsQ0FBUDtBQUNEOztBQUVELFdBQU87QUFDTCwyQkFBcUI5QixnQkFBZ0IrQixJQUFoQixDQUFzQixJQUF0QixFQUNzQixVQUR0QixFQUVzQixpQkFGdEIsQ0FEaEI7O0FBTUwsZ0NBQTBCL0IsZ0JBQWdCK0IsSUFBaEIsQ0FBc0IsSUFBdEIsRUFDc0IsT0FEdEIsRUFFc0IsaUJBRnRCO0FBTnJCLEtBQVA7QUFZRDtBQW5FYyxDQUFqQiIsImZpbGUiOiJydWxlcy9uYW1lZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBFeHBvcnRzIGZyb20gJy4uL0V4cG9ydE1hcCdcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduYW1lZCcpLFxuICAgIH0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGZ1bmN0aW9uIGNoZWNrU3BlY2lmaWVycyhrZXksIHR5cGUsIG5vZGUpIHtcbiAgICAgIGlmIChub2RlLnNvdXJjZSA9PSBudWxsKSByZXR1cm4gLy8gbG9jYWwgZXhwb3J0LCBpZ25vcmVcblxuICAgICAgaWYgKCFub2RlLnNwZWNpZmllcnNcbiAgICAgICAgICAgIC5zb21lKGZ1bmN0aW9uIChpbSkgeyByZXR1cm4gaW0udHlwZSA9PT0gdHlwZSB9KSkge1xuICAgICAgICByZXR1cm4gLy8gbm8gbmFtZWQgaW1wb3J0cy9leHBvcnRzXG4gICAgICB9XG5cbiAgICAgIGlmIChpc1R5cGVGcm9tUGFja2FnZShub2RlKSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGltcG9ydHMgPSBFeHBvcnRzLmdldChub2RlLnNvdXJjZS52YWx1ZSwgY29udGV4dClcbiAgICAgIGlmIChpbXBvcnRzID09IG51bGwpIHJldHVyblxuXG4gICAgICBpZiAoaW1wb3J0cy5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIGltcG9ydHMucmVwb3J0RXJyb3JzKGNvbnRleHQsIG5vZGUpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBub2RlLnNwZWNpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAoaW0pIHtcbiAgICAgICAgaWYgKGltLnR5cGUgIT09IHR5cGUpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGRlZXBMb29rdXAgPSBpbXBvcnRzLmhhc0RlZXAoaW1ba2V5XS5uYW1lKVxuXG4gICAgICAgIGlmICghZGVlcExvb2t1cC5mb3VuZCkge1xuICAgICAgICAgIGlmIChkZWVwTG9va3VwLnBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgZGVlcFBhdGggPSBkZWVwTG9va3VwLnBhdGhcbiAgICAgICAgICAgICAgLm1hcChpID0+IHBhdGgucmVsYXRpdmUocGF0aC5kaXJuYW1lKGNvbnRleHQuZ2V0RmlsZW5hbWUoKSksIGkucGF0aCkpXG4gICAgICAgICAgICAgIC5qb2luKCcgLT4gJylcblxuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoaW1ba2V5XSxcbiAgICAgICAgICAgICAgYCR7aW1ba2V5XS5uYW1lfSBub3QgZm91bmQgdmlhICR7ZGVlcFBhdGh9YClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoaW1ba2V5XSxcbiAgICAgICAgICAgICAgaW1ba2V5XS5uYW1lICsgJyBub3QgZm91bmQgaW4gXFwnJyArIG5vZGUuc291cmNlLnZhbHVlICsgJ1xcJycpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzVHlwZUZyb21QYWNrYWdlKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLmltcG9ydEtpbmQgPT09ICd0eXBlJyAmJiAhaGFzUmVsYXRpdmVQYXRoKG5vZGUuc291cmNlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc1JlbGF0aXZlUGF0aChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBzb3VyY2UudmFsdWUubWF0Y2goL15cXC5cXC8vKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAnSW1wb3J0RGVjbGFyYXRpb24nOiBjaGVja1NwZWNpZmllcnMuYmluZCggbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsICdpbXBvcnRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAnSW1wb3J0U3BlY2lmaWVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuXG4gICAgICAnRXhwb3J0TmFtZWREZWNsYXJhdGlvbic6IGNoZWNrU3BlY2lmaWVycy5iaW5kKCBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAnbG9jYWwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAnRXhwb3J0U3BlY2lmaWVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgfVxuXG4gIH0sXG59XG4iXX0=