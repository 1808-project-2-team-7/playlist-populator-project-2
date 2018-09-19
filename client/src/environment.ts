const dev = {
  context: 'http://localhost:9001/'
}

const prod = {
  context: 'http://ec2-18-224-39-70.us-east-2.compute.amazonaws.com:3000/'
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev