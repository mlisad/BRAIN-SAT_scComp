const calculateOpacity = (geneData) => {
  let newData = {}
  for (let keys in geneData) {
    const objs = geneData[keys]
    // delete the information values
    if (keys !== 'probes' && keys !== 'geneSym' && keys !== '_href') {
      newData[keys] = objs
    }
  }

  // get the max value
  const arr = Object.keys(newData).map(function (key) { return newData[key] })
  const max = Math.max.apply(null, arr)

  const opacityList = []
  for (var key in newData) {
    // Calcluate percentage of the alpha value. set minimal opacity at 0.2
    var obj = newData[key]
    var perc = (obj / max)
    if (perc < 0.2) {
      perc = 0.2
    }
    opacityList.push(perc)
  }
  return opacityList
}

// The function capitalizeEachWord is used to capitalize each word within the text.
const capitalizeEachWord = (str) => {
  // Each word ending with a space is used within the function.
  // This function makes sure that each word within the string is capitalized.
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export default {
  calculateOpacity, capitalizeEachWord
}
