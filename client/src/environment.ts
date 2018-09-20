const dev = {
  context: 'http://localhost:9001/'
}

const prod = {
  context: 'http://ec2-18-188-226-1.us-east-2.compute.amazonaws.com:9001/'
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev