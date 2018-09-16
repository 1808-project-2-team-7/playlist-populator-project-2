const dev = {
    context: 'http://localhost:8080/'
  }
  
  const prod = {
    context: process.env.EC2_URL
  }
  
  export const environment = process.env.NODE_ENV === 'production'
    ? prod
    : dev