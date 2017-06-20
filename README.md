# NPMV Command-line Tool

**npmv** is a command-line tool I built to tell me the version number of a node module. It's a
lot of work for me writing `cat package.json` everytime I want to check the version of a
package. Especially when I want to find out the initial version of a package before I
update the version number.

This tool also allows you to easily update package versions. It follows
[semver](http://semver.org) convention.

## Installation

```bash
$ npm install -g npm-ver
```


## Usage

```javascript
$ npmv
//=> Version: v0.1.0
```

## Options

Given a version number MAJOR.MINOR.PATCH, the following arguments:

**MINOR|minor|min|m** - Increments the MINOR part of the version number

**MAJOR|major|maj|M** - Increments the MAJOR part of the version number

**PATCH|patch|p** - Increments the PATCH part of the version number



___Note:___ Incrementing minor automatically sets patch back to 0, and incrementing MAJOR
sets MINOR and PATCH to 0


## Examples

```javascript
$ npmv
//=> Version: 0.1.0

$ npmv patch
//=> Version: 0.1.1

$ npmv p
//=> Version: 0.1.2

$ npmv m
//=> Version: 0.2.0

$ npmv M
//=> Version: 1.0.0
```
