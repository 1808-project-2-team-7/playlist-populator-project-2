const dev = {
  context: 'http://localhost:9002/'

}

const prod = {
  context: 'http://ec2-18-224-1-78.us-east-2.compute.amazonaws.com:9002/'
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev