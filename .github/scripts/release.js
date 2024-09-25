'use strict';

const { releaseChangelog, releaseVersion } = require('nx/release');
const yargs = require('yargs');
const axios = require('axios');

axios.interceptors.request.use(config => {
  if (config.method === 'post' && config.url.includes('releases')) {
    config.data = config.data ? { ...config.data, draft: true } : config.data;
  }
  return config;
});

(async () => {
  const options = await yargs
    .version(false)
    .option('version', {
      description:
        'Explicit version specifier to use, if overriding conventional commits',
      type: 'string',
    })
    .option('dryRun', {
      alias: 'd',
      description:
        'Whether or not to perform a dry-run of the release process, defaults to true',
      type: 'boolean',
      default: false,
    })
    .option('verbose', {
      description:
        'Whether or not to enable verbose logging, defaults to false',
      type: 'boolean',
      default: true,
    })
    .parseAsync();

  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    specifier: options.version,
    dryRun: options.dryRun,
    verbose: options.verbose,
    gitTag: false,
  });

  await releaseChangelog({
    versionData: projectsVersionData,
    version: workspaceVersion,
    dryRun: options.dryRun,
    verbose: options.verbose,
    gitTag: false,
  });

  process.exit(0);
})();
