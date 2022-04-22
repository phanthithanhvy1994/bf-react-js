// Hard code
const engagementTypeSrc = [
  { 
    text: 'Financial Statement Audit',
    value: 17574320
   },
  { 
    text: 'Review of Interim Financial Information', 
    value: 17574321
  },
  { 
    text: 'Review of Financial Statements',
    value: 1757432002
  }
]

const engagementTypes = [
  { 
    id : 17574320,
    code: 'Financial Statement Audit',
    name: 'Financial Statement Audit'
  },
  { 
    id : 17574321,
    code: 'Review of Interim Financial Information',
    name: 'Review of Interim Financial Information'
  },
  { 
    id : 1757432002,
    code: 'Review of Financial Statements',
    name: 'Review of Financial Statements'
  }
]

const countrySrc = [
  { 
    text: 'Canada', 
    value: 48705600
  },
  { 
    text: 'Netherlands', 
    value: 48706549
  },
  { 
    text: 'United Kingdom', 
    value: 48706627
  }
]

const countries = [
  { 
    id: 48705600,
    code: 'CA',
    name: 'Canada'
  },
  { 
    id: 48706549,
    code: 'NL',
    name: 'Netherlands'
  },
  { 
    id: 48706627,
    code: 'UK',
    name: 'United Kingdom'
  }
]

const language = 48692687

const languages = [
  {
    "id": "48692687",
    "code": "en-US",
    "name": "English"
  }
]

export {
  engagementTypes,
  engagementTypeSrc,
  countries,
  countrySrc,
  language,
  languages
}