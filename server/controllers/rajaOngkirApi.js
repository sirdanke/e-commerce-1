const axios = require('axios')
require('dotenv').config()
module.exports = {
  getCity(req, res) {
    axios
      .get(`https://api.rajaongkir.com/starter/city`, {
        headers: {
          key: `${process.env.RAJA_ONGKIR_API}`
        }
      })
      .then(({ data }) => {
        res.status(200).json({ city: data.rajaongkir.results })
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  getCost(req, res) {
    axios
      .post(`https://api.rajaongkir.com/starter/cost`, {
        origin: '153',
        destination: req.body.destination,
        weight: '1500',
        courier: req.body.courier
      }, {
          headers: {
            key: `${process.env.RAJA_ONGKIR_API}`
          }
        })
      .then(({ data }) => {
        res.status(200).json({ cost: data.rajaongkir.results[0].costs[0].cost[0].value })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}