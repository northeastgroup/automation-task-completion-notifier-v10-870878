```javascript
const zapier = require('zapier-platform-core');

const authentication = require('./authentication');
const formSubmissionTrigger = require('./triggers/form_submission');
const sendWelcomeEmailCreate = require('./creates/send_welcome_email');

const App = {
  version: require('./package.json').version,
  platformVersion: zapier.version,
  
  authentication: authentication,

  triggers: {
    [formSubmissionTrigger.key]: formSubmissionTrigger,
  },

  creates: {
    [sendWelcomeEmailCreate.key]: sendWelcomeEmailCreate,
  },

  beforeRequest: [
    (request, z, bundle) => {
      if (bundle.authData.access_token) {
        request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
      }
      return request;
    },
  ],

  afterResponse: [
    (response, z, bundle) => {
      if (response.status === 401) {
        throw new z.errors.RefreshAuthError();
      }
      return response;
    },
  ],

  resources: {},
};

module.exports = App;
```

Please note that this is the main `index.js` file. You would also need to create the `authentication.js`, `triggers/form_submission.js`, and `creates/send_welcome_email.js` files, which contain the logic for authentication, the form submission trigger, and the send welcome email action, respectively.