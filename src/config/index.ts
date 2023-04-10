import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

let stage = process.env.STAGE || 'production'

let envConfig

if (stage === 'local'){
    envConfig =  require('./dev').default;
}
else if (stage === 'production' ){
    envConfig = require('./prod').default
}
else if(stage === 'testing'){
    envConfig = require('./test').default
}

const defaultConfig = {
    stage,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT
}

export default merge(defaultConfig, envConfig)


