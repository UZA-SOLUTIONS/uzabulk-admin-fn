/**
 * CRA 4 + Dart Sass: silence noisy deprecations until SCSS is migrated to @use
 * and the toolchain uses the modern Sass API (major upgrade / eject).
 * @see https://sass-lang.com/documentation/js-api/interfaces/Options/#silenceDeprecations
 */
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Lighter dev rebuilds than CRA default eval-source-map
      if (process.env.NODE_ENV === 'development') {
        webpackConfig.devtool = 'eval-cheap-module-source-map'
      }

      const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf)
      if (!oneOfRule || !Array.isArray(oneOfRule.oneOf)) {
        return webpackConfig
      }
      const sassOptions = {
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'import'],
      }
      oneOfRule.oneOf.forEach((rule) => {
        if (!rule.use) return
        rule.use.forEach((use) => {
          const loader = typeof use === 'object' ? use.loader : null
          if (!loader || !String(loader).includes('sass-loader')) return
          use.options = use.options || {}
          use.options.sassOptions = {
            ...(use.options.sassOptions || {}),
            ...sassOptions,
          }
        })
      })
      return webpackConfig
    },
  },
}
