const dev = {
  context: 'http://localhost:9002/'

}

const prod = {
  context: 'http://ec2-52-14-119-221.us-east-2.compute.amazonaws.com:9002/'
}

export const environment = process.env.NODE_ENV === 'production'
  ? prod
  : dev