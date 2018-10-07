var severityMap = ['None', 'High', 'Critical']

var convert = function (files) {
  report = [];

  for (var id in files) {
    var filePath = files[id].filePath;
    var file = files[id];

    for (var mid in file.messages) {
      var message = file.messages[mid];

      report.push({
        "tool": "eslint_security",
        "category": "sast",
        "name": message.message,
        "message": message.message,
        "description": message.ruleId,
        "severity": severityMap[message.severity],
        "confidence": "High",
        "scanner": {
          "id": "eslint_security",
          "name": "ESLint Security"
        },
        "location": {
          "file": filePath,
          "line": message.line
        },
        "links": [{
          "url": message.ruleId ? `https://github.com/nodesecurity/eslint-plugin-security#${message.ruleId.replace('security/', '')}` : ""
        }]
      })
    }
  }

  return JSON.stringify(report, null, '  ');
}

module.exports = convert;
