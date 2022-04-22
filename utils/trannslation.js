function getLanguageFile(path){
  return fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then((response) => response.json())
}

exports.getLanguageFile = getLanguageFile