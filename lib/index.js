#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';
import { pretty } from 'js-object-pretty-print';

const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json');

const runIfPackageJsonExists = (cb) => {
  if (fs.existsSync(PACKAGE_JSON_PATH)) {
    return cb();
  }
  return console.log('Error: npmv was run in a "non-node" package directory.');
};

const logVersion = (version) => {
  console.log(`Version: ${version}`);
};

const checkPackageVersions = () => {
  const jsonFile = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH));
  logVersion(jsonFile.version);
};

const handleVersionOptions = (option) => {
  if (!option) {
    return checkPackageVersions();
  }

  return runIfPackageJsonExists(() => {
    const json = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH));
    const version = json.version;

    if (!version) return;

    let [major, minor, patch] = version
      .replace(/[vV]/, '')
      .split('.')
      .map(Number);

    switch (option) {
      case 'minor':
      case 'min':
      case 'MINOR': {
        minor += 1;
        patch = 0;
        break;
      }
      case 'major':
      case 'maj':
      case 'MAJOR': {
        major += 1;
        minor = 0;
        break;
      }

      case 'patch':
      case 'p':
      case 'PATCH': {
        patch += 1;
        break;
      }
      default: {
        break;
      }
    }

    const versionUpdate = `${major}.${minor}.${patch}`;
    json.version = versionUpdate;

    const jsonString = pretty(json, 2, 'JSON');

    fs.writeFileSync(PACKAGE_JSON_PATH, jsonString);
    logVersion(versionUpdate);
  });
};


program
  .version('0.0.5')
  .arguments('<option>', 'Part of version to increment')
  .action((option) => {
    handleVersionOptions(option);
  })
  .parse(process.argv);


runIfPackageJsonExists(() => {
  if (!program.args.length) {
    checkPackageVersions();
  }
});
