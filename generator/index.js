import * as React from 'react';
import ReactDOM from 'react-dom';
import AsyncApiComponent from '@kyma-project/asyncapi-react';

const swaggerUI = require('swagger-ui');

const defaultOptions = {
  asyncapiElement: null,
  asyncapiYaml: null,
  openapiElement: null,
  openapiUrl: null,
  activeType: null,
};

let lastActiveType = null;

window.generator = (options = defaultOptions) => {
  if (lastActiveType !== options.activeType && lastActiveType === 'asyncapi') {
    ReactDOM.unmountComponentAtNode(element);
  }

  switch (options.activeType) {
    case 'openapi':
      if (options.openapiElement && options.openapiUrl) {
        swaggerUI({
          domNode: document.querySelector(options.openapiElement),
          url: options.openapiUrl,
          presets: [swaggerUI.presets.apis],
        });
      }
      break;

    case 'asyncapi':
      if (options.asyncapiElement && options.asyncapiYaml) {
        const element = React.createElement(AsyncApiComponent, {
          schema: options.asyncapiYaml,
        });
        ReactDOM.render(element, document.querySelector(options.asyncapiElement));
      }
      break;
  }
};
