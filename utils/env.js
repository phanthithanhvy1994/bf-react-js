const IsDevelopment = () => {
  const isDevelopment = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  return isDevelopment
}

module.exports = {
  IsDevelopment
}