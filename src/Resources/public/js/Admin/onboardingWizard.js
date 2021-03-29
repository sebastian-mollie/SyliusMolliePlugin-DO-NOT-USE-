$(function () {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: 'modal-onboarding',
      scrollTo: {
        behavior: 'smooth',
        block: 'bottom'
      },
    },
    steps: [
      {
        title: '<h2>Let me help you</h2>',
        text: 'Thank you for installing Mollie for payment services. This guide will take you through the configuration setup. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit nibh quis urna congue, et interdum nulla rutrum. Cras at justo ornare.',
        buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Skip this, I know how it works'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Start onboarding assistant'
          }
        ],
        id: 'wrapper',
        when: {
          show() {
            // const currentStepElement = this.el;
            // const header = currentStepElement.querySelector('.shepherd-header');
            // const progress = document.createElement('span');
            // progress.style['margin-right'] = '315px';
            // progress.innerText = `${this.tour.steps.indexOf(this.el) + 1}/${this.tour.steps.length}`;
            // header.insertBefore(progress, currentStepElement.querySelector('.shepherd-cancel-icon'));
          }
        },
      },
      {
        text: 'TEST will be the default in the plugin.<br/>' +
          'You only need to do the configuration once to have TEST + LIVE anvironments available. Try easily' +
          ' toggling between the two.',
        attachTo: {
          element: '.ui.dropdown.selection',
          on: 'bottom'
        },
        buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'wrapper',
        when: {
          show() {
            // console.log(this.tour.isActive());
            // const currentStepElement = this.el;
            // const header = currentStepElement.querySelector('.shepherd-header');
            // const progress = document.createElement('span');
            // progress.style['margin-right'] = '315px';
            // progress.innerText = `${this.tour.steps.indexOf(this.el) + 1}/${this.tour.steps.length}`;
            // header.insertBefore(progress, currentStepElement.querySelector('.shepherd-cancel-icon'));
          }
        },
      },
      {
        title: 'Connect your account',
        text: '<h2>Connect your Mollie account</h2>To sync the Mollie plugin to your webshop you\'ll need Mollie API' +
          ' keys and Profile ID',
        attachTo: {
          // element: '.ui.dropdown.selection',
          on: 'bottom'
        },
        buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Create a mollie account'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Login to my account'
          }
        ],
        id: 'wrapper'
      },
      {
        text: 'Copy and paste the API Key test from your Mollie account page.',
        attachTo: {
          element: '[for="sylius_payment_method_gatewayConfig_config_api_key_test"] + *',
          on: 'bottom'
        },
        buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Go back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'wrapper'
      },
      {
        text: 'Fill in your correct details and click "TEST API Keys" this will return a successfull or failed' +
          ' result for both the LIVE and TEST environments.',
        attachTo: {
          element: '.test-api-key-button',
          on: 'bottom'
        },
        buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Go back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'wrapper'
      },
      {
        text: 'Webshop checkout Configurations, Lorem Rapidiously revolutionize effective channels rather than real-time niche markets. Continually embrace team driven customer service.',
        attachTo: {
          // element: '.test-api-key-button',
          on: 'bottom'
        },
        buttons: [
          {
            action: function() {
              return this.cancel();
            },
            secondary: true,
            text: 'Go back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'wrapper'
      },
    ],
  });

  tour.start();
});
