const PATH = {
  index: "https://regex101.com/",

  // Right side
  // Function
  substitution: "//*[@class='wcfss']//*[@class='u_Q0A'][text()='Substitution']",

  // Middle
  regularExpressionInput:
    "//*[@aria-label='insert your regular expression here']",
  testStringInput:
    "//*[@class='CodeMirror cm-s-default CodeMirror-wrap CodeMirror-empty']",
  // Substitution
  substitutionTitle: "//*[@class='dYInr JOzNE z2wCE llpmv']//*[@class='JOzNE']",

  // Left side
  // Explanation
  equivalentCharacter: "(//*[@class='T0laQ']/span)",
  // Match Information
  matchedString: "(//*[@class='amvtn']/span)",
};

module.exports = PATH;
