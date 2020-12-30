var express = require('express');
var router = express.Router();
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
 
const credential = new DefaultAzureCredential();
 
const url = "https://az303helloworldkayvault.vault.azure.net/";
 
const client = new SecretClient(url, credential);
 
const secretName = "secretuser";

/* GET users listing. */
router.get('/', function(req, res, next) {
  getSecretValue().then(response => {
    res.send('respond with a resource : ' + response );
  });
});

async function getSecretValue() {
  const latestSecret = await client.getSecret(secretName);
  console.log(`Latest version of the secret ${secretName}: `, latestSecret);
  const specificSecret = await client.getSecret(secretName, { version: latestSecret.properties.version});
  console.log(`The secret ${secretName} at the version ${latestSecret.properties.version}: `, specificSecret);
  return "The secret "+ specificSecret.value;
}

module.exports = router;
