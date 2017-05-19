#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json');

if (fs.existsSync(PACKAGE_JSON_PATH)) {
  const jsonFile = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH));
  console.log(`Version: ${jsonFile.version}`);
} else {
  console.log('Error: npm-version was run in a "non-node" package.');
}

