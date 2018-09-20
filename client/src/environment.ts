const dev = {
  context: 'http://localhost:9001/'
}

const prod = {
  context: 'http://ec2-18-223-164-90.us-east-2.compute.amazonaws.com:9002/'
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev