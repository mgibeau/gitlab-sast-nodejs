#!/usr/bin / env node

var fs = require('fs');
var program = require('commander');
var version = require('./package.json').version;
var convert = require('./lib/convert.js');
var CLIEngine = require("eslint").CLIEngine;

var cli = new CLIEngine({
  configFile: '.eslintrc.yml',
  useEslintrc: false
});

program
  .version(version, '-v, --version')
  .usage('[options] <path ...>')
  .option('-o, --out <filename>', 'output filename, defaults to gl-sast-report.json')
  .parse(process.argv);

if (program.args.length < 1) {
  console.error('⛔️  No path(s) given')
  process.exit(1)
}

var filename = program.out || 'gl-sast-report.json';

console.log('Scanning...', program.args.join(','));
var report = cli.executeOnFiles(program.args);

if (report.errorCount > 0) {
  console.error(`⚠️  ${report.errorCount} ESLint Parse error!`);
}

var outputJSON = convert(report.results);

fs.writeFile(filename, outputJSON, function (err) {
  if (err) {
    return console.error(`Error writing file ${filename}`);
  }
  
  console.error(`Found ${report.warningCount} potential issues`);
  console.log(`The file was saved as ${filename}!`);
  process.exit(report.warningCount);
});
