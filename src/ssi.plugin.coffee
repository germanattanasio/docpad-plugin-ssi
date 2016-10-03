defaults = require('defaults')

# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class SSIPlugin extends BasePlugin
		# Plugin name
		name: 'ssi'

		constructor: ->
			# Prepare
			super

			# Require Jade
			@SSI = require('node-ssi')

			# Chain
			@

		# Render
		# Called per document, for each extension conversion. Used to render one extension to another.
		render: (opts, next) ->
			# Prepare
			{inExtension, outExtension, templateData, file} = opts
			opt = defaults(@config.ssiOptions, {
			  baseDir: opts.file.attributes.fullDirPath
			  ext: '.shtml'
			  encoding: 'utf-8'
			})
			ssi = new @SSI(opt)

			# Upper case the text document's content if it is using the convention txt.(uc|uppercase)
			if inExtension == 'shtml' and outExtension == 'html'

				# Render synchronously
				opts.content = ssi.compile(opts.content, { payload: templateData }, (err, newContent) ->
				  if err
				    console.log 'Error compiling shtml.'
				    console.log err
				  else
				    opts.content = newContent
				  next()
				)
			else
				next()
