# GitLab SAST for NodeJS

[![Greenkeeper badge](https://badges.greenkeeper.io/mgibeau/gitlab-sast-nodejs.svg)](https://greenkeeper.io/)

This project uses [eslint-plugin-security](https://github.com/nodesecurity/eslint-plugin-security) to scan and report
security issues.

```
Usage: scan [options] <path ...>

Options:

  -v, --version         output the version number
  -o, --out <filename>  output filename, defaults to gl-sast-report.json
  -h, --help            output usage information
```

## How to use

### NPX

```
npx gitlab-sast-nodejs path1 path2
```

### NPM

```
npm i -g gitlab-sast-nodejs
```

### Docker

Using Docker you can simply  mount two volumes in the container, e.g.:

```
docker run --rm -it -v $(PWD)/src:/src/code -v $(PWD):/output sast
```

This will scan a subfolder `src/` and write the result to the root of your project
