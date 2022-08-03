import { Dockest } from 'dockest'

const dockest = new Dockest()

// Specify the services from the Compose file that should be included in the integration test
const dockestServices = [
  {
    serviceName: 'elasticmq', // Must match a service in the Compose file
  },
  {
    serviceName: 'worker-orders', // Must match a service in the Compose file
  },
]

dockest.run(dockestServices)