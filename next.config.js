/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    REACT_APP_ASSISTANT_ID: process.env.REACT_APP_ASSISTANT_ID,
  },

  webpack: (config) => {
    let modularizeImports = null;
    config.module.rules.some((rule) =>
      rule.oneOf?.some((oneOf) => {
        modularizeImports =
          oneOf?.use?.options?.nextConfig?.modularizeImports;
        return modularizeImports;
      }),
    );
    if (modularizeImports?.["@headlessui/react"])
      delete modularizeImports["@headlessui/react"];
    return config;
  }
}
