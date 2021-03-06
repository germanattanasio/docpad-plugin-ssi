// Generated by CoffeeScript 1.11.1
(function() {
  var defaults,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  defaults = require('defaults');

  module.exports = function(BasePlugin) {
    var SSIPlugin;
    return SSIPlugin = (function(superClass) {
      extend(SSIPlugin, superClass);

      SSIPlugin.prototype.name = 'ssi';

      function SSIPlugin() {
        SSIPlugin.__super__.constructor.apply(this, arguments);
        this.SSI = require('node-ssi');
        this;
      }

      SSIPlugin.prototype.render = function(opts, next) {
        var file, inExtension, opt, outExtension, ssi, templateData;
        inExtension = opts.inExtension, outExtension = opts.outExtension, templateData = opts.templateData, file = opts.file;
        opt = defaults(this.config.ssiOptions, {
          baseDir: opts.file.attributes.fullDirPath,
          ext: '.shtml',
          encoding: 'utf-8'
        });
        ssi = new this.SSI(opt);
        if (inExtension === 'shtml' && outExtension === 'html') {
          return opts.content = ssi.compile(opts.content, {
            payload: templateData
          }, function(err, newContent) {
            if (err) {
              console.log('Error compiling shtml.');
              console.log(err);
            } else {
              opts.content = newContent;
            }
            return next();
          });
        } else {
          return next();
        }
      };

      return SSIPlugin;

    })(BasePlugin);
  };

}).call(this);
